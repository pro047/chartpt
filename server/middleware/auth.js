import jwt from 'jsonwebtoken';
import * as authRepository from '../model/auth.js';

export const authenticationToken = async (req, res, next) => {
  let token;
  const authHeader = req.get('Authorization');
  console.log('authHeader', authHeader);
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }

  if (!token) {
    token = req.cookies['token'];
  }

  if (!token) {
    return res.status(401).json({ message: 'no token' });
  }

  jwt.verify(token, 'Ck6z42QGbpWUuEtM', async (err, decoded) => {
    if (err) {
      console.error(err);
      return res.status(401).json({ message: 'error2' });
    }

    const user = await authRepository.findByEmail(decoded.email);
    if (!user) {
      return res.status(401).json({ message: 'error3' });
    }
    req.email = user.email;
    req.token = token;
    req.name = user.name;
    req.id = user.id;
    next();
  });
};
