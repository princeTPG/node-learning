import { Worker } from 'worker_threads';
import isNaN from 'lodash/isNaN';

import { errorHandler, successHandler } from '../../utils/responseHandlers';

// eslint-disable-next-line consistent-return
export const getFibonacciSeries = (req, res) => {
  try {
    let { num } = req.params;
    num = parseInt(num, 10);

    if (isNaN(num)) {
      return errorHandler(res, { message: 'Please provide a valid number' });
    }

    const fibonacciWorker = new Worker('./src/api/workerApis/fibonacciWorker.js');

    fibonacciWorker.postMessage({ num });

    fibonacciWorker.once('message', (result) => {
      fibonacciWorker.terminate();
      successHandler(res, result);
    });

    fibonacciWorker.on('error', (error) => errorHandler(res, error));
  } catch (err) {
    errorHandler(res, err);
  }
};

export default {
  getFibonacciSeries,
};
