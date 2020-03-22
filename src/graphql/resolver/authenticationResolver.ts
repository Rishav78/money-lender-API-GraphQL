import { Request } from 'express';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import mongoose, { Document, mongo } from 'mongoose';
import User from '../../models/users';
import UserInfo from '../../models/userInfos';

interface AuthenticationData {
    "email": string,
    "password": string
};

interface User {
    "InputUser": {
        "firstname": string,
        "lastname": string,
        "email": string,
        "password": string,
        "money"?: number,
        "role": string
    }
}

export default {
    login: async (args: AuthenticationData, req: Request) => {
        const { email, password } = args;
        const user: any = await User.findOne({ email });
        if (!user) {
            throw new Error('user does not exists');
        }
        const { password: pswd, _id } = user;
        const isEqual:boolean = await compare(password, pswd);
        if (!isEqual) {
            throw new Error('invalid password');
        }
        const secret: string = process.env.JSON_WEB_TOKEN_KEY as string;
        const token: string = sign({ email, _id }, secret, { expiresIn: '1hr' });
        return { _id, token, expiresIn: 1 };
    },
    createUser: async (args: User, req: Request) => {
        const { email, password: pswd, ...rest } = args.InputUser;
        const session = await mongoose.startSession();
        try {
            session.startTransaction()
            const password: string = await hash(pswd, 12);
            await (new User({ email, password })).save({ session });
            const newUser = new UserInfo({ email, ...rest });
            await session.commitTransaction();
            return await newUser.save({ session });
        }
        catch (err) {
            throw err;
        }
    }
}