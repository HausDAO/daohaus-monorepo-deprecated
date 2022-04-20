import { FunctionComponent } from 'react';

import { InputType } from './types';
import classNames from 'classnames';
import { BaseInput, WithIcon } from './style';

export const Input: FunctionComponent<InputType> = (props) => {
  const { long, full, icon, warning, error } = props;
  const classes = classNames({ long, full, warning, error });

  if (icon) {
    const Icon = icon;
    <WithIcon>
      <BaseInput {...props} />
      <Icon size="20px" className="appendIcon" />
    </WithIcon>;
  }
  // Button variant here.
  return <BaseInput className={classes} {...props} />;
};

export default Input;
