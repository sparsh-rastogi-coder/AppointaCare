import mongoose from 'mongoose';

const healthMetricsSchema = new mongoose.Schema({
    bloodPressure: {
        systolic: { type: Number, min: 0, max: 300 },
        diastolic: { type: Number, min: 0, max: 200 }
    },
    bloodGlucose: { type: Number, min: 0, max: 1000 }, // mg/dL
    weight: { type: Number, min: 0, max: 500 }, // kg
    temperature: { type: Number, min: 30, max: 45 }, // Celsius
    heartRate: { type: Number, min: 0, max: 250 }, // bpm
    oxygenLevel: { type: Number, min: 0, max: 100 }, // SpO2 percentage
    sleepHours: { type: Number, min: 0, max: 24 }
});

const healthTrackerSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    metrics: healthMetricsSchema,
    symptoms: [{
        type: String,
        trim: true
    }],
    mood: {
        type: String,
        enum: ['Excellent', 'Good', 'Fair', 'Poor'],
        required: true
    },
    medications: [{
        name: { type: String, required: true },
        dosage: String,
        timing: String
    }],
    notes: {
        type: String,
        trim: true,
        maxlength: 1000
    },
    sharedWith: [{
        doctorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'doctor'
        },
        sharedAt: {
            type: Date,
            default: Date.now
        },
        doctorFeedback: {
            type: String,
            trim: true,
            maxlength: 1000
        }
    }],
    attachments: [{
        name: String,
        url: String,
        type: String // e.g., 'image', 'pdf', etc.
    }]
}, {
    timestamps: true
});

// Index for efficient querying
healthTrackerSchema.index({ userId: 1, date: -1 });
healthTrackerSchema.index({ 'sharedWith.doctorId': 1 });

export default mongoose.model('HealthTracker', healthTrackerSchema); 