import { compareSync } from 'bcrypt';
import { encryptString } from './crypt.utils';

describe('crypt.utils', () => {
  describe('encryptString', () => {
    it('should return an encrypted string', () => {
      const str = 'test';
      const encryptedStr = encryptString(str);

      expect(typeof encryptedStr).toBe('string');
      expect(encryptedStr).not.toBe(str);
    });

    it('should return an encrypted string that is not equal to the original string', () => {
      const str = 'test';
      const encryptedStr = encryptString(str);

      expect(encryptedStr).not.toBe(str);
    });

    it('should return an encrypted string that can be compared properly', () => {
      const str = 'test';
      const encryptedStr = encryptString(str);

      expect(compareSync(str, encryptedStr)).toBeTruthy();
    });
  });
});
