const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { healthService } = require('../services');

const getHealth = catchAsync(async (req, res) => {
  const data = await healthService.getHealth();
  res.status(httpStatus.OK).send(data);
});

module.exports = {
  getHealth,
};
