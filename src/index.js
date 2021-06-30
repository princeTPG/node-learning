import cluster from 'cluster';
import OS from 'os';
import { mongooseConnect } from './services/mongoose';
import { startServer } from './services/express';

import router from './api';
import { PORT } from './constants/environments';

const totalNumOfCPUs = OS.cpus().length;
const processId = process.pid;

if (cluster.isMaster) {
  // eslint-disable-next-line no-console
  console.log(`Master process with Id ${process.pid} is running...`);

  // creating new workers
  for (let i = 0; i < totalNumOfCPUs; i += 1) {
    const worker = cluster.fork();

    worker.on('exit', (code, signal) => {
      if (signal) {
        // eslint-disable-next-line no-console
        console.log(`worker was killed by signal: ${signal}`);
      } else if (code !== 0) {
        // eslint-disable-next-line no-console
        console.log(`worker exited with error code: ${code}`);
      } else {
        // eslint-disable-next-line no-console
        console.log('worker success!');
      }
    });
  }

  cluster.on('exit', (worker) => {
    // eslint-disable-next-line no-console
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  mongooseConnect();
  startServer(router, PORT, processId);
}
