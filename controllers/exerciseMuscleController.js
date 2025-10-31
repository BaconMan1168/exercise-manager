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
            message: `Muscle '${muscleName}' does not exist.`
        });
    }


}

async function homeExerciseMusclePairsPage(req, res){
    const pairs = await db.getAllExerciseMusclePairs();
    res.render('homeExercisePairsPage', { pairs: pairs, links: links })

}

module.exports = {
    createExerciseMusclePair,
    homeExerciseMusclePairsPage
}