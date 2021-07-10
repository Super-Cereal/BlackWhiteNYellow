import React from 'react';
import { useHistory } from 'react-router-dom';

import Loader from '../common/Loader/Loader';
import Header from '../Header/Header';
// @ts-ignore
import getStats from '../../metrics/stats';

import './MetricsPage.scss';

const MetricsPage: React.FC = () => {
  const pageNames = ['full app', 'start screen', 'settings', 'build history', 'build details'];
  const [curPage, setCurPage] = React.useState<string>(pageNames[0]);
  const choosePageSpans = pageNames.map((name) => (
    <span
      key={name}
      onClick={() => setCurPage(name)}
      className={`MetricsPage-AvailablePage ${curPage === name ? 'MetricsPage-AvailablePage_choosenOne' : ''}`}
    >
      {name}
    </span>
  ));

  const [allMetrics, setAllMetrics] = React.useState<string>('');
  const [isFetching, setIsFetching] = React.useState<boolean>(true);

  React.useEffect(() => {
    setIsFetching(true);
    getStats(curPage).then((metrics: string) => {
      setAllMetrics(metrics);
      setIsFetching(false);
    });
  }, [curPage]);

  const history = useHistory();
  const buttons = (
    <>
      <button onClick={() => history.push('/')} className="Button">
        <span className="Button-Text">Start screen</span>
      </button>
      <button
        onClick={() => history.push('/settings')}
        className="Button Button_withIcon Button_withIcon_settings Button_onMobile_removeText"
        data-testid="StartScreen-HeaderLinkToSettings"
      >
        <span className="Button-Text">Settings</span>
      </button>
    </>
  );

  return (
    <>
      <Header titleText={'School CI server Metrics'} headerType={'StartScreen'} buttons={buttons} />

      <div className="MetricsPage Page">
        <div className="MetricsPage-AvailablePages">{choosePageSpans}</div>
        {isFetching ? (
          <Loader />
        ) : (
          <pre className="MetricsPage-Metrics" dangerouslySetInnerHTML={{ __html: allMetrics }}></pre>
        )}
      </div>
    </>
  );
};

export default MetricsPage;
