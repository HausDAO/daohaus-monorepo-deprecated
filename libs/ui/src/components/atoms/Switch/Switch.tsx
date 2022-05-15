import React from 'react';
import { SwitchProps } from '@radix-ui/react-switch';
import {
  SwitchBase,
  SwitchSlider,
  Container,
  LabelContainer,
} from './Switch.styles.';
import { Label } from '../Label/Label';
import classNames from 'classnames';

export type Props = {
  fieldLabel: string;
  id?: string;
  className?: string;
};

type Ref =
  | React.RefObject<HTMLInputElement>
  | ((instance: HTMLInputElement | null) => void)
  | null
  | undefined;

export const Switch = React.forwardRef(
  (props: SwitchProps & Props, ref: Ref) => {
    const {
      fieldLabel,
      id,
      className,
      checked,
      defaultChecked,
      required,
      onCheckedChange,
      disabled,
    } = props;

    const classes = classNames({
      checked,
      defaultChecked,
      required,
      onCheckedChange,
      disabled,
      className,
    });

    return (
      <Container>
        <SwitchBase {...props} className={classes}>
          <SwitchSlider className={classes} ref={ref} />
        </SwitchBase>
        <LabelContainer>
          <Label id={id}>{fieldLabel}</Label>
        </LabelContainer>
      </Container>
    );
  }
);
