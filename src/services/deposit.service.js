const Subgraph = require('../subgraph');
const satori = require('satori').default;
const { Resvg } = require('@resvg/resvg-js');
const fs = require('fs');
const { join } = require('path');
const { isNative } = require('../utils/utils');
const { getFrameMetaHTML } = require('../frames/getFrameMetaHTML');

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
      <div>Min deposit : ${stationDetail.minDepositAmount / 10 ** decimals} USDC</div>

      <div>Max deposit : ${stationDetail.maxDepositAmount / 10 ** decimals} USDC</div>

      <div>Total raised : ${stationDetail.totalAmountRaised / 10 ** decimals} USDC</div>
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

module.exports = { getDepositFrameImage, getDepositFrame };
