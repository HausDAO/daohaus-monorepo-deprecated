import { readableNumber } from '../utils';

describe('readableNumber', () => {
  it('should handle default amount', () => {
    expect(readableNumber({ amount: 1 })).toEqual('1 ');
  });

  describe('should handle amounts between 0 and 1', () => {
    it('adds seperator and unit', () => {
      expect(
        readableNumber({
          amount: 0.75,
          unit: 'ether',
          decimals: 4,
        })
      ).toEqual('0.7500 ether');
    });

    it('should ignore seperator when it has no units', () => {
      expect(
        readableNumber({
          amount: 0.75,
          decimals: 4,
        })
      ).toEqual('0.7500');
    });

    it('should use maxDecimals over decmials', () => {
      expect(
        readableNumber({
          amount: 0.75,
          unit: 'values',
          decimals: 4,
          maxDecimals: 3,
        })
      ).toEqual('0.750 values');
    });
  });

  describe('should handle amounts >= 1 with humanFormat', () => {
    it('should', () => {
      expect(
        readableNumber({
          amount: 1,
          decimals: 18,
          separator: ' ',
        })
      ).toEqual('1.000000000000000000 ');
    });

    it('should', () => {
      expect(
        readableNumber({
          amount: 1.001,
          decimals: 5,
        })
      ).toEqual('1.00100 ');
    });
  });
});
