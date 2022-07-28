// import { RegisterOptions } from 'react-hook-form';

import {
  isArray,
  isBoolean,
  isEthAddress,
  isNumberish,
  isString,
} from '@daohaus/common-utilities';
import { RegisterOptions } from 'react-hook-form';
import { FieldLego, FieldValidationType } from '../types';

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
const updateValidate = createUpdaterFn('validate');

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

// REQUIRED UTILS
const isRequiredField = (
  field: FieldLego,
  requiredFields: Record<string, boolean>
) => requiredFields[field.id];

const generateRequiredRule = (field: Record<string, unknown>) => {
  const { label } = field;
  if (typeof label === 'string') {
    return { required: `${label} is required` };
  }
  return { required: `Field is required` };
};
export const handleRequiredField = (
  field: FieldLego,
  requiredFields: Record<string, boolean>
) =>
  isRequiredField(field, requiredFields) ? generateRequiredRule(field) : {};

// VALIDATION UTILS

const hasTypeValidation = (field: FieldLego) => field.expectType !== undefined;
const handleTypeValidation = (field: FieldLego) =>
  hasTypeValidation(field)
    ? { validate: ValidateField[field.expectType as FieldValidationType] }
    : {};
// TEMPORARY TESTS

export const generateRules = ({
  field,
  requiredFields = {},
}: {
  field: FieldLego;
  requiredFields: Record<string, boolean>;
}) => {
  const oldRules = field.rules || {};

  return pipe(
    updateRequired(handleRequiredField(field, requiredFields)),
    updateValidate(handleTypeValidation(field))
  )(oldRules);
};

// const inputNoLable: FieldLego = { type: 'input', id: 'test' };
// const inputWithLable: FieldLego = { type: 'input', id: 'test', label: 'Test' };

// const isRequired = {
//   test: true,
// };

// const isNotRequired = {
//   foo: true,
//   bar: true,
// };

// const isAlsoRequired = {
//   foo: true,
//   test: true,
// };

// const testIsRequired = isRequiredField(inputNoLable, {
//   description: true,
// });
// const testIsRequired2 = isRequiredField(inputNoLable, {
//   test: true,
// });

/*Temporary Tests For Required*/
// console.log('With label', generateRequiredRule(inputWithLable));
// console.log('W/out Label', generateRequiredRule(inputNoLable));

// console.log('Is Required', handleRequiredField(inputWithLable, isRequired));
// console.log(
//   'Is not required',
//   handleRequiredField(inputWithLable, isNotRequired)
// );
// console.log(
//   'Is also required',
//   handleRequiredField(inputWithLable, isAlsoRequired)
// );

// console.log(
//   'merges with other rules',
//   updateRequired({ required: 'Test is required' })({
//     setValueAs: (val) => val + 1,
//     minLength: 10,
//   })
// );
// console.log(
//   'overwrites old rules and merges with other rules',
//   updateRequired({ required: 'Test is required' })({
//     setValueAs: (val) => val + 1,
//     minLength: 10,
//     required: true,
//   })
// );

// TESTS FOR VALIDATE FIELD

// const numberTypeValInput: FieldLego = {
//   type: 'input',
//   id: 'test',
//   expectType: 'number',
// };
// const arrayTypeValInput: FieldLego = {
//   type: 'input',
//   id: 'test',
//   expectType: 'array',
// };
// const noTypeValInput: FieldLego = { type: 'input', id: 'test', label: 'Test' };

// console.log('Has Type Validation', hasTypeValidation(numberTypeValInput));
// console.log('Does not have Type Validation', hasTypeValidation(noTypeValInput));

// console.log(
//   'gets number type validation',
//   handleTypeValidation(numberTypeValInput)
// );
// console.log(
//   'gets array type validation',
//   handleTypeValidation(arrayTypeValInput)
// );
// console.log('returns empty type val', handleTypeValidation(noTypeValInput));
// console.log(
//   'merges with other rules',
//   updateValidate({ validate: ValidateField.array })({
//     setValueAs: (val) => val + 1,
//     minLength: 10,
//   })
// );
// console.log(
//   'overwrites old rules',
//   updateValidate({ validate: ValidateField.array })({
//     setValueAs: (val) => val + 1,
//     minLength: 10,
//     validate: ValidateField.number,
//   })
// );

// // TESTS FOR PIPELINE FUNCTION
// const testField: FieldLego = {
//   type: 'input',
//   id: 'test',
//   label: 'Test',
//   expectType: 'number',
// };
// console.log(
//   'inits rules',
//   generateRules({ field: testField, requiredFields: {} })
// );
// console.log(
//   'generates required and type validation',
//   generateRules({ field: testField, requiredFields: { test: true } })
// );
// console.log(
//   'preserves static rules',
//   generateRules({
//     field: { ...testField, rules: { minLength: 10, maxLength: 9 } },
//     requiredFields: { test: true },
//   })
// );
// console.log(
//   'overwrites old rules by the same name ',
//   generateRules({
//     field: {
//       ...testField,
//       rules: { minLength: 10, maxLength: 9, validate: ValidateField.array },
//     },
//     requiredFields: { test: true },
//   })
// );
// export const foo = 1;
