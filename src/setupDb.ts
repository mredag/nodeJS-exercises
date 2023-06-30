import db from './config/db';

const setupDb = async () => {
    try {
        await db.none(`
            DROP TABLE IF EXISTS planets;
            CREATE TABLE planets(
                id SERIAL NOT NULL PRIMARY KEY,
                name TEXT NOT NULL,
                image TEXT
            );
        `);

        console.log('Database setup complete');
    } catch (error) {
        console.error('Error setting up the database:', error);
    }
};

setupDb();
