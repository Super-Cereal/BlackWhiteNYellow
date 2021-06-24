import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../Header&Footer/Header/Header';
import Card from './../common/Card/Card';

import { buildProps } from './types';

const BuildDetails: React.FC<buildProps> = ({ logsText, repoName, build }) => {
  const buttons = (
    <>
      <button className="Button Button_withIcon Button_withIcon_rebuild Button_onMobile_removeText">
        <span className="Button-Text">Rebuild</span>
      </button>
      <Link
        to="/settings"
        className="Button Button_withIcon Button_withIcon_settings"
      ></Link>
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
          <pre dangerouslySetInnerHTML={{ __html: logsText }}></pre>
        </div>
      </div>
    </>
  );
};

export default BuildDetails;
