// import { RegisterOptions } from 'react-hook-form';

import {
  isArray,
  isBoolean,
  isEthAddress,
  isNumberish,
  isString,
} from '@daohaus/common-utilities';
import { RegisterOptions } from 'react-hook-form';
import { FieldLego } from '../types';

const pipe =
  <T>(...fns: Array<(arg: T) => T>) =>
  (value: T) =>
    fns.reduce((acc, fn) => fn(acc), value);

const createUpdaterFn =
  (option: keyof RegisterOptions) =>
  (newOptions: RegisterOptions) =>
  (oldOptions: RegisterOptions) =>
    newOptions[option]
      ? { ...oldOptions, [option]: newOptions[option] }
      : oldOptions;

// const checkMinLength = createOptionsCheck('minLength');
// const checkMaxLength = createOptionsCheck('maxLength');
const updateRequired = createUpdaterFn('required');
// const checkSetValue = createOptionsCheck('setValueAs');

// export const createRegisterOptions = (rules: RegisterOptions) =>
//   pipe(
//     checkMinLength(field),
//     checkMaxLength(field),
//     checkRequired(field),
//     checkSetValue(field)
//   )(field.registerOptions || {});

// const testLego = createRegisterOptions({
//   minLength: 5,
//   maxLength: 10,
//   setValueAs: () => 'test',
//   required: true,
// });
// const updateTestLego = createRegisterOptions({
//   minLength: 10,
//   maxLength: 20,
//   rules: testLego,
//   setValueAs: (val) => val.test.test.test,
// });

export const ValidateField = {
  number: (val: unknown) =>
    isNumberish(val) ? true : 'Field must be a number',
  boolean: (val: unknown) =>
    isBoolean(val) ? true : 'Field must be a boolean',
  array: (val: unknown) =>
    isArray(val) ? true : 'Field must be an array (list of items)',
  ethAddress: (val: unknown) =>
    isEthAddress(val) ? true : 'Field must be an Ethereum address',
  url: (val: unknown) =>
    isString(val) && /^(http|https):\/\/[^ "]+$/.test(val)
      ? true
      : 'Field must be a valid URL',
  email: (val: unknown) =>
    isString(val) && /^[^@]+@[^@]+\.[^@]+$/.test(val)
      ? true
      : 'Field must be a valid email',
};

const isRequiredField = (
  field: FieldLego,
  requiredFields: Record<string, boolean> = {}
) => requiredFields[field.id];

const generateRequiredRule = (field: Record<string, unknown>) => {
  const { label } = field;
  if (typeof label === 'string') {
    return `${label} is required`;
  }
  return 'Field is required';
};
const handleRequiredField = (
  field: FieldLego,
  requiredFields: Record<string, boolean> = {}
) =>
  isRequiredField(field, requiredFields) ? generateRequiredRule(field) : {};

export const generateRules = ({
  oldRules,
  field,
  requiredFields = {},
}: {
  oldRules: RegisterOptions;
  field: FieldLego;
  requiredFields: Record<string, boolean>;
}) => {
  return pipe(updateRequired(handleRequiredField(field, requiredFields)))(
    oldRules
  );
};
