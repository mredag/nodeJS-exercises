// controllers/planets.ts

import { Request, Response } from 'express';
import Joi from 'joi';
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

const planetSchema = Joi.object({
  name: Joi.string().min(3).required()
});

export const getAll = async (req: Request, res: Response) => {
  try {
    const planets = await db.any('SELECT * FROM planets');
    res.status(200).json(planets);
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong!');
  }
};

export const getOneById = async (req: Request, res: Response) => {
  try {
    const planet = await db.oneOrNone('SELECT * FROM planets WHERE id=$1', [req.params.id]);
    if (!planet) return res.status(404).send('Planet not found');
    res.status(200).json(planet);
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong!');
  }
};

export const create = async (req: Request, res: Response) => {
  const { error } = planetSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    await db.none('INSERT INTO planets (name) VALUES ($1)', [req.body.name]);
    res.status(201).json({ msg: 'Planet created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong!');
  }
};

export const updateById = async (req: Request, res: Response) => {
  const { error } = planetSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    await db.none('UPDATE planets SET name=$2 WHERE id=$1', [req.params.id, req.body.name]);
    res.status(200).json({ msg: 'Planet updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong!');
  }
};

export const deleteById = async (req: Request, res: Response) => {
  try {
    await db.none('DELETE FROM planets WHERE id=$1', [req.params.id]);
    res.status(200).json({ msg: 'Planet deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong!');
  }
};
