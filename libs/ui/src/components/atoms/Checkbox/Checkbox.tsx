import React, { RefObject, useState } from 'react';
import classNames from 'classnames';
import { BiCheck } from 'react-icons/bi';

import { StyledCheckbox, StyledIndicator, Container } from './Checkbox.styles';
import ValueLabel from '../ValueLabel/ValueLabel';

type CheckboxProps = {
  children: React.ReactNode;
  id: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  defaultChecked?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

type Ref =
  | RefObject<HTMLButtonElement>
  | ((instance: HTMLButtonElement | null) => void)
  | null
  | undefined;

const Checkbox = React.forwardRef((props: CheckboxProps, ref: Ref) => {
  const [isChecked, setIsChecked] = useState(false);
  const { id, label, disabled, required, children } = props;
  const classes = classNames({
    disabled,
  });

  return (
    <Container>
      <StyledCheckbox
        {...props}
        checked={isChecked}
        onClick={() => setIsChecked(!isChecked)}
        className={classes}
        id={id}
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
export default Checkbox;
