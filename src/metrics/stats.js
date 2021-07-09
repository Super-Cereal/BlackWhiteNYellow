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
    `p25=\u001b[33m${quantile(sampleData, 0.25)}\u001b[0m p50=\u001b[33m${quantile(sampleData, 0.5)}\u001b[0m ` +
    `p75=\u001b[33m${quantile(sampleData, 0.75)}\u001b[0m p95=\u001b[33m${quantile(sampleData, 0.95)}\u001b[0m ` +
    `hits=\u001b[33m${sampleData.length}\u001b[0m`
  );
}

const getStats = (pageName = 'send test') =>
  fetch('https://shri.yandex/hw/stat/data?counterId=939b68fc-2484-456b-9279-e6c8f56df648')
    .then((res) => res.json())
    .then((result) => {
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
        allMetrics = [];

      const data = prepareData(result);

      metricsNames.forEach((name) => {
        allMetrics.push(calcMetricByDate(data, pageName, name, '2021-07-09'));
      });

      const convert = new Convert();

      return convert.toHtml(allMetrics.join('\n'));
      // добавить свои сценарии, реализовать функции выше
      // ...
    });

export default getStats;
