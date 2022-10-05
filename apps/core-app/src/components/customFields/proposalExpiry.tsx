import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { format, addSeconds } from 'date-fns';
import { FieldSpacer } from '@daohaus/haus-form-builder';
import {
  Buildable,
  Field,
  FieldWrapper,
  HighlightInputText,
  WrappedInput,
  InputSelect,
} from '@daohaus/ui';
import { useDao } from '@daohaus/dao-context';
import { unixTimeInSeconds } from '@daohaus/common-utilities';

const INPUT_ID = 'expiryValue';
const SELECT_ID = 'expiryPeriod';

type ProposalExpiryProps = Buildable<
  Field & {
    defaultValue?: string;
    label: string;
  }
>;

export const ProposalExpiry = ({
  id,
  defaultValue,
  rules,
  ...props
}: ProposalExpiryProps) => {
  const { watch, register, setValue } = useFormContext();
  const [periodValue, periodMultiplier] = watch([INPUT_ID, SELECT_ID]);
  const { dao } = useDao();

  const expiryDateString = `${id}String`;

  const periodSelectOpts = [
    { value: `${1}`, name: 'Seconds' },
    { value: `${60}`, name: 'Minutes' },
    { value: `${3600}`, name: 'Hours' },
    { value: `${3600 * 24}`, name: 'Days' },
  ];

  useEffect(() => {
    if (dao) {
      const extendedPeriodSeconds =
        Number(periodValue || 0) * Number(periodMultiplier || 0);
      const absoluteExtendedPeriod =
        unixTimeInSeconds() +
        Number(dao.votingPeriod) +
        Number(dao.gracePeriod) +
        extendedPeriodSeconds;
      setValue(id, absoluteExtendedPeriod);
      setValue(
        expiryDateString,
        format(absoluteExtendedPeriod * 1000, "MMM dd, yyyy 'at' hh:mmaaa OOO")
      );
    }
  }, [dao, expiryDateString, id, periodValue, periodMultiplier, setValue]);

  return (
    <FieldWrapper {...props} id={id} rules={rules}>
      <FieldSpacer>
        <InputSelect
          {...props}
          registerInput={register(INPUT_ID, rules)}
          registerSelect={register(SELECT_ID)}
          id={INPUT_ID}
          defaultValue={defaultValue}
          selectDefault={`${3600 * 24}`}
          selectId={SELECT_ID}
          options={periodSelectOpts}
        />
      </FieldSpacer>
      <FieldSpacer>
        <HighlightInputText
          id="highlightProposalExpiry"
          description="Expiration will be on:"
          highlightColor="#B4D7CE"
          highlightInputId={expiryDateString}
        />
      </FieldSpacer>
      <HighlightInputText
        id="expirationDateDescription"
        description="The expiration date includes Voting and Grace Periods. Adjust the days or hour to update the expiration."
      />
      <WrappedInput id={id} hidden />
      <WrappedInput id={expiryDateString} hidden />
    </FieldWrapper>
  );
};
