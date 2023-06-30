import pgPromise from 'pg-promise';

const pgp = pgPromise();

const connection = {
    host: 'localhost',
    port: 5432,
    database: 'emreDev',
    user: 'postgres',
    password: '1234'
};

const db = pgp(connection);

export default db;
