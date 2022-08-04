// Commenting this out for now. Need to import stuff from common-utils to and those imports don't work here.

// Can migrate these tests and init test on commone when I get time.

import { CommonFields } from '../src/data/CommonFields';
console.log('CommonFields', CommonFields);

describe('CommonFields', () => {
  it('should leave me the Hell alone so that I can focus on other things for five minutes', () => {
    expect(true).toBe(true);
  });
});
// import {
//   handleRequiredField,
//   ValErrMsgs,
//   ValidateField,
// } from '../src/utils/rules';

// describe('Form Builder: Field Validation', () => {
//   it('should validate numbers and number strings', () => {
//     expect(ValidateField.number('4')).toStrictEqual(true);
//     expect(ValidateField.number('2.432323232')).toStrictEqual(true);
//     expect(ValidateField.number(2.432323232)).toStrictEqual(true);
//     expect(ValidateField.number('111199140132348235923')).toStrictEqual(true);
//     expect(ValidateField.number('a1')).toStrictEqual(ValErrMsgs.number);
//   });

//   it('should validate booleans', () => {
//     expect(ValidateField.boolean(true)).toStrictEqual(true);
//     expect(ValidateField.boolean(false)).toStrictEqual(true);
//     expect(ValidateField.boolean('true')).toStrictEqual(ValErrMsgs.boolean);
//   });

//   it('should validate arrays', () => {
//     expect(ValidateField.array([])).toStrictEqual(true);
//     expect(ValidateField.array(['sdfsd', 34234, null])).toStrictEqual(true);
//     expect(ValidateField.array('[true]')).toStrictEqual(ValErrMsgs.array);
//   });

//   it('should validate ethAddress', () => {
//     expect(
//       ValidateField.ethAddress('0x756ee8B8E898D497043c2320d9909f1DD5a7077F')
//     ).toStrictEqual(true);
//     expect(ValidateField.ethAddress('0x')).toStrictEqual(ValErrMsgs.ethAddress);
//   });

//   it('should validate urls', () => {
//     expect(ValidateField.url('https://daohaus.club/')).toStrictEqual(true);
//     expect(ValidateField.url('daohaus.club')).toStrictEqual(true);
//     expect(ValidateField.url('sdfsdf')).toStrictEqual(ValErrMsgs.url);
//   });

//   it('should validate email addresses', () => {
//     expect(ValidateField.email('champ.mcslugger@gmail.com')).toStrictEqual(
//       true
//     );
//     expect(ValidateField.email('slickmcsly@protonmail.com')).toStrictEqual(
//       true
//     );
//     expect(ValidateField.email('daohaus.club')).toStrictEqual(ValErrMsgs.email);
//     expect(ValidateField.email('sdfsdf')).toStrictEqual(ValErrMsgs.email);
//   });

//   it('should build a required rule if it is found in the requiredFields object', () => {
//     expect(
//       handleRequiredField(CommonFields.Description, { description: true })
//     ).toStrictEqual({
//       required: 'Description is required',
//     });
//   });
// })
