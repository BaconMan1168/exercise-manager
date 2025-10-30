const { Router } = require('express');
const exerciseController = require('../controllers/exerciseController')

const exerciseRouter = Router();

exerciseRouter.get('/', exerciseController.homeExercisePage);

exerciseRouter.get('/search', exerciseController.searchExercises);
exerciseRouter.post('/add', exerciseController.createExercise);


module.exports = muscleRouter;