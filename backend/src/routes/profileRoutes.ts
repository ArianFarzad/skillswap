import { Router } from 'express';
import { createProfile, getProfile, updateProfile, deleteProfile } from '../controllers/profileController';
import { verifyToken } from '../utils/jwt';

const router = Router();

router.post('/', verifyToken, createProfile);
router.get('/', verifyToken, getProfile);
router.put('/', verifyToken, updateProfile);
router.delete('/', verifyToken, deleteProfile);

export default router;