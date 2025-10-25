const db = require('../models/queries')

async function createExerciseMusclePair(req, res){
    const { exerciseName, muscleName } = req.body;
    await db.addExerciseMusclePair(exerciseName, muscleName);
    res.redirect('/')
}

async function readAllExerciseMusclePairs(req, res){
    const exerciseMusclePairs = await db.getAllExerciseMusclePairs();
    //render something with ejs
}