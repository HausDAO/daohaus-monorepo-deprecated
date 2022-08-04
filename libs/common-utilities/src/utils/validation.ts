import {
  isArray,
  isBoolean,
  isEthAddress,
  isNumberish,
  isString,
} from './typeguards';
export const ValErrMsgs = {
  number: 'Field must be a number',
  boolean: 'Field must be a boolean',
  array: 'Field must be an array',
  ethAddress: 'Field must be an Ethereum address',
  url: 'Field must be a valid URL',
  email: 'Field must be a valid email',
};
export const ValidateField = {
  number: (val: unknown) => (isNumberish(val) ? true : ValErrMsgs.number),
  boolean: (val: unknown) => (isBoolean(val) ? true : ValErrMsgs.boolean),
  array: (val: unknown) => (isArray(val) ? true : ValErrMsgs.array),
  ethAddress: (val: unknown) =>
    isEthAddress(val) ? true : ValErrMsgs.ethAddress,
  url: (val: unknown) =>
    isString(val) &&
    /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/.test(
      val
    )
      ? true
      : ValErrMsgs.url,
  email: (val: unknown) =>
    isString(val) && /^[^@]+@[^@]+\.[^@]+$/.test(val) ? true : ValErrMsgs.email,
};
