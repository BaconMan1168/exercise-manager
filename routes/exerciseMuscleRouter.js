const { Router } = require('express');
const exerciseMuscleController = require('../controllers/exerciseMuscleController')

const pairsRouter = Router();

pairsRouter.get('/', exerciseMuscleController.homeExerciseMusclePairsPage);
pairsRouter.post('/add', exerciseMuscleController.createExerciseMusclePair);
pairsRouter.delete('/delete', exerciseMuscleController.removeExerciseMusclePair);

module.exports = pairsRouter;