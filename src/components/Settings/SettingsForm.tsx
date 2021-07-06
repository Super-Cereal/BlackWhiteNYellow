import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import FormTextField from '../common/FormFields/FormTextField/FormTextField';
import FormNumberField from '../common/FormFields/FormNumberField/FormNumberField';
import Loader from '../common/Loader/Loader';
import { settingsFormProps, formData, settingsFormConnectedStore } from './types';

// @ts-ignore
import settingsDAL from './redux/settingsDAL';
// @ts-ignore
// prettier-ignore
import { axiosPostSettings } from './redux/settingsActions';
// @ts-ignore
import { settingsSS } from '../../redux/storeSelectors';

export const SettingsForm: React.FC<settingsFormProps> = ({
  register,
  onSubmit,
  onClickRedirect,
  errors,
  setValue,
  setFocus,
  regExps,
  isRequestInProgress,
}) => (
  <form onSubmit={onSubmit} className="Settings-Form Form">
    <div className="Settings-Form-Inputs Form-Inputs">
      <FormTextField
        testid="formRepoName"
        register={register}
        name="repoName"
        errors={errors.repoName}
        label="GitHub repository"
        placeholder="user-name/repo-name"
        validators={{
          required: 'This field is required',
          pattern: {
            value: regExps.repoName,
            message: 'Must be in format "user-Name/repo-Name"',
          },
        }}
        setValue={setValue}
        setFocus={setFocus}
      />
      <FormTextField
        testid="formBuildCommand"
        register={register}
        name="buildCommand"
        errors={errors.buildCommand}
        label="Build command"
        validators={{
          required: 'This field is required',
        }}
        setValue={setValue}
        setFocus={setFocus}
        placeholder="Build command"
      />
      <FormTextField
        testid="formMainBranch"
        register={register}
        name="mainBranch"
        errors={errors.mainBranch}
        label="Main branch"
        validators={{
          pattern: {
            value: regExps.branchName,
            message: 'Must be 1 word',
          },
        }}
        setValue={setValue}
        setFocus={setFocus}
        placeholder="master"
      />
      <FormNumberField
        testid="formPeriod"
        register={register}
        name="period"
        errors={errors.period}
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
        setFocus={setFocus}
        value="minutes"
      />
    </div>
    <div className={`Form-ButtonsBlock ${isRequestInProgress && 'Form-ButtonsBlock_disabled'}`}>
      <button
        type="submit"
        className="Button Button_bigger Button_color_yellow Button_onMobile_wider"
        disabled={isRequestInProgress}
      >
        Save
      </button>
      <button
        type="button"
        className="Button Button_bigger Button_onMobile_wider"
        disabled={isRequestInProgress}
        onClick={onClickRedirect('/')}
      >
        Cancel
      </button>
      {isRequestInProgress && <Loader />}
    </div>
  </form>
);

export const SettingsFormContainer: React.FC<settingsFormConnectedStore> = ({ axiosPostSettings, repoInfo }) => {
  const { register, handleSubmit, setError, formState, setValue, setFocus } = useForm<formData>({
    mode: 'onTouched',
    defaultValues: {
      period: repoInfo.period || 10,
      mainBranch: repoInfo.mainBranch || 'master',
      buildCommand: repoInfo.buildCommand || undefined,
      repoName: repoInfo.repoName || undefined,
    },
  });
  const branchName = /^([\w-.]+)$/;
  const repoName = /^([\w-.]+)(\/)([\w-]+)$/;
  const history = useHistory();
  const onClickRedirect = (path: string) => () => {
    history.push(path);
  };
  const [isRequestInProgress, setIsRequestInProgress] = React.useState(false);
  const onSubmit = handleSubmit(async (data) => {
    setIsRequestInProgress(true);

    data.mainBranch = data.mainBranch || 'master';
    // запросы к git api
    const [isRepoAvailable, isBranchAvailable] = await Promise.all([
      settingsDAL.checkIfRepoAvailable(data.repoName),
      settingsDAL.checkIfBranchAvailable(data.repoName, data.mainBranch),
    ]);
    if (!isRepoAvailable) {
      setIsRequestInProgress(false);
      return setError('repoName', {
        type: 'manual',
        message: 'This repository is unavailable',
      });
    }
    if (!isBranchAvailable) {
      setIsRequestInProgress(false);
      return setError('mainBranch', {
        type: 'manual',
        message: 'This branch is unavailable',
      });
    }
    // ----

    const response = await axiosPostSettings(data);
    if (response.status !== 200) {
      setIsRequestInProgress(false);
      return setError(response.data.error.name, {
        type: 'manual',
        message: response.data.error.message,
      });
    }
    setIsRequestInProgress(false);
    history.push('/');
  });

  return (
    <SettingsForm
      register={register}
      onSubmit={onSubmit}
      errors={formState.errors}
      setValue={setValue}
      setFocus={setFocus}
      onClickRedirect={onClickRedirect}
      isRequestInProgress={isRequestInProgress}
      regExps={{
        branchName,
        repoName,
      }}
    />
  );
};

// @ts-ignore
const mstp = (state) => ({
  repoInfo: settingsSS.repoInfo(state),
});
export default connect(mstp, { axiosPostSettings })(SettingsFormContainer);
