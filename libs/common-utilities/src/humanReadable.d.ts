type HumanFormatOptions = {
  unit?: string;
  decimals?: number;
  separator?: string;
};

declare module 'human-format' {
  export default function format(
    amount: number,
    options?: HumanFormatOptions
  ): string;
}
