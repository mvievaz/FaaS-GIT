import { Request, Response, NextFunction } from 'express';
import { Users } from '../models/userModel'
import {extractEmailFromJWT} from '../controllers/jwtHelper'

interface ExtendedRequest extends Request{
    email?: string; // Define the 'email' property as optional
}


// Middleware function to verify the token and email
export const verifyToken = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    // Get the bearer token from the request headers
    const bearerToken = req.headers.authorization;

    if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: Bearer token missing or invalid' });
    }
    // Extract the token from the bearer token string
    const token = bearerToken.split(' ')[2];

    try {
        //If email exist in the jwt, we will verify if the jwt is equal to our jwt stored associated with the user email 
        const email = extractEmailFromJWT(token)
        if (email !== null){
            if(Users[email] === token){
                req.email=email
                next();
            } else{
                return res.status(401).json({ message: 'Unauthorized: Bad token' });
            }
        } else{
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }

    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
