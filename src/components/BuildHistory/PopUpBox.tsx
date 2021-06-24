import React from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

import FormTextField from './../common/FormFields/FormTextField/FormTextField';
import { popUpBoxContainerProps } from './types';

// @ts-ignore
import { axiosStartNewBuild } from '../../redux/buildHistory/buildHistoryActions';

const PopUpBox: React.FC<popUpBoxContainerProps> = ({ popUpAdditionalClass, togglePopUp, axiosStartNewBuild }) => {
  const { register, handleSubmit, formState, setValue, setError } = useForm<{
    commitHash: string;
  }>({
    mode: 'onTouched',
  });
  const history = useHistory();
  const onSubmit = handleSubmit(async (data) => {
    const { status, data: build } = await axiosStartNewBuild(data.commitHash);
    if (status !== 200) {
      setError('commitHash', { type: 'manual', message: 'Wrong commit hash' });
    } else {
      history.push(`/build/${build.id}`);
    }
  });
  return (
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
            errors={formState.errors.commitHash}
          />
        </div>
        <div className="Form-ButtonsBlock">
          <button type="submit" className="Button Button_bigger Button_color_yellow Button_onMobile_wider">
            Run build
          </button>
          <button onClick={togglePopUp} className="Button Button_bigger Button_onMobile_wider">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

const PopUpBoxContainer: React.FC<popUpBoxContainerProps> = ({
  popUpAdditionalClass,
  togglePopUp,
  axiosStartNewBuild,
}) => {
  return (
    <PopUpBox
      popUpAdditionalClass={popUpAdditionalClass}
      togglePopUp={togglePopUp}
      axiosStartNewBuild={axiosStartNewBuild}
    />
  );
};

export default connect(null, { axiosStartNewBuild })(PopUpBoxContainer);
