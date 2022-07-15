import styled from 'styled-components';

export const SubNavContainer = styled.div`
  width: '100%';
  height: 10rem;
  background-color: ${(props) => props.theme.subNav.bg};

  .nav-link-list {
    padding: 3.2rem 3.5rem 2.2rem 3.5rem;
    a {
      margin-right: 5rem;
    }
  }

  .more-box {
    display: inline-flex;
    align-items: center;

    button {
      background-color: transparent;
      border: none;
      padding: 0;
      margin: 0;
      margin-right: 1rem;
    }
  }
`;
