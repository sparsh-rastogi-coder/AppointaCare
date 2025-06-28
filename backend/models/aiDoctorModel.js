import mongoose from "mongoose";

const aiDoctorSchema = new mongoose.Schema({
    name: { type: String, required: true, default: "Dr. AI Assistant" },
    email: { type: String, required: true, unique: true, default: "ai.doctor@appointacare.com" },
    password: { type: String, required: true, default: "ai_doctor_secure_password" },
    image: { type: String, required: true, default: "https://res.cloudinary.com/demo/image/upload/v1/samples/ai-doctor-avatar.jpg" },
    speciality: { type: String, required: true, default: "AI Medical Assistant" },
    degree: { type: String, required: true, default: "AI-Powered Medical AI" },
    experience: { type: String, required: true, default: "Advanced AI" },
    about: { type: String, required: true, default: "I am an AI-powered medical assistant designed to provide preliminary health assessments, answer medical questions, and offer general health guidance. I can help with symptom analysis, medication information, and health recommendations. However, I am not a replacement for professional medical care." },
    available: { type: Boolean, default: true },
    fees: { type: Number, required: true, default: 0 },
    slots_booked: { type: Object, default: {} },
    address: { type: Object, required: true, default: { line1: "Virtual Consultation", line2: "Available 24/7" } },
    date: { type: Number, required: true, default: Date.now() },
    isAIDoctor: { type: Boolean, default: true },
    aiCapabilities: {
        symptomAnalysis: { type: Boolean, default: true },
        medicationInfo: { type: Boolean, default: true },
        healthGuidance: { type: Boolean, default: true },
        emergencyAlerts: { type: Boolean, default: true }
    },
    medicalKnowledge: {
        specialties: [{ type: String }],
        certifications: [{ type: String }],
        languages: [{ type: String, default: "English" }]
    }
}, { minimize: false })

const aiDoctorModel = mongoose.models.aiDoctor || mongoose.model("aiDoctor", aiDoctorSchema);
export default aiDoctorModel; 