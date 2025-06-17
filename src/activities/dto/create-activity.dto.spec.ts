import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateActivityDto } from './create-activity.dto';

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;

describe('CreateActivityDto validation', () => {
  it('should fail if required fields are missing or invalid', async () => {
    const dto = plainToInstance(CreateActivityDto, {
      title: 123, // inválido
      imageUrl: 'not-a-url',
      scheduleStartAt: 'invalid-date',
    });

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors.map((e) => e.property)).toEqual(
      expect.arrayContaining([
        'title',
        'imageUrl',
        'scheduleStartAt',
        'scheduleEndAt',
      ]),
    );
  });

  it('should pass with all valid fields', async () => {
    const datenow = new Date().getTime();
    const dto = plainToInstance(CreateActivityDto, {
      title: 'Activity 1',
      imageUrl: 'https://example.com/image.png',
      resourceUrl: 'https://example.com/doc.pdf',
      scheduleStartAt: new Date(datenow + MINUTE),
      scheduleEndAt: new Date(datenow + HOUR),
      admin: true,
    });

    const errors = await validate(dto);

    expect(errors.length).toBe(0);
  });
});
