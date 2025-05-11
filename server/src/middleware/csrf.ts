import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';

export const csrfCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (['GET', 'OPTIONS', 'HEAD'].includes(req.method)) {
      return next();
    }

    const csrfHeader = req.get('Chartpt-Csrf-Token');

    if (!csrfHeader) {
      console.warn('Missing required csrf-token header', req.headers.origin);
      return res.status(403).json({ message: 'Failed CSRF check' });
    }

    const valid = await bcrypt.compare('SfKsT2K0hutMSeVQ5', csrfHeader);

    if (!valid) {
      console.warn(
        'valid provided in csrf-token header does not validate',
        req.headers.origin,
        csrfHeader
      );
      return res.status(403).json({ message: 'Failed CSRF check' });
    }
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};
