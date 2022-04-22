import classNames from 'classnames';
import { BaseInput, WithIcon } from './inputStyle';
import { Field } from '../../../types/formAndField';
import { IconType } from 'react-icons';

export type InputType = Field & {
  icon?: IconType;
  long?: boolean;
  full?: boolean;
  number?: boolean;
};

export const Input = (props: InputType) => {
  const {
    long,
    full,
    icon,
    warning,
    error,
    placeholder = 'Placeholder',
    number,
  } = props;

  const inputClasses = classNames({ long, full, warning, error, number });
  if (icon) {
    const wrapperClasses = classNames({ long, full });
    const Icon = icon;
    return (
      <WithIcon className={wrapperClasses}>
        <BaseInput
          {...props}
          className={inputClasses}
          placeholder={placeholder}
        />
        <Icon size="2rem" />
      </WithIcon>
    );
  }

  return <BaseInput className={inputClasses} {...props} />;
};

export default Input;
