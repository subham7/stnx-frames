const { encodeFunctionData } = require('viem');
const web3 = require('web3');
const BigNumber = require('bignumber.js');

const config = require('../config/config');
const { getPublicClient } = require('../config/viem');
const { erc20, factory } = require('../config/abis');
const { getStationDetails } = require('../subgraph');

const getCallData = async ({ networkId, abi, functionName, functionArgs, contract, value }) => {
  try {
    const encodedData = encodeFunctionData({
      abi,
      functionName,
      args: functionArgs,
    });

    return {
      chainId: `eip155:${config.networks[networkId].network}`,
      method: 'eth_sendTransaction',
      params: {
        abi,
        to: contract,
        data: encodedData,
        value,
      },
    };
  } catch (error) {
    console.log(error);
  }
};

const approveToken = async (data, depositAmt, networkId) => {
  const tokenValue = new BigNumber(depositAmt).times(new BigNumber(10).pow(6));
  const callData = await getCallData({
    networkId,
    abi: erc20,
    functionName: 'approve',
    functionArgs: [data.untrustedData.address, tokenValue],
    contract: config.networks[networkId].usdcAddress,
    value: '0',
  });

  return callData;
};

const erc20Deposit = async (data, daoAddress, depositAmt, networkId) => {
  const res = await getStationDetails({ daoAddress }, networkId);
  const station = res?.data?.data?.stations[0];
  const pricePerToken = new BigNumber(station.pricePerToken);
  const tokenValue = new BigNumber(depositAmt).times(new BigNumber(10).pow(6));
  const numOfTokensToBuy = tokenValue.div(pricePerToken).times(new BigNumber(10).pow(18));

  const callData = await getCallData({
    networkId,
    abi: factory,
    functionName: 'buyGovernanceTokenERC20DAO',
    functionArgs: [daoAddress, numOfTokensToBuy, []],
    contract: config.networks[networkId].factoryAddress,
    value: '0',
  });

  return callData;
};

module.exports = { approveToken, erc20Deposit };
