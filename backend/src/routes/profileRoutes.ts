// profileRoutes.ts

import { Router } from 'express';
import { createProfile, getMyProfile, updateProfile, deleteProfile, searchProfiles, getAllProfiles } from '../controllers/profileController';
import { verifyToken } from '../utils/jwt';

const router = Router();

router.post('/', verifyToken, createProfile);
router.get('/', verifyToken, getMyProfile);
router.put('/', verifyToken, updateProfile);
router.delete('/', verifyToken, deleteProfile);
router.get('/search', searchProfiles);
router.get('/all', getAllProfiles); // Neue Route für getAllProfiles

export default router;