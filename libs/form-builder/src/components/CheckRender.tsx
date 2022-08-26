import { ComponentProps } from 'react';
import { LookupType } from '@daohaus/common-utilities';
import { Buildable, CheckGate } from '@daohaus/ui';

import { FormBuilderFactory } from './FormBuilderFactory';
import { FieldLego } from '../types';

type CheckRenderProps = Omit<
  Buildable<
    ComponentProps<typeof CheckGate> & {
      gateLabel: string;
      components: FieldLego[];
      customFields?: LookupType;
    }
  >,
  'fields'
>;

export const CheckRender = ({ gateLabel, ...props }: Buildable<CheckRenderProps>) => {

  return (
    <CheckGate
      fields={props.components.map((field: FieldLego) => (
        <FormBuilderFactory key={field.id} field={field} customFields={props.customFields} />
      ))}
      {...props}
      gateLabel={gateLabel}
    />
  );
};

export default CheckRender;
