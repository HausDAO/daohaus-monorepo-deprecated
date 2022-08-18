import { useEffect, useState } from 'react';
import { FieldLegoBase, LookupType } from '@daohaus/common-utilities';
import { CheckedState } from '@radix-ui/react-checkbox';
import { Buildable, Checkbox } from '@daohaus/ui';
import { GatedInputBox } from './CheckGate.styles';

import { FieldsBase } from '../CoreFieldLookup';
import { FormBuilderFactory } from '../FormBuilderFactory';

type FieldLego<Lookup extends LookupType> =
  FieldLegoBase<Lookup>;

type GatedInputProps = {
  gateLabel: string;
  fields: FieldLego<typeof FieldsBase>[];
};

export const CheckGate = ({ gateLabel, fields, ...props }: Buildable<GatedInputProps>) => {
  
  const { id } = props;
  // const { watch } = useFormContext();
  // const { id, updateHelperMsg } = props;
  const [gatedOn, toggleGate]= useState(false);
  // const [helperText, setHelperText] = useState(props.helperText || '');
  // const inputValues = customWatchers ? watch(customWatchers) : watch(id);

  const onCheckedChanged = (checked: CheckedState) => {
    toggleGate(checked.valueOf() as boolean);
  };

  // useEffect(() => {
  //   console.log('Effect', inputValues, updateHelperMsg);
  //   if (updateHelperMsg)
  //     setHelperText(updateHelperMsg(inputValues));
  // }, [inputValues, updateHelperMsg]);

  return (
    <GatedInputBox>
      <Checkbox
        id={id}
        title={gateLabel}
        onCheckedChange={onCheckedChanged}
      /> 
      {gatedOn && (fields.map((field) => (
          <FormBuilderFactory key={field.id} field={field} />
        ))
      )}
    </GatedInputBox>
  );
};

export default CheckGate;
