import React from 'react';
import { InputLabel } from './inputLabelType';
import { BaseInputlabel } from './style';

const InputLabel = ({ required, label, info }: InputLabel) => {
  return <BaseInputlabel>{label}</BaseInputlabel>;
};

export default InputLabel;
