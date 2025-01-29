import { Router } from 'express';
import {
  addInterest,
  addSkill,
  createProfile,
  deleteProfile,
  getAllProfiles,
  getMyProfile,
  getProfileById,
  removeInterest,
  removeSkill,
  searchProfiles,
  searchProfilesByInterests,
  searchProfilesBySkills,
  updateProfile,
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
router.get('/all', verifyToken, getAllProfiles);
router.get('/search', verifyToken, searchProfiles);
router.get('/:profileId', verifyToken, getProfileById);
router.get('/search/skills', verifyToken, searchProfilesBySkills);
router.get('/search/interests', verifyToken, searchProfilesByInterests);

export default router;
