// setupDb.ts

import pgPromise from 'pg-promise';

const pgp = pgPromise();

const connection = {
  host: 'localhost',
  port: 5432,
  database: 'postgre',
  user: 'emreDev',
  password: '1234'
};

const db = pgp(connection);

const createTable = `
  DROP TABLE IF EXISTS planets;

  CREATE TABLE planets(
    id SERIAL NOT NULL PRIMARY KEY,
    name TEXT NOT NULL
  );
`;

const populateTable = `
  INSERT INTO planets (name) VALUES ('Earth'), ('Mars');
`;

async function setupDb() {
  try {
    await db.none(createTable);
    await db.none(populateTable);
    console.log('Database setup complete.');
  } catch (error) {
    console.error('Error setting up database:', error);
  }
  pgp.end();
}

setupDb();
