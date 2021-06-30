/**
 * function check weather there is application/json header in req.
 */
export const isJsonRequest = (req) => req.header('Accept').includes('application/json');

export default {
  isJsonRequest,
};
