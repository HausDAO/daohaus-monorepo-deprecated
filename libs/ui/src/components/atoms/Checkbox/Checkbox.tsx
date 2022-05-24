import React, { RefObject } from 'react';
import classNames from 'classnames';
import { BiCheck } from 'react-icons/bi';
import { CheckboxProps } from '@radix-ui/react-checkbox';

import {
  StyledCheckbox,
  StyledIndicator,
  Container,
  LabelContainer,
  RequiredAsterisk,
} from './Checkbox.styles';
import { Label } from '../Label/Label';

type Ref =
  | RefObject<HTMLButtonElement>
  | ((instance: HTMLButtonElement | null) => void)
  | null
  | undefined;

export const Checkbox = React.forwardRef((props: CheckboxProps, ref: Ref) => {
  const { id, title, disabled, required } = props;

  const classes = classNames({
    disabled,
  });

  return (
    <Container>
      <StyledCheckbox {...props} ref={ref}>
        <StyledIndicator className={classes}>
          <BiCheck />
        </StyledIndicator>
      </StyledCheckbox>
      <LabelContainer>
        {required && <RequiredAsterisk>*</RequiredAsterisk>}
        <Label id={id}>{title ? title : 'No Title Found'}</Label>
      </LabelContainer>
    </Container>
  );
});
