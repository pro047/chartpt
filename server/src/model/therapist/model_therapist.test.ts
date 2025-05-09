import { db } from '@db/database';
import { findName } from './therapist';

jest.mock('@db/database', () => ({
  db: {
    execute: jest.fn(),
  },
}));

describe('findame', () => {
  test('should select therapist name and return result', async () => {
    const mockSelectResult = [{ name: 'jack' }];

    (db.execute as jest.Mock).mockResolvedValueOnce([mockSelectResult, []]);

    const email = 'test!@example.com';
    const result = await findName(email);
    console.log(result);

    expect(db.execute).toHaveBeenCalledWith(
      'SELECT name FROM users WHERE email=?',
      [email]
    );

    expect(result).toEqual(mockSelectResult[0]);
  });
});
