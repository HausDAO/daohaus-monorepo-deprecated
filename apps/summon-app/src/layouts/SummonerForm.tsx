import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { useHausConnect } from '@daohaus/daohaus-connect-feature';
import {
  CONTRACTS,
  isValidNetwork,
  ReactSetter,
} from '@daohaus/common-utilities';
import { LOCAL_ABI } from '@daohaus/abi-utilities';
import {
  Bold,
  Button,
  Divider,
  H1,
  ParMd,
  Link,
  useToast,
  WrappedInput,
} from '@daohaus/ui';
import { useTxBuilder } from '@daohaus/tx-builder-feature';

import { AdvancedSegment } from '../layouts/AdvancedSegment';
import { MembersSegment } from '../layouts/MemberSegment';
import { ShamanSegment } from '../layouts/ShamanSegment';
import { StakeTokensSegment } from '../layouts/StakeTokenSegment';
import { TimingSegment } from '../layouts/TimingSegment';
import { FORM_KEYS } from '../utils/formKeys';
import { assembleTxArgs } from '../utils/summonTx';
import { FormValues } from '../types/form';
import { SummonStates } from '../app/App';
import { ConnectBox } from '../components/ConnectBox/ConnectBox';

type SummonFormProps = {
  setSummonState: ReactSetter<SummonStates>;
  setTxHash: ReactSetter<string>;
  setDaoAddress: ReactSetter<string>;
  setErrMsg: ReactSetter<string>;
};

export const SummonerForm = ({
  setSummonState,
  setTxHash,
  setDaoAddress,
  setErrMsg,
}: SummonFormProps) => {
  const { chainId, isConnected } = useHausConnect();
  const { fireTransaction } = useTxBuilder();
  const methods = useForm({ mode: 'onTouched' });
  const {
    formState: { isValid },
  } = methods;
  const { errorToast, successToast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitDisabled = !isValid || isSubmitting || !isValidNetwork(chainId);
  const formDisabled = isSubmitting;

  const handleFormSubmit: SubmitHandler<FormValues> = async (formValues) => {
    if (!chainId || !isValidNetwork(chainId)) {
      setSummonState('error');
      return;
    }

    setIsSubmitting(true);
    try {
      const args = assembleTxArgs(formValues, chainId);

      fireTransaction({
        txName: 'summonBaalAndSafe',
        abi: LOCAL_ABI.BAAL_SUMMONER,
        args: args,
        keychain: CONTRACTS.V3_FACTORY,
        lifeCycleFns: {
          onTxHash(txHash) {
            setSummonState('loading');
            setTxHash(txHash);
          },
          onPollSuccess(result) {
            const daoAddress = result?.data?.transaction?.daoAddress;
            if (daoAddress) {
              successToast({
                title: 'DAO Summoned',
                description: 'Your Moloch V3 has been summoned!',
              });
              setSummonState('success');
              setDaoAddress(daoAddress);
            } else {
              setSummonState('error');
              setErrMsg(
                'Subgraph Poll did not include a DAO address. Check Transaction receipt below for Summon data'
              );
              errorToast({
                title: 'Summon Error',
                description: 'No DAO address found',
              });
            }
          },
          onTxError(error) {
            if (error instanceof Error) {
              setErrMsg(error.message);
              errorToast({ title: 'Summon Error', description: error.message });
            } else {
              setErrMsg('Unknown error');
              errorToast({
                title: 'Summon Error',
                description: 'Unknown error',
              });
            }
          },
          onPollError(error) {
            if (error instanceof Error) {
              setErrMsg(error.message);
              errorToast({ title: 'Summon Error', description: error.message });
            } else {
              setErrMsg('Unknown error');
              errorToast({
                title: 'Summon Error',
                description: 'Unknown error',
              });
            }
          },
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        setErrMsg(error.message);
        errorToast({ title: 'Summon Error', description: error.message });
      } else {
        setErrMsg('Unknown error');
        errorToast({
          title: 'Summon Error',
          description: 'Unknown error',
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        className="main-column"
        onSubmit={methods.handleSubmit(handleFormSubmit)}
        noValidate
      >
        <div className="title-section">
          <H1>
            <Bold>Summon a DAO.</Bold>
          </H1>
          <ParMd>
            Learn more about{' '}
            <Link href="https://daohaus.mirror.xyz/U_JQtheSzdpRFqQwf9Ow3LgLNG0WMZ6ibAyrjWDu_fc">
              Moloch v3
            </Link>
          </ParMd>
        </div>
        <div>
          <WrappedInput
            id={FORM_KEYS.DAO_NAME}
            placeholder="Braid Guild"
            full
            disabled={formDisabled}
            registerOptions={{ required: 'DAO name is required' }}
          />
          <Divider className="top-divider" />
        </div>
        <StakeTokensSegment formDisabled={formDisabled} />
        <TimingSegment formDisabled={formDisabled} />
        <AdvancedSegment formDisabled={formDisabled} />
        <ShamanSegment formDisabled={formDisabled} />
        <MembersSegment formDisabled={formDisabled} />
        {!isConnected && <ConnectBox />}
        <Button fullWidth lg type="submit" disabled={submitDisabled}>
          Summon DAO
        </Button>
      </form>
    </FormProvider>
  );
};
