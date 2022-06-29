import { H1, Italic, ParXl, widthQuery } from '@daohaus/ui';
import styled from 'styled-components';

const ViewBox = styled.div`
  grid-area: body;
  width: 100%;
  height: 90rem;
  display: flex;
  position: relative;
  justify-content: space-between;
  background-image: url('src/assets/hub-illustration.svg');
  background-size: auto 80rem;
  background-repeat: no-repeat;
  background-position: 110% 80%;
  margin-top: 6.3rem;
  .text-section {
    width: 100%;
    max-width: 50rem;
    min-width: 28rem;
  }
  .hero {
    font-size: 6.5rem;
    font-weight: 900;
  }
  .tag-line {
    font-size: 3.6rem;
    margin-bottom: 2.4rem;
  }

  ul {
    padding-inline-start: 2.4rem;
    margin-top: 2.4rem;
  }
  @media ${widthQuery.md} {
    height: 80rem;
    background-size: auto 70rem;
    background-position: 100% 40%;
    .text-section {
      max-width: 40rem;
    }
  }
  @media ${widthQuery.sm} {
    height: 70rem;
    background-size: auto 65rem;
    background-position: 10rem 6rem;
    .text-section {
      max-width: 28rem;
    }
    .hero {
      font-size: 6rem;
    }
    .tag-line {
      font-size: 1.6rem;
      margin-bottom: 2.4rem;
    }
    .connect {
      font-size: 1.6rem;
    }
    ul {
      margin-top: 0.8rem;
      p {
        line-height: 110%;
      }
    }
    li {
      font-size: 1.6rem;
    }
  }
  @media ${widthQuery.xs} {
    background-position: 10% 250%;
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
        <ParXl className="connect">
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
