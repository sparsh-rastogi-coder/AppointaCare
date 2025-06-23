import express from 'express';
import {
    createHealthEntry,
    getMyHealthEntries,
    getHealthEntry,
    updateHealthEntry,
    deleteHealthEntry,
    shareWithDoctor,
    getSharedEntries,
    leaveDoctorFeedback
} from '../controllers/healthTrackerController.js';

import authUser from '../middleware/authUser.js';
import authDoctor from '../middleware/authDoctor.js';

const router = express.Router();

// Routes specifically for users
router.route('/')
    .post(authUser, createHealthEntry)
    .get(authUser, getMyHealthEntries);

router.route('/:id')
    .get(getHealthEntry) // Both users and doctors can access if shared
    .put(authUser, updateHealthEntry)
    .delete(authUser, deleteHealthEntry);

router.route('/:id/share')
    .post(authUser, shareWithDoctor);

// Routes specifically for doctors
router.get('/shared/entries', authDoctor, getSharedEntries);

// Doctor feedback route
router.post('/:id/feedback', authDoctor, leaveDoctorFeedback);

export default router; 