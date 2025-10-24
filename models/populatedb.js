const { Client } = require('pg');

const createTables = `
CREATE TABLE IF NOT EXISTS muscles (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    muscle_group_name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS exercises (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    exercise_name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS exercise_muscle_group (
    exercise_id INT NOT NULL,
    muscle_id INT NOT NULL,
    PRIMARY KEY (exercise_id, muscle_id),
    FOREIGN KEY (exercise_id) REFERENCES exercises(id) ON DELETE CASCADE,
    FOREIGN KEY (muscle_id) REFERENCES muscles(id) ON DELETE CASCADE
);


`;

const populateTables = `
INSERT INTO muscles (muscle_group_name) 
VALUES 
    ('Chest'), 
    ('Back'), 
    ('Quads');

INSERT INTO exercises (exercise_name) 
VALUES 
    ('Pull Up'), 
    ('Barbell Squat'), 
    ('Bench Press');

INSERT INTO exercise_muscle_group (exercise_id, muscle_id) 
VALUES 
    (1,2),
    (2,3),
    (3,1)
`

async function main() {
  console.log("seeding...");

  //add if else statement when implementing a remote database
  const client = new Client({
    connectionString: "postgresql://danielguirao:baconater@localhost:5432/exercise_inventory",
  });
  await client.connect();
  await client.query(createTables);
  await client.query(populateTables);
  await client.end();
  console.log("done");
}

main();