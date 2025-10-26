const { Router } = require('express');
const muscleController = require('../controllers/muscleController')

const muscleRouter = Router();

indexRouter.get('/', muscleController.homeMusclePage);

module.exports = muscleRouter;