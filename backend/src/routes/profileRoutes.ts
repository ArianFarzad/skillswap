import { Router } from 'express';
import { createProfile, getProfile, updateProfile, deleteProfile, searchProfiles } from '../controllers/profileController';
import { verifyToken } from '../utils/jwt';

const router = Router();

router.post('/', verifyToken, createProfile);
router.get('/', verifyToken, getProfile);
router.put('/', verifyToken, updateProfile);
router.delete('/', verifyToken, deleteProfile);
router.get('/search', searchProfiles); // Neue Route für die Suche nach Profilen

export default router;