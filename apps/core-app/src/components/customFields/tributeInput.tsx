import { DaoWithTokenData } from '@daohaus/dao-data';
import { useTxBuilder } from '@daohaus/tx-builder-feature';
import { Buildable, InputSelectProps, WrappedInputSelect } from '@daohaus/ui';
import React, { useMemo } from 'react';
import { useDao } from '../../contexts/DaoContext';

type TributeInputProps = Omit<InputSelectProps, 'options'>;

const tokenArrayFromDaoContext = (dao: DaoWithTokenData) => {
  console.log(dao);
  // const nonVotingToken = {
  //   address: dao.lootAddress,
  //   name:
  // };
  // const votingToken =
};

export const TributeInput = (props: Buildable<TributeInputProps>) => {
  const { fireTransaction } = useTxBuilder();

  const { dao } = useDao();

  const daoTokens = useMemo(() => {
    if (dao?.tokenBalances) {
      return tokenArrayFromDaoContext(dao);
    }
  }, [dao]);

  return <WrappedInputSelect {...props} options={[]} />;
};
