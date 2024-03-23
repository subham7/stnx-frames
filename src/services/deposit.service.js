const Subgraph = require('../subgraph');
const satori = require('satori').default;
const { Resvg } = require('@resvg/resvg-js');
const fs = require('fs');
const { join } = require('path');
const { isNative } = require('../utils/utils');
const { getFrameMetaHTML } = require('../frames/getFrameMetaHTML');
const BigNumber = require('bignumber.js');
const FRAME_STATE = require('../frames/states');
const TEMPLATES = require('../frames/templates');

const fontPath = join(process.cwd(), 'Roboto-Regular.ttf');
let fontData = fs.readFileSync(fontPath);

const getDepositFrameImage = async (daoAddress, networkId) => {
  const subgraph = new Subgraph(networkId);
  const res = await subgraph.getStationDetails(daoAddress);
  const stationDetail = res?.data?.data?.stations[0];

  let native = isNative(stationDetail.depositTokenAddress, networkId);
  let decimals = native ? 18 : 6;
  let stationName = stationDetail.name;
  let minDepositAmount = new BigNumber(stationDetail.minDepositAmount).dividedBy(new BigNumber(10).pow(decimals)).toNumber();
  let maxDepositAmount = new BigNumber(stationDetail.maxDepositAmount).dividedBy(new BigNumber(10).pow(decimals)).toNumber();
  let totalAmountRaised = new BigNumber(stationDetail.totalAmountRaised)
    .dividedBy(new BigNumber(10).pow(decimals))
    .toNumber();

  const { html } = await import('satori-html');
  const template = html(TEMPLATES.DEFAULT(stationName, minDepositAmount, maxDepositAmount, totalAmountRaised));

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
  return FRAME_STATE.DEFAULT(daoAddress, networkId);
};

const validateDepositInput = async (daoAddress, networkId, data) => {
  let userDepositAmt = parseInt(data.untrustedData.inputText); //  validate this

  const subgraph = new Subgraph(networkId);
  const res = await subgraph.getStationDetails(daoAddress);
  const stationDetail = res?.data?.data?.stations[0];

  let native = isNative(stationDetail.depositTokenAddress, networkId);
  let decimals = native ? 18 : 6;

  let minDepositAmount = new BigNumber(stationDetail.minDepositAmount).dividedBy(new BigNumber(10).pow(decimals)).toNumber();
  let maxDepositAmount = new BigNumber(stationDetail.maxDepositAmount).dividedBy(new BigNumber(10).pow(decimals)).toNumber();
  let raiseAmount = new BigNumber(stationDetail.raiseAmount).dividedBy(new BigNumber(10).pow(decimals)).toNumber();
  let totalAmountRaised = new BigNumber(stationDetail.totalAmountRaised)
    .dividedBy(new BigNumber(10).pow(decimals))
    .toNumber();

  if (userDepositAmt < minDepositAmount) {
    return FRAME_STATE.AMT_LESS_THAN_MIN(daoAddress, networkId);
  }
  if (userDepositAmt > maxDepositAmount) {
    return FRAME_STATE.AMT_MORE_THAN_MAX(daoAddress, networkId);
  }
  if (userDepositAmt + totalAmountRaised > raiseAmount) {
    return FRAME_STATE.TOTAL_RAISE_LIMIT_EXCEEDED(daoAddress, networkId);
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
