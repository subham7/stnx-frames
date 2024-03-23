const { getFrameMetaHTML } = require('./getFrameMetaHTML');

const DEFAULT = (daoAddress, networkId) =>
  getFrameMetaHTML({
    title: 'StationX Deposit',
    imageUrl: `${process.env.SERVER_URL}/v1/deposit/image/${daoAddress}/${networkId}`,
    buttons: [
      {
        label: 'Deposit',
        action: 'post',
        target: `${process.env.SERVER_URL}/v1/deposit/validate?daoAddress=${daoAddress}&networkId=${networkId}`,
      },
    ],
    input: 'Enter Deposit Amount',
  });

const AMT_LESS_THAN_MIN = (daoAddress, networkId) =>
  getFrameMetaHTML({
    title: 'StationX Deposit',
    imageUrl: 'https://clubprofilepics.s3.ap-south-1.amazonaws.com/stnx_frames/v2/try_again.png',
    buttons: [
      {
        label: 'Retry',
        action: 'post',
        target: `${process.env.SERVER_URL}/v1/deposit/validate?daoAddress=${daoAddress}&networkId=${networkId}`,
      },
    ],
    input: 'Enter Deposit Amount',
  });

const AMT_MORE_THAN_MAX = (daoAddress, networkId) =>
  getFrameMetaHTML({
    title: 'StationX Deposit',
    imageUrl: 'https://clubprofilepics.s3.ap-south-1.amazonaws.com/stnx_frames/v2/try_again.png',
    buttons: [
      {
        label: 'Retry',
        action: 'post',
        target: `${process.env.SERVER_URL}/v1/deposit/validate?daoAddress=${daoAddress}&networkId=${networkId}`,
      },
    ],
    input: 'Enter Deposit Amount',
  });

const TOTAL_RAISE_LIMIT_EXCEEDED = (daoAddress, networkId) =>
  getFrameMetaHTML({
    title: 'StationX Deposit',
    imageUrl: 'https://clubprofilepics.s3.ap-south-1.amazonaws.com/stnx_frames/v2/try_again.png',
    buttons: [
      {
        label: 'Retry',
        action: 'post',
        target: `${process.env.SERVER_URL}/v1/deposit/validate?daoAddress=${daoAddress}&networkId=${networkId}`,
      },
    ],
    input: 'Enter Deposit Amount',
  });

const SUCCESS = () => {};

const TXN_APPROVE = (daoAddress, networkId) => {};
const TXN_DEPOSIT = (daoAddress, networkId) => {};

module.exports = {
  DEFAULT,
  AMT_LESS_THAN_MIN,
  AMT_MORE_THAN_MAX,
  TOTAL_RAISE_LIMIT_EXCEEDED,
  TXN_APPROVE,
  SUCCESS,
};
