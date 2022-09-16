import { useMemo } from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import { toWholeUnits, handleBaseUnits } from '@daohaus/common-utilities';
import { Buildable, Field, WrappedCheckbox } from '@daohaus/ui';

import { useConnectedMembership, useDao } from '@daohaus/dao-context';

export const RagequitTokenList = (props: Buildable<Field>) => {
  const { id } = props;

  return (
    <WrappedCheckbox
      {...props}
      id={id}
      //   rules={newRules}
      helperText="Test the action/controls"
      info="This is controlled by the info prop"
      checkboxes={[
        {
          id: 'exampleCheckbox',
          title: 'completeInput',
          name: 'test0',
          defaultChecked: false,
          disabled: false,
          required: false,
        },
      ]}
    />
  );
};
