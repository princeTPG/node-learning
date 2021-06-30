import get from 'lodash/get';
import { DOMAIN, SHORT_LINK_EXPIRE_DURATION } from '../../config';

import urlModel from './urlModel';
import { getShortUniqueId } from '../../utils/shortId';
import { trackRedirection } from '../analytics/analyticsController';
import {
  errorHandler,
  successHandler,
  errorHandlerViewTemplate,
} from '../../utils/responseHandlers';
import { isJsonRequest } from '../../utils/headerChecker';

export const renderHomePage = async (req, res) => {
  try {
    res.set('Content-Type', 'text/html');
    res.render('home.ejs', { shortLink: '', message: '' });
    res.end();
  } catch (error) {
    errorHandlerViewTemplate(res);
    res.end();
  }
};

// to remove un-necessary favicon call.
export const getFavicon = (req, res) => successHandler(res, null);

export const getUrl = async (req, res) => {
  try {
    const uid = get(req, 'params.uid', '');

    const result = await urlModel.findOne({ uid });
    const link = get(result, 'link', '');

    if (link) {
      // track redirection
      await trackRedirection(link, uid);
      if (isJsonRequest(req)) {
        return successHandler(res, { shortLink: `${DOMAIN}/${uid}`, link });
      }
      // redirect user to corresponding link
      return res.redirect(link);
    }
    return res.render('error404.ejs', {});
  } catch (err) {
    if (isJsonRequest(req)) {
      return errorHandler(res, err);
    }
    return errorHandlerViewTemplate(res, '', err);
  }
};

export const add = async (req, res) => {
  try {
    // expire in time in seconds.
    const expireIn = get(req, 'body.expireIn') || SHORT_LINK_EXPIRE_DURATION;
    const link = get(req, 'body.link', '');
    let uid = get(req, 'body.uid', '');

    if (!link || !expireIn || expireIn <= 0) {
      const data = { message: 'Please provide valid values.', shortLink: '' };
      if (isJsonRequest(req)) {
        return errorHandler(res, data);
      }
      return res.render('home', data);
    }

    if (uid) {
      const resp = await urlModel.findOne({ uid });
      if (resp) {
        const data = { message: 'Unique-id already exists.', shortLink: '' };
        if (isJsonRequest(req)) {
          return errorHandler(res, data);
        }
        return res.render('home', data);
      }
    } else {
      uid = getShortUniqueId();
    }

    const currentDate = new Date().getTime();
    const expireAt = new Date(currentDate + parseInt(expireIn, 10) * 1000);

    await urlModel.create({ link, uid, expireAt });
    const response = { shortLink: `${DOMAIN}/${uid}`, message: '' };

    if (isJsonRequest(req)) {
      return successHandler(res, response);
    }
    return res.render('home', response);
  } catch (err) {
    if (isJsonRequest(req)) {
      return errorHandler(res, err);
    }
    return errorHandlerViewTemplate(res, '', err);
  }
};
