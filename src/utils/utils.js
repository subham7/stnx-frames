const config = require('../config/config');

const isNative = (depositTokenAddress, networkId) => {
  if (depositTokenAddress === '0x0000000000000000000000000000000000001010') {
    return true;
  } else {
    return depositTokenAddress?.toLowerCase() === config.networks[networkId].nativeToken.toLowerCase();
  }
};

module.exports = { isNative };
