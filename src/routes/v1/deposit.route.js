const express = require('express');
const depositController = require('../../controllers/deposit.controller');

const router = express.Router();

router.get('/image/:daoAddress/:networkId', depositController.getDepositFrameImage);

module.exports = router;
