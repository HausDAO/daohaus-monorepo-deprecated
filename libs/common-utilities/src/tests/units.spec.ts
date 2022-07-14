import { readableNumber } from '../utils';

describe('readableNumber', () => {
  it('should handle default amount', () => {
    expect(readableNumber({ amount: 1 })).toEqual('$1.00 ');
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
          amount: 1100000000000000000,
          unit: 'ether',
          separator: ' ',
          format: '0.0e+0',
        })
      ).toEqual('1.1e+18 ether');
    });

    it('should', () => {
      expect(
        readableNumber({
          amount: 1.001,
          decimals: 5,
          format: '0,0.00000',
        })
      ).toEqual('1.00100 ');
    });

    it('should return a predefined format', () => {
      expect(
        readableNumber({
          unit: 'seconds',
          amount: 20,
          decimals: 5,
          format: 'timeSeconds',
        })
      ).toEqual('0:00:20 seconds');
    });
  });
});
