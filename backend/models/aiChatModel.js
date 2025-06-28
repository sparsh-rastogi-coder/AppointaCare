import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    sender: {
        type: String,
        enum: ['user', 'ai_doctor'],
        required: true
    },
    content: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    messageType: {
        type: String,
        enum: ['text', 'symptom', 'diagnosis', 'recommendation', 'emergency'],
        default: 'text'
    },
    metadata: {
        symptoms: [String],
        severity: String,
        urgency: String,
        recommendations: [String],
        followUpRequired: Boolean
    }
});

const aiChatSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    sessionId: {
        type: String,
        required: true,
        unique: true
    },
    messages: [messageSchema],
    consultationType: {
        type: String,
        enum: ['general', 'symptom_check', 'medication_info', 'health_guidance'],
        default: 'general'
    },
    status: {
        type: String,
        enum: ['active', 'completed', 'escalated'],
        default: 'active'
    },
    summary: {
        symptoms: [String],
        recommendations: [String],
        urgency: String,
        followUpRequired: Boolean,
        emergencyContact: Boolean
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Index for efficient querying
aiChatSchema.index({ userId: 1, createdAt: -1 });
aiChatSchema.index({ sessionId: 1 });

const aiChatModel = mongoose.models.aiChat || mongoose.model("aiChat", aiChatSchema);
export default aiChatModel; 