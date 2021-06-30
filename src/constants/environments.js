export const EnvironmentsEnum = {
  DEV: 'DEV',
  PROD: 'PROD',
  STAGE: 'STAGE',
};

export const {
  DOMAIN,
  ENV,
  PORT,
  MONGO_URI,
  SHORT_LINK_EXPIRE_DURATION,
} = process.env;
