const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');
const { base } = require('viem/chains');

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
  serverUrl: 'https://stnx-frames-24417d68ca10.herokuapp.com',
  networks: {
    '0x2105': {
      network: 8453,
      name: 'base',
      hex: '0x2105',
      networkIdentifier: 'base-mainnet',
      rpc: envVars.BASE_RPC_URL,
      graph: envVars.STNX_BASE_SUBGRAPH,
      viemConfig: base,
      factoryAddress: envVars.BASE_FACTORY_CONTRACT,
      usdcAddress: envVars.BASE_USDC_CONTRACT,
      nativeToken: envVars.BASE_NATIVE,
    },
  },
};
