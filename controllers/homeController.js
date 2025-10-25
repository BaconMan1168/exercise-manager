const db = require('../db/queries');

const links = [
  { href: "/", text: "Home" },
  { href: "/muscles", text: "Muscle Database" },
  { href: "/exercises", text: "Exercise Database" },
  { href: "/exercisemusclegroup", text: "Muscles Targeted Database" }
];

async function homePage(req, res) {
    const [muscles, exercises] = await Promise.all([
        db.getAllMuscles(),
        db.getAllExercises()
    ]);

    res.render('index', {
        links: links,
        musclesCount: muscles.length,
        exercisesCount: exercises.length
    });
}

module.exports = { homePage };