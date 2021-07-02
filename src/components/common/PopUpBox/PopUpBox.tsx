import React from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

import FormTextField from '../FormFields/FormTextField/FormTextField';
import Loader from '../Loader/Loader';
import { popUpBoxContainerProps, formData, popUpBoxProps } from './types';

// @ts-ignore
import startNewBuild from '../../../axios/startNewBuild';

import './PopUpBox.scss';

const PopUpBox: React.FC<popUpBoxProps> = ({
  popUpAdditionalClass,
  togglePopUp,
  onSubmit,
  register,
  setValue,
  setFocus,
  errors,
  isRequestInProgress,
}) => (
  <div className={`PopUpBox ${popUpAdditionalClass}`}>
    <div className="PopUpBox-Titles">
      <h2 className="PopUpBox-Titles-MainTitle fontType_subhead">New build</h2>
      <h3 className="PopUpBox-Titles-InfoTitle">
        Enter&nbsp;the&nbsp;commit&nbsp;hash which&nbsp;you&nbsp;want&nbsp;to&nbsp;build.
      </h3>
    </div>
    <form onSubmit={onSubmit} className="PopUpBox-Form Form">
      <div className="PopUpBox-Form-Inputs Form-Inputs">
        <FormTextField
          register={register}
          name="commitHash"
          placeholder="Commit hash"
          validators={{ required: 'This field is required' }}
          setValue={setValue}
          setFocus={setFocus}
          errors={errors.commitHash}
        />
      </div>
      <div className={`Form-ButtonsBlock ${isRequestInProgress && 'Form-ButtonsBlock_disabled'}`}>
        <button
          disabled={isRequestInProgress}
          type="submit"
          className="Button Button_bigger Button_color_yellow Button_onMobile_wider"
        >
          Run build
        </button>
        <button
          type="button"
          disabled={isRequestInProgress}
          onClick={togglePopUp}
          className="Button Button_bigger Button_onMobile_wider"
        >
          Cancel
        </button>
        {isRequestInProgress && <Loader />}
      </div>
    </form>
  </div>
);

const PopUpBoxContainer: React.FC<popUpBoxContainerProps> = ({ popUpAdditionalClass, togglePopUp }) => {
  const [isRequestInProgress, setIsRequestInProgress] = React.useState(false);
  const { register, handleSubmit, formState, setValue, setFocus, setError } = useForm<formData>({
    mode: 'onTouched',
  });
  const history = useHistory();
  const onSubmit = handleSubmit(async (data) => {
    setIsRequestInProgress(true);
    const { status, data: build } = await startNewBuild(data.commitHash);
    setIsRequestInProgress(false);
    if (status !== 200) {
      setError('commitHash', { type: 'manual', message: 'Wrong commit hash' });
    } else {
      history.push(`/build/${build.id}`);
    }
  });
  return (
    <PopUpBox
      popUpAdditionalClass={popUpAdditionalClass}
      togglePopUp={togglePopUp}
      onSubmit={onSubmit}
      register={register}
      setValue={setValue}
      setFocus={setFocus}
      errors={formState.errors}
      isRequestInProgress={isRequestInProgress}
    />
  );
};

export default connect(null)(PopUpBoxContainer);
