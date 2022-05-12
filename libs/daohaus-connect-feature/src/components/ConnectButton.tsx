import { Button, ButtonProps, Dropdown, ParMd, ParXs } from '@daohaus/ui';
import { violet } from '@radix-ui/colors';
import { RiUserAddLine } from 'react-icons/ri';
import styled from 'styled-components';

c;

const ConnectWalletButton = (props: ButtonProps) => (
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

const UserConnectedDropdown = () => (
  <Dropdown
    spacing="0.7rem"
    align="end"
    trigger={
      <Button avatar fullWidth>
        <Container>
          <TemporaryAvatar />
          <div className="interior">
            <ParMd>Kagahara</ParMd>
            <ParXs>@Ethereum</ParXs>
          </div>
        </Container>
      </Button>
    }
    items={[
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
    ]}
  />
);

const TemporaryAvatar = styled.div`
  width: 3rem;
  height: 3rem;

  background-color: ${violet.violet9};
  border-radius: 45px;
  margin-right: 0.75rem;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  .interior {
    display: flex;
    flex-direction: column;
  }
`;
