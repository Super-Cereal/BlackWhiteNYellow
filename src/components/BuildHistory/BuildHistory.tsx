import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../Header&Footer/Header/Header';
import Card from '../common/Card/Card';
import PopUpBoxContainer from './PopUpBox';

import { buildHistoryProps, popUpBoxBuildProps } from './types';

const BuildHistory: React.FC<buildHistoryProps & popUpBoxBuildProps> = ({
  repoName,
  popUpAdditionalClass,
  togglePopUp,
  builds,
}) => {
  const cards = builds.map((v) => (
    <Link to={`/build/${v.id}`}>
      <Card
        status={v.status}
        buildNumber={v.buildNumber}
        commitText={v.commitMessage}
        commitBranch={v.branchName}
        commitHash={v.commitHash}
        commitAuthor={v.authorName}
        date={v.start}
        period={v.duration}
        key={v.id}
      />
    </Link>
  ));
  const buttons = (
    <>
      <button
        onClick={togglePopUp}
        className="Button Button_withIcon Button_withIcon_run Button_onMobile_removeText"
      >
        <span className="Button-Text">Run Build</span>
      </button>
      <Link
        to="settings"
        className="Button Button_withIcon Button_withIcon_settings"
      ></Link>
    </>
  );
  return (
    <>
      <PopUpBoxContainer
        popUpAdditionalClass={popUpAdditionalClass}
        togglePopUp={togglePopUp}
      />
      <Header titleText={repoName} headerType={'BuildHistory'} buttons={buttons} />
      <div className="BuildHistory Page">
        <div className="BuildHistory-Cards">{cards}</div>
        <button className="BuildHistory-Button Button Button_onMobile_wider">
          <span className="Button-Text">Show more</span>
        </button>
      </div>
    </>
  );
};

export default BuildHistory;
