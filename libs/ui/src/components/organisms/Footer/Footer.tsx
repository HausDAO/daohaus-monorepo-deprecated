import { ParMd, Link } from '../../atoms';
import hausCastle from '../../../assets/hausCastle.svg';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  margin-top: 17rem;
  padding-bottom: 5rem;
  display: flex;
  justify-content: center;
  .logo-box {
    display: flex;
    align-items: center;
    img {
      margin-right: 1.8rem;
    }
  }
`;

export const Footer = () => {
  return (
    <StyledFooter>
      <div className="logo-box">
        <img src={hausCastle} alt="daohaus castle logo" />
        <ParMd>
          Built by{' '}
          <Link href="https://daohaus.club" linkType="external">
            DAOhaus
          </Link>
        </ParMd>
      </div>
    </StyledFooter>
  );
};
