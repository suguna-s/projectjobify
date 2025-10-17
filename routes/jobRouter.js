import { Router } from 'express';
import {
  validateIdParam,
  validateJobInput,
} from '../middleware/validationMiddleware.js';
const router = Router();

import {
  getAllJobs,
  createJob,
  updateJob,
  deleteJob,
  getJob,
  showStats,
} from '../controllers/jobController.js';
import { checkForTestUser } from '../middleware/authMiddleware.js';

router.get('/', getAllJobs);
router.get('/stats', showStats);
router.post('/', checkForTestUser, validateJobInput, createJob);
router.get('/:id', validateIdParam, getJob);
router.patch(
  '/:id',
  checkForTestUser,
  validateIdParam,
  validateJobInput,
  updateJob
);
router.delete('/:id', checkForTestUser, validateIdParam, deleteJob);

export default router;
