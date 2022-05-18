import React, { RefObject, useState } from 'react';
import classNames from 'classnames';
import { BiCheck } from 'react-icons/bi';
import { CheckboxProps } from '@radix-ui/react-checkbox';

import { StyledCheckbox, StyledIndicator, Container } from './Checkbox.styles';
import ValueLabel from '../ValueLabel/ValueLabel';

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
      <ValueLabel required={required} id={id}>
        {title ? title : 'No Title Found'}
      </ValueLabel>
    </Container>
  );
});
