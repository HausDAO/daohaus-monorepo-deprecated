import classNames from 'classnames';
import { BaseInput, WithIcon } from './inputStyle';
import { Field } from '../../../types/formAndField';
import { IconType } from 'react-icons';

export type InputType = Field & {
  icon?: IconType;
  long?: boolean;
  full?: boolean;
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
    address,
  } = props;

  const inputClasses = classNames({
    long: long || address,
    full,
    warning,
    error,
    number: number || address,
  });
  if (icon) {
    const wrapperClasses = classNames({ long: long || address, full });
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
