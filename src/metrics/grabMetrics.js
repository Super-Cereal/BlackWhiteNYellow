import Counter from './send';

export function grabMetrics(pageName = 'send test') {
  console.log('grabbed ' + pageName);

  let counter = new Counter();

  counter.init('939b68fc-2484-456b-9279-e6c8f56df648', String(Math.random()).substr(2, 12), pageName);
  counter.setAdditionalParams({
    env: 'production',
    platform: 'touch',
  });

  sendNavigationTiming(counter);

  sendNavigatorInfo(counter);

  return {
    counter,
    clearWatchers: () => {},
  };
}

const sendNavigationTiming = (counter) => {
  const n = performance.getEntriesByType('navigation')[0];
  const responseStart = n.responseStart;
  const responseEnd = n.responseEnd;
  // We cache the navigation time for future times
  // fetchStart marks when the browser starts to fetch a resource
  // responseEnd is when the last byte of the response arrives
  counter.send('fetchTime', responseEnd - n.fetchStart);
  // Request plus response time (network only)
  counter.send('totalTime', responseEnd - n.requestStart);
  // Connection time
  counter.send('connect', n.connectEnd - n.connectStart);
  // Response time only (download)
  counter.send('downloadTime', responseEnd - responseStart);
  // Time to First Byte (TTFB)
  counter.send('timeToFirstByte', responseStart - n.requestStart);
  // HTTP header size
  counter.send('headerSize', n.transferSize - n.encodedBodySize || 0);
};

const sendNavigatorInfo = (counter) => {
  counter.send('deviceMemory', navigator.deviceMemory || 0);
  counter.send('hardwareConcurrency', navigator.hardwareConcurrency || 0);

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  counter.send('mobileDevices', Number(isMobile));
  const isTouchAvailable =
    'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
  counter.send('touchDevices', Number(isTouchAvailable));
};

export default grabMetrics;
