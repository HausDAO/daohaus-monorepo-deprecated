import { MouseEvent, useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import {
  ParXl,
  Bold,
  Theme,
  ParMd,
  AddressDisplay,
  DataIndicator,
} from '@daohaus/ui';
import { RiArrowUpSLine, RiArrowDownSLine } from 'react-icons/ri';

import {
  ProposalHistoryElement,
  ProposalHistoryElementData,
} from './ProposalHistory';
import { useParams } from 'react-router-dom';
import { Keychain } from '@daohaus/common-utilities';

const ElementContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1rem;
  padding: 0 0 2rem 0;
  border-bottom: 1px solid #ffffff16;
`;

const VisibleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 2.4rem 0;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1rem;
`;

const StyledTitle = styled(Bold)`
  color: ${({ theme, active }: { theme: Theme; active: boolean }) =>
    active && theme.link.color};
`;

const StyledUpArrow = styled(RiArrowUpSLine)`
  font-size: 4.8rem;
  font-weight: 900;
  color: ${({ theme }: { theme: Theme }) => theme.link.color};
`;

const StyledDownArrow = styled(RiArrowDownSLine)`
  font-size: 4.8rem;
  font-weight: 900;
  color: ${({ theme }: { theme: Theme }) => theme.link.color};
`;

const DataGrid = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const SpacedAddressDisplay = styled(AddressDisplay)`
  margin-top: 1rem;
`;

const DataPoint = ({
  data,
  daochain,
}: {
  data: ProposalHistoryElementData;
  daochain?: string;
}) => {
  if (data.dataType === 'member') {
    return (
      <div>
        <ParMd>{data.label}</ParMd>
        <SpacedAddressDisplay
          truncate
          address={data.data}
          copy
          explorerNetworkId={daochain as keyof Keychain}
        />
      </div>
    );
  }

  if (data.dataType === 'dataIndicator') {
    return <DataIndicator key={uuidv4()} label={data.label} data={data.data} />;
  }

  return null;
};

type ProposalHistoryCardProps = {
  element: ProposalHistoryElement;
};

export const ProposalHistoryCard = ({ element }: ProposalHistoryCardProps) => {
  const { daochain } = useParams();
  const [open, setOpen] = useState<boolean>(false);

  const handleToggle = (event: MouseEvent<HTMLDivElement>) => {
    setOpen((prevState) => !prevState);
  };

  return (
    <ElementContainer>
      <VisibleContainer>
        <ContentContainer>
          <ParXl>
            <StyledTitle active={element.active}>{element.title}</StyledTitle>
          </ParXl>
          {element.text && <ParMd>{element.text}</ParMd>}
        </ContentContainer>
        {element.canExpand && open && (
          <div onClick={handleToggle}>
            <StyledUpArrow />
          </div>
        )}
        {element.canExpand && !open && (
          <div onClick={handleToggle}>
            <StyledDownArrow />
          </div>
        )}
      </VisibleContainer>
      {element.canExpand && open && (
        <DataGrid>
          {/* {element.dataElements.map((data) => (<DataPoint data={data} daochain={daochain} />)} */}

          {element.dataElements.map((data) => (
            <DataPoint data={data} daochain={daochain} />
          ))}
        </DataGrid>
      )}
    </ElementContainer>
  );
};
