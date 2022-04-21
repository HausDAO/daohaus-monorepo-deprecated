import { InputType } from './types';
import classNames from 'classnames';
import { BaseInput, WithIcon } from './style';

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

  const classes = classNames({ long, full, warning, error, number });

  if (icon) {
    const Icon = icon;
    return (
      <WithIcon className={classes}>
        <BaseInput {...props} className={classes} placeholder={placeholder} />
        <Icon size="2rem" />
      </WithIcon>
    );
  }

  return <BaseInput className={classes} {...props} />;
};

export default Input;
