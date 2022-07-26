import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { FormLayout, WrappedInput } from '@daohaus/ui';

import { FormBuilderFactory } from './FormBuilderFactory';
import { FormLego } from '../types/legoTypes';

import { Logger } from './Logger';
import { FormFooter } from './formFooter';
import { useEffect, useState } from 'react';
import { isValidNetwork } from '@daohaus/common-utilities';
import { useHausConnect } from '@daohaus/daohaus-connect-feature';

type FormBuilderProps = FormLego & {
  onSubmit: (
    formValues: Record<string, unknown>
  ) => void | Promise<(formValues: Record<string, unknown>) => void>;
  onCancel?: () => void;
  onSuccess?: () => void;
  onError?: () => void;
};

export const FormBuilder = ({
  title,
  subtitle,
  description,
  fields,
  onSubmit,
  log,
  devtool = true,
}: FormBuilderProps) => {
  const methods = useForm({ mode: 'onChange' });
  const {
    formState: { isValid },
    control,
    watch,
  } = methods;
  const { chainId } = useHausConnect();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitDisabled = !isValid || isSubmitting || !isValidNetwork(chainId);

  // TS Challenge
  // Use a map type to derive a typed values object form the formLego
  const handleTopLevelSubmit = async (formValues: Record<string, unknown>) => {
    setIsSubmitting(true);
    await onSubmit(formValues);
    setIsSubmitting(false);
  };

  return (
    <FormLayout title={title} subtitle={subtitle} description={description}>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handleTopLevelSubmit)}
          className="builder-inner-form"
          noValidate
        >
          {/* <WrappedInput id="fuck" rules={{ required: 'Fuck' }} /> */}
          {fields?.map((field) => (
            <FormBuilderFactory
              key={field.id}
              {...field}
              disabled={isSubmitting}
            />
          ))}
          <Logger />
          <FormFooter submitDisabled={submitDisabled} />
        </form>
      </FormProvider>
    </FormLayout>
  );
};
