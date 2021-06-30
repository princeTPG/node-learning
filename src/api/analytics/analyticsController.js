import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import isNumber from 'lodash/isNumber';

import analyticsModel from './analyticsModel';
import { errorHandler, successHandler } from '../../utils/responseHandlers';

export const getAnalytics = async (req, res) => {
  try {
    const limit = parseInt(get(req, 'query.limit', 10), 10);
    const skip = parseInt(get(req, 'query.skip', 0), 10);
    if (!isNumber(limit) || !isNumber(skip)) {
      return errorHandler(res, { message: 'Please provide valid values.' });
    }
    const [result, count] = await Promise.all([
      analyticsModel.find().skip(skip).limit(limit),
      analyticsModel.countDocuments(),
    ]);
    return successHandler(res, { data: result, total: count });
  } catch (err) {
    return errorHandler(res, err);
  }
};

export const trackRedirection = async (link, linkUid) => {
  try {
    const data = await analyticsModel.findOne({ link, linkUid });

    if (isEmpty(data)) {
      return await analyticsModel.create({ link, linkUid, count: 1 });
    }

    data.count += 1;
    data.save();
    return data;
  } catch (err) {
    return {};
  }
};
