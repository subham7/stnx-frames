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

const APPROVE_TXN_FRAME = (daoAddress, networkId, depositAmt) =>
  getFrameMetaHTML({
    title: 'StationX Deposit',
    imageUrl: `${process.env.SERVER_URL}/v1/deposit/image/${daoAddress}/${networkId}`,
    buttons: [
      {
        label: `Approve ${depositAmt} $`,
        action: 'tx',
        target: `${process.env.SERVER_URL}/v1/deposit/approve?daoAddress=${daoAddress}&networkId=${networkId}&depositAmt=${depositAmt}`,
        post_url: `${process.env.SERVER_URL}/v1/deposit/txn-approved?daoAddress=${daoAddress}&networkId=${networkId}&depositAmt=${depositAmt}`,
      },
    ],
  });

const DEPOSIT_TXN_FRAME = (daoAddress, networkId, depositAmt) =>
  getFrameMetaHTML({
    title: 'StationX Deposit',
    imageUrl: `${process.env.SERVER_URL}/v1/deposit/image/${daoAddress}/${networkId}`,
    buttons: [
      {
        label: `Deposit ${depositAmt} $`,
        action: 'tx',
        target: `${process.env.SERVER_URL}/v1/deposit/txn?daoAddress=${daoAddress}&networkId=${networkId}&depositAmt=${depositAmt}`,
        post_url: `${process.env.SERVER_URL}/v1/deposit/txn-success?daoAddress=${daoAddress}&networkId=${networkId}&depositAmt=${depositAmt}`,
      },
    ],
  });

const SUCCESS = getFrameMetaHTML({
  title: 'StationX Deposit',
  imageUrl: 'https://clubprofilepics.s3.ap-south-1.amazonaws.com/stnx_frames/v2/success.png',
});

module.exports = {
  DEFAULT,
  AMT_LESS_THAN_MIN,
  AMT_MORE_THAN_MAX,
  TOTAL_RAISE_LIMIT_EXCEEDED,
  APPROVE_TXN_FRAME,
  DEPOSIT_TXN_FRAME,
  SUCCESS,
};
