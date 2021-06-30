import express from 'express';
import {
  add, getUrl, renderHomePage, getFavicon,
} from './urlController';

const router = express.Router({ strict: true });

router.get('/favicon.*', getFavicon);
router.get('/addLink', renderHomePage);
router.post('/addLink', add);
router.get('/:uid', getUrl);
router.get('/', renderHomePage);

export default router;
