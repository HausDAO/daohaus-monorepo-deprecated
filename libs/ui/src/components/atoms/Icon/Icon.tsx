import * as AccessibleIcon from '@radix-ui/react-accessible-icon';

type IconProps = {
  label: string;
  className?: string;
};

export const Icon: React.FC<IconProps> = (props) => {
  return (
    <AccessibleIcon.Root label={props.label}>
      {props.children}
    </AccessibleIcon.Root>
  );
};
