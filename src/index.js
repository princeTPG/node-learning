// import cluster from 'cluster';
// import OS from 'os';
import { mongooseConnect } from './services/mongoose';
import { startServer } from './services/express';

import router from './api';
import { PORT } from './config';

// const totalNumOfCPUs = OS.cpus().length;

mongooseConnect();
startServer(router, PORT);
