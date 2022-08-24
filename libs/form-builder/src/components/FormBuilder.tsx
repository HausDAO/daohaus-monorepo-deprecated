import { createContext, useContext, useState } from 'react';
import {
  FieldValues,
  FormProvider as RHFProvider,
  useForm,
  useFormContext,
} from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

import { FormLayout, useToast } from '@daohaus/ui';
import {
  handleErrorMessage,
  isValidNetwork,
  LookupType,
  RequiredFields,
} from '@daohaus/common-utilities';
import { useHausConnect } from '@daohaus/daohaus-connect-feature';

import { FormLego } from '../types';
import { Logger } from './Logger';
import { FormFooter } from './formFooter';
import { FormBuilderFactory } from './FormBuilderFactory';
import { useTxBuilder } from '@daohaus/tx-builder-feature';

type FormContext<Lookup extends LookupType> = {
  form?: FormLego<Lookup>;
  requiredFields: RequiredFields;
  formDisabled: boolean;
  submitDisabled: boolean;
};

// TS CHALLENGE
// Very difficult to type this properly.
// Contexts have trouble with generics.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const FormBuilderContext = createContext<FormContext<any>>({
  form: undefined,
  requiredFields: {},
  formDisabled: false,
  submitDisabled: false,
});

type BuilderProps<Lookup extends LookupType> = {
  form: FormLego<Lookup>;
  defaultValues?: FieldValues;
  customFields?: LookupType;
  onSubmit?: (
    formValues: FieldValues
  ) => void | Promise<(formValues: FieldValues) => void>;
  onCancel?: () => void;
  onSuccess?: () => void;
  onError?: () => void;
};

export enum StatusMsg {
  Compile = 'Compiling Transaction Data',
  Request = 'Requesting Signature',
  Await = 'Transaction Submitted',
  TxErr = 'Transaction Error',
  TxSuccess = 'Transaction Success',
  PollStart = 'Syncing TX (Subgraph)',
  PollSuccess = 'Success: TX Confirmed!',
  PollError = 'Sync Error (Subgraph)',
}

export function FormBuilder<Lookup extends LookupType>({
  form,
  onSubmit,
  defaultValues,
  customFields,
}: BuilderProps<Lookup>) {
  const { chainId } = useHausConnect();

  const methods = useForm({ mode: 'onChange', defaultValues });
  const {
    formState: { isValid },
    control,
  } = methods;
  const {
    title,
    subtitle,
    description,
    fields,
    log,
    devtool,
    submitButtonText,
    requiredFields = {},
  } = form;

  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<null | StatusMsg>(null);
  const [txHash, setTxHash] = useState<null | string>(null);
  const submitDisabled = !isValid || isLoading || !isValidNetwork(chainId);
  const formDisabled = isLoading;
  const { defaultToast, errorToast, successToast } = useToast();
  const { fireTransaction } = useTxBuilder?.() || {};

  const handleTopLevelSubmit = async (formValues: FieldValues) => {
    if (form.tx) {
      setIsLoading(true);
      setTxHash(null);
      setStatus(StatusMsg.Compile);
      return await fireTransaction({
        tx: form.tx,
        callerState: {
          formValues,
        },
        lifeCycleFns: {
          onRequestSign() {
            setStatus(StatusMsg.Request);
          },
          onTxHash(txHash) {
            setTxHash(txHash);
            setStatus(StatusMsg.Await);
          },
          onTxError(error) {
            setStatus(StatusMsg.TxErr);
            const errMsg = handleErrorMessage({
              error,
              fallback: 'Could not decode error message',
            });
            setIsLoading(false);
            errorToast({ title: StatusMsg.TxErr, description: errMsg });
          },
          onTxSuccess() {
            setStatus(StatusMsg.TxSuccess);
            defaultToast({
              title: StatusMsg.TxSuccess,
              description: 'Please wait for subgraph to sync',
            });
          },
          onPollStart() {
            setStatus(StatusMsg.PollStart);
          },
          onPollError(error) {
            setStatus(StatusMsg.PollError);
            const errMsg = handleErrorMessage({
              error,
              fallback: 'Could not decode poll error message',
            });
            setIsLoading(false);
            errorToast({ title: StatusMsg.PollError, description: errMsg });
          },
          onPollSuccess() {
            setStatus(StatusMsg.PollSuccess);
            setIsLoading(false);
            successToast({
              title: StatusMsg.PollSuccess,
              description: 'Transaction cycle complete.',
            });
          },
        },
      });
    }
    if (onSubmit) {
      return await onSubmit?.(formValues);
    }
    console.error('FormBuilder: onSubmit not implemented');
  };

  return (
    <RHFProvider {...methods}>
      <FormBuilderContext.Provider
        value={{ requiredFields, form, formDisabled, submitDisabled }}
      >
        <FormLayout title={title} subtitle={subtitle} description={description}>
          <form
            onSubmit={methods.handleSubmit(handleTopLevelSubmit)}
            className="builder-inner-form"
            noValidate
          >
            {fields?.map((field) => (
              <FormBuilderFactory
                key={field.id}
                field={field}
                customFields={customFields}
              />
            ))}
            {log && <Logger />}
            {devtool && <DevTool control={control} />}

            <FormFooter
              submitDisabled={submitDisabled}
              submitButtonText={submitButtonText}
              status={status}
              txHash={txHash}
            />
          </form>
        </FormLayout>
      </FormBuilderContext.Provider>
    </RHFProvider>
  );
}

export const useFormBuilder = () => {
  const methods = useFormContext();
  const builderFeatures = useContext(FormBuilderContext);

  return { ...methods, ...builderFeatures };
};
