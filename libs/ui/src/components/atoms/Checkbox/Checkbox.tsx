import React, { RefObject, useState } from 'react';
import classNames from 'classnames';
import { BiCheck } from 'react-icons/bi';

import { StyledCheckbox, StyledIndicator, Container } from './Checkbox.styles';
import ValueLabel from '../ValueLabel/ValueLabel';

type CheckboxProps = {
  children: React.ReactNode;
  required?: boolean;
  secondary?: boolean;
  tertiary?: boolean;
  disabled?: boolean;
  defaultChecked?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

type Ref =
  | ((instance: HTMLButtonElement | null) => void)
  | RefObject<HTMLButtonElement>
  | null
  | undefined;

const Checkbox = React.forwardRef((props: CheckboxProps, ref: Ref) => {
  const [isChecked, setIsChecked] = useState(false);
  const { secondary, tertiary, disabled, required, defaultChecked, children } =
    props;
  const classes = classNames({
    secondary,
    tertiary,
    disabled,
  });

  return (
    <Container>
      <StyledCheckbox
        {...props}
        checked={isChecked}
        onClick={() => setIsChecked(!isChecked)}
        className={classes}
        id={'2'}
      >
        <StyledIndicator className={classes}>
          <BiCheck />
        </StyledIndicator>
      </StyledCheckbox>
      <ValueLabel id={'2'}>Place holder text</ValueLabel>
    </Container>
  );
});
export default Checkbox;
