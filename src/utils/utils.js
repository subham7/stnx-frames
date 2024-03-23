const { CHAIN_CONFIG } = require('./chain_config');

const isNative = (depositTokenAddress, networkId) => {
  if (depositTokenAddress === '0x0000000000000000000000000000000000001010') {
    return true;
  } else {
    return depositTokenAddress?.toLowerCase() === CHAIN_CONFIG[networkId].nativeToken.toLowerCase();
  }
};

module.exports = { isNative };
