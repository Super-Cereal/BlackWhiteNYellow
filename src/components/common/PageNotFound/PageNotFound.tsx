import React from 'react';
import Header from '../../Header/Header';

const PageNotFound: React.FC = () => (
  <>
    <Header titleText="School CI Server" headerType="Settings" />
    <div className="Page">
      <span data-testid='page404'>404</span>
    </div>
  </>
);

export default PageNotFound;
