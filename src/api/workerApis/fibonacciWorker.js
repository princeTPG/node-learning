import { parentPort } from 'worker_threads';

function getFibonacciSeries(number) {
  const arr = [];
  let a = 0;
  let b = 1;
  let sum = 0;

  while (sum <= number) {
    arr.push(sum);
    a = b;
    b = sum;
    sum = a + b;
  }
  return arr;
}

parentPort.on('message', (data) => {
  parentPort.postMessage({ num: data.num, data: getFibonacciSeries(data.num) });
});
