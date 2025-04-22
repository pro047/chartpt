import * as therapistRepository from '../model/therapist.js';

export async function therapistNameUpdate(req, res) {
  const therapistName = await therapistRepository.findName(req, res);
  console.log('therapisName : ', therapistName);
  if (!therapistName) {
    res.status(404).json({ messeage: 'no name' });
  }
  res.status(200).json({ therapistName });
}
