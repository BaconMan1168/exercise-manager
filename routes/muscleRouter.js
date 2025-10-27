const { Router } = require('express');
const muscleController = require('../controllers/muscleController')

const muscleRouter = Router();

muscleRouter.get('/', muscleController.homeMusclePage);

muscleRouter.get('/search', muscleController.searchMuscles);
muscleRouter.post('/add', muscleController.createMuscle);
muscleRouter.put('/update', muscleController.changeMuscle);

module.exports = muscleRouter;