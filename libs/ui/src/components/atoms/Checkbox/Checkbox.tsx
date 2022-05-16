import React, { RefObject, useState } from 'react';
import classNames from 'classnames';
import { BiCheck } from 'react-icons/bi';

import { StyledCheckbox, StyledIndicator, Container } from './Checkbox.styles';
import ValueLabel from '../ValueLabel/ValueLabel';

type CheckboxProps = {
  id: string;
  label: string;
  defaultChecked?: boolean;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

type Ref =
  | RefObject<HTMLButtonElement>
  | ((instance: HTMLButtonElement | null) => void)
  | null
  | undefined;

export const Checkbox = React.forwardRef((props: CheckboxProps, ref: Ref) => {
  const { id, label, defaultChecked, disabled, required } = props;
  const [isChecked, setIsChecked] = useState<boolean>(defaultChecked || false);
  const classes = classNames({
    disabled,
  });

  return (
    <Container>
      <StyledCheckbox
        {...props}
        id={id}
        ref={ref}
        className={classes}
        checked={isChecked}
        onCheckedChange={() => setIsChecked(!isChecked)}
      >
        <StyledIndicator className={classes}>
          <BiCheck />
        </StyledIndicator>
      </StyledCheckbox>
      <ValueLabel required={required} id={id}>
        {label}
      </ValueLabel>
    </Container>
  );
});
