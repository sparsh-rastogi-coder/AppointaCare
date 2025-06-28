import aiDoctorModel from "../models/aiDoctorModel.js";
import aiChatModel from "../models/aiChatModel.js";
import userModel from "../models/userModel.js";
import { v4 as uuidv4 } from 'uuid';

// Initialize AI Doctor
const initializeAIDoctor = async (req, res) => {
    try {
        // Check if AI doctor already exists
        const existingAIDoctor = await aiDoctorModel.findOne({ isAIDoctor: true });
        
        if (existingAIDoctor) {
            return res.json({ success: true, message: 'AI Doctor already exists', aiDoctor: existingAIDoctor });
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
        res.json({ success: true, message: 'AI Doctor initialized successfully', aiDoctor });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Start AI consultation
const startAIConsultation = async (req, res) => {
    try {
        const { userId, consultationType = 'general' } = req.body;
        
        if (!userId) {
            return res.json({ success: false, message: 'User ID is required' });
        }

        // Generate unique session ID
        const sessionId = uuidv4();
        
        // Create initial AI doctor message
        const welcomeMessage = {
            sender: 'ai_doctor',
            content: `Hello! I'm Dr. AI Assistant, your AI medical companion. I'm here to help you with health-related questions, symptom analysis, and general medical guidance. 

What would you like to discuss today? I can help with:
• Symptom analysis and assessment
• General health questions
• Medication information
• Health recommendations
• Emergency guidance

Please note: I provide general information and should not replace professional medical care. For serious symptoms, please consult a healthcare provider immediately.`,
            timestamp: new Date(),
            messageType: 'text'
        };

        const aiChat = new aiChatModel({
            userId,
            sessionId,
            messages: [welcomeMessage],
            consultationType,
            status: 'active'
        });

        await aiChat.save();
        
        res.json({ 
            success: true, 
            message: 'AI consultation started', 
            sessionId,
            chat: aiChat 
        });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Send message to AI doctor
const sendMessageToAI = async (req, res) => {
    try {
        const { sessionId, message, userId } = req.body;
        
        if (!sessionId || !message || !userId) {
            return res.json({ success: false, message: 'Session ID, message, and user ID are required' });
        }

        // Find the chat session
        const chatSession = await aiChatModel.findOne({ sessionId, userId });
        if (!chatSession) {
            return res.json({ success: false, message: 'Chat session not found' });
        }

        // Add user message
        const userMessage = {
            sender: 'user',
            content: message,
            timestamp: new Date(),
            messageType: 'text'
        };

        chatSession.messages.push(userMessage);

        // Generate AI response based on message content
        const aiResponse = await generateAIResponse(message, chatSession);
        
        chatSession.messages.push(aiResponse);
        chatSession.updatedAt = new Date();

        // Update summary if needed
        if (aiResponse.messageType === 'diagnosis' || aiResponse.messageType === 'recommendation') {
            chatSession.summary = {
                symptoms: aiResponse.metadata?.symptoms || [],
                recommendations: aiResponse.metadata?.recommendations || [],
                urgency: aiResponse.metadata?.urgency || 'low',
                followUpRequired: aiResponse.metadata?.followUpRequired || false,
                emergencyContact: aiResponse.metadata?.urgency === 'high'
            };
        }

        await chatSession.save();
        
        res.json({ 
            success: true, 
            message: 'Message sent successfully', 
            aiResponse,
            chatSession 
        });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Generate AI response based on user input
const generateAIResponse = async (userMessage, chatSession) => {
    const message = userMessage.toLowerCase();
    
    // Simple keyword-based response system (in a real implementation, you'd use a more sophisticated AI)
    let response = {
        sender: 'ai_doctor',
        content: '',
        timestamp: new Date(),
        messageType: 'text',
        metadata: {}
    };

    // Symptom analysis
    if (message.includes('headache') || message.includes('head pain')) {
        response.content = `I understand you're experiencing a headache. Let me help you assess this:

**Common causes of headaches:**
• Stress and tension
• Dehydration
• Lack of sleep
• Eye strain
• Sinus issues

**Questions to help assess:**
• How long have you had this headache?
• Is it on one side or both sides?
• What's the pain level (1-10)?
• Any other symptoms like nausea or sensitivity to light?

**Immediate relief suggestions:**
• Rest in a quiet, dark room
• Stay hydrated
• Try over-the-counter pain relievers
• Apply cold or warm compress

**Seek immediate medical attention if:**
• Sudden, severe headache
• Headache with fever and stiff neck
• Headache after head injury
• Headache with confusion or vision changes

Would you like to tell me more about your symptoms?`;
        response.messageType = 'diagnosis';
        response.metadata = {
            symptoms: ['headache'],
            severity: 'moderate',
            urgency: 'low',
            recommendations: ['Rest', 'Hydration', 'Pain relievers'],
            followUpRequired: false
        };
    }
    // Fever
    else if (message.includes('fever') || message.includes('temperature')) {
        response.content = `I see you're concerned about fever. Let me help you understand this:

**Fever basics:**
• Normal body temperature: 97-99°F (36-37°C)
• Fever: 100.4°F (38°C) or higher
• High fever: 103°F (39.4°C) or higher

**Common causes:**
• Viral or bacterial infections
• Inflammatory conditions
• Heat exhaustion
• Certain medications

**Home care:**
• Rest and stay hydrated
• Take acetaminophen or ibuprofen
• Cool compress or lukewarm bath
• Monitor temperature regularly

**Seek medical attention if:**
• Temperature above 103°F (39.4°C)
• Fever lasting more than 3 days
• Fever with severe symptoms
• Fever in infants under 3 months

What's your current temperature, and how long have you had the fever?`;
        response.messageType = 'diagnosis';
        response.metadata = {
            symptoms: ['fever'],
            severity: 'moderate',
            urgency: 'moderate',
            recommendations: ['Monitor temperature', 'Stay hydrated', 'Rest'],
            followUpRequired: true
        };
    }
    // Emergency keywords
    else if (message.includes('chest pain') || message.includes('heart attack') || message.includes('stroke')) {
        response.content = `⚠️ **EMERGENCY ALERT** ⚠️

Chest pain and stroke symptoms are medical emergencies that require immediate attention!

**If you're experiencing:**
• Chest pain or pressure
• Shortness of breath
• Pain radiating to arm, jaw, or back
• Sudden numbness or weakness
• Difficulty speaking or understanding
• Severe headache

**IMMEDIATE ACTION REQUIRED:**
1. Call emergency services (911) immediately
2. Do not wait or try to drive yourself
3. Stay calm and follow emergency operator instructions

**This is not a drill - these symptoms require immediate medical evaluation.**

Please call emergency services now if you're experiencing these symptoms.`;
        response.messageType = 'emergency';
        response.metadata = {
            symptoms: ['chest pain', 'emergency'],
            severity: 'high',
            urgency: 'high',
            recommendations: ['Call emergency services immediately'],
            followUpRequired: true
        };
    }
    // General health questions
    else if (message.includes('healthy') || message.includes('diet') || message.includes('exercise')) {
        response.content = `Great question about maintaining good health! Here are some general recommendations:

**Healthy Lifestyle Tips:**
• **Nutrition:** Eat a balanced diet with fruits, vegetables, lean proteins, and whole grains
• **Exercise:** Aim for 150 minutes of moderate exercise weekly
• **Sleep:** Get 7-9 hours of quality sleep per night
• **Hydration:** Drink 8-10 glasses of water daily
• **Stress Management:** Practice relaxation techniques like meditation or deep breathing

**Preventive Care:**
• Regular check-ups with your doctor
• Recommended vaccinations
• Screenings based on age and risk factors
• Dental and eye exams

**Mental Health:**
• Stay connected with friends and family
• Practice mindfulness or meditation
• Seek professional help if needed

Is there a specific aspect of health you'd like to focus on?`;
        response.messageType = 'recommendation';
        response.metadata = {
            symptoms: [],
            severity: 'low',
            urgency: 'low',
            recommendations: ['Balanced diet', 'Regular exercise', 'Adequate sleep', 'Stress management'],
            followUpRequired: false
        };
    }
    // Default response
    else {
        response.content = `Thank you for your message. I'm here to help with your health concerns. 

To provide better assistance, could you please:
• Describe your symptoms in detail
• Mention any medications you're taking
• Share your medical history if relevant
• Let me know if this is urgent

Remember, I provide general information and guidance. For specific medical advice, diagnosis, or treatment, please consult with a healthcare professional.

What specific health concern would you like to discuss?`;
    }

    return response;
};

// Get chat history
const getChatHistory = async (req, res) => {
    try {
        const { userId } = req.params;
        
        const chatHistory = await aiChatModel.find({ userId })
            .sort({ updatedAt: -1 })
            .select('-messages')
            .limit(10);
        
        res.json({ success: true, chatHistory });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Get specific chat session
const getChatSession = async (req, res) => {
    try {
        const { sessionId } = req.params;
        const { userId } = req.query;
        
        const chatSession = await aiChatModel.findOne({ sessionId, userId });
        
        if (!chatSession) {
            return res.json({ success: false, message: 'Chat session not found' });
        }
        
        res.json({ success: true, chatSession });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// End consultation
const endConsultation = async (req, res) => {
    try {
        const { sessionId, userId } = req.body;
        
        const chatSession = await aiChatModel.findOne({ sessionId, userId });
        if (!chatSession) {
            return res.json({ success: false, message: 'Chat session not found' });
        }
        
        chatSession.status = 'completed';
        chatSession.updatedAt = new Date();
        
        await chatSession.save();
        
        res.json({ success: true, message: 'Consultation ended successfully' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export {
    initializeAIDoctor,
    startAIConsultation,
    sendMessageToAI,
    getChatHistory,
    getChatSession,
    endConsultation
}; 