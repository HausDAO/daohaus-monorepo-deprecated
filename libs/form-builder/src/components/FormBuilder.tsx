// import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

// import { isValidNetwork } from '@daohaus/common-utilities';
// import { useHausConnect } from '@daohaus/daohaus-connect-feature';
import { FormLayout } from '@daohaus/ui';

import { FormBuilderFactory } from './FormBuilderFactory';
import { FormLego } from '../types/legoTypes';

import { Logger } from './Logger';
import { FormFooter } from './formFooter';
import { useState } from 'react';

type FormBuilderProps = FormLego & {
  // middleware?: (values: Record<string, unknown>) => Record<string, unknown>;
  onSubmit: () => void;
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
}: FormBuilderProps) => {
  // const { chainId, isConnected } = useHausConnect();
  const methods = useForm();
  const {
    formState: { isValid },
  } = methods;
  // const { errorToast, successToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(true);

  // const submitDisabled = !isValid || isSubmitting || !isValidNetwork(chainId);

  return (
    <FormLayout title={title} subtitle={subtitle} description={description}>
      <FormProvider {...methods}>
        <form onSubmit={onSubmit} className="builder-inner-form">
          <Logger log={log} />
          {fields?.map((field) => (
            <FormBuilderFactory
              key={field.id}
              {...field}
              disabled={isSubmitting}
            />
          ))}
          <FormFooter />
        </form>
      </FormProvider>
    </FormLayout>
  );
};

// TS NOTE should be able to use a mapped type to be
// able to get the props from the 'type' field applied
// a type inferred from the Field Enum

// type PropsFromType<T> =
