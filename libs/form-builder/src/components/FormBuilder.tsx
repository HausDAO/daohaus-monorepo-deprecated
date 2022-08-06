import { createContext, useContext, useState } from 'react';
import {
  FieldValues,
  FormProvider as RHFProvider,
  useForm,
  useFormContext,
} from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

import { FormLayout } from '@daohaus/ui';
import {
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

export function FormBuilder<Lookup extends LookupType>({
  form,
  onSubmit,
  defaultValues,
  customFields,
}: BuilderProps<Lookup>) {
  const { chainId } = useHausConnect();

  const methods = useForm({ mode: 'onTouched', defaultValues });
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

  const [isSubmitting] = useState(false);

  const submitDisabled = !isValid || isSubmitting || !isValidNetwork(chainId);
  const formDisabled = isSubmitting;
  const { fireTransaction } = useTxBuilder?.() || {};

  const handleTopLevelSubmit = async (formValues: FieldValues) => {
    if (form.tx) {
      return await fireTransaction({
        tx: form.tx,
        callerState: {
          fromCallerState: {
            foo: 'bar',
          },
        },
        lifeCycleFns: {
          onTxHash() {
            console.log('txHash');
          },
          onTxError(error) {
            error instanceof Error && console.log(error);
            console.log('txError');
          },
          onTxSuccess() {
            console.log('txSuccess');
          },
          onPollFire() {
            console.log('poll fire');
          },
          onPollError() {
            console.log('poll error');
          },
          onPollSuccess() {
            console.log('poll success');
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
