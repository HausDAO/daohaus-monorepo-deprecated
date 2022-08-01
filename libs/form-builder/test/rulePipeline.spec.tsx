import { RegisterOptions } from 'react-hook-form';
import { FieldLego } from '../src';
import {
  createUpdaterFn,
  generateRules,
  handleRequiredField,
  handleTypeValidation,
  hasTypeValidation,
  isRequiredField,
} from '../src/utils/rules';

describe('Form Builder: Rules Pipeline => Required', () => {
  const inputWithLabel: FieldLego = {
    label: 'Title',
    id: 'title',
    type: 'input',
  };
  const inputWithoutLabel: FieldLego = {
    id: 'title',
    type: 'input',
  };

  const isRequired = {
    title: true,
  };

  const isNotRequired = {
    foo: true,
    bar: true,
  };
  const isAlsoRequired = {
    title: true,
    foo: true,
  };

  it('checks formData to see if the field is required', () => {
    expect(isRequiredField(inputWithLabel, isRequired)).toBe(true);
    expect(isRequiredField(inputWithLabel, isAlsoRequired)).toBe(true);
    expect(isRequiredField(inputWithLabel, isNotRequired)).toBe(undefined);
  });

  it('generates a required rule and message based on input label (or none)', () => {
    expect(
      handleRequiredField(inputWithLabel, isRequired)
    ).toStrictEqual<RegisterOptions>({
      required: 'Title is required',
    });
    expect(
      handleRequiredField(inputWithoutLabel, isRequired)
    ).toStrictEqual<RegisterOptions>({
      required: 'Field is required',
    });
  });

  const updateRequired = createUpdaterFn('required');
  it('merges with other rules', () => {
    expect(
      updateRequired({
        required: 'Title is required',
      })({
        setValueAs: (val) => val + 1,
        minLength: 10,
      })
    ).toStrictEqual({
      required: 'Title is required',
      setValueAs: expect.any(Function),
      minLength: 10,
    });
  });

  it('overwrites old rules with the same name', () => {
    expect(
      updateRequired({
        required: 'New Title is required',
      })({
        required: 'Old Title is required',
      })
    ).toStrictEqual({
      required: 'New Title is required',
    });
  });

  it('overwrites old rules and merges with other rules', () => {
    expect(
      updateRequired({ required: 'Test is required' })({
        setValueAs: (val) => val + 1,
        minLength: 10,
        required: true,
      })
    ).toStrictEqual({
      setValueAs: expect.any(Function),
      minLength: 10,
      required: 'Test is required',
    });
  });
});

describe('Form Builder: Rules Pipeline => Type Validation', () => {
  const numberTypeValInput: FieldLego = {
    type: 'input',
    id: 'test',
    expectType: 'number',
  };
  const arrayTypeValInput: FieldLego = {
    type: 'input',
    id: 'test',
    expectType: 'array',
  };
  const noTypeValInput: FieldLego = {
    type: 'input',
    id: 'test',
    label: 'Test',
  };

  it('detects type validation in the field data', () => {
    expect(hasTypeValidation(numberTypeValInput)).toBe(true);
    expect(hasTypeValidation(arrayTypeValInput)).toBe(true);
    expect(hasTypeValidation(noTypeValInput)).toBe(false);
  });
  it('generates a type validation from field data', () => {
    expect(
      handleTypeValidation(numberTypeValInput)
    ).toStrictEqual<RegisterOptions>({
      validate: expect.any(Function),
    });

    expect(
      handleTypeValidation(arrayTypeValInput)
    ).toStrictEqual<RegisterOptions>({
      validate: expect.any(Function),
    });

    expect(handleTypeValidation(noTypeValInput)).toStrictEqual({});
  });
});

describe('Form Builder: Rules Pipeline => Updating Pipeline', () => {
  const testField: FieldLego = {
    type: 'input',
    id: 'test',
    label: 'Test',
    expectType: 'number',
  };

  it('Should init rules object', () => {
    expect(
      generateRules({ field: testField, requiredFields: {} })
    ).toStrictEqual<RegisterOptions>({ validate: expect.any(Function) });
  });

  it('Should generate required & type validation on init', () => {
    expect(
      generateRules({ field: testField, requiredFields: { test: true } })
    ).toStrictEqual<RegisterOptions>({
      validate: expect.any(Function),
      required: 'Test is required',
    });
  });

  it('Should preserve static rules definied in field object', () => {
    expect(
      generateRules({
        field: { ...testField, rules: { minLength: 10, maxLength: 9 } },
        requiredFields: { test: true },
      })
    ).toStrictEqual<RegisterOptions>({
      validate: expect.any(Function),
      required: 'Test is required',
      minLength: 10,
      maxLength: 9,
    });
  });

  it('Preserves static rules while updating new rules of the same name', () => {
    expect(
      generateRules({
        field: {
          ...testField,
          rules: { minLength: 10, maxLength: 9, required: true },
        },
        requiredFields: { test: true },
      })
    ).toStrictEqual<RegisterOptions>({
      validate: expect.any(Function),
      required: 'Test is required',
      minLength: 10,
      maxLength: 9,
    });
  });
});
