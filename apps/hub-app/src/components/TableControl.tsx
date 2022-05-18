import { Input } from '@daohaus/ui';
import styled from 'styled-components';
import { BiSearch } from 'react-icons/bi';
import { RiFilterFill } from 'react-icons/ri';
import { BsFillGrid3X3GapFill } from 'react-icons/bs';
import { ParSm } from '@daohaus/ui';
import { amberDark, crimsonDark } from '@radix-ui/colors';

const IconFilter = styled(RiFilterFill)`
  height: 1.8rem;
  width: 1.8rem;
  display: flex;
  fill: ${amberDark.amber9};
  :hover {
    fill: ${amberDark.amber9};
  }
`;

const IconGrid = styled(BsFillGrid3X3GapFill)`
  height: 1.8rem;
  width: 1.8rem;
  display: flex;
  fill: ${amberDark.amber9};
  :hover {
    fill: ${amberDark.amber9};
  }
`;

const IconSearch = styled(BiSearch)`
  fill: ${crimsonDark.crimson11};
  :hover {
    fill: ${crimsonDark.crimson11};
  }
`;

const Layout = styled.div`
  display: flex;
  align-items: center;
  gap: 2.4rem;
  padding-top: 3.6rem;
  padding-bottom: 3.6rem;
`;

const FlexContainer = styled.div`
  display: flex;
  gap: 0.7rem;
  color: ${amberDark.amber9};
`;

const StyledInput = styled(Input)`
  background: ${crimsonDark.crimson3};
  color: ${crimsonDark.crimson11};
  ::placeholder {
    color: ${crimsonDark.crimson11};
  }
  :focus {
    background: ${crimsonDark.crimson3};
    color: ${crimsonDark.crimson11};
  }
`;

const TableControl = () => {
  return (
    <Layout>
      <StyledInput
        icon={IconSearch}
        id="table-search"
        placeholder="Search 3 Daos"
      />

      <FlexContainer>
        <IconFilter />
        <ParSm>Filters</ParSm>
      </FlexContainer>
      <FlexContainer>
        <IconGrid />
        <ParSm>Grid</ParSm>
      </FlexContainer>
    </Layout>
  );
};

export default TableControl;
