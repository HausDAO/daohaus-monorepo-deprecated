import { DaoHausNav } from '@daohaus/daohaus-connect-feature';
import {
  Bold,
  Divider,
  H1,
  H5,
  Input,
  ParMd,
  TemporaryLink,
  WrappedInput,
} from '@daohaus/ui';
import { v4 as uuid } from 'uuid';
import { FormProvider, useForm } from 'react-hook-form';
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
              <Divider margin="3rem 0 2.4rem 0" />
            </div>
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
                        />
                      ),
                    },
                    {
                      left: (
                        <WrappedInput
                          id="vStakeTransferable"
                          label="Voting Stake Transferable?"
                          full
                        />
                      ),
                      right: (
                        <WrappedInput
                          id="nvStakeTransferable"
                          label="Non-Voting Transferable?"
                          full
                        />
                      ),
                    },
                  ]}
                />
              }
            />
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

  .segment-title {
    margin-bottom: 3.2rem;
  }
  .segment-description {
    margin-bottom: 3rem;
  }
`;

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
