import { Request, Response } from 'express';
import { z } from 'zod';
import * as patientRepository from '@model/patient/patient';

const ChartSchema = z.object({
  name: z.string(),
  age: z.number(),
  gender: z.enum(['male', 'female']),
  firstVisit: z.coerce.date(),
  occupation: z.string(),
});

export const handlerSaveChart = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = req.body;
    const validatedData = ChartSchema.parse(data);
    const patientId = await patientRepository.saveChart(validatedData);
    res.status(200).json({ message: 'save completely', id: patientId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
