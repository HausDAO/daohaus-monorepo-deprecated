import React from 'react';

import { SplitColumn } from '@daohaus/ui';

import { FieldLego } from '../types';
import { FormBuilderFactory } from './FormBuilderFactory';

type SplitColumnProps = {
  rows: { rowId: string; left: FieldLego; right: FieldLego }[];
};

export const SplitColumnLayout = ({ rows }: SplitColumnProps) => {
  return (
    <SplitColumn
      rows={rows.map(({ left, right, rowId }) => {
        return {
          rowId,
          left: <FormBuilderFactory {...left} />,
          right: <FormBuilderFactory {...right} />,
        };
      })}
    />
  );
};
