import Convert from 'ansi-to-html';

function quantile(arr, q) {
  const sorted = arr.sort((a, b) => a - b);
  const pos = (sorted.length - 1) * q;
  const base = Math.floor(pos);
  const rest = pos - base;

  if (sorted[base + 1] !== undefined) {
    return Math.floor(sorted[base] + rest * (sorted[base + 1] - sorted[base]));
  } else {
    return Math.floor(sorted[base]);
  }
}

function prepareData(result) {
  return result.data.map((item) => {
    item.date = item.timestamp.split('T')[0];

    return item;
  });
}

// // показать значение метрики за несколько день
// function showMetricByPeriod(...) {
// }

// // показать сессию пользователя
// function showSession(...) {
// }

// // сравнить метрику в разных срезах
// function compareMetric(...) {
// }

// рассчитать метрику за выбранный день
function calcMetricByDate(data, page, name, date) {
  let sampleData = data
    .filter((item) => item.page === page && item.name === name && item.date === date)
    .map((item) => item.value);

  return (
    `\u001b[31m${date}\u001b[0m \u001b[1m${name}:\u001b[0m\t` +
    `p25=\u001b[33m${quantile(sampleData, 0.25)}\u001b[0m p50=\u001b[33m${quantile(
      sampleData,
      0.5
    )}\u001b[0m ` +
    `p75=\u001b[33m${quantile(sampleData, 0.75)}\u001b[0m p95=\u001b[33m${quantile(
      sampleData,
      0.95
    )}\u001b[0m ` +
    `hits=\u001b[33m${sampleData.length}\u001b[0m`
  );
}

function calcMetricByDateProcents(data, page, name, date) {
  let isTrue = 0;

  const sampleData = data.filter((item) => {
    if (item.page === page && item.name === name && item.date === date) {
      if (item.value) isTrue += 1;
      return true;
    }
    return false;
  });

  const value = (isTrue / sampleData.length).toFixed(1);

  return (
    `\u001b[31m${date}\u001b[0m \u001b[1m${name}:\u001b[0m\t` +
    `\u001b[33m${value}%\u001b[0m hits=\u001b[33m${sampleData.length}\u001b[0m`
  );
}

const getStats = async (pageName = 'send test') => {
  const result = await fetch(
    'https://shri.yandex/hw/stat/data?counterId=939b68fc-2484-456b-9279-e6c8f56df648'
  ).then((res) => res.json());

  const convert = new Convert();

  return pageName === 'full app'
    ? convert.toHtml(getFullAppStats(result, pageName))
    : convert.toHtml(getNormalPageStats(result, pageName));
};

const getNormalPageStats = (result, pageName) => {
  const metricsNames = [
      'fetchTime',
      'totalTime',
      'connect',
      'headerSize',
      'downloadTime',
      'timeToFirstByte',
      'deviceMemory',
      'hardwareConcurrency',
    ],
    metricsNamesForProcents = ['mobileDevices', 'touchDevices'],
    allMetrics = [];

  const data = prepareData(result),
    date = '2021-07-10';

  metricsNames.forEach((name) => {
    allMetrics.push(calcMetricByDate(data, pageName, name, date));
  });
  metricsNamesForProcents.forEach((name) => {
    allMetrics.push(calcMetricByDateProcents(data, pageName, name, date));
  });

  return allMetrics.join('\n');
  // добавить свои сценарии, реализовать функции выше
  // ...
};

const getFullAppStats = (result, pageName) => {
  const metricsNames = ['pageVisible', 'resourcesLoadingTime'],
    metricsNamesForProcents = [],
    allMetrics = [];

  const data = prepareData(result),
    date = '2021-07-10';

  metricsNames.forEach((name) => {
    allMetrics.push(calcMetricByDate(data, pageName, name, date));
  });
  metricsNamesForProcents.forEach((name) => {
    allMetrics.push(calcMetricByDateProcents(data, pageName, name, date));
  });

  return allMetrics.join('\n');
  // добавить свои сценарии, реализовать функции выше
  // ...
};

export default getStats;
