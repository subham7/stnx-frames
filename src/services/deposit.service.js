const Subgraph = require('../subgraph');
const satori = require('satori').default;
const { Resvg } = require('@resvg/resvg-js');
const fs = require('fs');
const { join } = require('path');
const { isNative } = require('../utils/utils');
const { getFrameMetaHTML } = require('../frames/getFrameMetaHTML');
const BigNumber = require('bignumber.js');
const { min } = require('moment/moment');

const fontPath = join(process.cwd(), 'Roboto-Regular.ttf');
let fontData = fs.readFileSync(fontPath);

/*
   - generate html with club Data
   - convert html to svg
   - svg -> png
   - send image Buffer as response
   */
const getDepositFrameImage = async (daoAddress, networkId) => {
  const subgraph = new Subgraph(networkId);
  const res = await subgraph.getStationDetails(daoAddress);
  const stationDetail = res?.data?.data?.stations[0];

  let native = isNative(stationDetail.depositTokenAddress, networkId);
  let decimals = native ? 18 : 6;
  let minDepositAmount = new BigNumber(stationDetail.minDepositAmount).dividedBy(new BigNumber(10).pow(decimals)).toFixed();
  let maxDepositAmount = new BigNumber(stationDetail.maxDepositAmount).dividedBy(new BigNumber(10).pow(decimals)).toFixed();
  let totalAmountRaised = new BigNumber(stationDetail.totalAmountRaised)
    .dividedBy(new BigNumber(10).pow(decimals))
    .toFixed();

  const { html } = await import('satori-html');
  const template = html`<div
    style="
    display: flex;
    flex-direction:column;
    justify-content: center;
    width: 600px;
    height: 400px;
    color: #000;
  "
  >
    <div
      style="
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 6px;
      padding: 12px;
      border-radius: 4px;
      background: grey;
      color: #fff;
      font-size: 30px;
      font-weight:350;
    "
    >
      ${stationDetail.name}
    </div>

    <div
      style="
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction:column;
      font-size:22px;
      "
    >
      <div>Min deposit : ${minDepositAmount} USDC</div>

      <div>Max deposit : ${maxDepositAmount} USDC</div>

      <div>Total raised : ${totalAmountRaised} USDC</div>
    </div>
  </div> `;

  const svg = await satori(template, {
    width: 600,
    height: 400,
    fonts: [
      {
        name: 'Roboto',
        data: fontData,
        weight: 400,
        style: 'normal',
      },
    ],
  });

  const resvg = new Resvg(svg, {
    background: 'rgba(238, 235, 230, .9)',
  });
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  return pngBuffer;
};

const getDepositFrame = async (daoAddress, networkId) => {
  const imageUrl = `${process.env.SERVER_URL}/v1/deposit/image/${daoAddress}/${networkId}`;

  const frameHTML = getFrameMetaHTML({
    title: 'StationX Deposit',
    imageUrl,
    buttons: [
      {
        label: 'Deposit',
        action: 'post',
        target: `${process.env.SERVER_URL}/v1/deposit/validate?daoAddress=${daoAddress}&networkId=${networkId}`,
      },
    ],
    input: 'Enter Deposit Amount',
  });
  return frameHTML;
};

const validateDepositInput = async (daoAddress, networkId, data) => {
  let userDepositAmt = parseInt(data.untrustedData.inputText); //  validate this
  console.log('userDepositAmt---->', userDepositAmt);

  const subgraph = new Subgraph(networkId);
  const res = await subgraph.getStationDetails(daoAddress);
  const stationDetail = res?.data?.data?.stations[0];

  let native = isNative(stationDetail.depositTokenAddress, networkId);
  let decimals = native ? 18 : 6;

  let minDepositAmount = new BigNumber(stationDetail.minDepositAmount).dividedBy(new BigNumber(10).pow(decimals)).toFixed();
  let maxDepositAmount = new BigNumber(stationDetail.maxDepositAmount).dividedBy(new BigNumber(10).pow(decimals)).toFixed();
  let raiseAmount = new BigNumber(stationDetail.raiseAmount).dividedBy(new BigNumber(10).pow(decimals)).toFixed();
  let totalAmountRaised = new BigNumber(stationDetail.totalAmountRaised)
    .dividedBy(new BigNumber(10).pow(decimals))
    .toFixed();

  if (userDepositAmt < minDepositAmount) {
    // amt less than min deposit
    return getFrameMetaHTML({
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
  }
  if (userDepositAmt > maxDepositAmount) {
    // amt more than max deposit
    return getFrameMetaHTML({
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
  }
  if (userDepositAmt + totalAmountRaised > raiseAmount) {
    // total raise amount limit reached
    return getFrameMetaHTML({
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
  }

  // if all conditions meet , return frameHTML with 'tx' action btn

  return getFrameMetaHTML({
    title: 'StationX Deposit',
    imageUrl: `${process.env.SERVER_URL}/v1/deposit/image/${daoAddress}/${networkId}`,
    buttons: [
      {
        label: `Deposit ${userDepositAmt} $`,
        action: 'tx',
        target: `${process.env.SERVER_URL}/v1/deposit/txn?daoAddress=${daoAddress}&networkId=${networkId}&depositAmt=${userDepositAmt}`,
      },
    ],
  });
};

const depositTransaction = async (data) => {
  console.log('Txn request received !');
  console.log(data);
  return {
    chainId: 'eip155:8453',
    method: 'eth_sendTransaction',
    params: {
      abi: [], // JSON ABI of the function selector and any errors
      to: '0x00000000fcCe7f938e7aE6D3c335bD6a1a7c593D',
      data: '0x783a112b0000000000000000000000000000000000000000000000000000000000000e250000000000000000000000000000000000000000000000000000000000000001',
      value: '984316556204476',
    },
  };
};

module.exports = { getDepositFrameImage, getDepositFrame, validateDepositInput, depositTransaction };
