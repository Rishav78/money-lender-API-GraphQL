import { Request } from 'express';
import User from '../../models/userInfos';



export default {
    getUsers: async (args: any, req: Request) => {
        const users = await User.find();
        return users;
    },
    getUser: async (args, req) => {

    }
}