interface NumeralJSOptions {
  currentLocale: string;
  zeroFormat: string;
  nullFormat: string;
  defaultFormat: string;
  scalePercentBy100: boolean;
}

declare module 'numeral' {
  const options: NumeralJSOptions;

  function reset(): void;

  type RoundingFunction = (value: number) => number;

  class Numeral {
    constructor(input: unknown, value: number);
    prototype: Numeral;
    clone(): Numeral;
    format(inputString?: string, roundingFunction?: RoundingFunction): string;
    value(): number | null;
    input(): unknown;
    set(value: unknown): Numeral;
    add(value: unknown): Numeral;
    subtract(value: unknown): Numeral;
    multiply(value: unknown): Numeral;
    divide(value: unknown): Numeral;
    difference(value: unknown): number;
  }

  function numeral(value: unknown): Numeral;
}

export default numeral;
