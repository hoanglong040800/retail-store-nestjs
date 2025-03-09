import { castArray, checkEmptyObject, keyBy } from './common.util';

describe('common util', () => {
  describe('keyBy', () => {
    it('should return empty array when array is empty', () => {
      const arrObj: any[] = [];
      const key = 'name';
      const expectedResult = {};

      const result = keyBy(arrObj, key);

      expect(result).toEqual(expectedResult);
    });

    it('should return correctly', () => {
      const arrObj: any[] = [
        { name: 'test', age: 10 },
        { name: 'test2', age: 20 },
      ];
      const key = 'name';
      const expectedResult = {
        test: { name: 'test', age: 10 },
        test2: { name: 'test2', age: 20 },
      };

      const result = keyBy(arrObj, key);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('castArray', () => {
    it('should return array when data is array', () => {
      const data = [1, 2, 3];
      const result = castArray(data);
      expect(result).toEqual(data);
    });

    it('should return array when data is not array', () => {
      const data = 1;
      const result = castArray(data);
      expect(result).toEqual([data]);
    });
  });
});

describe('checkEmptyObject', () => {
  it('should return true when obj is falsy', () => {
    const obj = null;
    const result = checkEmptyObject(obj as any);
    expect(result).toBe(true);
  });

  it('should return true when obj is empty', () => {
    const obj = {};
    const result = checkEmptyObject(obj);
    expect(result).toBe(true);
  });

  it('should return false if object is valid', () => {
    const obj = { a: 1 };
    const result = checkEmptyObject(obj);
    expect(result).toBe(false);
  });
});
