const config = require('./config');
const { createPublicClient, http } = require('viem');

const getPublicClient = (networkId) => {
  const client = createPublicClient({
    chain: config.networks[networkId].viemConfig,
    transport: http(config.networks[networkId].rpc),
  });

  return client;
};

module.exports = { getPublicClient };
