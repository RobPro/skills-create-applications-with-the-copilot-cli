const { compute, toNumber } = require('../lib/calculator');

describe('calculator library', () => {
  describe('toNumber', () => {
    test('parses integer strings', () => {
      expect(toNumber('42')).toBe(42);
    });

    test('parses floats', () => {
      expect(toNumber('3.14')).toBeCloseTo(3.14);
    });

    test('returns NaN for non-numeric', () => {
      expect(Number.isNaN(toNumber('abc'))).toBe(true);
    });
  });

  describe('compute', () => {
    test('addition: add 2 + 3 = 5', () => {
      expect(compute('add', 2, 3)).toBe(5);
    });

    test('subtraction: 10 - 4 = 6', () => {
      expect(compute('sub', 10, 4)).toBe(6);
    });

    test('multiplication: 6 * 7 = 42', () => {
      expect(compute('mul', 6, 7)).toBe(42);
    });

    test('division: 8 / 2 = 4', () => {
      expect(compute('div', 8, 2)).toBe(4);
    });

    test('division with floats', () => {
      expect(compute('div', 5, 2)).toBeCloseTo(2.5);
    });

    test('division by zero throws with code DIV_BY_ZERO', () => {
      expect(() => compute('div', 5, 0)).toThrow('Division by zero');
      try {
        compute('div', 5, 0);
      } catch (e) {
        expect(e.code).toBe('DIV_BY_ZERO');
      }
    });

    test('unknown operation throws', () => {
      expect(() => compute('pow', 2, 3)).toThrow('Unknown operation');
    });

    test('supports negative numbers and zero', () => {
      expect(compute('add', -1, -2)).toBe(-3);
      expect(compute('mul', 0, 100)).toBe(0);
    });
  });
});
