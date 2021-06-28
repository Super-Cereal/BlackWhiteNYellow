import React from 'react';

import { FieldProps } from '../types';

import '../Form.scss';

const FormNumberField: React.FC<FieldProps> = ({ label, name, register, value = '', errors, validators }) => {
  return (
    <div className="Form-InputBlock Form-InputBlock_number">
      <div className="Form-InputBlock-InputBox">
        <label
          className="Form-InputBlock-Label Form-InputBlock_number-Label Form-InputBlock_number-Label_labelText"
          htmlFor={name}
        >
          {label}
        </label>
        <input
          id={name}
          {...register(name, validators)}
          className={`Form-InputBlock-Input Form-InputBlock_number-Input ${
            errors && 'Form-InputBlock-Input_withError'
          }`}
          type="number"
        />
        <label className="Form-InputBlock-Label Form-InputBlock_number-Label_value" htmlFor={name}>
          {value}
        </label>
      </div>
      {errors && <span className="Form-InputBlock-Error">{errors.message}</span>}
    </div>
  );
};

export default FormNumberField;
