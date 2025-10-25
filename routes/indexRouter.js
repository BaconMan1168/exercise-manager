const { Router } = require('express');
const homeController = require('../controllers/homeController')

const indexRouter = Router();

indexRouter.get('/', homeController.homePage);

module.exports = indexRouter;