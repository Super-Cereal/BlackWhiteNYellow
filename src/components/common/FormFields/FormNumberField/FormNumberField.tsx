import React from 'react';

import { FieldProps } from '../types';

const FormNumberField = ({ label, name, data, value = '' }: FieldProps): JSX.Element => {
  return (
    <div className="Form-InputBlock Form-InputBlock_number">
      <label className="Form-InputBlock-Label Form-InputBlock-Label_text" htmlFor={name}>
        {label}
      </label>
      <input
        name={name}
        id={name}
        value={data.value}
        onChange={data.onChange}
        className="Form-InputBlock-Input Form-InputBlock_number-Input"
        type="number"
        min="0.5"
        step="0.5"
      />
      <label className="Form-InputBlock-Label Form-InputBlock-Label_value" htmlFor={name}>
        {value}
      </label>
    </div>
  );
};

export default FormNumberField;
