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
  const buttons = (
    <>
      <button className="Button Button_withIcon Button_withIcon_rebuild Button_onMobile_removeText">
        <span className="Button-Text">Rebuild</span>
      </button>
      <button className="Button Button_withIcon Button_withIcon_settings"></button>
    </>
  );
  return (
    <>
      <Header titleText={titleText} headerType={headerType} buttons={buttons} />
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
          <pre dangerouslySetInnerHTML={{ __html: logsText }}></pre>
        </div>
      </div>
    </>
  );
};

export default BuildDetails;
