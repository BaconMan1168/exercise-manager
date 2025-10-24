const pool = require("./pool");

async function getAllMuscles(){
    const { rows } = await pool.query(`SELECT muscle_group_name AS "Muscle Name" FROM muscles;`);
    return rows;
} 

async function getAllExercises(){
    const { rows } = await pool.query(`SELECT exercise_name AS "Exercise Name" FROM exercises`);
    return rows;
}

async function getAllExerciseMuscles(){
    const SQL = `
    SELECT exercise_name
    `
}