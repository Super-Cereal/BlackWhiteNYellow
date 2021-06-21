import React from 'react';

import Header from '../Header&Footer/Header/Header';
import Card from '../common/Card/Card';

import { buildHistoryProps } from './types';

import FormTextField from '../common/FormFields/FormTextField/FormTextField';

import { useForm } from 'react-hook-form';

const BuildHistory: React.FC<buildHistoryProps> = ({
  popUpAdditionalClass,
  togglePopUp,
}) => {
  const cards = [
    <Card
      status="success"
      buildNumber="5122"
      commitText="smthing really important in this commitText dada yesyes"
      commitBranch="master"
      commitShortHash="b4636ab"
      commitAuthor="Philip Kirkorov"
      date="21 jun, 03:06"
      period="1 h 20 min"
      key="0"
    />,
    <Card
      status="failed"
      buildNumber="5122"
      commitText="smthing really important in this commitText dada yesyes"
      commitBranch="master"
      commitShortHash="b4636ab"
      commitAuthor="Philip Kirkorov"
      date="21 jun, 03:06"
      period="1 h 20 min"
      key="1"
    />,
    <Card
      status="waiting"
      buildNumber="5122"
      commitText="smthing really important in this commitText dada yesyes"
      commitBranch="master"
      commitShortHash="b4636ab"
      commitAuthor="Philip Kirkorov"
      date="21 jun, 03:06"
      period="1 h 20 min"
      key="2"
    />,
    <Card
      status="success"
      buildNumber="5122"
      commitText="smthing really important in this commitText dada yesyes"
      commitBranch="master"
      commitShortHash="b4636ab"
      commitAuthor="Philip Kirkorov"
      date="21 jun, 03:06"
      period="1 h 20 min"
      key="4"
    />,
    <Card
      status="failed"
      buildNumber="5122"
      commitText="smthing really important in this commitText dada yesyes"
      commitBranch="master"
      commitShortHash="b4636ab"
      commitAuthor="Philip Kirkorov"
      date="21 jun, 03:06"
      period="1 h 20 min"
      key="5"
    />,
    <Card
      status="waiting"
      buildNumber="5122"
      commitText="smthing really important in this commitText dada yesyes"
      commitBranch="master"
      commitShortHash="b4636ab"
      commitAuthor="Philip Kirkorov"
      date="21 jun, 03:06"
      period="1 h 20 min"
      key="6"
    />,
    <Card
      status="success"
      buildNumber="5122"
      commitText="smthing really important in this commitText dada yesyes"
      commitBranch="master"
      commitShortHash="b4636ab"
      commitAuthor="Philip Kirkorov"
      date="21 jun, 03:06"
      period="1 h 20 min"
      key="7"
    />,
    <Card
      status="failed"
      buildNumber="5122"
      commitText="smthing really important in this commitText dada yesyes"
      commitBranch="master"
      commitShortHash="b4636ab"
      commitAuthor="Philip Kirkorov"
      date="21 jun, 03:06"
      period="1 h 20 min"
      key="8"
    />,
    <Card
      status="waiting"
      buildNumber="5122"
      commitText="smthing really important in this commitText dada yesyes"
      commitBranch="master"
      commitShortHash="b4636ab"
      commitAuthor="Philip Kirkorov"
      date="21 jun, 03:06"
      period="1 h 20 min"
      key="9"
    />,
  ];
  const buttons = (
    <>
      <button
        onClick={togglePopUp}
        className="Button Button_withIcon Button_withIcon_run Button_onMobile_removeText"
      >
        <span className="Button-Text">Run Build</span>
      </button>
      <button className="Button Button_withIcon Button_withIcon_settings"></button>
    </>
  );
  return (
    <>
      <PopUpBox popUpAdditionalClass={popUpAdditionalClass} togglePopUp={togglePopUp} />
      <Header
        titleText={'Ma_Name/Repository_Name'}
        headerType={'BuildHistory'}
        buttons={buttons}
      />
      <div className="BuildHistory Page">
        <div className="BuildHistory-Cards">{cards}</div>
        <button className="BuildHistory-Button Button Button_onMobile_wider">
          <span className="Button-Text">Show more</span>
        </button>
      </div>
    </>
  );
};

const PopUpBox: React.FC<buildHistoryProps> = ({ popUpAdditionalClass, togglePopUp }) => {
  type FormData = {
    commitHash: string;
  };
  const { register, handleSubmit, formState, setValue } = useForm<FormData>();
  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });
  return (
    <div className={`PopUpBox ${popUpAdditionalClass}`}>
      <div className="PopUpBox-Titles">
        <h2 className="PopUpBox-Titles-MainTitle fontType_subhead">New build</h2>
        <h3 className="PopUpBox-Titles-InfoTitle">
          Enter&nbsp;the&nbsp;commit&nbsp;hash
          which&nbsp;you&nbsp;want&nbsp;to&nbsp;build.
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
          <button
            type="submit"
            className="Button Button_bigger Button_color_yellow Button_onMobile_wider"
          >
            Run build
          </button>
          <button
            onClick={togglePopUp}
            className="Button Button_bigger Button_onMobile_wider"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default BuildHistory;
