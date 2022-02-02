import { Util } from './util';

describe('Util service', () => {
  describe('noop', () => {
    it('should return undefined', () => {
      const result = Util.noop();
      expect(result).toBe(undefined);
    });
  });
});
