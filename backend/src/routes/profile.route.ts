import { Router } from 'express';
import {
  addInterest,
  addSkill,
  createProfile,
  deleteProfile,
  deleteProfilePicture,
  getMyProfile,
  getProfileById,
  getUserStatistics,
  removeInterest,
  removeSkill,
  searchProfiles,
  updateProfile,
  uploadProfilePicture,
} from '../controllers/profile.controller';
import { verifyToken } from '../utils/jwt';

const router = Router();

router.post('/', verifyToken, createProfile);
router.get('/', verifyToken, getMyProfile);
router.put('/', verifyToken, updateProfile);
router.delete('/', verifyToken, deleteProfile);
router.post('/skills', verifyToken, addSkill);
router.delete('/skills', verifyToken, removeSkill);
router.post('/interests', verifyToken, addInterest);
router.delete('/interests', verifyToken, removeInterest);
router.get('/search', verifyToken, searchProfiles);
router.get('/statistics/:userId', verifyToken, getUserStatistics);
router.get('/:profileId', verifyToken, getProfileById);
router.put('/me/picture', verifyToken, uploadProfilePicture);
router.delete('me/picture', verifyToken, deleteProfilePicture);

export default router;
