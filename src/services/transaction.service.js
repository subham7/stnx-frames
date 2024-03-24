const BigNumber = require('bignumber.js');

const config = require('../config/config');
const { erc20, factory } = require('../config/abis');
const { getStationDetails } = require('../subgraph');
const { getCallData } = require('../config/viem');

const approveToken = async (depositAmt, networkId) => {
  const tokenValue = new BigNumber(depositAmt).times(new BigNumber(10).pow(6));
  const callData = await getCallData({
    networkId,
    abi: erc20,
    functionName: 'approve',
    args: [config.networks[networkId].factoryAddress, tokenValue],
    contract: config.networks[networkId].usdcAddress,
    value: '0',
  });

  return callData;
};

const erc20Deposit = async (daoAddress, depositAmt, networkId) => {
  const res = await getStationDetails({ daoAddress }, networkId);
  const station = res?.data?.data?.stations[0];
  const pricePerToken = new BigNumber(station.pricePerToken);
  const tokenValue = new BigNumber(depositAmt).times(new BigNumber(10).pow(6));
  const numOfTokensToBuy = tokenValue.div(pricePerToken).times(new BigNumber(10).pow(18));

  const callData = await getCallData({
    networkId,
    abi: factory,
    functionName: 'buyGovernanceTokenERC20DAO',
    args: [daoAddress, numOfTokensToBuy, []],
    contract: config.networks[networkId].factoryAddress,
    value: '0',
  });

  return callData;
  c;
};

module.exports = { approveToken, erc20Deposit };
