import React from 'react';

import { FieldProps } from '../types';

const FormTextField = ({ label, name, data, isRequired = false, placeholder = '' }: FieldProps): JSX.Element => {
  return (
    <div className="Form-InputBlock Form-InputBlock_text">
      <label
        htmlFor={name}
        className={`Form-InputBlock-Label Form-InputBlock_text-Label ${isRequired && 'Form-InputBlock-Label_required'}`}
      >
        {label}
      </label>
      <input
        className="Form-InputBlock-Input Form-InputBlock_text-Input"
        name={name}
        id={name}
        value={data.value}
        onChange={data.onChange}
        placeholder={placeholder}
        type="text"
      />
    </div>
  );
};

export default FormTextField;
