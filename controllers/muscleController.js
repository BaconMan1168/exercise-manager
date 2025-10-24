const db = require('../models/queries')

async function createMuscle(req, res){
    const { muscleName } = req.body;
    await db.addMuscle(muscleName);
    res.redirect('/')
}