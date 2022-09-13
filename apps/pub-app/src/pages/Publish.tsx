import { FormBuilder } from '@daohaus/haus-form-builder';
import React from 'react';
import { TABULA_FORMS } from '../blocks/formBlocks';

export const Publish = () => {
  return <FormBuilder form={TABULA_FORMS.CREATE_PUB} />;
};
