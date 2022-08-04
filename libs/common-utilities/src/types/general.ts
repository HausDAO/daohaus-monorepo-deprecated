export type Noun = {
  singular: string;
  plural: string;
};

// By definition this needs to use any.
// But we should be dilligent about using this type and make sure that
// in cases where we're using this to handle highly level functionality
// we can extends with more specific types (ex. TXBuilder)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ArbitraryState = Record<string, any>;
