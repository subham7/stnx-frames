const axios = require('axios');
const config = require('../config/config');

const getStationDetails = ({ daoAddress }, networkId) => {
  return axios.post(config.networks[networkId].graph, {
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
};

module.exports = { getStationDetails };
