import { createContext, useContext, useState } from 'react';
import {
  FieldValues,
  FormProvider as RHFProvider,
  useForm,
  useFormContext,
} from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

import { FormLayout } from '@daohaus/ui';
import { isValidNetwork } from '@daohaus/common-utilities';
import { useHausConnect } from '@daohaus/daohaus-connect-feature';

import { FormLego, LookupType, RequiredFields } from '../types';
import { Logger } from './Logger';
import { FormFooter } from './formFooter';
import { FormBuilderFactory } from './FormBuilderFactory';

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
  onSubmit: (
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

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitDisabled = !isValid || isSubmitting || !isValidNetwork(chainId);
  const formDisabled = isSubmitting;

  const handleTopLevelSubmit = async (formValues: Record<string, unknown>) => {
    setIsSubmitting(true);
    await onSubmit(formValues);
    setIsSubmitting(false);
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
