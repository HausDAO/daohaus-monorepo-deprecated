import { RegisterOptions } from 'react-hook-form';

const pipe =
  <T>(...fns: Array<(arg: T) => T>) =>
  (value: T) =>
    fns.reduce((acc, fn) => fn(acc), value);

const createOptionsCheck =
  (option: keyof RegisterOptions) =>
  (newOptions: RegisterOptions) =>
  (oldOptions: RegisterOptions) =>
    newOptions[option]
      ? { ...oldOptions, [option]: newOptions[option] }
      : oldOptions;

const checkMinLength = createOptionsCheck('minLength');
const checkMaxLength = createOptionsCheck('maxLength');
const checkRequired = createOptionsCheck('required');
const checkSetValue = createOptionsCheck('setValueAs');

const createRegisterOptions = (
  field: RegisterOptions & { registerOptions?: RegisterOptions }
) =>
  pipe(
    checkMinLength(field),
    checkMaxLength(field),
    checkRequired(field),
    checkSetValue(field)
  )(field.registerOptions || {});

const testLego = createRegisterOptions({
  minLength: 5,
  maxLength: 10,
  setValueAs: () => 'test',
  required: true,
});
const updateTestLego = createRegisterOptions({
  minLength: 10,
  maxLength: 20,
  registerOptions: testLego,
  setValueAs: (val) => val.test.test.test,
});

export const derp = 3;
