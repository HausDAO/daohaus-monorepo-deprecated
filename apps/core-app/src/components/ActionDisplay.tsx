import {
  ArgType,
  isEthAddress,
  isValidNetwork,
  ValidNetwork,
} from '@daohaus/common-utilities';
import { DecodedMultiTX, isActionError } from '@daohaus/tx-builder-feature';
import {
  AddressDisplay,
  Bold,
  DataSm,
  Divider,
  H4,
  useBreakpoint,
  widthQuery,
} from '@daohaus/ui';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const DisplayContainer = styled.div`
  margin-top: 2rem;

  .display-segment {
    display: flex;
    flex-direction: column;
  }

  .data {
    word-break: break-all;
    margin-bottom: 2rem;
    .space,
    .address-display {
      margin-bottom: 2rem;
    }
  }
  .value-box {
    display: flex;
  }
`;

export const ActionDisplay = ({ actions }: { actions: DecodedMultiTX }) => {
  const { daochain } = useParams();
  const network = isValidNetwork(daochain) ? daochain : undefined;
  const isMobile = useBreakpoint(widthQuery.sm);

  return (
    <DisplayContainer>
      {actions.map((action, index) => {
        if (isActionError(action)) {
          return (
            <div className="display-segment data" key={action.message}>
              <H4 className="space">Action {index + 1}: Error</H4>
              <DataSm className="space">{action.message}</DataSm>
              <Divider className="space" />
              <DataSm className="space">
                <Bold>HEX DATA:</Bold>
              </DataSm>
              <DataSm className="space">{action.data}</DataSm>
            </div>
          );
        }
        return (
          <div className="display-segment" key={action.name}>
            <div className="data">
              <H4 className="space">
                Action {index + 1}: {action.name}
              </H4>
              <DataSm className="space">
                <Bold>TARGET</Bold>
              </DataSm>
              <AddressDisplay
                className="space"
                address={action.to}
                copy
                explorerNetworkId={network}
                truncate={isMobile}
              />
              <DataSm className="space">
                <Bold>VALUE</Bold>
              </DataSm>
              <DataSm className="space">{action.value}</DataSm>
              <Divider className="spaced-divider" />
            </div>
            {action.params.map((arg, index) => {
              return (
                <div className="data" key={arg.name}>
                  <DataSm className="space">
                    <Bold>
                      PARAM
                      {index + 1}:{' '}
                    </Bold>
                    {arg.name}
                  </DataSm>
                  <DataSm className="space">
                    <Bold>TYPE: </Bold>
                    {arg.type}
                  </DataSm>

                  <DataSm className="space">
                    <Bold>VALUE: </Bold>
                  </DataSm>
                  <ValueDisplay
                    argValue={arg.value}
                    network={network}
                    isMobile={isMobile}
                  />
                  <Divider />
                </div>
              );
            })}
          </div>
        );
      })}
    </DisplayContainer>
  );
};

const ValueDisplay = ({
  argValue,
  network,
  isMobile,
}: {
  argValue: ArgType;
  network?: ValidNetwork;
  isMobile?: boolean;
}) => {
  if (Array.isArray(argValue)) {
    return (
      <>
        {argValue.map((value, index) => {
          return (
            <div className="space">
              <ValueDisplay argValue={value} network={network} />
              {index + 1 < argValue?.length && <Divider />}
            </div>
          );
        })}
      </>
    );
  }
  if (isEthAddress(argValue)) {
    return (
      <AddressDisplay
        address={argValue}
        copy
        explorerNetworkId={network}
        className="space"
        truncate={isMobile}
      />
    );
  }
  if (typeof argValue === 'boolean') {
    return <DataSm className="space">{`${argValue}`}</DataSm>;
  }
  if (typeof argValue === 'string' || typeof argValue === 'number') {
    return <DataSm className="space">{argValue}</DataSm>;
  }

  return <DataSm className="space">{argValue.toString()}</DataSm>;
};
