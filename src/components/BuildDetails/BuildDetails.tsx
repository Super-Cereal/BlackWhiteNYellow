import React from 'react';

import Header from '../Header&Footer/Header/Header';
import Card from './../common/Card/Card';

const BuildDetails = (): JSX.Element => {
  const titleText = 'Ma_Name/Repository_Name';
  const headerType = 'BuildDetails';
  return (
    <>
      <Header titleText={titleText} headerType={headerType} />
      <div className="BuildDetails">
        <div className="BuildDetails-CardWrapper">
          <Card
            cardPerfomance="topToBottom"
            status="success"
            buildNumber="5122"
            commitText="smthing really important in this commitText dada yesyes"
            commitBranch="master"
            commitShortHash="b4636ab"
            commitAuthor="Philip Kirkorov"
            date="21 янв, 03:06"
            period="1 ч 20 мин"
          />
        </div>
        <div className="BuildDetails-Logs">logs; many logs; A LOT OF LOGS; REALLY MNOGO OF LOGS</div>
      </div>
    </>
  );
};

export default BuildDetails;
