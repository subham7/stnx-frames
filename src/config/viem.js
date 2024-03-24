const config = require('./config');
const { createPublicClient, http, encodeFunctionData } = require('viem');

const getPublicClient = async (networkId) => {
  return createPublicClient({
    chain: config.networks[networkId].viemConfig,
    transport: http(config.networks[networkId].rpc),
  });
};

const readContractCall = async ({ networkId, address, abi, functionName, args, account }) => {
  const publicClient = await getPublicClient(networkId);
  const data = await publicClient.readContract({
    address,
    abi,
    functionName,
    args,
    account,
  });

  return data;
};

const getCallData = ({ networkId, abi, functionName, args, contract, value }) => {
  const encodedData = encodeFunctionData({
    abi,
    functionName,
    args,
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

module.exports = { getPublicClient, getCallData, readContractCall };
