const NETWORK_ID = {
  POLYGON_MAINNET: { network: 137, name: 'polygon', hex: '0x89', networkIdentifier: 'matic-mainnet' },
  LINEA: { network: 59144, name: 'linea', hex: '0xe708', networkIdentifier: 'linea-mainnet' },
  GOERLI: { network: 5, name: 'goerli', hex: '0x5', networkIdentifier: 'eth-goerli' },
  BASE: { network: 8453, name: 'base', hex: '0x2105', networkIdentifier: 'base-mainnet' },
  ETHEREUM: { network: 1, name: 'ethereum', hex: '0x1', networkIdentifier: 'eth-mainnet' },
  ZKSYNC: { network: 324, name: 'zksync', hex: '0x144', networkIdentifier: 'zksync-mainnet' },
  BNB: { network: 56288, name: 'bnb', hex: '0xdbe0', networkIdentifier: 'boba-bnb-mainnet' },
  MANTLE: { network: 5000, name: 'mantle', hex: '0x1388', networkIdentifier: 'mantle-mainnet' },
  ARBITRUM: { network: 42161, name: 'arbitrum', hex: '0xa4b1', networkIdentifier: 'arbitrum-mainnet' },
  BSC: { network: 56, name: 'bsc', hex: '0x38', networkIdentifier: 'bsc-mainnet' },
  BSC_TESTNET: { network: 97, name: 'bsc-testnet', hex: '0x61', networkIdentifier: 'bsc-testnet' },
  GNOSIS: { network: 100, name: 'gnosis', hex: '0x64', networkIdentifier: 'gnosis-mainnet' },
  AVAX: { network: 43114, name: 'avalanche', hex: '0xa86a', networkIdentifier: 'avalanche-mainnet' },
  OPTIMISM: { network: 10, name: 'optimism', hex: '0xa', networkIdentifier: 'optimism-mainnet' },
  SCROLL: { network: 534352, name: 'scroll', hex: '0x82750', networkIdentifier: 'scroll-mainnet' },
};

module.exports = { NETWORK_ID };
