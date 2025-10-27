const db = require('../models/queries')

async function homeMusclePage(req, res){
    const muscles = await db.getAllMuscles();
    res.render('homeMusclePage', { muscles: muscles })
}

async function createMuscle(req, res){
    const { muscleName } = req.body;
    await db.addMuscle(muscleName);
    res.redirect('/muscles')
}

async function searchMuscles(req, res) {
  const { mode, phrase } = req.query;
  let rows = [];

  if (mode === 'muscle') {
    rows = await db.searchMusclesByName(phrase);
  } else if (mode === 'exercise') {
    rows = await db.searchMusclesByExercise(phrase);
  }

  res.render('search', { mode, title: phrase, rows });
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
    searchMuscles,
    changeMuscle,
    removeMuscle,
    emptyMuscles
}