import { CommonFields } from '../src';
import {
  handleRequiredField,
  ValErrMsgs,
  ValidateField,
} from '../src/utils/rules';

describe('Form Builder: Field Validation', () => {
  it('should validate numbers and number strings', () => {
    expect(ValidateField.number('4')).toBe(true);
    expect(ValidateField.number('2.432323232')).toBe(true);
    expect(ValidateField.number(2.432323232)).toBe(true);
    expect(ValidateField.number('111199140132348235923')).toBe(true);
    expect(ValidateField.number('a1')).toBe(ValErrMsgs.number);
  });

  it('should validate booleans', () => {
    expect(ValidateField.boolean(true)).toBe(true);
    expect(ValidateField.boolean(false)).toBe(true);
    expect(ValidateField.boolean('true')).toBe(ValErrMsgs.boolean);
  });

  it('should validate arrays', () => {
    expect(ValidateField.array([])).toBe(true);
    expect(ValidateField.array(['sdfsd', 34234, null])).toBe(true);
    expect(ValidateField.array('[true]')).toBe(ValErrMsgs.array);
  });

  it('should validate ethAddress', () => {
    expect(
      ValidateField.ethAddress('0x756ee8B8E898D497043c2320d9909f1DD5a7077F')
    ).toBe(true);
    expect(ValidateField.ethAddress('0x')).toBe(ValErrMsgs.ethAddress);
  });

  it('should validate urls', () => {
    expect(ValidateField.url('https://daohaus.club/')).toBe(true);
    expect(ValidateField.url('daohaus.club')).toBe(true);
    expect(ValidateField.url('sdfsdf')).toBe(ValErrMsgs.url);
  });

  it('should validate email addresses', () => {
    expect(ValidateField.email('champ.mcslugger@gmail.com')).toBe(true);
    expect(ValidateField.email('slickmcsly@protonmail.com')).toBe(true);
    expect(ValidateField.email('daohaus.club')).toBe(ValErrMsgs.email);
    expect(ValidateField.email('sdfsdf')).toBe(ValErrMsgs.email);
  });

  it('should build a required rule if it is found in the requiredFields object', () => {
    expect(
      handleRequiredField(CommonFields.Description, { description: true })
    ).toBe({
      required: 'Description is required',
    });
  });
});
