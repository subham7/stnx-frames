const { encodeFunctionData } = require('viem');
const config = require('../config/config');
const { getPublicClient } = require('../config/viem');
const { erc20 } = require('../config/abis');

const getCallData = ({ networkId, abi, functionName, functionArgs, contract, value }) => {
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

const approveToken = (data, networkId) => {
  const callData = getCallData({
    networkId,
    abi: erc20,
    functionName: 'approve',
    functionArgs: [data.untrustedData.address, '1000000'], // Value needs to be passed
    contract: config.networks[networkId].usdcAddress,
    value: '0',
  });

  console.log(callData);
  return callData;
};

module.exports = { approveToken };
