import doctor from '../models/doctorModel.js';
import HealthTracker from '../models/healthTracker.js';
import User from '../models/userModel.js';
import ErrorResponse from '../utils/errorResponse.js';
import asyncHandler from '../middleware/async.js';
import healthTracker from '../models/healthTracker.js';

// @desc    Create a new health tracker entry
// @route   POST /api/health-tracker
// @access  Private (User)
export const createHealthEntry = asyncHandler(async (req, res, next) => {
    // Add userId to request body
    req.body.userId = req.body.userId;

    const healthEntry = await HealthTracker.create(req.body);

    res.status(201).json({
        success: true,
        data: healthEntry
    });
});

// @desc    Get all health entries for logged in user
// @route   GET /api/health-tracker
// @access  Private (User)
export const getMyHealthEntries = asyncHandler(async (req, res, next) => {
    const entries = await HealthTracker.find({ userId: req.body.userId })
        .sort('-date')
        .populate('sharedWith.doctorId', 'firstName lastName');

    res.status(200).json({
        success: true,
        count: entries.length,
        data: entries
    });
});

// @desc    Get single health entry
// @route   GET /api/health-tracker/:id
// @access  Private (User & Shared Doctors)
export const getHealthEntry = asyncHandler(async (req, res, next) => {
    const entry = await HealthTracker.findById(req.params.id)
        .populate('userId', 'firstName lastName email')
        .populate('sharedWith.doctorId', 'firstName lastName');

    if (!entry) {
        return next(new ErrorResponse(`Health entry not found with id of ${req.params.id}`, 404));
    }

    // Make sure user owns entry or is a shared doctor
    if (entry.userId.toString() !== req.body.userId && 
        !entry.sharedWith.some(share => share.doctorId.toString() === req.body.userId)) {
        return next(new ErrorResponse('Not authorized to access this entry', 403));
    }

    res.status(200).json({
        success: true,
        data: entry
    });
});

// @desc    Update health entry
// @route   PUT /api/health-tracker/:id
// @access  Private (User)
export const updateHealthEntry = asyncHandler(async (req, res, next) => {
    let entry = await HealthTracker.findById(req.params.id);

    if (!entry) {
        return next(new ErrorResponse(`Health entry not found with id of ${req.params.id}`, 404));
    }

    // Make sure user owns entry
    if (entry.userId.toString() !== req.body.userId) {
        return next(new ErrorResponse('Not authorized to update this entry', 403));
    }

    entry = await HealthTracker.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: entry
    });
});

// @desc    Delete health entry
// @route   DELETE /api/health-tracker/:id
// @access  Private (User)
export const deleteHealthEntry = asyncHandler(async (req, res, next) => {
    const entry = await HealthTracker.findById(req.params.id);

    if (!entry) {
        return next(new ErrorResponse(`Health entry not found with id of ${req.params.id}`, 404));
    }

    // Make sure user owns entry
    if (entry.userId.toString() !== req.body.userId) {
        return next(new ErrorResponse('Not authorized to delete this entry', 403));
    }

    await entry.deleteOne();

    res.status(200).json({
        success: true,
        data: {}
    });
});

// @desc    Share health entry with doctor
// @route   POST /api/health-tracker/:id/share
// @access  Private (User)
export const shareWithDoctor = asyncHandler(async (req, res, next) => {
    const { doctorId } = req.body;
    // Check if doctor exists
    const doctor_val = await doctor.findById(doctorId);
    if (!doctor_val) {
        return next(new ErrorResponse(`doctorModel not found with id of ${doctorId}`, 404));
    }

    const entry = await HealthTracker.findById(req.params.id);
    if (!entry) {
        return next(new ErrorResponse(`Health entry not found with id of ${req.params.id}`, 404));
    }

    // Make sure user owns entry
    if (entry.userId.toString() !== req.body.userId) {
        return next(new ErrorResponse('Not authorized to share this entry', 403));
    }

    // Check if already shared with this doctor
    if (entry.sharedWith.some(share => share.doctorId.toString() === doctorId)) {
        return next(new ErrorResponse('Entry already shared with this doctor', 400));
    }

    entry.sharedWith.push({ doctorId });
    await entry.save();

    res.status(200).json({
        success: true,
        data: entry
    });
});

// @desc    Get shared health entries (for doctors)
// @route   GET /api/health-tracker/shared
// @access  Private (doctorModel)
export const getSharedEntries = asyncHandler(async (req, res, next) => {
    const entries = await HealthTracker.find({
        'sharedWith.doctorId': req.body.docId
    })
    .populate('userId', 'firstName lastName email')
    .sort('-date');
    res.status(200).json({
        success: true,
        count: entries.length,
        data: entries
    });
});

// @desc    Doctor leaves feedback on a shared health entry
// @route   POST /api/health-tracker/:id/feedback
// @access  Private (Doctor)
export const leaveDoctorFeedback = asyncHandler(async (req, res, next) => {
    const { feedback } = req.body;
    const doctorId = req.body.docId;
    const entry = await HealthTracker.findById(req.params.id);
    if (!entry) {
        return next(new ErrorResponse(`Health entry not found with id of ${req.params.id}`, 404));
    }
    // Find the sharedWith entry for this doctor
    const shared = entry.sharedWith.find(share => share.doctorId.toString() === doctorId);
    if (!shared) {
        return next(new ErrorResponse('Not authorized to leave feedback on this entry', 403));
    }
    shared.doctorFeedback = feedback;
    await entry.save();
    res.status(200).json({
        success: true,
        message: 'Feedback submitted',
        data: entry
    });
}); 