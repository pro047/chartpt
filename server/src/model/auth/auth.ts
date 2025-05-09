import { FieldPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import { db } from '@db/database';
import { User } from '../../types/user';

type NewUser = Omit<User, 'id'>;

export const findByEmail = async (email: string): Promise<User | undefined> => {
  const [rows] = (await db.execute('SELECT * FROM users WHERE email=?', [
    email,
  ])) as [RowDataPacket[], FieldPacket[]];
  return (rows as User[])[0];
};

export const createUser = async (user: NewUser): Promise<NewUser> => {
  const { email, password, name } = user;
  const [result] = (await db.execute(
    'INSERT INTO users (email, password, name) VALUES (?,?,?)',
    [email, password, name]
  )) as [ResultSetHeader, any];

  const [rows] = (await db.execute('SELECT email FROM users WHERE id=?', [
    result.insertId,
  ])) as [User[], FieldPacket[]];

  return rows[0];
};
