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

module.exports = {
  getDepositFrameImage,
};
