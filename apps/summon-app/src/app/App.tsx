import { DaoHausNav } from '@daohaus/daohaus-connect-feature';
import {
  Bold,
  Button,
  Divider,
  H1,
  H5,
  Input,
  ParMd,
  ParSm,
  TemporaryLink,
  WrappedInput,
  WrappedSwitch,
  WrappedTextArea,
} from '@daohaus/ui';
import { v4 as uuid } from 'uuid';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import { FORM_COPY } from '../utils/content';

const TemporaryLayout = styled.div`
  width: 100%;
  padding-top: 2.7rem;
  padding-right: 4rem;
`;

const Main = styled.main`
  display: flex;
  justify-content: center;
  margin-top: 4rem;

  .form-column {
    width: 58rem;
    height: 2rem;
  }
  .title-section {
    margin-bottom: 16rem;
  }
  .top-divider {
    margin-top: 3rem;
    margin-bottom: 2.4rem;
  }
`;

export const App = () => {
  const methods = useForm();

  return (
    <TemporaryLayout>
      <DaoHausNav />
      <Main>
        <FormProvider {...methods}>
          <form className="form-column">
            <div className="title-section">
              <H1>
                <Bold>Summon a Baal.</Bold>
              </H1>
              <ParMd>
                Visit <TemporaryLink>Docs</TemporaryLink> for Help
              </ParMd>
            </div>
            <div>
              <Input id="daoName" full placeholder="Braid Guild" />
              <Divider className="top-divider" />
            </div>
            <StakeTokensSegment />
            <FormSegment
              title="Proposal Timing"
              description="Define your timing for Voting and Grace periods. You can update these settings through a proposal."
              formArea={
                <SplitColumn
                  singleRow={{
                    left: (
                      <WrappedInput
                        label="Voting Period"
                        id="votingPeriod"
                        placeholder="Wait for Input Select"
                      />
                    ),
                    right: (
                      <WrappedInput
                        label="Grace Period"
                        id="gracePeriod"
                        placeholder="Wait for Input-Select"
                      />
                    ),
                  }}
                />
              }
            />
            <FormSegment
              title="Advanced Governance"
              description="Modify some advanced governance features."
              formArea={
                <SplitColumn
                  rows={[
                    {
                      left: (
                        <WrappedInput
                          id="quorum"
                          label="Quorum %"
                          placeholder="80"
                        />
                      ),
                      right: (
                        <WrappedInput
                          id="minRetention"
                          label="Min Retention %"
                          placeholder="66"
                        />
                      ),
                    },
                    {
                      left: (
                        <WrappedInput
                          id="sponsorThreshold"
                          label="Sponsor Threshold"
                          placeholder="1"
                        />
                      ),
                      right: (
                        <WrappedInput
                          id="newOffering"
                          label="New Offering (ETH)"
                          placeholder="0"
                        />
                      ),
                    },
                  ]}
                />
              }
            />
            <FormSegment
              title="Starting Shamans"
              description="Shamans are very powerful as they can have administrative control over voting and non-voting stakes. Be very careful adding shamans. "
              formArea={
                <TextAreaSection>
                  <TemporaryLink className="link">
                    How to add a Shaman
                  </TemporaryLink>
                  <ParSm className="number-display">0 Shamans</ParSm>
                  <WrappedTextArea
                    label="Addresses & Permissions"
                    placeholder="0x00000000000000000000000000 3"
                    id="shamans"
                    full
                    number
                    helperText="Seems like a valid response"
                  />
                </TextAreaSection>
              }
            />
            <FormSegment
              title="Starting Members"
              description="You must have at least one member to start. Add other starting members as desired. You can always add more members later through a proposal or a shaman."
              formArea={
                <TextAreaSection css={{ width: '100%' }}>
                  <ParSm className="number-display">0 Members</ParSm>
                  <WrappedTextArea
                    label="Addresses & Stake Amounts"
                    placeholder="0x00000000000000000000000000 30 10"
                    id="members"
                    full
                    number
                    helperText="Seems like a valid response"
                  />
                </TextAreaSection>
              }
            />
            <Button fullWidth lg>
              Summon DAO
            </Button>
          </form>
        </FormProvider>
      </Main>
    </TemporaryLayout>
  );
};

export default App;

type SegmentType = {
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  formArea: React.ReactNode;
};

const StyledFormSegment = styled.section`
  width: 100%;
  margin-bottom: 2.4rem;
  .segment-title {
    margin-bottom: 3.2rem;
  }
  .segment-description {
    margin-bottom: 3rem;
  }
`;

const StakeTokensSegment = () => {
  const { watch } = useFormContext();
  const formValues = watch();

  const votingTransferableLabel = formValues?.votingTransferable
    ? 'Transferable'
    : 'Not Transferable';
  const nvTransferableLabel = formValues?.nvTransferable
    ? 'Transferable'
    : 'Not Transferable';

  return (
    <FormSegment
      title={FORM_COPY.TOKENS.title}
      description={FORM_COPY.TOKENS.description}
      formArea={
        <SplitColumn
          rows={[
            {
              left: (
                <WrappedInput
                  id="tokenName"
                  label="Name"
                  placeholder="Voting Stake"
                  full
                />
              ),
              right: (
                <WrappedInput
                  id="tokenSymbol"
                  label="Symbol"
                  placeholder="vSTK"
                  full
                />
              ),
            },
            {
              left: (
                <WrappedSwitch
                  id="votingTransferable"
                  label="Voting Stake Transferable?"
                  switches={[
                    {
                      fieldLabel: votingTransferableLabel,
                      id: 'votingTransferable',
                    },
                  ]}
                />
              ),
              right: (
                <WrappedSwitch
                  id="nvTransferable"
                  label="Non-Voting Transferable?"
                  switches={[
                    {
                      fieldLabel: nvTransferableLabel,
                      id: 'nvVotingTransferable',
                    },
                  ]}
                />
              ),
            },
          ]}
        />
      }
    />
  );
};

const FormSegment = ({ title, description, formArea }: SegmentType) => {
  return (
    <StyledFormSegment>
      <H5 className="segment-title">{title}</H5>
      <ParMd className="segment-description">{description}</ParMd>
      <div>{formArea}</div>
      <Divider />
    </StyledFormSegment>
  );
};

const StyledSplitColumn = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-direction: column;
  /* .left-section {
  }
  .right-section {
  }
  .center {
  } */
`;
type Row = {
  left: React.ReactNode;
  right: React.ReactNode;
};
type SplitColumnProps = {
  singleRow?: Row;
  rows?: Row[];

  // leftSection: React.ReactNode;
  // rightSection: React.ReactNode;
};

const SplitColumn = ({ rows, singleRow }: SplitColumnProps) => {
  return (
    <StyledSplitColumn>
      {singleRow && <Row {...singleRow} />}
      {rows?.map((row) => {
        return <Row key={uuid()} {...row} />;
      })}
    </StyledSplitColumn>
  );
};

const StyledRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 3.6rem;
  .left-section,
  .right-section {
    width: 24rem;
  }
`;
const Row = ({ left, right }: Row) => {
  return (
    <StyledRow>
      <div className="left-section">{left}</div>
      <div className="right-section">{right}</div>
    </StyledRow>
  );
};

const TextAreaSection = styled.div`
  width: 100%;
  margin-bottom: 3.4rem;
  .link {
    margin-bottom: 2rem;
  }
  .number-display {
    margin-bottom: 2rem;
  }
`;
