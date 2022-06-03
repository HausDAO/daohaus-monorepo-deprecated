import React from 'react';

import classNames from 'classnames';
import { BaseTextArea } from './TextArea.styles';
import { Field } from '../../../types/formAndField';

export type TextAreaProps = Field & {
  className?: string;
};

type Ref =
  | React.RefObject<HTMLTextAreaElement>
  | ((instance: HTMLTextAreaElement | null) => void)
  | null
  | undefined;

export const TextArea = React.forwardRef((props: TextAreaProps, ref: Ref) => {
  const { full, warning, error, className } = props;

  const classes = classNames({
    full,
    warning,
    error,
  });

  return (
    <BaseTextArea
      {...props}
      className={`${classes} ${className}`}
      ref={ref}
      rows={10}
    />
  );
});
