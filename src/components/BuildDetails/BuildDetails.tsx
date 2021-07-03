import React from 'react';
import { useHistory } from 'react-router-dom';

import Header from '../Header/Header';
import Card from './../common/Card/Card';

import { buildProps } from './types';

import './BuildDetails.scss';

const BuildDetails: React.FC<buildProps> = ({ rebuild, repoName, build }) => {
  const history = useHistory()
  const buttons = (
    <>
      <button
        disabled={rebuild.isRebuildInProgress}
        onClick={rebuild.onRebuild}
        className="Button Button_withIcon Button_withIcon_rebuild Button_onMobile_removeText"
      >
        <span className="Button-Text">Rebuild</span>
      </button>
      <button onClick={() => history.push("/settings")} className="Button Button_withIcon Button_withIcon_settings"></button>
    </>
  );
  return (
    <>
      <Header titleText={repoName} headerType={'BuildDetails'} buttons={buttons} />
      <div className="BuildDetails Page">
        <Card
          status={build.status}
          buildNumber={build.buildNumber}
          commitText={build.commitMessage}
          commitBranch={build.branchName}
          commitHash={build.commitHash}
          commitAuthor={build.authorName}
          date={build.start}
          period={build.duration}
          key={build.id}
          isStatic={true}
        />
        <div className="BuildDetails-Logs">
          <pre dangerouslySetInnerHTML={{ __html: build.logsText }}></pre>
        </div>
      </div>
    </>
  );
};

export default BuildDetails;
