import { Request } from 'express';
import { Document } from 'mongoose';
import User from '../../models/userInfos';
import Loan from '../../models/loans';

interface RequestLoan {
    "InputLoan": {
        "user": string,
        "money": number,
        "moneylender": string
    }
};

interface PayLoan {
    "_id": string,
    "money": number
};

type request = Request & {
    "isAuth": boolean
}

export default {
    getLoans: async (args: any, req: request) => {
        const select: object = { email: 1, firstname: 1, lastname: 1, role: 1 };
        // if (!req.isAuth) {
        //     throw new Error('unauthrized')
        // }
        const loans: Document[] | null = await Loan.find(args)
            .populate('user', select)
            .populate('moneylender', select);
        return loans;
    },

    createLoan: async (args: RequestLoan, req: request) => {
        const { moneylender, money, user }  = args.InputLoan;
        try {
            // if (!req.isAuth) {
            //     throw new Error('unauthrized')
            // }
            const newLoan: Document = new Loan({ moneylender, money, user });
            return await newLoan.save();;
        }
        catch (err) {
            throw err;
        }
    },
    payLoan: async (args: PayLoan, req: Request) => {
        const select: object = { email: 1, firstname: 1, lastname: 1, role: 1 };
        const { _id, money } = args;
        const loaninfo: any = await Loan.findById(_id);
        if(!loaninfo) {
            throw new Error('loan does not exist');
        }
        if ( loaninfo.money === 0) {
            throw new Error('loan already cleared');
        }
        if ( loaninfo.money - money < 0 ) {
            throw new Error('too much money');
        }
        const loan: any= await Loan.findByIdAndUpdate(_id, { $inc: { money: -money }}, {new: true});
        return loan.populate('users', select).populate('moneylender', select);
    }
}