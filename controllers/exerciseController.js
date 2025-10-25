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

async function changeExercise(req, res){
    const { currName, newName } = req.body;
    await db.updateExercise(currName, newName);
    //render or redirect
}

async function removeExercise(req, res){
    const { exerciseName } = req.body;
    const isDeleted = await db.deleteExercise(exerciseName);

    if (isDeleted){
        //render something
    }
    else{
        //render something else
    }
}

async function emptyExercises(req, res){
    await db.clearExercises();
}