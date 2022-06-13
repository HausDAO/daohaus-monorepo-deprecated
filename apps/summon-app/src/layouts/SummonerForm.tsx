import { FormProvider, useForm } from 'react-hook-form';
import styled from 'styled-components';

import {
  Bold,
  Button,
  Divider,
  H1,
  ParMd,
  TemporaryLink,
  WrappedInput,
} from '@daohaus/ui';

import { AdvancedSegment } from '../layouts/AdvancedSegment';
import { MembersSegment } from '../layouts/MemberSegment';
import { ShamanSegment } from '../layouts/ShamanSegment';
import { StakeTokensSegment } from '../layouts/StakeTokenSegment';
import { TimingSegment } from '../layouts/TimingSegment';
import { FORM_KEYS } from '../utils/formKeys';
import { summon } from '../utils/summonTx';
import { useHausConnect } from '@daohaus/daohaus-connect-feature';
import { isValidNetwork } from '@daohaus/common-utilities';

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
  const { provider, chainId } = useHausConnect();
  const methods = useForm({ mode: 'onTouched' });
  const handleFormSubmit = async (formValues: Record<string, unknown>) => {
    if (!provider || !chainId || !isValidNetwork(chainId)) return;
    console.log('formValues', formValues);
    summon(provider, formValues, chainId);
  };

  return (
    <Main>
      <FormProvider {...methods}>
        <form
          className="form-column"
          onSubmit={methods.handleSubmit(handleFormSubmit)}
          noValidate
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
            <WrappedInput
              id={FORM_KEYS.DAO_NAME}
              placeholder="Braid Guild"
              full
              registerOptions={{ required: 'DAO name is required' }}
            />
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
