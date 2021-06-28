import React from 'react';

import { CardProps } from '../types';

import './Card.scss';

const Card: React.FC<CardProps> = ({
  status,
  buildNumber,
  commitText,
  commitBranch,
  commitHash,
  commitAuthor,
  date,
  period,
  isStatic = false,
}) => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  let time, day, month;
  if (date) {
    let [dateP, time] = date.split('T');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    time = time.substr(0, time.lastIndexOf(':'));
    // prettier-ignore
    [, month, day] = dateP.split('-');
  }
  return (
    <div className={`Card Card_${status.toLowerCase()} Card_static_${isStatic}`}>
      <div className="Card-InfoWrapper">
        <div className="Card-NumberNText">
          <div className={`Card-BuildNumber Card-BuildNumber_${status.toLowerCase()} fontType_subhead`}>
            {'#' + buildNumber}
          </div>
          <div className="Card-CommitText fontType_caption">{commitText}</div>
        </div>
        <div className="Card-CommitNAuthor">
          <div className="Card-CommitInfo">
            <div className="Card-CommitInfo-Branch">{commitBranch}</div>
            <div className="Card-CommitInfo-CommitHash">{commitHash}</div>
          </div>
          <div className="Card-AuthorName">{commitAuthor}</div>
        </div>
      </div>
      {date && period && (
        <div className="Card-DateInfo">
          <div className="Card-DateInfo-Date">{`${day} ${months[Number(month) - 1]}, ${time}`}</div>
          <div className="Card-DateInfo-Period">{period}</div>
        </div>
      )}
    </div>
  );
};

export default Card;
