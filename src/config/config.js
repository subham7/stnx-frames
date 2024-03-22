const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    // MONGODB_URL: Joi.string().required().description('Mongo DB url'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  subgraph: {
    stnxEthereum: envVars.STNX_ETHEREUM_SUBGRAPH,
    stnxScroll: envVars.STNX_SCROLL_SUBGRAPH,
    stnxGoerli: envVars.STNX_GOERLI_SUBGRAPH,
    stnxPolygon: envVars.STNX_POLYGON_MAINNET_SUBGRAPH,
    stnxLinea: envVars.STNX_LINEA_SUBGRAPH,
    stnxBase: envVars.STNX_BASE_SUBGRAPH,
    claimPolygon: envVars.STNX_POLYGON_CLAIM_SUBGRAPH,
  },
  // mongoose: {
  //   url: envVars.MONGODB_URL + (envVars.NODE_ENV === 'test' ? '-test' : ''),
  //   options: {
  //     useCreateIndex: true,
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true,
  //   },
  // },
};
