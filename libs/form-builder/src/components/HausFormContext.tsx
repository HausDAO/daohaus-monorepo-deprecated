import React, { createContext, useState } from 'react';
import { FormLego, RequiredFields } from '../types';
import { FormProvider as RHFProvider, useForm } from 'react-hook-form';
import { FormLayout } from '@daohaus/ui';
import { isValidNetwork } from '@daohaus/common-utilities';
import { useHausConnect } from '@daohaus/daohaus-connect-feature';
import { Logger } from './Logger';
import { DevTool } from '@hookform/devtools';
import { FormFooter } from './formFooter';
import { FormBuilderFactory } from './FormBuilderFactory';

type HausFormContext = {
  form?: FormLego;
  requiredFields: RequiredFields;
  formDisabled: boolean;
  submitDisabled: boolean;
};

export const HausFormContext = createContext<HausFormContext>({
  form: undefined,
  requiredFields: {},
  formDisabled: false,
  submitDisabled: false,
});

export const HausFormProvider = ({
  form,
  onSubmit,
}: {
  form: FormLego;
  onSubmit: (
    formValues: Record<string, unknown>
  ) => void | Promise<(formValues: Record<string, unknown>) => void>;
  onCancel?: () => void;
  onSuccess?: () => void;
  onError?: () => void;
}) => {
  const { chainId } = useHausConnect();
  const methods = useForm({ mode: 'onChange' });
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitDisabled = !isValid || isSubmitting || !isValidNetwork(chainId);
  const formDisabled = isSubmitting;

  const handleTopLevelSubmit = async (formValues: Record<string, unknown>) => {
    setIsSubmitting(true);
    await onSubmit(formValues);
    setIsSubmitting(false);
  };
  return (
    <HausFormContext.Provider
      value={{ requiredFields, form, formDisabled, submitDisabled }}
    >
      <RHFProvider {...methods}>
        <FormLayout title={title} subtitle={subtitle} description={description}>
          <form
            onSubmit={methods.handleSubmit(handleTopLevelSubmit)}
            className="builder-inner-form"
            noValidate
          >
            {fields?.map((field) => (
              <FormBuilderFactory key={field.id} field={field} />
            ))}
            {log && <Logger />}
            {devtool && <DevTool control={control} />}
            <FormFooter
              submitDisabled={submitDisabled}
              submitButtonText={submitButtonText}
            />
          </form>
        </FormLayout>
      </RHFProvider>
    </HausFormContext.Provider>
  );
};
