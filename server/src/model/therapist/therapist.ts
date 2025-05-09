import { db } from '@db/database';
import { FieldPacket, RowDataPacket } from 'mysql2';
import { User } from 'types/user';

export const findName = async (email: string): Promise<User | null> => {
  const [name] = (await db.execute('SELECT name FROM users WHERE email=?', [
    email,
  ])) as [RowDataPacket[], FieldPacket[]];
  console.log('name :', name[0].name);
  return (name as User[])[0];
};
