import { Request, Response } from 'express';
import db from '../config/db';

export const getAll = async (req: Request, res: Response) => {
    try {
        const planets = await db.any('SELECT * FROM planets');
        res.json(planets);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};

export const getOneById = async (req: Request, res: Response) => {
    try {
        const planet = await db.one('SELECT * FROM planets WHERE id=$1', [req.params.id]);
        res.json(planet);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};

export const create = async (req: Request, res: Response) => {
    try {
        await db.none('INSERT INTO planets (name) VALUES ($1)', [req.body.name]);
        res.status(201).json({ msg: 'Planet created' });
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};

export const updateById = async (req: Request, res: Response) => {
    try {
        await db.none('UPDATE planets SET name=$1 WHERE id=$2', [req.body.name, req.params.id]);
        res.json({ msg: 'Planet updated' });
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};

export const deleteById = async (req: Request, res: Response) => {
    try {
        await db.none('DELETE FROM planets WHERE id=$1', [req.params.id]);
        res.json({ msg: 'Planet deleted' });
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};

export const uploadImage = async (req: Request & { file: Express.Multer.File }, res: Response) => {
    try {
        await db.none('UPDATE planets SET image=$1 WHERE id=$2', [req.file.path, req.params.id]);
        res.json({ msg: 'Image uploaded' });
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};

