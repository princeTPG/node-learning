import cluster from 'cluster';
import OS from 'os';
import { mongooseConnect } from './services/mongoose';
import { startServer } from './services/express';

import router from './api';
import { PORT } from './constants/environments';
import logger from './utils/logger';

const totalNumOfCPUs = OS.cpus().length;
const processId = process.pid;

if (cluster.isMaster) {
  logger.info(`Master process with Id ${process.pid} is running...`);

  // creating new workers
  for (let i = 0; i < totalNumOfCPUs; i += 1) {
    const worker = cluster.fork();

    worker.on('exit', (code, signal) => {
      if (signal) {
        logger.warn(`worker was killed by signal: ${signal}`);
      } else if (code !== 0) {
        logger.error(`worker exited with error code: ${code}`);
      } else {
        logger.info('worker success!');
      }
    });
  }

  cluster.on('exit', (worker) => {
    logger.warn(`worker ${worker.process.pid} died`);
  });
} else {
  mongooseConnect();
  startServer(router, PORT, processId);
}
