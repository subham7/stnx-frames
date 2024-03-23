const { encodeFunctionData } = require('viem');
const web3 = require('web3');
const BigNumber = require('bignumber.js');

const config = require('../config/config');
const { getPublicClient } = require('../config/viem');
const { erc20, factory } = require('../config/abis');

const getCallData = async ({ networkId, abi, functionName, functionArgs, contract, value }) => {
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
};

const approveToken = async (data, networkId) => {
  const callData = await getCallData({
    networkId,
    abi: erc20,
    functionName: 'approve',
    functionArgs: [data.untrustedData.address, '100000'], // Value needs to be passed
    contract: config.networks[networkId].usdcAddress,
    value: '0',
  });

  return callData;
};

const erc20Deposit = async (data, networkId) => {
  const callData = await getCallData({
    networkId,
    abi: factory,
    functionName: 'buyGovernanceTokenERC20DAO',
    functionArgs: ['0x54d8633f41973C11c73f14dB2bA33791F5225e2e', '1000000000000000000', []],
    contract: config.networks[networkId].factoryAddress,
    value: '0',
  });

  return callData;
};

module.exports = { approveToken, erc20Deposit };
