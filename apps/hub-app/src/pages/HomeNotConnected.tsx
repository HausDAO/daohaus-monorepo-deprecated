import { H1, Italic, ParXl } from '@daohaus/ui';
import styled from 'styled-components';

const ViewBox = styled.div`
  grid-area: body;
  width: 100%;
  display: flex;
  position: relative;
  justify-content: space-between;
  background-image: url('src/assets/DH-notConnectedImage.png');
  background-size: auto 100%;
  .text-section {
    width: 100%;
    max-width: 50rem;
    min-width: 28rem;
  }
  .hero {
    font-size: 6.5rem;
    font-weight: 700;
  }
  .tag-line {
    font-size: 3.6rem;
    margin-bottom: 2.4rem;
  }
  ul {
    margin-top: 2.4rem;
  }
  img {
    width: 60%;
  }
`;

export const HomeNotConnected = () => {
  return (
    <ViewBox>
      <div className="text-section">
        <H1 className="hero">HUB</H1>
        <ParXl className="tag-line">
          Schelling point for all your DAO activity
        </ParXl>
        <ParXl>
          <Italic>Connect a wallet to:</Italic>
        </ParXl>
        <ul>
          <ParXl>
            <li>See all your DAOs</li>
          </ParXl>
          <ParXl>
            <li>View Active Proposals</li>
          </ParXl>
          <ParXl>
            <li>Manage your shared profile</li>
          </ParXl>
        </ul>
      </div>
    </ViewBox>
  );
};
