import { ComponentMeta, ComponentStory } from '@storybook/react';
import { BiError } from 'react-icons/bi';
import { RiUserAddLine } from 'react-icons/ri';
import Button, { ButtonProps } from '../../atoms/button/button';
import { H3, ParMd, ParXs } from '../../atoms/typography';
import styled from 'styled-components';
import { violet } from '@radix-ui/colors';

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
// Build from dropdownTriggerButton
// handle states for isLoading, delay etc.
// Check with design
// Check with sdk devs to see how we plan to handle fetching
// Make plans on how to wrap this atom to handle loading
// create a ticket for avatar molecules
// Update this story
// remove this comment

const Container = styled.div`
  z-index: 10;
  display: flex;
  align-items: center;
  .interior {
    display: flex;
    flex-direction: column;
  }
`;

const TemporaryAvatar = styled.div`
  width: 3rem;
  height: 3rem;

  background-color: ${violet.violet9};
  border-radius: 45px;
  margin-right: 0.75rem;
`;

export const TemproraryAvatarButton: ComponentStory<typeof Button> = (
  props
) => {
  return (
    <div style={{ width: '25rem', marginBottom: '2rem' }}>
      <Button avatar fullWidth {...props}>
        <Container>
          <TemporaryAvatar />
          <div className="interior">
            <ParMd>Kagahara</ParMd>
            <ParXs>@Ethereum</ParXs>
          </div>
        </Container>
      </Button>
      <ParMd>
        Made with temporary Avatar component. Will finalize a full Avatar Atom
        on separate PR. Same with the ButtonTrigger with Chevron
      </ParMd>
    </div>
  );
};
