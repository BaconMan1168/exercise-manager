const db = require('../models/queries')

const links = [
  { href: "/", text: "Home" },
  { href: "/muscles", text: "Muscle Database" },
  { href: "/exercises", text: "Exercise Database" },
  { href: "/exercisemusclegroup", text: "Muscles Targeted Database" }
];


async function createExerciseMusclePair(req, res){
    const { exerciseName, muscleName } = req.body;
    await db.addExerciseMusclePair(exerciseName, muscleName);
    res.redirect('/')
}

async function homeExerciseMusclePairsPage(req, res){
    const pairs = await db.getAllExerciseMusclePairs();
    res.render('homeExercisePairsPage', { pairs: pairs, links: links })

}

module.exports = {
    createExerciseMusclePair,
    homeExerciseMusclePairsPage
}