import React from 'react';

import Header from '../Header&Footer/Header/Header';
import Card from '../common/Card/Card';

const BuildHistory = (): JSX.Element => {
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
  ];
  return (
    <>
      <Header titleText={'Ma_Name/Repository_Name'} headerType={'BuildHistory'} />
      <div className="BuildHistory Page">
        <div className="BuildHistory-Cards">{cards}</div>
        <button className="Button Button_onMobile_wider">
          <span className="Button-Text">Show more</span>
        </button>
      </div>
    </>
  );
};

export default BuildHistory;
