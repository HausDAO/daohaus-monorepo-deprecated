import { RegisterOptions } from 'react-hook-form';
import { FieldLego } from '../src';
import { handleRequiredField, isRequiredField } from '../src/utils/rules';

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

  it('merges with other rules', () => {});
});
