import { Router } from 'express';
import {
  createProfile,
  getMyProfile,
  updateProfile,
  deleteProfile,
  addSkill,
  removeSkill,
  addInterest,
  removeInterest,
  getAllProfiles,
  getProfileById,
} from '../controllers/profileController';
import { verifyToken } from '../utils/jwt';

const router = Router();

router.post('/', verifyToken, createProfile);
router.get('/', verifyToken, getMyProfile);
router.put('/', verifyToken, updateProfile);
router.delete('/', verifyToken, deleteProfile);
router.put('/skills', verifyToken, addSkill);
router.delete('/skills', verifyToken, removeSkill);
router.post('/interests', verifyToken, addInterest);
router.delete('/interests', verifyToken, removeInterest); // Route für removeInterest
router.get('/all', getAllProfiles);
router.get('/:userId', getProfileById);

export default router;