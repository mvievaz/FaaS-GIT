import jwt, { JwtPayload } from 'jsonwebtoken';

// Function to decode JWT and extract email from the data
export function extractEmailFromJWT(token: string): string | null {
    try {
        const decodedToken = jwt.decode(token) as JwtPayload | null; // Assert the shape of the decoded token
        if (typeof decodedToken === 'object' && decodedToken !== null && 'email' in decodedToken) {
            return decodedToken.email as string;
        } else {
            throw new Error('Email not found in JWT data');
        }
    } catch (error) {
        console.error('Error extracting email from JWT:', error);
        return null;
    }
}
