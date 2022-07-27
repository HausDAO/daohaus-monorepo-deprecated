import { CoreFieldLookup } from '../components/CoreFieldLookup';
import { ValidateField } from '../utils/rules';

export type FieldValidationType = keyof typeof ValidateField;

export type CoreFields = typeof CoreFieldLookup;
export type FieldLego = {
  [FieldType in keyof CoreFields]: React.ComponentProps<
    CoreFields[FieldType]
  > & {
    type: FieldType;
    validationType?: FieldValidationType;
  };
}[keyof CoreFields];

export type FormLego = {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  fields: FieldLego[];
  requiredFields?: string[];
  log?: boolean;
  devtool?: boolean;
  submitButtonText?: string;
};
