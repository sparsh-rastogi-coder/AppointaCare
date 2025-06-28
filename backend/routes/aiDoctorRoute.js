import express from "express";
import {
    initializeAIDoctor,
    startAIConsultation,
    sendMessageToAI,
    getChatHistory,
    getChatSession,
    endConsultation
} from "../controllers/aiDoctorController.js";
import { authUser } from "../middleware/authUser.js";

const aiDoctorRouter = express.Router();

// Initialize AI Doctor (admin only)
aiDoctorRouter.post("/initialize", initializeAIDoctor);

// AI Consultation routes
aiDoctorRouter.post("/start-consultation", authUser, startAIConsultation);
aiDoctorRouter.post("/send-message", authUser, sendMessageToAI);
aiDoctorRouter.get("/chat-history/:userId", authUser, getChatHistory);
aiDoctorRouter.get("/chat-session/:sessionId", authUser, getChatSession);
aiDoctorRouter.post("/end-consultation", authUser, endConsultation);

export default aiDoctorRouter; 