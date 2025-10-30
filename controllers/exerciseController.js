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

  res.render('searchExercise', { mode, title: phrase, rows, links: links });
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
    const existing = await db.searchExercisesByName(exerciseName);

    if (existing.length === 0) {
        return res.status(404).render('errorPage', {
            message: `Exercise '${exerciseName}' does not exist.`
        });
    }

    await db.deleteExercise(exerciseName);
    res.redirect('/exercises')
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