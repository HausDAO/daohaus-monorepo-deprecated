import React, { JSXElementConstructor } from 'react';
import { CoreFieldLookup } from '../components/CoreFieldLookup';
import { ValidateField } from '../utils/rules';

export type FieldValidationType = keyof typeof ValidateField;

export type CoreFields = typeof CoreFieldLookup;

export type LookupType = Record<
  string,
  // React wants me to use JSXElementConstructor<any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  keyof JSX.IntrinsicElements | JSXElementConstructor<any>
>;

export type FieldLegoBase<Lookup extends LookupType> = {
  [FieldType in keyof Lookup]: React.ComponentProps<Lookup[FieldType]> & {
    type: FieldType;
    expectType?: FieldValidationType;
  };
}[keyof Lookup];

export type FieldLego<Lookup extends LookupType = CoreFields> =
  FieldLegoBase<Lookup>;

export type FormLego<Lookup extends LookupType = CoreFields> = {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  fields: FieldLego<Lookup>[];
  requiredFields?: Record<string, boolean>;
  log?: boolean;
  devtool?: boolean;
  submitButtonText?: string;
};

export type RequiredFields = Record<string, boolean>;
