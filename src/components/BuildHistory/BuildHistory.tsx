import React from 'react';
import { useHistory, Link } from 'react-router-dom';

import Header from '../Header/Header';
import PopUpBoxContainer from './PopUpBox/PopUpBox';
import Loader from '../common/Loader/Loader';
import Card from '../common/Card/Card';

import usePopUpToggler from './PopUpBox/usePopUpToggler';

import { buildHistoryProps } from './types';

import './BuildHistory.scss';

const BuildHistory: React.FC<buildHistoryProps> = ({ repoName, builds, onShowMore, isFetching }) => {
  const [popUpIsShown, togglePopUp] = usePopUpToggler(false);
  const history = useHistory();
  const cards = builds.map((v) => (
    <Link data-testid="linkToBuildDetails" to={`/build/${v.id}`} key={v.id}>
      <Card
        status={v.status}
        buildNumber={v.buildNumber}
        commitText={v.commitMessage}
        commitBranch={v.branchName}
        commitHash={v.commitHash}
        commitAuthor={v.authorName}
        date={v.start}
        period={v.duration}
      />
    </Link>
  ));
  const buttons = (
    <>
      <button data-testid='BuildHistory-runBuildButton' onClick={togglePopUp} className="Button Button_withIcon Button_withIcon_run Button_onMobile_removeText">
        <span className="Button-Text">Run Build</span>
      </button>
      <button
        onClick={() => history.push(`/settings`)}
        className="Button Button_withIcon Button_withIcon_settings"
      ></button>
    </>
  );
  return (
    <>
      {popUpIsShown && <PopUpBoxContainer togglePopUp={togglePopUp} />}
      <Header titleText={repoName} headerType={'BuildHistory'} buttons={buttons} />
      <div className="BuildHistory Page" data-testid="BuildHistory">
        <div className="BuildHistory-Cards">
          {cards}
          {isFetching && <Loader />}
        </div>
        <button data-testid="showMoreButton" onClick={onShowMore} className="BuildHistory-Button Button Button_onMobile_wider">
          <span className="Button-Text">Show more</span>
        </button>
      </div>
    </>
  );
};

export default BuildHistory;
