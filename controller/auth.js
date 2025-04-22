import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as authRepository from '../model/auth.js';

// todo 상수변수 나중에 config하기
const jwtSecrteKey = 'Ck6z42QGbpWUuEtM';
const jwtExpiresIn = 172800;
const bcryptSaltRounds = 12;

export async function signUp(req, res) {
  const { email, password, name } = req.body;
  const found = await authRepository.findByEmail(email);
  if (found) {
    res.status(409).json({ message: `${email} already exists` });
  }
  const hash = await bcrypt.hash(password, bcryptSaltRounds);
  const userEmail = await authRepository.createUser({
    email,
    password: hash,
    name,
  });
  const token = createJwtToken(userEmail);
  setToken(res, token);
  res.status(200).json({ token, name });
}

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await authRepository.findByEmail(email);
  if (!user) {
    return res.status(401).json({ message: 'Invalid user or password 1' });
  }
  const userPassword = await bcrypt.compare(password, user.password);
  if (!userPassword) {
    return res.status(401).json({ message: 'Invalid user or password 2' });
  }
  const token = createJwtToken(user.email);
  setToken(res, token);
  res.status(200).json({ token, email });
}

export async function logout(req, res, next) {
  res.cookie('token', '');
  res.status(200).json({ message: 'User has been logged out' });
}

export async function me(req, res, next) {
  const user = await authRepository.findByEmail(req.email);
  if (!user) {
    return res.status(404).json({ message: 'user not found' });
  }
  console.log('user', user);
  res.status(200).json({ token: req.token, name: req.name });
}

function createJwtToken(email) {
  return jwt.sign({ email }, jwtSecrteKey, { expiresIn: jwtExpiresIn });
}

function setToken(res, token) {
  const options = {
    maxAges: jwtExpiresIn * 1000,
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  };
  res.cookie('token', token, options);
}

export async function csrfToken(req, res, next) {
  const csrfToken = await generateCSRFToken();
  res.status(200).json({ csrfToken });
}

export function generateCSRFToken() {
  return bcrypt.hash('SfKsT2K0hutMSeVQ5', 1);
}
