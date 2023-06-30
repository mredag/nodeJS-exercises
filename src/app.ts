import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import Joi from 'joi';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Dummy Database
interface Planet {
    id: number;
    name: string;
}

let planets: Planet[] = [
    {
        id: 1,
        name: "Earth",
    },
    {
        id: 2,
        name: "Mars",
    },
];

// Validation Schema
const planetSchema = Joi.object({
    name: Joi.string().min(3).required()
});

// Routes
app.get('/api/planets', (req: Request, res: Response) => {
    res.status(200).json(planets);
});

app.get('/api/planets/:id', (req: Request, res: Response) => {
    const planet = planets.find(p => p.id === parseInt(req.params.id));
    if (!planet) return res.status(404).send('Planet not found');
    res.status(200).json(planet);
});

app.post('/api/planets', (req: Request, res: Response) => {
    const { error } = planetSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const planet: Planet = {
        id: planets.length + 1,
        name: req.body.name
    };
    planets.push(planet);
    res.status(201).json({ msg: 'Planet created successfully' });
});

app.put('/api/planets/:id', (req: Request, res: Response) => {
    const planet = planets.find(p => p.id === parseInt(req.params.id));
    if (!planet) return res.status(404).send('Planet not found');

    const { error } = planetSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    planet.name = req.body.name;
    res.status(200).json({ msg: 'Planet updated successfully' });
});

app.delete('/api/planets/:id', (req: Request, res: Response) => {
    const index = planets.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('Planet not found');

    planets.splice(index, 1);
    res.status(200).json({ msg: 'Planet deleted successfully' });
});

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


