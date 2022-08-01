import { CoreFieldLookup } from '../components/CoreFieldLookup';
import { ValidateField } from '../utils/rules';

export type FieldValidationType = keyof typeof ValidateField;

export type CoreFields = typeof CoreFieldLookup;

//IMPROVMENT PLAN:
// TS CHALLENGE

// Conevert this to take in a generic
// Make a type for StandarfFields and CustomFields
// Combine both objects into one to used as FieldLego

export type FieldLego = {
  [FieldType in keyof CoreFields]: React.ComponentProps<
    CoreFields[FieldType]
  > & {
    type: FieldType;
    expectType?: FieldValidationType;
  };
}[keyof CoreFields];

export type FormLego = {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  fields: FieldLego[];
  requiredFields?: Record<string, boolean>;
  log?: boolean;
  devtool?: boolean;
  submitButtonText?: string;
};

export type RequiredFields = Record<string, boolean>;
