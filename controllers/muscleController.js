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