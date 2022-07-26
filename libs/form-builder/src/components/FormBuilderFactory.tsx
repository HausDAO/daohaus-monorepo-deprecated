import { WrappedInput } from '@daohaus/ui';
import { useMemo } from 'react';
import { RegisterOptions } from 'react-hook-form';
import styled from 'styled-components';
import { FieldLego } from '../types/legoTypes';
import { CoreFieldLookup } from './CoreFieldLookup';

const FieldSpacer = styled.div`
  margin-bottom: 3.6rem;
`;

export const FormBuilderFactory = ({
  type,
  spacing = true,
  disabled,
  rules = {},
  ...props
}: FieldLego & {
  spacing?: boolean;
  disabled?: boolean;
  rules?: RegisterOptions;
}) => {
  //  Memoizing solves the 'switch-away' mega-bug that was
  //  occuring because of the enumerator patttern selecting
  //  a new instance of the component each render.
  const GeneratedField = useMemo(() => {
    const Component = CoreFieldLookup[type];
    //TS CHALLENGE
    // While I am able to get intellisense
    // on the legos and bind the 'type' with the props that get passed
    // into the react component, TS does not seem to want to recognize
    // that both args and type are derived from the same source, the
    // actual component
    // @ts-expect-error: explanation above
    return <Component {...props} full disabled={disabled} rules={rules} />;
  }, [type, disabled, rules, props]);

  return (
    <span>
      {spacing ? (
        <FieldSpacer>{GeneratedField}</FieldSpacer>
      ) : (
        { GeneratedField }
      )}
    </span>
  );
};

// Simiplified example of TS problem here.
/*https://www.typescriptlang.org/play#code/MYewdgzgLgBAZmAjDAvDAFAb3iEAaGAIwEMAnGAXwC4Zs5cbpSBLMAcwG4iyawBXALaEApuQoBKVAD5aAWABQMGKWFQ+pMDAAGAEkz0QFALR6SpClo4KKV+QtCRYCAEyoMdXARIAvSjQ8gjFAs7Fw+NIS4ADbCxJoS0nKKyqrqmrr6uMamxN4WtjYK9uDQ8GAAzG5Y3KReuX60NbyCIqRhuRHRsfGSKDKYCkoqahraOeYmmD751rbFjmUAMrgA1nwADm4DyXB8YMBQzOCINAiIeIPwewdHYM6ndxc714fg5Q-lT4V28lAAnuthDAAGJgACSjlIfBuJS2lwA2qCANLCP4wVgwFaokBwGD-QE4parDYAXRoAAUyMQBKpRBAADz44SEhDLEBrdaIsAov4kqTwgAMJJgADIkkolEyaMjUbYlN8KPCsX9CUyWWA2RySXN5Lt9q9NFCwABBUiEUEAdWYUAAFgBhECkFQHU1sCDVJkEAB0PrIboaoIhTGhBogkm2SgcpQgwhiB2EABNQW5WcTOUztUVksM0jAY3GoInQeg-WGClmAPQVmAACRAAHcYAmQDAwTA2KoYMQ+FAQKABOsYoWYDbRECIC3bcRYG3gHEiEDiBAIOpE3ibdOm8IAG4QBRVrsqdFgdY9w7sddA0BO4QHGDrUggdYQHDkWLAG0wADkTK-MBZLy3AA-PMpTAgAcgAyjQABKt6Ogm9JMKwbAEIGkIhrcEAyGgEYwMIAAe1KDsIJzihKUrfnqMJIF+TwSjggTfn8wgQHRlxKGYNDnJcFD0fhREDjE9zkZKALCDQX7UQazjsckSgGJJLFsfxnEdHiULCPxfGXIRxExO8ol4uJknSbcsmqdw3inMQUQxpZinMcI6xyfKXy2EAA*/
