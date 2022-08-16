import { DaoWithTokenData } from '@daohaus/dao-data';
import { Buildable, InputSelectProps, WrappedInputSelect } from '@daohaus/ui';
import { useMemo } from 'react';
import { useDao } from '../../contexts/DaoContext';

type TributeInputProps = Omit<InputSelectProps, 'options'>;

const tokenArrayFromDaoContext = (dao: DaoWithTokenData) => {
  return [];
};

export const TributeInput = (props: Buildable<TributeInputProps>) => {
  const { dao } = useDao();

  const daoTokens = useMemo(() => {
    if (dao) return tokenArrayFromDaoContext(dao);
  }, [dao]);

  return <WrappedInputSelect {...props} options={daoTokens || []} />;
};
