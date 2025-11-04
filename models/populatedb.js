const { Client } = require('pg');
const { argv } = require('node:process')
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const createTables = `
CREATE TABLE IF NOT EXISTS muscles (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    muscle_group_name TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS exercises (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    exercise_name TEXT NOT NULL UNIQUE
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

  const connectionString = argv[2] || process.env.DATABASE_URL || `postgresql://${process.env.LOCAL_DB_USER}:${process.env.LOCAL_DB_PASSWORD}@${process.env.LOCAL_DB_HOST}:${process.env.LOCAL_DB_PORT}/${process.env.LOCAL_DB_NAME}`;
  
  const client = new Client({
    connectionString,
    ssl: connectionString.includes('render.com')
      ? { rejectUnauthorized: false }
      : false
  });
  await client.connect();
  await client.query(createTables);
  await client.query(populateTables);
  await client.end();
  console.log("done");
}

main();