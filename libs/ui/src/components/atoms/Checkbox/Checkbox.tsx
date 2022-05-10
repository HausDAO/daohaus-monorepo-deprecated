import React, { RefObject } from 'react';
import classNames from 'classnames';
import { IconType } from 'react-icons';
import { BiCheck } from 'react-icons/bi';

import {
  StyledCheckbox,
  StyledIndicator,
  Container,
  Label,
} from './Checkbox.styles';

type CheckboxProps = {
  children: React.ReactNode;
  required?: boolean;
  secondary?: boolean;
  tertiary?: boolean;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

type Ref =
  | ((instance: HTMLButtonElement | null) => void)
  | RefObject<HTMLButtonElement>
  | null
  | undefined;

const Checkbox = React.forwardRef((props: CheckboxProps, ref: Ref) => {
  const { secondary, tertiary, disabled, children } = props;
  const classes = classNames({
    secondary,
    tertiary,
    disabled,
  });

  return (
    <Container>
      <StyledCheckbox {...props} className={classes}>
        <StyledIndicator className={classes}>
          <BiCheck />
        </StyledIndicator>
      </StyledCheckbox>
      <Label>Place holder text</Label>
    </Container>
  );
});
export default Checkbox;
