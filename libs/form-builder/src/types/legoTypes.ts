import { CoreFieldLookup } from '../components/CoreFieldLookup';
import { ValidateField } from '../utils/rules';

export type FieldValidationType = keyof typeof ValidateField;

export type CoreFields = typeof CoreFieldLookup;
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
