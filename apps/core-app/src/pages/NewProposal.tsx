import { FormBuilder } from '@daohaus/haus-form-builder';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { CustomFields } from '../legos/config';
import { FORM } from '../legos/form';

export function NewProposal() {
  const location = useLocation();

  const formLego = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const legoBase64 = params.get('formLego');
    if (!legoBase64) return null;
    return JSON.parse(window.atob(legoBase64));
  }, [location]);

  if (!formLego) return null;

  return <FormBuilder form={formLego} customFields={CustomFields} />;
}

export default NewProposal;
