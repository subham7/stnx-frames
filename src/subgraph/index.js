const axios = require('axios');
const { NETWORK_ID } = require('../config/enums');
const config = require('../config/config');

class Subgraph {
  constructor(networkId) {
    switch (networkId) {
      case NETWORK_ID.POLYGON_MAINNET.hex:
        this.url = config.subgraph.stnxPolygon;
        break;
      case NETWORK_ID.GOERLI.hex:
        this.url = config.subgraph.stnxGoerli;
        break;
      case NETWORK_ID.BASE.hex:
        this.url = config.subgraph.stnxBase;
        break;
      case NETWORK_ID.SCROLL.hex:
        this.url = config.subgraph.stnxScroll;
        break;
      case NETWORK_ID.ETHEREUM.hex:
        this.url = config.subgraph.stnxEthereum;
        break;
      default:
        this.url = config.subgraph.stnxPolygon;
        break;
    }
  }

  getStationDetails(daoAddress) {
    return axios.post(this.url, {
      query: `{
        stations(where: {daoAddress: "${daoAddress}"}) {
          id
          ownerAddress
          daoAddress
          gnosisAddress
          totalAmountRaised
          tokenType
          timeStamp
          threshold
          symbol
          raiseAmount
          quorum
          pricePerToken
          name
          membersCount
          isGtTransferable
          isGovernanceActive
          imageUrl
          distributionAmount
          minDepositAmount
          maxTokensPerUser
          maxDepositAmount
          depositDeadline
          totalAmountRaised
          membersCount
          depositTokenAddress
        }
      }`,
    });
  }
}

module.exports = Subgraph;
