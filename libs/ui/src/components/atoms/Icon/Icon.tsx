import * as AccessibleIcon from '@radix-ui/react-accessible-icon';

type IconProps = {
  label?: string;
};

export const Icon: React.FC<IconProps> = ({ label = '', children }) => {
  return <AccessibleIcon.Root label={label}>{children}</AccessibleIcon.Root>;
};
