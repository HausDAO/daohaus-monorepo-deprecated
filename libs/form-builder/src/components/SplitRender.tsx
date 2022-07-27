import React from 'react';

import { Buildable, SplitColumn } from '@daohaus/ui';

import { FieldLego, FormRenderData } from '../types';
import { FormBuilderFactory } from './FormBuilderFactory';

type SplitColumnProps = {
  id: string;
  formData: FormRenderData;
  rows: { rowId: string; left: FieldLego; right: FieldLego }[];
};

export const SplitColumnLayout = ({
  rows,
  ...props
}: Buildable<SplitColumnProps>) => {
  return (
    <SplitColumn
      rows={rows.map(({ left, right, rowId }) => {
        return {
          rowId,
          left: <FormBuilderFactory {...props} {...left} spacing={false} />,
          right: <FormBuilderFactory {...props} {...right} spacing={false} />,
        };
      })}
    />
  );
};
