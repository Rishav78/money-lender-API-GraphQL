import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export type request = Request & {
    "isAuth": boolean,
    "userId": string
};

interface Token {
    "_id": string,
    "email": string,
    "expiresIn": number
};

export const auth = function(){
    return function(req: request, res: Response, next: NextFunction) {
        const authHeader = req.get('Authorization');
        if (!authHeader) {
            req.isAuth = false;
            return next();
        }
        const [barrer, token] = authHeader.split(' ');
        if ( !token || token === '') {
            req.isAuth = false;
            return next();
        }
        try {
            const key: string = process.env.JSON_WEB_TOKEN_KEY as string
            const decodedToken: any = jwt.verify(token, key);
            if ( !decodedToken ) {
                req.isAuth = false;
                return next();
            }
            req.isAuth = false;
            req.userId = decodedToken._id;
            return next();
        }
        catch (err) {
            req.isAuth = false;
            return next();
        }
    }
}