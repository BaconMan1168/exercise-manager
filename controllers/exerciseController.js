const db = require('../models/queries')

async function createExercise(req, res){
    const { exerciseName } = req.body;
    await db.addExercise(exerciseName);
    res.redirect('/')
}

async function readAllExercises(req, res){
    const exercises = await db.getAllExercises();
    //render something with ejs
}

async function readExercisesByName(req, res){
    const { exercisePhrase } = req.body;
    const exercises = await db.searchExercisesByName(exercisePhrase);
    //render something with ejs
}

async function readExercisesByMuscle(req, res){
    const { musclePhrase } = req.body;
    const exercises = await db.searchExercisesByMuscle(musclePhrase);
    //render something with ejs
}

