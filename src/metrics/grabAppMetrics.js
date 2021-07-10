import Counter from './send';

export function grabAppMetrics() {
  console.log('grabbed full app');

  let counter = new Counter();

  counter.init('939b68fc-2484-456b-9279-e6c8f56df648', String(Math.random()).substr(2, 12), 'full app');
  counter.setAdditionalParams({
    env: 'production',
    platform: 'touch',
  });

  const unwatchPageVisablity = watchPageVisablility(counter);
  const unwatchResourcesLoaded = watchResourcesLoaded(counter);

  return {
    counter,
    clearWatchers: () => {
      unwatchPageVisablity();
      unwatchResourcesLoaded();
    },
  };
}

const watchResourcesLoaded = (counter) => {
  const sendListener = sendResourcesLoadedTime(counter);
  window.addEventListener('load', sendListener);

  return () => {
    window.removeEventListener('load', sendListener);
  };
};

const sendResourcesLoadedTime = (counter) => {
  const n = performance.getEntriesByType('navigation')[0];

  counter.send('resourcesLoadingTime', performance.now() - n.requestStart);
};

const watchPageVisablility = (counter) => {
  const now = performance.now();
  const visInfo = { isVisible: false, timeInvisible: 0, lastMark: now, startWatching: now };

  const handleListener = handleVisibilityChange(visInfo);
  document.addEventListener('visibilitychange', handleListener);

  const sendListener = sendVisabilityInfo(counter, visInfo);
  window.addEventListener('beforeunload', sendListener);
  return () => {
    window.removeEventListener('visibilitychange', handleListener);
    window.removeEventListener('beforeunload', sendListener);
  };
};

const handleVisibilityChange = (visInfo) => () => {
  const VS = document.visibilityState;
  const isVisibleNow = (VS === 'visible') | (VS === 'unload');

  if (visInfo.isVisible === isVisibleNow) return;

  const timestamp = performance.now();
  visInfo.timeInvisible += timestamp - visInfo.lastMark;
  visInfo.isVisible = isVisibleNow;
  visInfo.lastMark = timestamp;
};

const sendVisabilityInfo = (counter, visInfo) => () => {
  const timeVisibleProcents = Math.round(
    (1 - visInfo.timeInvisible / (performance.now() - visInfo.startWatching)) * 100
  );
  counter.send('pageVisible', timeVisibleProcents);
};

export default grabAppMetrics;
