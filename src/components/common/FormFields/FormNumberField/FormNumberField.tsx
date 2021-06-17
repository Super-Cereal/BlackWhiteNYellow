import React from 'react';

import { FieldProps } from '../types';

const FormNumberField = ({ label, name, data, value = '' }: FieldProps): JSX.Element => {
  return (
    <div className="Form-InputBlock Form-InputBlock_number">
      <label
        className="Form-InputBlock-Label Form-InputBlock_number-Label Form-InputBlock_number-Label_labelText"
        htmlFor={name}
      >
        {label}
      </label>
      <input
        name={name}
        id={name}
        value={data.value}
        onChange={data.onChange}
        className="Form-InputBlock-Input Form-InputBlock_number-Input"
        type="text"
      />
      <label className="Form-InputBlock-Label Form-InputBlock_number-Label_value" htmlFor={name}>
        {value}
      </label>
    </div>
  );
};

export default FormNumberField;
