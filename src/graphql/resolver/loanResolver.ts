import { Request } from 'express';
import mongoose, { Document } from 'mongoose';
import User from '../../models/userInfos';
import Loan from '../../models/loans';

interface Loan {
    "InputLoan": {
        "user": string,
        "money": number,
        "moneylender": string
    }
};

export default {
    getLoans: async (args: any, req: Request) => {
        const loans: Document[] | null = await Loan.find(args);
        return loans;
    },
    createLoan: async (args: Loan, req: Request) => {
        console.log(args)
        const { moneylender, money, user }  = args.InputLoan;
        try {
            const usr: any = await User.findById(moneylender);
            const { money:lendersmoney } = usr;
            if (lendersmoney<money) {
                throw new Error('not enough money');
            }
            const newLoan: Document = new Loan({ moneylender, money, user });
            const loan: Document = await newLoan.save();
            await User.findByIdAndUpdate(moneylender, { money: lendersmoney - money, $push: { loans: loan._id } });
            await User.findByIdAndUpdate(user, { $push: { loans: loan._id } });
            return loan;
        }
        catch (err) {
            throw err;
        }
    }
}