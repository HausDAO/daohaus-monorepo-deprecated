import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { format, addSeconds } from 'date-fns';
import { Buildable, Field, WrappedInput } from '@daohaus/ui';
import { useDao } from '../../contexts/DaoContext';

type ProposalExpiryProps = Buildable<Field & {
  periodFieldIds: Array<string>;
}>;

export const ProposalExpiry = ({ periodFieldIds, ...props }: ProposalExpiryProps) => {
  const { watch, setValue } = useFormContext();
  const [periodValue, periodMultiplier] = watch(periodFieldIds);
  const { dao } = useDao();
  const { id } = props;

  useEffect(() => {
    if (dao) {
      const extendedPeriodSeconds =
        Number(dao.votingPeriod) +
        Number(dao.gracePeriod) +
        (Number(periodValue || 0) * Number(periodMultiplier || 0));
      setValue(
        id,
        format(
          addSeconds(new Date(), extendedPeriodSeconds),
          "MMM dd, yyyy 'at' hh:mmaaa OOO",
        ),
      );
    }
  }, [dao, id, periodValue, periodMultiplier, setValue]);

  return (
    <WrappedInput {...props} />
  );
};