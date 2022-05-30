import React from 'react';
import {
  RadioGroupProps,
  RadioGroupItemProps,
} from '@radix-ui/react-radio-group';
import {
  RadioGroup,
  RadioItem,
  RadioIndicator,
  Container,
  LabelContainer,
} from './Radio.styles';
import classNames from 'classnames';
import { Label } from '../Label/Label';

export type RadioProps = { label: string; id?: string } & RadioGroupItemProps;
export type Props = {
  id?: string;
  className?: string;
  radios: RadioProps[];
};

type Ref =
  | React.RefObject<HTMLInputElement>
  | ((instance: HTMLInputElement | null) => void)
  | null
  | undefined;

export const Radio = React.forwardRef(
  (props: RadioGroupProps & Props, ref: Ref) => {
    const { id, className, radios } = props;

    return (
      <RadioGroup {...props} className={className}>
        {radios.map((radio) => {
          const { disabled } = radio;
          const classes = classNames({
            disabled,
          });
          return (
            <Container>
              <RadioItem {...radio}>
                <RadioIndicator className={classes} ref={ref} />
              </RadioItem>
              <LabelContainer>
                <Label id={radio.id}>{radio.label}</Label>
              </LabelContainer>
            </Container>
          );
        })}
      </RadioGroup>
    );
  }
);
