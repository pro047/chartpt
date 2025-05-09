import { therapistNameUpdate } from './therapist';
import * as therapistRepository from '@model/therapist/therapist';

describe('therapistNameUpdate', () => {
  const mockUser = { name: 'jin', email: 'abc@example.com', password: '123' };
  const mockStatus = jest.fn();
  const mockJson = jest.fn();
  const res = {
    status: mockStatus.mockReturnThis(),
    json: mockJson,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return 404 if name not found', async () => {
    const req = { email: 'abc@example.com' } as any;
    jest.spyOn(therapistRepository, 'findName').mockResolvedValueOnce(null);

    await therapistNameUpdate(req, res as any);

    expect(therapistRepository.findName).toHaveBeenCalledWith(
      'abc@example.com'
    );
    expect(mockStatus).toHaveBeenLastCalledWith(404);
    expect(mockJson).toHaveBeenCalledWith({ message: 'no name' });
  });

  test('should return 200 with name if found', async () => {
    const req = { email: 'abc@naver.com' } as any;
    jest.spyOn(therapistRepository, 'findName').mockResolvedValueOnce(mockUser);

    await therapistNameUpdate(req, res as any);

    expect(mockStatus).toHaveBeenCalledWith(200);
    expect(mockJson).toHaveBeenCalledWith({ therapistName: 'jin' });
  });
});
