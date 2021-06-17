import React from 'react';

import { CardProps } from '../types';

const Card = ({
  cardPerfomance,
  status,
  buildNumber,
  commitText,
  commitBranch,
  commitShortHash,
  commitAuthor,
  date,
  period,
}: CardProps): JSX.Element => (
  <div className={`Card Card_${status} Card_${cardPerfomance}`}>
    <div className="Card-Data">
      <div className="Card-Data-InfoBlock">
        <div>
          <div className="Card-Data-InfoBlock-BuildNumber">{`#${buildNumber}`}</div>
          <div className="Card-Data-InfoBlock-CommitText">{commitText}</div>
        </div>
        <div>
          <div className="Card-Data-InfoBlock-Branch">{commitBranch}</div>
          <div className="Card-Data-InfoBlock-CommitHash">{commitShortHash}</div>
          <div className="Card-Data-InfoBlock-AuthorName">{commitAuthor}</div>
        </div>
      </div>
      <div className="Card-Data-DateBlock">
        <div className="Card-Data-DateBlock-Date">{date}</div>
        <div className="Card-Data-DateBlock-Period">{period}</div>
      </div>
    </div>
  </div>
);

export default Card;
