import { NextFunction, Request, Response } from "express";
import ForbiddenError from "../models/errors/forbidden.error.model";
import JWT from 'jsonwebtoken';


async function bearerAuthenticationMiddleware(req: Request, res: Response, next: NextFunction) {

    try{     
        const authorizationHeader = req.headers['authorization'];

        if(!authorizationHeader){
            throw new ForbiddenError('Credenciais nao informadas');
        }
        
        const [authenticationType, token] = authorizationHeader.split(' ');
        
        if (authenticationType !== 'Bearer' || !token) {
            throw new ForbiddenError('Tipo de authenticação inválido');
        }
        
        const secretKey:string = process.env.SECRETKEY!;
       
        JWT.verify(token, secretKey, function(err, decoded) {
            if (err) {  // Manage different errors here (Expired, untrusted...)
                return res.json('expired')               
            }
            req.auth = decoded // If no error, token info is returned in 'decoded'
            next()
        }); 

    }catch(error){
        throw new ForbiddenError('Erro ao buscar o usuário', error);
    }
}


export default bearerAuthenticationMiddleware;