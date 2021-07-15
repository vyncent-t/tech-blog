const router = require('express').Router();
const HomeRoutes = require('./homeRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const apiRoutes = require('./api');

router.use('/', HomeRoutes)
router.use('/dashboard', dashboardRoutes)
router.use('/api', apiRoutes)

module.exports = router;