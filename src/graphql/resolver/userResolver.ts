import { Request } from 'express';
import { Document } from 'mongoose';
import User from '../../models/userInfos';

interface User {
    "email": string
};

export default {
    getUsers: async (args: any, req: Request) => {
        const users = await User.find();
        return users;
    },
    
    getUser: async (args: User, req: Request) => {
        const { email } = args;
        try {
            const user: Document | null = await User.findOne({ email });
            return user;
        }
        catch (err) {
            throw err;
        }
    }
}