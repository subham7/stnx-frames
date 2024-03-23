const express = require('express');
const depositRoute = require('./deposit.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/deposit',
    route: depositRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
