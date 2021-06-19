import React from 'react';

import Header from '../Header&Footer/Header/Header';
import Card from '../common/Card/Card';

const BuildHistory: React.FC = () => {
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
      <button className="Button Button_withIcon Button_withIcon_run Button_onMobile_removeText">
        <span className="Button-Text">Run Build</span>
      </button>
      <button className="Button Button_withIcon Button_withIcon_settings"></button>
    </>
  );
  return (
    <>
      <Header titleText={'Ma_Name/Repository_Name'} headerType={'BuildHistory'} buttons={buttons} />
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
