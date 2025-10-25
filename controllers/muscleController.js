const db = require('../models/queries')

async function createMuscle(req, res){
    const { muscleName } = req.body;
    await db.addMuscle(muscleName);
    res.redirect('/')
}

async function readAllMuscles(req, res){
    const { muscles } = await db.getAllMuscles();
    //render something with ejs
}

async function readMusclesByName(req, res){
    const { musclePhrase } = req.body;
    const muscles = await db.searchMusclesByName(musclePhrase)
}

async function readMusclesByExercise(req, res){
    const { exercisePhrase } = req.body;
    const muscles = await db.searchMusclesByExercise(exercisePhrase);
}

async function changeMuscle(req, res){
    const { currName, newName } = req.body;
    await db.updateMuscle(currName, newName);
    //render or redirect
}

async function removeMuscle(req, res){
    const { muscleName } = req.body;
    const isDeleted = await db.deleteMuscle(muscleName);

    if (isDeleted){
        //render something
    }
    else{
        //render something else
    }
}

async function emptyMuscles(req, res){
    await db.clearMuscles();
}

module.exports = {
    createMuscle,
    readAllMuscles,
    readMusclesByName,
    readMusclesByExercise,
    changeMuscle,
    removeMuscle,
    emptyMuscles
}