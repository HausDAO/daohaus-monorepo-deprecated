import { CoreFieldLookup } from '../components/CoreFieldLookup';

export type CoreFields = typeof CoreFieldLookup;
export type FieldLego = {
  [FieldType in keyof CoreFields]: React.ComponentProps<
    CoreFields[FieldType]
  > & {
    type: FieldType;
  };
}[keyof CoreFields];

export type FormLego = {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  fields: FieldLego[];
  log: boolean;
};
