import { FormProvider, useForm } from 'react-hook-form';
import styled from 'styled-components';

import {
  Bold,
  Button,
  Divider,
  H1,
  Input,
  ParMd,
  TemporaryLink,
} from '@daohaus/ui';

import { AdvancedSegment } from '../layouts/AdvancedSegment';
import { MembersSegment } from '../layouts/MemberSegment';
import { ShamanSegment } from '../layouts/ShamanSegment';
import { StakeTokensSegment } from '../layouts/StakeTokenSegment';
import { TimingSegment } from '../layouts/TimingSegment';

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

export const SummonerForm = () => {
  const methods = useForm();

  const handleFormSubmit = async (formValues: Record<string, unknown>) => {
    console.log('formValues', formValues);
  };

  return (
    <Main>
      <FormProvider {...methods}>
        <form
          className="form-column"
          onSubmit={methods.handleSubmit(handleFormSubmit)}
        >
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
          <TimingSegment />
          <AdvancedSegment />
          <ShamanSegment />
          <MembersSegment />
          <Button fullWidth lg type="submit">
            Summon DAO
          </Button>
        </form>
      </FormProvider>
    </Main>
  );
};
