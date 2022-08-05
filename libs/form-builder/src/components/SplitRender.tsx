import React from 'react';

import { SplitColumn } from '@daohaus/ui';

import { FieldLego } from '../types';
import { FormBuilderFactory } from './FormBuilderFactory';

type SplitColumnProps = {
  id: string;
  disabled?: boolean;
  rows: { rowId: string; left: FieldLego; right: FieldLego }[];
};

export const SplitColumnLayout = ({ rows, ...props }: SplitColumnProps) => {
  return (
    <SplitColumn
      rows={rows.map(({ left, right, rowId }) => {
        return {
          rowId,
          left: <FormBuilderFactory {...left} {...props} spacing={false} />,
          right: <FormBuilderFactory {...right} {...props} spacing={false} />,
        };
      })}
    />
  );
};
