import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';

import { useHausConnect } from '@daohaus/daohaus-connect-feature';
import { CONTRACTS, isValidNetwork, ArgType } from '@daohaus/common-utilities';
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
import { assembleTxArgs } from '../utils/summonTx';
import { FormValues } from '../types/form';
import { useTxBuilder } from '../app/TXBuilder';
import { LOCAL_ABI } from '@daohaus/abi-utilities';

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
  const { chainId } = useHausConnect();
  const { fireTransaction } = useTxBuilder();

  const methods = useForm({ mode: 'onTouched' });

  const handleFormSubmit: SubmitHandler<FormValues> = async (formValues) => {
    if (!chainId || !isValidNetwork(chainId)) return;

    const args = assembleTxArgs(formValues, chainId);
    fireTransaction({
      txName: 'summonBaalAndSafe',
      abi: LOCAL_ABI.BAAL_FACTORY,
      args: args as ArgType[],
      keychain: CONTRACTS.V3_FACTORY,
      lifeCycleFns: {
        onTxHash(txHash) {
          console.log('fired');
          console.log(txHash);
        },
      },
    });
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
