import { JwtTokenUnit } from '@/constants';
import { calculateExpireTime } from './auth.util';

describe('auth util', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // UT: dynamic test cases
  // UT: mock time
  // UT: test exception
  describe('calculateExpireTime', () => {
    beforeEach(() => {
      const fixedTime = new Date('2024-06-15T06:00:00.000Z').getTime();
      jest.spyOn(Date, 'now').mockReturnValue(fixedTime);
    });

    const testCases = [
      {
        expiresIn: 'abc',
        unit: JwtTokenUnit,
        expected: 'ERROR: Invalid expiresIn value',
        title: 'should throw error when expiresIn contain character',
      },

      {
        expiresIn: '',
        unit: '',
        expected: '2024-06-15T06:00:00.000Z',
        title: 'should return correct time when expirsIn empty',
      },

      {
        expiresIn: '1',
        unit: 'h',
        expected: '2024-06-15T07:00:00.000Z',
        get title() {
          return `should return correct time when expiresIn is ${this.expiresIn}${this.unit}`;
        },
      },
      {
        expiresIn: '5',
        unit: JwtTokenUnit,
        expected: '2024-06-15T06:05:00.000Z',
        get title() {
          return `should return correct time when expiresIn is ${this.expiresIn}${this.unit}`;
        },
      },
    ];

    testCases.forEach(({ expiresIn, unit, expected, title }) => {
      const parseUnit = unit as moment.unitOfTime.DurationConstructor;

      const test = () => {
        if (expected.startsWith('ERROR')) {
          return expect(() =>
            calculateExpireTime(expiresIn, parseUnit),
          ).toThrow();
        }

        const result = calculateExpireTime(expiresIn, parseUnit);

        expect(result).toEqual(new Date(expected));
      };

      it(title, test);
    });
  });
});
