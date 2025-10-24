const db = require('../models/queries')

async function createExercise(req, res){
    const { exerciseName } = req.body;
    await db.addExercise(exerciseName);
    res.redirect('/')
}