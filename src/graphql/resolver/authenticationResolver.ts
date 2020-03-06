import { Request } from 'express';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { Document } from 'mongoose';
import User, { userDocument } from '../../models/users';

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
        "money": number,
        "role": number,
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
        const token: string = sign({ email, _id }, secret, {
            expiresIn: '1hr'
        });
        return { _id, token, expiresIn: 1 };
    },
    createUser: async (args: User, req: Request) => {
        const { email, password: pswd, ...rest } = args.InputUser;
        const password: string = await hash(pswd, 12);
        const newUser: Document = new User({ email, password, ...rest });
        const user: Document = await newUser.save();
        return user;
    }
}