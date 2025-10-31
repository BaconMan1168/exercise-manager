const { Router } = require('express');
const exerciseMuscleController = require('../controllers/exerciseMuscleController')

const pairsRouter = Router();

exerciseMuscleController.get('/', exerciseMuscleController.homeExerciseMusclePairsPage);

exerciseRouter.post('/add', exerciseMuscleController.createExerciseMusclePair);


module.exports = pairsRouter;