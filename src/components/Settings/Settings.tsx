import React from 'react';

import Header from '../Header&Footer/Header/Header';

import FormTextField from '../common/FormFields/FormTextField/FormTextField';
import FormNumberField from './../common/FormFields/FormNumberField/FormNumberField';

import { useForm } from 'react-hook-form';

type FormData = {
  repoName: string;
  buildCommand: string;
  mainBranch: string;
  period: number;
};

const Settings: React.FC = () => {
  const { register, handleSubmit, formState, setValue } = useForm<FormData>({
    defaultValues: { period: 10 },
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });
  const regExpBranchName = /^([\w-.]+)$/;
  const regExpRepoName = /^([\w-.]+)(\/)([\w-]+)$/;
  return (
    <>
      <Header titleText={'School CI server'} headerType={'Settings'} />
      <div className="Settings Page">
        <div className="Settings-Titles">
          <h2 className="Settings-Titles-MainTitle fontType_caption">Settings</h2>
          <h3 className="Settings-Titles-InfoTitle">
            Configure&nbsp;repository&nbsp;connection
            and&nbsp;synchronization&nbsp;settings.
          </h3>
        </div>
        <form onSubmit={onSubmit} className="Settings-Form Form">
          <div className="Settings-Form-Inputs Form-Inputs">
            <FormTextField
              register={register}
              name="repoName"
              errors={formState.errors.repoName}
              label="GitHub repository"
              placeholder="user-name/repo-name"
              validators={{
                required: 'This field is required',
                pattern: {
                  value: regExpRepoName,
                  message: 'Must be in format "user-Name/repo-Name"',
                },
              }}
              setValue={setValue}
            />
            <FormTextField
              register={register}
              name="buildCommand"
              errors={formState.errors.buildCommand}
              label="Build command"
              validators={{
                required: 'This field is required',
              }}
              setValue={setValue}
              placeholder="Build command"
            />
            <FormTextField
              register={register}
              name="mainBranch"
              errors={formState.errors.mainBranch}
              label="Main branch"
              validators={{
                pattern: {
                  value: regExpBranchName,
                  message: 'Must be 1 word',
                },
              }}
              setValue={setValue}
              placeholder="master"
            />
            <FormNumberField
              register={register}
              name="period"
              errors={formState.errors.period}
              label="Synchronize every"
              validators={{
                min: {
                  value: 1,
                  message: 'Min value is 1',
                },
                max: {
                  value: 999,
                  message: 'Max value is 999',
                },
              }}
              setValue={setValue}
              value="minutes"
            />
          </div>
          <div className="Form-ButtonsBlock">
            <button
              type="submit"
              className="Button Button_bigger Button_color_yellow Button_onMobile_wider"
            >
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
