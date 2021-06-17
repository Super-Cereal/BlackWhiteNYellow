import React from 'react';

import Header from '../Header&Footer/Header/Header';

import FormTextField from '../common/FormFields/FormTextField/FormTextField';
import FormNumberField from './../common/FormFields/FormNumberField/FormNumberField';
import useFormField from '../common/FormFields/useFormField';

const Settings = (): JSX.Element => {
  const repoNameField = useFormField();
  const buildCommandField = useFormField();
  const mainBranchField = useFormField();
  const periodField = useFormField(10);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <>
      <Header titleText={'School CI server'} headerType={'Settings'} />
      <div className="Settings Page">
        <div className="Settings-Titles">
          <h2 className="Settings-Titles-MainTitle fontType_caption">Settings</h2>
          <h3 className="Settings-Titles-InfoTitle">Configure repository connection and synchronization settings.</h3>
        </div>
        <form onSubmit={handleSubmit} className="Settings-Form Form">
          <FormTextField
            data={repoNameField}
            name="repoName"
            label="GitHub repository"
            placeholder="user-name/repo-name"
            isRequired={true}
          />
          <FormTextField
            data={buildCommandField}
            name="buildCommand"
            label="Build command"
            isRequired={true}
            placeholder="Build command"
          />
          <FormTextField data={mainBranchField} name="mainBranch" label="Main branch" placeholder="master" />
          <FormNumberField data={periodField} name="period" label="Synchronize every" value="minutes" />
          <div className="Form-ButtonsBlock">
            <button type="submit" className="Button Button_bigger Button_color_yellow Button_onMobile_wider">
              Save
            </button>
            <button className="Button Button_bigger Button_onMobile_wider">Cancel</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Settings;
