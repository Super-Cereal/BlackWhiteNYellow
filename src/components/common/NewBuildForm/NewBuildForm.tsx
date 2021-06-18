import React from 'react';

import FormTextField from '../FormFields/FormTextField/FormTextField';

import useFormField from './../FormFields/useFormField';

const NewBuildForm: React.FC = () => {
  const commitHashField = useFormField();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <div className="NewBuildForm">
      <h2>New build</h2>
      <form onSubmit={handleSubmit} className="NewBuildForm-Form Form">
        <FormTextField
          label="Enter the commit hash which you want to build."
          name="commitHash"
          data={commitHashField}
          isRequired={true}
          placeholder="Commit hash"
        />
        <button className="Button Button_color_yellow">Run build</button>
        <button className="Button Button_color_white">Cancel</button>
      </form>
    </div>
  );
};

export default NewBuildForm;
