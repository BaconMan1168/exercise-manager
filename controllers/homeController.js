const db = require('../db/queries');

async function homePage(req, res) {
    const [muscles, exercises, pairs] = await Promise.all([
        db.getAllMuscles(),
        db.getAllExercises(),
        db.getAllExerciseMusclePairs()
    ]);

    //render something with ejs
}

module.exports = { homePage };