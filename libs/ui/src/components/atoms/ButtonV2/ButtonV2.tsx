import React from 'react';
import classNames from 'classnames';
import { IconType } from 'react-icons';

import { ButtonBase } from './ButtonV2.styles';

export interface ButtonProps {
  /* Makes button disabled */
  disabled?: boolean;
  // ! Not Included untill talk with design
  // Shows loading spinner */
  loading: boolean;
  // ! Not Included untill talk with design
  /* The label to show in the button when loading is true */
  loadingText?: string;
  /** Set theme color */
  theme: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  /* Set the original html type of button */
  type?: 'button' | 'reset' | 'submit';
  /* Size of the button */
  size: 'sm' | 'md' | 'lg';
  /** Controls button variant */
  variant: 'solid' | 'outline' | 'link';
  /* Width of the button element */
  width: 'fit-content' | '100%' | string;
  /* React node */
  children?: React.ReactNode;
  /* Css class name */
  className?: string;
  /* On Click handler */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /* Adds icon before button label */
  IconLeft?:
    | IconType
    | React.FunctionComponent<
        React.SVGProps<SVGSVGElement> & {
          title?: string | undefined;
        }
      >;
  /* Adds icon after button label */
  IconRight?:
    | IconType
    | React.FunctionComponent<
        React.SVGProps<SVGSVGElement> & {
          title?: string | undefined;
        }
      >;
}

export const ButtonV2 = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      type = 'button',
      IconLeft,
      IconRight,
      children,
      className,
      theme = 'primary',
      variant = 'solid',
      size = 'md',
      width = 'fit-content',
      ...rest
    } = props;

    const classes = classNames({
      [variant]: variant,
      [size]: size,
    });

    return (
      <ButtonBase
        {...rest}
        color={theme}
        buttonWidth={width}
        className={`${classes} ${className}`}
        ref={ref}
        type={type}
      >
        {IconLeft && <IconLeft className="icon-left" />}
        {children}
        {IconRight && <IconRight className="icon-right" />}
      </ButtonBase>
    );
  }
);
