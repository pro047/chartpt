import { db } from '@db/database';
import { saveChart } from './patient';

jest.mock('@db/database');

const mockedDb = db as jest.Mocked<typeof db>;

describe('savechart', () => {
  test('should insert patient data successfully', async () => {
    const mockData = {
      name: 'ljs',
      gender: 'male',
      age: 30,
      firstVisit: new Date('2025-05-11'),
      occupation: 'developer',
    };

    mockedDb.execute.mockResolvedValueOnce([
      { affectedRows: 1 },
      undefined,
    ] as any);

    await expect(saveChart(mockData)).resolves.toBeUndefined();

    expect(db.execute).toHaveBeenCalledWith(
      expect.stringContaining('INSERT INTO patients'),
      [
        mockData.name,
        mockData.age,
        mockData.gender,
        '2025-05-11',
        mockData.occupation,
      ]
    );
  });

  test('should throw if insertion failed (affectedRows === 0)', async () => {
    const badData = {
      name: 'lds',
      gender: 'male',
      age: 30,
      firstVisit: new Date('2025-05-11'),
      occupation: 'admin',
    };

    mockedDb.execute.mockResolvedValueOnce([
      { affectedRows: 0 },
      undefined,
    ] as any);

    await expect(saveChart(badData)).rejects.toThrow(
      'Failed to insert patient record'
    );
  });

  it('should throw if DB throws error', async () => {
    mockedDb.execute.mockRejectedValueOnce(new Error('DB error'));

    const data = {
      name: 'lll',
      gender: 'male',
      age: 30,
      firstVisit: new Date('2025-05-11'),
      occupation: 'newbie',
    };

    await expect(saveChart(data)).rejects.toThrow('DB error');
  });
});
