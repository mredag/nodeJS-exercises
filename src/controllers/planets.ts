// controllers/planets.ts

import { Request, Response } from 'express';
import Joi from 'joi';

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

const planetSchema = Joi.object({
    name: Joi.string().min(3).required()
});

export const getAll = (req: Request, res: Response) => {
    res.status(200).json(planets);
};

export const getOneById = (req: Request, res: Response) => {
    const planet = planets.find(p => p.id === parseInt(req.params.id));
    if (!planet) return res.status(404).send('Planet not found');
    res.status(200).json(planet);
};

export const create = (req: Request, res: Response) => {
    const { error } = planetSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const planet: Planet = {
        id: planets.length + 1,
        name: req.body.name
    };
    planets = [...planets, planet];
    res.status(201).json({ msg: 'Planet created successfully' });
};

export const updateById = (req: Request, res: Response) => {
    const { error } = planetSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    planets = planets.map(planet =>
        planet.id === parseInt(req.params.id)
            ? { ...planet, name: req.body.name }
            : planet
    );

    res.status(200).json({ msg: 'Planet updated successfully' });
};

export const deleteById = (req: Request, res: Response) => {
    const initialLength = planets.length;
    planets = planets.filter(planet => planet.id !== parseInt(req.params.id));

    if (initialLength === planets.length) return res.status(404).send('Planet not found');

    res.status(200).json({ msg: 'Planet deleted successfully' });
};
