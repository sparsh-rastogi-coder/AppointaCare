import aiDoctorModel from "./models/aiDoctorModel.js";
import connectDB from "./config/mongodb.js";

const initializeAIDoctor = async () => {
    try {
        await connectDB();
        
        // Check if AI doctor already exists
        const existingAIDoctor = await aiDoctorModel.findOne({ isAIDoctor: true });
        
        if (existingAIDoctor) {
            console.log('AI Doctor already exists in database');
            return;
        }

        // Create new AI doctor
        const aiDoctor = new aiDoctorModel({
            name: "Dr. AI Assistant",
            email: "ai.doctor@appointacare.com",
            password: "ai_doctor_secure_password",
            image: "https://res.cloudinary.com/demo/image/upload/v1/samples/ai-doctor-avatar.jpg",
            speciality: "AI Medical Assistant",
            degree: "AI-Powered Medical AI",
            experience: "Advanced AI",
            about: "I am an AI-powered medical assistant designed to provide preliminary health assessments, answer medical questions, and offer general health guidance. I can help with symptom analysis, medication information, and health recommendations. However, I am not a replacement for professional medical care.",
            available: true,
            fees: 0,
            address: { line1: "Virtual Consultation", line2: "Available 24/7" },
            date: Date.now(),
            isAIDoctor: true,
            aiCapabilities: {
                symptomAnalysis: true,
                medicationInfo: true,
                healthGuidance: true,
                emergencyAlerts: true
            },
            medicalKnowledge: {
                specialties: ["General Medicine", "Symptom Analysis", "Health Guidance"],
                certifications: ["AI Medical Assistant", "Health Information Provider"],
                languages: ["English"]
            }
        });

        await aiDoctor.save();
        console.log('AI Doctor initialized successfully');
        
    } catch (error) {
        console.error('Error initializing AI Doctor:', error);
    }
};

// Run initialization
initializeAIDoctor(); 