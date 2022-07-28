import { ValidateField } from '../src/utils/rules';

describe('Form Builder: Field Validation', () => {
  it('should approve numbers and number strings', () => {
    expect(ValidateField.number('4')).toBe(true);
    expect(ValidateField.number('2.432323232')).toBe(true);
    expect(ValidateField.number(2.432323232)).toBe(true);
    expect(ValidateField.number('111199140132348235923')).toBe(true);
  });
});
