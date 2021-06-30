import shortid from 'shortid';

export const getShortUniqueId = () => shortid.generate().toLowerCase();

// generate unique-id from current-timeStamp
// and convert it to a number-str using toString function and provide a base of 20
export const getShortUniqueIdFromDate = () => {
  const currentDate = new Date().getTime();
  return currentDate.toString(20);
};
