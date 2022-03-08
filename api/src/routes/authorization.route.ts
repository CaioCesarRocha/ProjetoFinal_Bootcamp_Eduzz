import { NextFunction, Request, Response, Router } from 'express';
import basicAuthenticationMiddleware from '../middlewares/basic-authentication.middleware';

import { StatusCodes } from 'http-status-codes';
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authorizationRoute = Router();


authorizationRoute.post('/token', basicAuthenticationMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try {
        //necessário extender a requisição no @types;
        const user = req.user;

        if (!user) {
            return res.status(StatusCodes.OK).json({wrongPass: true})
        }

        var currentDate = new Date().getTime();
        currentDate = currentDate + 60;

        const jwtPayload = { username: user.username, exp: currentDate };
        //o sinal ! diz ao TypeScript que, embora pareça ser nulo, ele pode confiar em você que não é.
        const secretKey:string = process.env.SECRETKEY!; 
        const jwt = JWT.sign(jwtPayload, secretKey);

        res.status(StatusCodes.OK).json({ token: jwt, wrongPass: false, user: user });
    } catch (error) {
        console.log('entrei error')
        next(error);
    }
});

export default authorizationRoute;