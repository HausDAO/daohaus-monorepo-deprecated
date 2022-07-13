type HumanFormatOptions = {
  unit?: string;
  decimals?: number;
  maxDecimals?: number;
  separator?: string;
};

declare module 'human-format' {
  function humanFormat(amount: number, options?: HumanFormatOptions): string;
  export = humanFormat;
}
