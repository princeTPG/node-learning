import express from 'express';

import urlRouter from './url/urlRoutes';
import analyticsRouter from './analytics/analyticsRoutes';
import workerApisRouter from './workerApis/routes';

const router = express.Router();

router.use('/', urlRouter);
router.use('/analytics', analyticsRouter);
router.use('/worker', workerApisRouter);

export default router;
