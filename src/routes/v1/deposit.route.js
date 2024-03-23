const express = require('express');
const depositController = require('../../controllers/deposit.controller');

const router = express.Router();

router.get('/:daoAddress/:networkId', depositController.getDepositFrame);

router.get('/image/:daoAddress/:networkId', depositController.getDepositFrameImage);

module.exports = router;
