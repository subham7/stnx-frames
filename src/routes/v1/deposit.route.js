const express = require('express');
const depositController = require('../../controllers/deposit.controller');

const router = express.Router();

router.get('/:daoAddress/:networkId', depositController.getDepositFrame);
router.post('/:daoAddress/:networkId', depositController.getDepositFrame);

router.get('/image/:daoAddress/:networkId', depositController.getDepositFrameImage);

router.post('/validate', depositController.validateDepositInput);

router.post('/approve', depositController.aproveTransaction);

router.post('/txn-approved', depositController.approvedTransactionFrame);

router.post('/txn', depositController.depositTransaction);

router.post('/txn-success', depositController.successTransactionFrame);

module.exports = router;
