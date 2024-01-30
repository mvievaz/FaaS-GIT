import axios from 'axios';
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

// Middleware function to verify the token and email
export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    // Get the bearer token from the request headers
    const bearerToken = req.headers.authorization;

    if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: Bearer token missing or invalid' });
    }

    // Extract the token from the bearer token string
    const token = bearerToken.split(' ')[2];

    try {
        // Fetch Google's public keys from the well-known endpoint
        const response = await axios.get('https://www.googleapis.com/oauth2/v3/certs');
        const publicKeys: { [kid: string]: string } = response.data;

        // Decode the JWT token to extract the header
        const decodedToken = jwt.decode(token, { complete: true }) as { header: { kid: string } };

        // Get the appropriate public key based on the kid from the JWT header
        const publicKey = publicKeys[decodedToken.header.kid];
        if (!publicKey) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }

        // Verify the token using the public key
        jwt.verify(token, publicKey, (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ message: 'Unauthorized: Invalid token' });
            }
        
            // Check if the decodedToken is defined and contains the email property
            if (!decodedToken) {
                return res.status(401).json({ message: 'Unauthorized: Bad token' });
            }
        
            // Call the next middleware or route handler
            next();
        });
        
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
