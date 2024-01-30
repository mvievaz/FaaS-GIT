// OAuth provider configuration
import { Request, Response } from 'express';
import axios from 'axios';
import { Users } from '../models/userModel'
import { v4 as uuidv4 } from 'uuid';

export const GOOGLE_OAUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
export const CLIENT_ID = '888958170550-bbfpsgnrne084b4dhinjhqsuq3u75jet.apps.googleusercontent.com';
export const CLIENT_SECRET = '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';
export const REDIRECT_URI = 'http://localhost:3000/oauth/callback';
export const SCOPE = 'email'; // Example scope for accessing user info

// OAuth authorization endpoint
export async function authorize(): Promise<string> {
    const authUrl = `${GOOGLE_OAUTH_URL}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}&response_type=code`;
    return authUrl;
}

// OAuth callback endpoint
export async function handleCallback(code: string): Promise<string> {
    const tokenUrl = 'https://oauth2.googleapis.com/token';

    const response = await axios.post(tokenUrl, new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
        grant_type: 'authorization_code',
        redirect_uri: REDIRECT_URI,
    }), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });

    const accessToken = response.data.id_token;
    const email = response.data.email
    const userID = uuidv4(); //Generating job ID with UUID
    Users[userID] = accessToken
    // You can handle storing the access token securely here
    console.log(Users)
    return accessToken;
}

export const OAuthAuthorize = async(req: Request, res: Response) => {
    const authUrl = await authorize();
    res.redirect(authUrl);
}

export const OAuthCallbackEndpoint = async(req: Request, res: Response) => {
    const code = req.query.code as string;
    const accessToken = await handleCallback(code);
    res.send(accessToken);
}