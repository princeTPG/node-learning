import httpStatus from 'http-status';

/**
 * responseHandler
 * @param {Object} res - response object
 * @param {Object/String} data - data object or string
 * @param {number} status - status
 * @returns {Object}
 */
const responseHandler = (res, data, status = httpStatus.OK) => {
  let dataJson = {};

  if (typeof data === 'string') {
    dataJson.message = data;
  } else {
    dataJson = data;
  }

  res.status(status);
  res.json(dataJson);
  res.end();
};

/**
 * Error handler
 * @param {Object} res - response object
 * @param {Object/String} error - error object or string
 * @param {number} status - status
 * @returns {undefined}
 */
export const errorHandler = (res, error, status = httpStatus.BAD_REQUEST) => {
  responseHandler(res, error, status);
};

/**
 * Error handler for view Template
 * @param {Object} res - response object
 * @param {Object/String} error - error object or string
 * @returns {undefined}
 */
export const errorHandlerViewTemplate = (res, page, error) => {
  res.render(page || 'errorPage', error);
};

/**
 * successHandler
 * @param {Object} res - response object
 * @param {Object/String} data - data object or string
 * @param {number} status - status
 * @returns {undefined}
 */
export const successHandler = (res, data, status = httpStatus.OK) => {
  responseHandler(res, data, status);
};

/**
 * Success handler for view Template
 * @param {Object} res - response object
 * @param {String} page - page-name
 * @param {Object/String} data - error object or string
 * @returns {undefined}
 */
export const successHandlerViewTemplate = (res, page, data) => {
  res.render(page, data);
};
