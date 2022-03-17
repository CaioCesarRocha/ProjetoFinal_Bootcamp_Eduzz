import { NextFunction, Request, Response, Router } from 'express';
import basicAuthenticationMiddleware from '../middlewares/basic-authentication.middleware';
import GenerateRefreshToken from '../provider/GenerateRefreshToken';
import GenerateToken from '../provider/GenerateToken';

import { StatusCodes } from 'http-status-codes';
import dotenv from 'dotenv';


dotenv.config();

const authorizationRoute = Router();

//ROTA PARA LOGIN DO USUÁRIO
authorizationRoute.post('/token', basicAuthenticationMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try {     
        const user = req.user; //necessário extender a requisição no @types;

        if (!user) {
            return res.status(StatusCodes.OK).json({wrongPass: true})
        }

        const generateToken = new GenerateToken();
        const jwt = await generateToken.execute(user.uuid);

        const generateRefreshToken = new GenerateRefreshToken();
        const refreshToken = await generateRefreshToken.execute(user.uuid)

        res.status(StatusCodes.OK).json({ token: jwt, wrongPass: false, user: user, refreshToken});
    } catch (error) {
        console.log('entrei error')
        next(error);
    }
});

export default authorizationRoute;