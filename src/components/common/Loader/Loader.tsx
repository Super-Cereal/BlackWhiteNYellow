import React from 'react';

import './Loader.scss';

const Loader: React.FC<{ testid?: string }> = ({ testid }) => (
  <div className="Loader" data-testid={testid}>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default Loader;
