import jwt, { JwtPayload } from 'jsonwebtoken';
import * as authRepository from '../model/auth/auth';
import { NextFunction, Request, Response } from 'express';

interface authJwtPayload extends JwtPayload {
  email: string;
}

export const authenticationToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.get('Authorization');
    let token = authHeader?.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : req.cookies['token'];

    if (!token) {
      res.status(401).json({ message: 'no token' });
      return;
    }

    const decode = jwt.verify(token, 'Ck6z42QGbpWUuEtM') as authJwtPayload;

    const user = await authRepository.findByEmail(decode.email);
    if (!user) {
      res.status(401).json({ mesaage: 'User not Found' });
      return;
    }
    req.user = {
      id: user.id,
      email: user.email,
      name: user.name,
      token: token,
    };
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
    return;
  }
};
