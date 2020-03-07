import { Request } from 'express';
import { Document } from 'mongoose';
import User from '../../models/userInfos';

interface User {
    "email": string
};

type request = Request & {
    "isAuth": boolean
}

export default {
    getUsers: async (args: any, req: request) => {
        try {
            // if (!req.isAuth) {
            //     throw new Error('unauthrized')
            // }
            const users = await User.find();
            return users;
        }
        catch (err) {
            throw err;
        }
    },
    
    getUser: async (args: User, req: request) => {
        const { email } = args;
        try {
            if (!req.isAuth) {
                throw new Error('unauthrized')
            }
            const user: Document | null = await User.findOne({ email });
            return user;
        }
        catch (err) {
            throw err;
        }
    }
}