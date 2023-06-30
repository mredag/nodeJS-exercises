// src/app.ts

import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import { getAll, getOneById, create, updateById, deleteById } from './controllers/planets';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.get('/api/planets', getAll);
app.get('/api/planets/:id', getOneById);
app.post('/api/planets', create);
app.put('/api/planets/:id', updateById);
app.delete('/api/planets/:id', deleteById);

// Error Handling Middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
