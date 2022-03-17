import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


//FUNÇÃO PARA GERAR O ACESS TOKEN, PASSANDO SEU TEMPO DE EXPIRAÇÃO
class GenerateToken {
    async execute(userId: string){

        const jwtPayload = { subject: userId};             
        const secretKey:string = process.env.SECRETKEY!; //o sinal ! diz ao TypeScript que, embora pareça ser nulo, ele pode confiar em você que não é.
        const jwt = JWT.sign(jwtPayload, secretKey, {expiresIn: "10s"});

        return jwt;    
    }
}

export default GenerateToken;