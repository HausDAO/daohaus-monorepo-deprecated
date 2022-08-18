import { ReactNode, useEffect, useState, FunctionComponent } from 'react';
import { FieldValues, useFormContext } from 'react-hook-form';
import { CheckedState } from '@radix-ui/react-checkbox';
import { FieldWrapper } from '../FieldWrapper';
import { Checkbox } from '../../atoms/Checkbox';
import { Buildable, IGatedInput } from '../../../types/formAndField';
import { GatedInputBox } from './GatedInput.styles';

type GatedInputProps = IGatedInput & {
  gatedId: string;
  gateLabel: string;
  input: FunctionComponent<Buildable<IGatedInput>>;
  updateHelperMsg?: (value: FieldValues) => string;
  customWatchers?: readonly string[];
  children?: ReactNode;
  // field: ReactNode; // TOOD: static vs function components
};

export const GatedInput = ({ children, customWatchers, gatedId, gateLabel, input: Input, ...props }: Buildable<GatedInputProps>) => {
  
  const { watch } = useFormContext();
  const { id, updateHelperMsg } = props;
  const [gatedOn, toggleGate]= useState(false);
  const [helperText, setHelperText] = useState(props.helperText || '');
  const inputValues = customWatchers ? watch(customWatchers) : watch(id);

  const onCheckedChanged = (checked: CheckedState) => {
    toggleGate(checked.valueOf() as boolean);
  };

  useEffect(() => {
    if (updateHelperMsg)
      setHelperText(updateHelperMsg(inputValues));
  }, [inputValues, updateHelperMsg]);

  return (
    <FieldWrapper id={gatedId}>
       <Checkbox
          id={gatedId}
          title={gateLabel}
          onCheckedChange={onCheckedChanged}
        /> 
      {gatedOn && (
        <GatedInputBox>
          <Input {...props} helperText={helperText} />
          {children}
        </GatedInputBox>
      )}
    </FieldWrapper>
  );
};

export default GatedInput;
