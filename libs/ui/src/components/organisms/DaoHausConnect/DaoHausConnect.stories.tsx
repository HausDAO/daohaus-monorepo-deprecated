import { ComponentMeta, ComponentStory } from '@storybook/react';
import { BiError } from 'react-icons/bi';
import { RiUserAddLine } from 'react-icons/ri';
import { ButtonProps, Button } from '../../atoms/Button/Button';
import { Bold, ParMd, ParXs } from '../../atoms/Typography';
import styled from 'styled-components';
import { violet } from '@radix-ui/colors';
import { DropdownItem, Dropdown } from '../../atoms/Dropdown/Dropdown';

export default {
  title: 'Recipes/DaoHausConnect',
  component: Button,
} as ComponentMeta<typeof Button>;

export const WarningButton: ComponentStory<typeof Button> = ({
  children,
  ...props
}: ButtonProps) => (
  <Button tertiary IconLeft={BiError} {...props}>
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
    IconLeft={RiUserAddLine}
    className="menu-button"
    onClick={() => {
      console.log('functionality goes here');
    }}
    {...props}
  >
    Connect Wallet
  </Button>
);

export const ConnectWalletButtonMoblile: ComponentStory<typeof Button> = (
  props: Omit<ButtonProps, 'children'>
) => (
  <Button
    sm
    IconLeft={RiUserAddLine}
    className="menu-button"
    onClick={() => {
      console.log('functionality goes here');
    }}
    {...props}
  >
    Connect
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

export const WrongNetworkMobile: ComponentStory<typeof Button> = ({
  ...props
}: Omit<ButtonProps, 'children'>) => {
  return (
    <WarningButton
      onClick={() => {
        console.log('functionality goes here');
      }}
      {...props}
    />
  );
};

const Container = styled.div`
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

const Template: ComponentStory<typeof Dropdown> = (props) => {
  return <Dropdown {...props} />;
};

export const UserConnectedDropdown = Template.bind({});

UserConnectedDropdown.args = {
  trigger: (
    <Button avatar fullWidth>
      <Container>
        <TemporaryAvatar />
        <div className="interior">
          <ParMd>Kagahara</ParMd>
          <ParXs>@Ethereum</ParXs>
        </div>
      </Container>
    </Button>
  ),
  items: [
    {
      type: 'label',
      content: (
        <div style={{ padding: '.8rem' }}>
          <ParXs style={{ marginBottom: '.5rem' }}>0xd24bf...6c3b</ParXs>
          <ParXs>
            Connected to <Bold>Ethereum</Bold>
          </ParXs>
        </div>
      ),
    },
    {
      type: 'clickable',
      content: <ExitButton>Disconnect</ExitButton>,
    },
  ],
};

const networkPanels = [
  'Mainnet',
  'Arbitrum',
  'Celo',
  'Gnosis',
  'Optimism',
  'Gnosis',
  'Polygon',
  'Kovan',
  'Rinkeby',
].map((item) => ({
  type: 'clickable',
  content: (
    <Button secondary fullWidth leftAlign>
      {item}
    </Button>
  ),
})) as DropdownItem[];

export const NetworkUnavailableDropdown = Template.bind({});

NetworkUnavailableDropdown.args = {
  spacing: '0.7rem',
  align: 'end',
  width: '26rem',
  trigger: (
    <Button IconLeft={BiError} tertiary>
      Network Unavailable
    </Button>
  ),
  items: [
    { type: 'label', content: <ParXs>Switch to available network</ParXs> },
    ...networkPanels,
  ],
};
