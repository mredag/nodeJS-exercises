import { Router } from 'express';
import * as planetsController from '../controllers/planets';
import { upload } from '../config/multerConfig'

const router = Router();

router.get('/', planetsController.getAll);
router.get('/:id', planetsController.getOneById);
router.post('/', planetsController.create);
router.put('/:id', planetsController.updateById);
router.delete('/:id', planetsController.deleteById);
router.post('/:id/image', upload.single('image'), planetsController.uploadImage);

export default router;
