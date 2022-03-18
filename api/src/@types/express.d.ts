import { NetworkInterfaceInfo } from 'os';
import { User } from '../models/user.model';

declare module 'express-serve-static-core' {
    
    interface Request {
        user?: User;
        auth?: Auth;
        newTokens?: NewTokens;
    }

}