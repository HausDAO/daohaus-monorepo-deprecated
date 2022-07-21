import { isValidNetwork } from '@daohaus/common-utilities';
import { useHausConnect } from '@daohaus/daohaus-connect-feature';
import { FormLayout, useToast } from '@daohaus/ui';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FieldLego, FormLego } from './types/legoTypes';

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
          {fields?.map((field) => (
            <FormBuilderFactory key={field.id} {...field} />
          ))}
        </form>
      </FormProvider>
    </FormLayout>
  );
};

const FieldLegos: Record<string, FieldLego> = {
  Input: {
    id: 'id',
    type: 'input',
  },
  Switch: {
    id: 'id2',
    type: 'switch',
    switches: [{ fieldLabel: 'shit' }],
  },
  Check: {
    id: 'CHECK',
    type: 'switch',
    switches: [{ fieldLabel: 'Label' }],
  },
};

// TS NOTE should be able to use a mapped type to be
// able to get the props from the 'type' field applied
// a type inferred from the Field Enum

// type PropsFromType<T> =

const FormBuilderFactory = ({ type, ...props }: FieldLego) => {
  const GeneratedField = FieldEnum[type];

  //TS CHALLENGE
  // Incoming nonsense here. While I am able to get intellisense
  // on the legos and bind the 'type' with the props that get passed
  // into the react component, TS does not seem to want to recognize
  // that both args and type are derived from the same source, the
  // actual component

  // @ts-expect-error blah-de-blah
  return <GeneratedField {...props} />;
};

// Simiplified example of TS problem here.
/*https://www.typescriptlang.org/play#code/MYewdgzgLgBAZmAjDAvDAFAb3iEAaGAIwEMAnGAXwC4Zs5cbpSBLMAcwG4iyawBXALaEApuQoBKVAD5aAWABQMGKWFQ+pMDAAGAEkz0QFALR6SpClo4KKV+QtCRYCAEyoMdXARIAvSjQ8gjFAs7Fw+NIS4ADbCxJoS0nKKyqrqmrr6uMamxN4WtjYK9uDQ8GAAzG5Y3KReuX60NbyCIqRhuRHRsfGSKDKYCkoqahraOeYmmD751rbFjmUAMrgA1nwADm4DyXB8YMBQzOCINAiIeIPwewdHYM6ndxc714fg5Q-lT4V28lAAnuthDAAGJgACSjlIfBuJS2lwA2qCANLCP4wVgwFaokBwGD-QE4parDYAXRoAAUyMQBKpRBAADz44SEhDLEBrdaIsAov4kqTwgAMJJgADIkkolEyaMjUbYlN8KPCsX9CUyWWA2RySXN5Lt9q9NFCwABBUiEUEAdWYUAAFgBhECkFQHU1sCDVJkEAB0PrIboaoIhTGhBogkm2SgcpQgwhiB2EABNQW5WcTOUztUVksM0jAY3GoInQeg-WGClmAPQVmAACRAAHcYAmQDAwTA2KoYMQ+FAQKABOsYoWYDbRECIC3bcRYG3gHEiEDiBAIOpE3ibdOm8IAG4QBRVrsqdFgdY9w7sddA0BO4QHGDrUggdYQHDkWLAG0wADkTK-MBZLy3AA-PMpTAgAcgAyjQABKt6Ogm9JMKwbAEIGkIhrcEAyGgEYwMIAAe1KDsIJzihKUrfnqMJIF+TwSjggTfn8wgQHRlxKGYNDnJcFD0fhREDjE9zkZKALCDQX7UQazjsckSgGJJLFsfxnEdHiULCPxfGXIRxExO8ol4uJknSbcsmqdw3inMQUQxpZinMcI6xyfKXy2EAA*/
