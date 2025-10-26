const db = require('../models/queries')

async function homeMusclePage(req, res){
    const muscles = await db.getAllMuscles();
    res.render('homeMusclePage', { muscles: muscles })
}

async function createMuscle(req, res){
    const { muscleName } = req.query;
    await db.addMuscle(muscleName);
    res.redirect('/muscles')
}

async function readMusclesByName(req, res){
    const { musclePhrase } = req.query;
    const rows = await db.searchMusclesByName(musclePhrase)
    res.render('search', { mode: 'byMuscleName', title: musclePhrase, rows: rows })
}

async function readMusclesByExercise(req, res){
    const { exercisePhrase } = req.body;
    const rows = await db.searchMusclesByExercise(exercisePhrase);
    res.render('search', { mode: 'byExercise', title: exercisePhrase, rows: rows })
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
    homeMusclePage,
    createMuscle,
    readMusclesByName,
    readMusclesByExercise,
    changeMuscle,
    removeMuscle,
    emptyMuscles
}