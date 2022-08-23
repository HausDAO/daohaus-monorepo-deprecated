import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { FormBuilder } from '@daohaus/haus-form-builder';

import { getFormLegoById } from '../legos/form';
import { CustomFields } from '../legos/config';

export function NewProposal() {
  const location = useLocation();

  const formLego = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const legoId = params.get('formLego');
    if (!legoId) return null;
    return getFormLegoById(legoId);

    // const legoBase64 = params.get('formLego');
    // if (!legoBase64) return null;
    // return JSON.parse(window.atob(legoBase64));
  }, [location]);

  if (!formLego) return null;

  return <FormBuilder form={formLego} customFields={CustomFields} />;
}

export default NewProposal;
