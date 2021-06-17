import React from 'react';

import Header from '../Header&Footer/Header/Header';
import Card from '../common/Card/Card';

const BuildHistory = (): JSX.Element => {
  const cards = [
    <Card
      cardPerfomance="leftToRight"
      status="success"
      buildNumber="5122"
      commitText="smthing really important in this commitText dada yesyes"
      commitBranch="master"
      commitShortHash="b4636ab"
      commitAuthor="Philip Kirkorov"
      date="21 янв, 03:06"
      period="1 ч 20 мин"
      key="0"
    />,
    <Card
      cardPerfomance="leftToRight"
      status="success"
      buildNumber="5122"
      commitText="smthing really important in this commitText dada yesyes"
      commitBranch="master"
      commitShortHash="b4636ab"
      commitAuthor="Philip Kirkorov"
      date="21 янв, 03:06"
      period="1 ч 20 мин"
      key="0"
    />,
    <Card
      cardPerfomance="leftToRight"
      status="success"
      buildNumber="5122"
      commitText="smthing really important in this commitText dada yesyes"
      commitBranch="master"
      commitShortHash="b4636ab"
      commitAuthor="Philip Kirkorov"
      date="21 янв, 03:06"
      period="1 ч 20 мин"
      key="0"
    />,
  ];
  return (
    <>
      <Header titleText={'Ma_Name/Repository_Name'} headerType={'BuildHistory'} />
      <div className="BuildHistory">
        <div className="BuildHistory-Cards">{cards}</div>
        <button className="Button Button_onMobile_wider">
          <span className="Button-Text">Show more</span>
        </button>
      </div>
    </>
  );
};

export default BuildHistory;
