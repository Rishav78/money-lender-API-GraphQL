import { Request } from 'express';
import { Document } from 'mongoose';
import User from '../../models/userInfos';
import Loan from '../../models/loans';

interface Loan {
    "InputLoan": {
        "user": string,
        "money": number,
        "moneylender": string
    }
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

    createLoan: async (args: Loan, req: request) => {
        const { moneylender, money, user }  = args.InputLoan;
        try {
            if (!req.isAuth) {
                throw new Error('unauthrized')
            }
            const usr: any = await User.findById(moneylender);
            const { money:lendersmoney } = usr;
            if (lendersmoney<money) {
                throw new Error('not enough money');
            }
            const newLoan: Document = new Loan({ moneylender, money, user });
            return await newLoan.save();;
        }
        catch (err) {
            throw err;
        }
    }
}