import { ResultSetHeader } from 'mysql2';
import { db } from '@db/database';
import { createUser } from '@model/auth/auth';

jest.mock('@db/database', () => ({
  db: {
    execute: jest.fn(),
  },
}));

describe('createUser', () => {
  test('should insert a user and return reslut', async () => {
    const mockResult: ResultSetHeader = {
      fieldCount: 0,
      affectedRows: 1,
      insertId: 1,
      info: '',
      serverStatus: 2,
      warningStatus: 0,
      changedRows: 1,
    } as ResultSetHeader;

    const mockSelectResult = [
      { email: 'test.@example.com', password: '123', name: 'test' },
    ];

    (db.execute as jest.Mock).mockResolvedValueOnce([mockResult, []]);
    (db.execute as jest.Mock).mockResolvedValueOnce([mockSelectResult, []]);

    const user = {
      email: 'test@example.com',
      password: '123',
      name: 'test',
    };

    const result = await createUser(user);
    console.log('result:', result);

    expect(db.execute).toHaveBeenCalledWith(
      'INSERT INTO users (email, password, name) VALUES (?,?,?)',
      [user.email, user.password, user.name]
    );

    expect(db.execute).toHaveBeenCalledWith(
      'SELECT email FROM users WHERE id=?',
      [mockResult.insertId]
    );
    console.log(mockSelectResult);

    expect(result).toEqual(mockSelectResult[0]);
  });
});
