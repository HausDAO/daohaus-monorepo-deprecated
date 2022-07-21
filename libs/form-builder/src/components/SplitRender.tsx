import React from 'react';

import { SplitColumn } from '@daohaus/ui';

import { FieldLego } from '../types';
import { FormBuilderFactory } from './FormBuilderFactory';

type SplitColumnProps = {
  id: string;
  rows: { rowId: string; left: FieldLego; right: FieldLego }[];
};

export const SplitColumnLayout = ({ rows }: SplitColumnProps) => {
  return (
    <SplitColumn
      rows={rows.map(({ left, right, rowId }) => {
        return {
          rowId,
          left: <FormBuilderFactory {...left} spacing={false} />,
          right: <FormBuilderFactory {...right} spacing={false} />,
        };
      })}
    />
  );
};
