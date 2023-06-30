import pgPromise from 'pg-promise';
import dotenv from 'dotenv';

dotenv.config();

const pgp = pgPromise();
const db = pgp({
    host: 'localhost',
    port: 5432,
    database: 'your_db_name',
    user: 'postgres',
    password: 'your_password'
});

const createUsersTable = `
    DROP TABLE IF EXISTS users;

    CREATE TABLE users (
        id SERIAL NOT NULL PRIMARY KEY,
        username TEXT NOT NULL,
        password TEXT NOT NULL,
        token TEXT
    );
`;

db.none(createUsersTable)
    .then(() => {
        console.log('Users table created successfully.');
        pgp.end();
    })
    .catch(error => {
        console.error('Error creating users table:', error);
        pgp.end();
    });
