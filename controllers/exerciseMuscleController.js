const db = require('../models/queries')

const links = [
  { href: "/", text: "Home" },
  { href: "/muscles", text: "Muscle Database" },
  { href: "/exercises", text: "Exercise Database" },
  { href: "/exercisemusclegroup", text: "Muscles Targeted Database" }
];


async function createExerciseMusclePair(req, res){
    try {
        const { exerciseName, musclesUsed } = req.body;
        const muscles = musclesUsed.split(' ').filter(m => m.trim() !== '');
        await db.addExerciseMusclePair(exerciseName, muscles);
        res.redirect('/pairs')
    }
    catch (err) {
        return res.status(404).render('errorPage', {
            message: `Exercise-Muscle pair does not exist.`
        });
    }


}

async function homeExerciseMusclePairsPage(req, res){
    const pairs = await db.getAllExerciseMusclePairs();
    res.render('homeExercisePairsPage', { pairs: pairs, links: links })

}

async function removeExerciseMusclePair(req, res){
    const { exerciseToDelete, muscleToDelete } = req.body;
    const existing = await db.searchExerciseMusclePair(exerciseToDelete, muscleToDelete);

    if (!existing) {
        return res.status(404).render('errorPage', {
            message: `Exercise-Muscle pair does not exist.`
        });
    }

    await db.deletePair(exerciseToDelete, muscleToDelete);
    res.redirect('/pairs')
}

module.exports = {
    createExerciseMusclePair,
    homeExerciseMusclePairsPage,
    removeExerciseMusclePair
}