const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { depositService } = require('../services');

const getDepositFrameImage = catchAsync(async (req, res) => {
  const { daoAddress, networkId } = req.params;
  const imageBuffer = await depositService.getDepositFrameImage(daoAddress, networkId);
  res.setHeader('Content-Type', 'image/png');
  res.setHeader('Cache-Control', 'max-age=10');
  res.status(httpStatus.OK).send(imageBuffer);
});

const getDepositFrame = catchAsync(async (req, res) => {
  const { daoAddress, networkId } = req.params;
  const FrameHTML = await depositService.getDepositFrame(daoAddress, networkId);
  res.setHeader('Content-Type', 'text/html');
  res.status(httpStatus.OK).send(FrameHTML);
});

const validateDepositInput = catchAsync(async (req, res) => {
  const { daoAddress, networkId } = req.query;
  const FrameHTML = await depositService.validateDepositInput(daoAddress, networkId, req.body);
  res.setHeader('Content-Type', 'text/html');
  res.status(httpStatus.OK).send(FrameHTML);
});

const aproveTransaction = catchAsync(async (req, res) => {
  const data = await depositService.aproveTransaction(req.body, req.query.networkId, req.query.depositAmt);
  res.status(httpStatus.OK).send(data);
});

const approvedTransactionFrame = catchAsync(async (req, res) => {
  const { daoAddress, networkId, depositAmt } = req.query;
  const FrameHTML = await depositService.approvedTransactionFrame(daoAddress, networkId, depositAmt);
  res.setHeader('Content-Type', 'text/html');
  res.status(httpStatus.OK).send(FrameHTML);
});

const depositTransaction = catchAsync(async (req, res) => {
  const data = await depositService.depositTransaction(
    req.body,
    req.query.networkId,
    req.query.depositAmt,
    req.query.daoAddress
  );
  res.status(httpStatus.OK).send(data);
});

const successTransactionFrame = catchAsync(async (req, res) => {
  const { daoAddress, networkId, depositAmt } = req.query;
  const FrameHTML = await depositService.successTransactionFrame(daoAddress, networkId, depositAmt);
  res.setHeader('Content-Type', 'text/html');
  res.status(httpStatus.OK).send(FrameHTML);
});

module.exports = {
  getDepositFrame,
  getDepositFrameImage,
  validateDepositInput,
  depositTransaction,
  aproveTransaction,
  approvedTransactionFrame,
  successTransactionFrame,
};
