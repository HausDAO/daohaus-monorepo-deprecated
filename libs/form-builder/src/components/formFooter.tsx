import { border, Button, ParSm, Spinner, Theme } from '@daohaus/ui';

import React from 'react';
import { RiCheckLine, RiErrorWarningLine } from 'react-icons/ri';
import styled, { useTheme } from 'styled-components';
import { StatusMsg } from './FormBuilder';

export const FormFooter = ({
  submitDisabled,
  submitButtonText,
  status,
}: {
  submitDisabled?: boolean;
  submitButtonText?: string;
  status: StatusMsg | null;
}) => {
  /*Form Alert Component goes here*/
  return (
    <>
      {status && <FormStatusDisplay status={status} />}
      <Button fullWidth lg centerAlign type="submit" disabled={submitDisabled}>
        {submitButtonText || 'Submit'}
      </Button>
    </>
  );
};

const StatusBox = styled.div`
  border-radius: ${border.radius};
  border: 1px
    ${({ theme, status }: { theme: Theme; status: StatusMsg }) => {
      console.log('status', status);
      if (status === StatusMsg.PollSuccess) {
        return theme.success;
      }
      if (status === StatusMsg.PollError || status === StatusMsg.TxErr) {
        return theme.error;
      } else {
        return theme.secondary;
      }
    }}
    solid;
  padding: 1.5rem;
  margin-bottom: 2rem;
  .inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    p {
      margin-right: auto;
    }
  }
`;

const getElement = (status: StatusMsg, theme: Theme) => {
  if (status === StatusMsg.PollSuccess) {
    return <RiCheckLine color={theme.success} size="2.25rem" />;
  }
  if (status === StatusMsg.PollError || status === StatusMsg.TxErr) {
    return <RiErrorWarningLine color={theme.error} size="2.25rem" />;
  } else return <Spinner size="2.25rem" strokeWidth=".25rem" />;
};

const FormStatusDisplay = ({ status }: { status: StatusMsg }) => {
  const theme = useTheme();
  return (
    <StatusBox status={status}>
      <div className="inner">
        <ParSm>{status}</ParSm>
        {getElement(status, theme)}
      </div>
    </StatusBox>
  );
};
