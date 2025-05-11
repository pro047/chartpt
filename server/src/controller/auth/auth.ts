import { CookieOptions, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as authRepository from '../../model/auth/auth';

// todo 상수변수 나중에 config하기
const jwtSecrteKey = 'Ck6z42QGbpWUuEtM';
const jwtExpiresIn = 172800;
const bcryptSaltRounds = 12;

type SignupRequestBody = {
  email: string;
  password: string;
  name: string;
};

type LoginRequestBody = {
  email: string;
  password: string;
  name: string;
};

export const signUp = async (
  req: Request<{}, {}, SignupRequestBody>,
  res: Response
): Promise<void> => {
  const { email, password, name } = req.body;
  const found = await authRepository.findByEmail(email);
  if (found) {
    return void res.status(409).json({ message: `${email} already exists` });
  }
  const hash = await bcrypt.hash(password, bcryptSaltRounds);
  const user = await authRepository.createUser({
    email,
    password: hash,
    name,
  });
  const token = createJwtToken(user.email);
  setToken(res, token);
  res.status(200).json({ token, name });
};

export const login = async (
  req: Request<{}, {}, LoginRequestBody>,
  res: Response
): Promise<void> => {
  const { email, password } = req.body;
  const user = await authRepository.findByEmail(email);
  if (!user) {
    return void res.status(401).json({ message: 'Invalid user or password 1' });
  }

  const userPassword = await bcrypt.compare(password, user.password);
  if (!userPassword)
    return void res.status(401).json({ message: 'Invalid user or password 2' });

  const token = createJwtToken(user.email);
  const name = user.name;
  setToken(res, token);
  res.status(200).json({ token, email, name });
};

export const logout = (req: Request, res: Response): void => {
  res.cookie('token', '');
  res.status(200).json({ message: 'User has been logged out' });
};

export const me = async (req: Request, res: Response): Promise<void> => {
  if (!req.user?.email) {
    return void res.status(401).json({ message: 'User email not exist' });
  }
  const user = await authRepository.findByEmail(req.user?.email);
  if (!user) return void res.status(404).json({ message: 'user not found' });

  console.log('user', user);
  res.status(200).json({ token: req.user?.token, name: req.user?.name });
};

function createJwtToken(email: string): string {
  return jwt.sign({ email }, jwtSecrteKey, { expiresIn: jwtExpiresIn });
}

function setToken(res: Response, token: string): void {
  const options: CookieOptions = {
    maxAge: jwtExpiresIn * 1000,
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  };
  res.cookie('token', token, options);
}

export const csrfToken = async (req: Request, res: Response): Promise<void> => {
  const csrfToken = await generateCSRFToken();
  res.status(200).json({ csrfToken });
};

export function generateCSRFToken(): Promise<string> {
  return bcrypt.hash('SfKsT2K0hutMSeVQ5', 1);
}
