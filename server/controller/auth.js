import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as authRepository from '../model/auth.js';

// todo 상수변수 나중에 config하기
const jwtSecrteKey = 'Ck6z42QGbpWUuEtM';
const jwtExpiresIn = 172800;
const bcryptSaltRounds = 12;

export async function signUp(req, res) {
  const { email, password, name } = req.body;
  const found = await authRepository.createUser(email);
  if (found) {
    res.status(409).json({ message: `${email} already exists` });
  }
  const hash = await bcrypt.hash(password, bcryptSaltRounds);
  const userEmail = await authRepository.createUser({
    email,
    password: hash,
    name,
  });
  token = createJwtToken(userEmail);
  res.status(200).json({ token, name });
}

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await authRepository.findByEmail(email);
  if (!user) {
    return res.status(401).json({ message: 'Invalid user or password' });
  }
  const userPassword = await bcrypt.compare(password, user.password);
  if (!userPassword) {
    return res.status(401).json({ message: 'Invalid user or password' });
  }
  const token = createJwtToken(user.email);
  res.status(200).json({ token, userEmail });
}

function createJwtToken(email) {
  return jwt.sign({ email }, jwtSecrteKey, { expiresIn: jwtExpiresIn });
}

export async function csrfToken(req, res, next) {
  const csrfToken = await generateCSRFToken();
  res.status(200).json({ csrfToken });
}

function generateCSRFToken() {
  return bcrypt.hash('SfKsT2K0hutMSeVQ5', 1);
}
