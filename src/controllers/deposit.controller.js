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

const depositTransaction = catchAsync(async (req, res) => {
  const data = await depositService.depositTransaction(req.body, req.query.networkId, req.query.depositAmt);
  res.status(httpStatus.OK).send(data);
});

module.exports = {
  getDepositFrame,
  getDepositFrameImage,
  validateDepositInput,
  depositTransaction,
};
