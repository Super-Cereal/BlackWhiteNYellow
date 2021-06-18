import React from 'react';

import Header from '../Header&Footer/Header/Header';
import Card from './../common/Card/Card';

type BuildProps = {
  logsText: string;
  repoName: string;
  authorName: string;
};

const BuildDetails: React.FC<BuildProps> = ({ logsText, authorName, repoName }) => {
  const titleText = `${authorName}/${repoName}`;
  const headerType = 'BuildDetails';
  return (
    <>
      <Header titleText={titleText} headerType={headerType} />
      <div className="BuildDetails Page">
        <Card
          isStatic={true}
          status="success"
          buildNumber="5122"
          commitText="smthing really important in this commitText dada yesyes"
          commitBranch="master"
          commitShortHash="b4636ab"
          commitAuthor="Philip Kirkorov"
          date="21 янв, 03:06"
          period="1 ч 20 мин"
        />
        <div className="BuildDetails-Logs">
          <pre>{logsText}</pre>
        </div>
      </div>
    </>
  );
};

export default BuildDetails;
