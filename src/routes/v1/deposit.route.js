const express = require('express');
const depositController = require('../../controllers/deposit.controller');

const router = express.Router();

router.get('/:daoAddress/:networkId', depositController.getDepositFrame);

router.get('/image/:daoAddress/:networkId', depositController.getDepositFrameImage);

router.post('/validate', depositController.validateDepositInput);

router.post('/txn', depositController.depositTransaction);

module.exports = router;
