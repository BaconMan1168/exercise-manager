const pool = require("./pool");


//CREATE query functions (POST) (USE ALL TOGETHER)

async function addMuscle(muscleName){
    await pool.query("INSERT INTO muscles (muscle_group_name) VALUES ($1)", [muscleName]);
}

async function addExercise(exerciseName){
    await pool.query("INSERT INTO exercises(exercise_name) VALUES ($1)", [exerciseName]);
}

async function addExerciseMusclePair(exerciseName, muscleNames){
    const { rows: exerciseRows } = await pool.query(
        "SELECT id FROM exercises WHERE exercise_name = $1",
        [exerciseName]
    );

    if (exerciseRows.length === 0) {
        throw new Error(`Exercise '${exerciseName}' not found.`);
    }

    const exerciseId = exerciseRows[0].id;

    for (const muscleName of muscleNames){
        const { rows: muscleRows } = await pool.query(
            "SELECT id FROM muscles WHERE muscle_group_name = $1",
            [muscleName]
        );

        if (muscleRows.length === 0) {
            throw new Error(`Muscle '${muscleName}' not found.`);
        }

        const muscleId = muscleRows[0].id;

        await pool.query(
            `INSERT INTO exercise_muscle_group (exercise_id, muscle_id)
            VALUES ($1, $2)
            ON CONFLICT (exercise_id, muscle_id) DO NOTHING;`,
            [exerciseId, muscleId]
        );
    }
}

//READ query functions (GET)
async function getAllMuscles(){
    const { rows } = await pool.query(`SELECT muscle_group_name AS "Muscle Name" FROM muscles;`);
    return rows;
} 

async function getAllExercises(){
    const { rows } = await pool.query(`SELECT exercise_name AS "Exercise Name" FROM exercises`);
    return rows;
}

async function getAllExerciseMusclePairs(){
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

async function searchMusclesByName(searchPhrase){
    const { rows } = await pool.query("SELECT muscle_group_name FROM muscles WHERE muscle_group_name ILIKE $1", ['%' + searchPhrase + '%'])
    return rows;
}

async function searchMuscleByNameExact(muscleName){
    const { rows } = await pool.query(
        "SELECT * FROM muscles WHERE muscle_group_name = $1",
        [muscleName]
    );
    return rows;
}

async function searchExercisesByName(searchPhrase){
    const { rows } = await pool.query("SELECT exercise_name FROM exercises WHERE exercise_name ILIKE $1 ", ['%' + searchPhrase + '%'])
    return rows;
}

async function searchMusclesByExercise(searchPhrase){
    const { rows } = await pool.query(`
        SELECT 
            e.exercise_name AS "Exercise Name", m.muscle_group_name AS "Muscles Trained"
        FROM exercise_muscle_group emg
        INNER JOIN muscles m ON emg.muscle_id = m.id
        INNER JOIN exercises e ON emg.exercise_id = e.id 
        WHERE e.exercise_name ILIKE $1
    `, ['%' + searchPhrase + '%'])
    return rows;
}

async function searchExercisesByMuscle(searchPhrase){
    const { rows } = await pool.query(`
        SELECT 
            e.exercise_name AS "Exercises"
        FROM exercise_muscle_group emg
        INNER JOIN muscles m ON emg.muscle_id = m.id
        INNER JOIN exercises e ON emg.exercise_id = e.id 
        WHERE m.muscle_group_name ILIKE $1
    `, ['%' + searchPhrase + '%'])
    return rows;
}

//UPDATE query functions (PUT)

async function updateMuscle(muscleName, newMuscleName){
    const { rows: existing } = await pool.query(
        "SELECT 1 FROM muscles WHERE muscle_group_name = $1",
        [newMuscleName]
    );

    if (existing.length > 0){
        throw new Error(`Muscle name '${newMuscleName}' already exists.`);
    }


    await pool.query(
        "UPDATE muscles SET muscle_group_name = $1 WHERE muscle_group_name = $2",
        [newMuscleName, muscleName]
    );
}

async function updateExercise(exerciseName, newExerciseName){
    const { rows: existing } = await pool.query(
        "SELECT 1 FROM exercises WHERE exercise_name = $1",
        [newExerciseName]
    );

    if (existing.length > 0){
        throw new Error(`Exercise name '${newExerciseName}' already exists.`);
    }

    await pool.query(
        "UPDATE exercises SET exercise_name = $1 WHERE exercise_name = $2",
        [newExerciseName, exerciseName]
    ); 
}

//DELETE query functions (DELETE)

async function deleteMuscle(muscleName){
    await pool.query(
        "DELETE FROM muscles WHERE muscle_group_name = $1",
        [muscleName]
    )
}

async function deleteExercise(exerciseName){
    const { rowCount } = await pool.query(
        "DELETE from exercises WHERE exercise_name = $1",
        [exerciseName]
    )

    return rowCount > 0;
}

async function clearMuscles(){
    await pool.query("TRUNCATE TABLE muscles")
}

async function clearExercises(){
    await pool.query("TRUNCATE TABLE exercises")
}

async function clearAllTables(){
    await clearMuscles();
    await clearExercises();
}

module.exports = {
    addMuscle,
    addExercise,
    addExerciseMusclePair,
    getAllMuscles,
    getAllExercises,
    getAllExerciseMusclePairs,
    searchMusclesByName,
    searchExercisesByName,
    searchMusclesByExercise,
    searchExercisesByMuscle,
    updateMuscle,
    updateExercise,
    deleteMuscle,
    deleteExercise,
    clearMuscles,
    clearExercises,
    clearAllTables,
    searchMuscleByNameExact
}

