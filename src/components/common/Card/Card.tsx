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
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let time, day, month;
  if (date) {
    let [datestamp, timestamp] = date.split('T');
    time = timestamp.slice(0, timestamp.lastIndexOf(':'));
    [, month, day] = datestamp.split('-');
  }
  let hours,
    minutes,
    seconds,
    periodOfBuild = '';
  if (period) {
    hours = Math.floor(period / 3600000);
    minutes = Math.floor(period / 60000) % 60;
    seconds = Math.floor(period / 1000) % 60;
    if (hours && minutes) periodOfBuild += `${hours} h, `;
    if (minutes) periodOfBuild += `${minutes} min, `;
    if (!hours) periodOfBuild += `${seconds} sec`;
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
          <div className="Card-DateInfo-Period">{periodOfBuild}</div>
        </div>
      )}
    </div>
  );
};

export default Card;
