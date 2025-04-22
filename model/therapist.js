import { db } from '../db/database.js';

export async function findName(req, res) {
  const [name] = await db.execute('SELECT name FROM users WHERE email=?', [
    req.email,
  ]);
  if (!name) return res.status(404).json({ message: 'no name' });
  console.log('name :', name[0].name);
  return name[0].name;
}
