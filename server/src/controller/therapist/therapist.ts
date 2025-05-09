import { Request, Response } from 'express';
import * as therapistRepository from '@model/therapist/therapist';

export const therapistNameUpdate = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!req.user?.email) {
    return void res.status(400).json({ messsage: 'Missing user email' });
  }
  const therapistName = await therapistRepository.findName(req.user?.email);
  console.log('therapisName : ', therapistName);
  if (!therapistName) {
    return void res.status(404).json({ message: 'no name' });
  }
  return void res.status(200).json({ therapistName });
};
