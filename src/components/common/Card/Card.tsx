import React from 'react';

import { CardProps } from '../types';

const Card = ({
  status,
  buildNumber,
  commitText,
  commitBranch,
  commitShortHash,
  commitAuthor,
  date,
  period,
  isStatic = false,
}: CardProps): JSX.Element => (
  <div className={`Card Card_${status} Card_static_${isStatic}`}>
    <div>
      <div className="Card-NumberNText">
        <div className={`Card-BuildNumber Card-BuildNumber_${status} fontType_subhead`}>{'#' + buildNumber}</div>
        <div className="Card-CommitText fontType_caption">{commitText}</div>
      </div>
      <div className="Card-CommitNAuthor">
        <div className="Card-CommitInfo">
          <div className="Card-CommitInfo-Branch">{commitBranch}</div>
          <div className="Card-CommitInfo-CommitHash">{commitShortHash}</div>
        </div>
        <div className="Card-AuthorName">{commitAuthor}</div>
      </div>
    </div>
    <div className="Card-DateInfo">
      <div className="Card-DateInfo-Date">{date}</div>
      <div className="Card-DateInfo-Period">{period}</div>
    </div>
  </div>
);

export default Card;
