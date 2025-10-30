const db = require('../models/queries')

const links = [
  { href: "/", text: "Home" },
  { href: "/muscles", text: "Muscle Database" },
  { href: "/exercises", text: "Exercise Database" },
  { href: "/exercisemusclegroup", text: "Muscles Targeted Database" }
];

async function homeExercisePage(req, res){
    const exercises = await db.getAllExercises();
    res.render('homeExercisePage', { exercises: exercises, links: links })
}


async function searchExercises(req, res) {
  const { mode, phrase } = req.query;
  let rows = [];

  if (mode === 'byExerciseName') {
    rows = await db.searchExercisesByName(phrase);
  } else if (mode === 'byMusclesUsed') {
    rows = await db.searchExercisesByMuscle(phrase);
  }

  res.render('search', { mode, title: phrase, rows });
}

async function createExercise(req, res){
    const { exerciseName } = req.body;
    await db.addExercise(exerciseName);
    res.redirect('/')
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

module.exports = {
    createExercise,
    homeExercisePage,
    searchExercises,
    changeExercise,
    removeExercise,
    emptyExercises
}