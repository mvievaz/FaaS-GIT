import { Request, Response, NextFunction } from 'express';
import jwt, { VerifyErrors, JwtPayload } from 'jsonwebtoken';
interface ExtendedRequest extends Request {
    user?: { username: string };
  }

export const authenticateToken = (req: ExtendedRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, 'your-secret-key', (err: VerifyErrors | null, user: JwtPayload | undefined) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};