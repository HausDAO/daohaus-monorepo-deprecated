import { Button, Input } from '@daohaus/ui';
import styled from 'styled-components';
import { BiSearch } from 'react-icons/bi';
import { RiFilterFill } from 'react-icons/ri';
import { BsFillGrid3X3GapFill } from 'react-icons/bs';
import { ParSm } from '@daohaus/ui';
import { amberDark, indigoDark } from '@radix-ui/colors';
import { ListType } from '../utils/appSpecificTypes';

const IconFilter = styled(RiFilterFill)`
  height: 1.8rem;
  width: 1.8rem;
  display: flex;
  fill: ${indigoDark.indigo10};
  :hover {
    fill: ${indigoDark.indigo10};
  }
`;

const IconGrid = styled(BsFillGrid3X3GapFill)`
  height: 1.8rem;
  width: 1.8rem;
  display: flex;
  fill: ${indigoDark.indigo10};
  :hover {
    fill: ${indigoDark.indigo10};
  }
`;

const IconSearch = styled(BiSearch)`
  fill: ${indigoDark.indigo11};
  :hover {
    fill: ${indigoDark.indigo11};
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
  background: ${indigoDark.indigo3};
  color: ${indigoDark.indigo11};
  ::placeholder {
    color: ${indigoDark.indigo11};
  }
  :focus {
    background: ${indigoDark.indigo3};
    color: ${indigoDark.indigo11};
  }
`;

type TableControlProps = {
  listType: ListType;
  toggleListType: () => void;
};

const TableControl = ({ listType, toggleListType }: TableControlProps) => {
  return (
    <Layout>
      <StyledInput
        icon={IconSearch}
        id="table-search"
        placeholder="Search 3 Daos"
      />

      <FlexContainer>
        <IconFilter />
        <ParSm color={indigoDark.indigo11}>Filters</ParSm>
      </FlexContainer>
      {/* <FlexContainer>
        <IconGrid />
        <ParSm color={indigoDark.indigo11}>Grid</ParSm>
      </FlexContainer> */}
      <Button secondary onClick={toggleListType} IconLeft={IconGrid}>
        {listType === 'table' ? 'Card View' : 'List View'}
      </Button>
    </Layout>
  );
};

export default TableControl;
