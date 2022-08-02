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

export const createUpdaterFn =
  (option: keyof RegisterOptions) =>
  (newOptions: RegisterOptions) =>
  (oldOptions: RegisterOptions) =>
    newOptions[option]
      ? { ...oldOptions, [option]: newOptions[option] }
      : oldOptions;

const updateRequired = createUpdaterFn('required');
const updateValidate = createUpdaterFn('validate');

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

export const isRequiredField = (
  field: FieldLego,
  requiredFields: Record<string, boolean>
) => requiredFields[field.id];

export const generateRequiredRule = (field: Record<string, unknown>) => {
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

export const hasTypeValidation = (field: FieldLego) =>
  field.expectType !== undefined;
export const handleTypeValidation = (field: FieldLego) =>
  hasTypeValidation(field)
    ? { validate: ValidateField[field.expectType as FieldValidationType] }
    : {};

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
