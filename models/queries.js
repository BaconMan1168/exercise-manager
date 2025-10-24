const pool = require("./pool");


//GET query functions
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
    SELECT 
        e.exercise_name AS "Exercise Name",
        STRING_AGG(m.muscle_group_name, ', ') AS "Trained Muscles"
    FROM exercise_muscle_group emg
    INNER JOIN muscles m ON emg.muscle_id = m.id
    INNER JOIN exercises e ON emg.exercise_id = e.id
    GROUP BY e.exercise_name;
    `

    const { rows } = await pool.query(SQL);
    return rows;
}

//POST query functions

async function addMuscle(muscleName){
    await pool.query("INSERT INTO muscles (muscle_group_name) VALUES ($1)", [muscleName]);
}

async function addExercise(exerciseName){
    await pool.query("INSERT INTO exercises(exercise_name VALUES ($1)", [exerciseName]);
}