import { isValidNetwork } from '@daohaus/common-utilities';
import { useHausConnect } from '@daohaus/daohaus-connect-feature';
import { FormLayout, useToast } from '@daohaus/ui';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

type FormBuilderProps = {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  fields: any[];
  middleware?: (values: Record<string, unknown>) => Record<string, unknown>;
  onSubmit: (values: any) => void;
  onCancel?: () => void;
  onSuccess?: (values: any) => void;
  onError?: (values: any) => void;
};

export const FormBuilder = ({
  title,
  subtitle,
  description,
  fields,
  onSubmit,
}: FormBuilderProps) => {
  const { chainId, isConnected } = useHausConnect();
  const methods = useForm({ mode: 'onTouched' });
  const {
    formState: { isValid },
  } = methods;
  const { errorToast, successToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formDisabled = isSubmitting;
  const submitDisabled = !isValid || isSubmitting || !isValidNetwork(chainId);
  const handleFormSubmit = () => {
    console.log('fart');
  };

  return (
    <FormLayout title={title} subtitle={subtitle} description={description}>
      <FormProvider {...methods}>
        <form onSubmit={handleFormSubmit} className="builder-inner-form">
          //factory
        </form>
      </FormProvider>
    </FormLayout>
  );
};
