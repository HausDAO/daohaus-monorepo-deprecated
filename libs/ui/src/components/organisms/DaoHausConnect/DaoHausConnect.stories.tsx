import { ComponentMeta, ComponentStory } from '@storybook/react';
import { BiError } from 'react-icons/bi';
import { RiUserAddLine } from 'react-icons/ri';
import Button, { ButtonProps } from '../../atoms/button/button';
import { ParMd } from '../../atoms/typography';
import * as Avatar from '@radix-ui/react-avatar';

export default {
  title: 'Recipes/DaoHausConnect',
  component: Button,
} as ComponentMeta<typeof Button>;

export const WarningButton: ComponentStory<typeof Button> = ({
  children,
  ...props
}: ButtonProps) => (
  <Button tertiary icon={BiError} {...props}>
    {children}
  </Button>
);

WarningButton.args = {
  children: 'Example',
};
const ExitButton = (props: ButtonProps) => (
  <Button tertiary fullWidth sm {...props} />
);

export const ExitButtonExample: ComponentStory<typeof Button> = (
  props: ButtonProps
) => (
  <div style={{ width: '20rem' }}>
    <ParMd style={{ marginBottom: '2rem' }}>
      Exit Button takes the width of its container
    </ParMd>
    <ExitButton {...props} />
  </div>
);

ExitButtonExample.args = {
  children: 'Exit Button',
};

export const ConnectWalletButton: ComponentStory<typeof Button> = (
  props: Omit<ButtonProps, 'children'>
) => (
  <Button
    icon={RiUserAddLine}
    className="menu-button"
    onClick={() => {
      console.log('functionality goes here');
    }}
    {...props}
  >
    Connect Wallet
  </Button>
);

export const NetworkUnavailable: ComponentStory<typeof Button> = () => (
  <WarningButton>Network Unavailable</WarningButton>
);

export const WrongNetworkButton: ComponentStory<typeof Button> = ({
  ...props
}: Omit<ButtonProps, 'children'>) => {
  const networkName = 'Gnosis'; /*derive dao network name from url or context*/
  return (
    <WarningButton
      onClick={() => {
        console.log('functionality goes here');
      }}
      {...props}
    >
      Switch to {networkName}
    </WarningButton>
  );
};

// TODO

// Create full atom for Avatar component
// handle states for isLoading, delay etc.
// Check with design
// Check with sdk devs to see how we plan to handle fetching
// Make plans on how to wrap this atom to handle loading
// create a ticket for avatar molecules
// Update this story
// remove this comment

type AvatarProps = {
  src: string;
  alt: string;
  fallback: string;
};

const TemporaryAvatar = ({ src, alt, fallback }: AvatarProps) => {
  <Avatar.Root>
    <Avatar.AvatarImage src={src} alt={alt} />
    <Avatar.AvatarFallback>{fallback}</Avatar.AvatarFallback>
  </Avatar.Root>;
};

export const AvatarButton: ComponentStory<typeof Button> = (props) => {
  return <Button {...props}>{/* <TemporaryAvatar /> */}</Button>;
};
