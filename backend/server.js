import express from "express"
import cors from 'cors'
import 'dotenv/config'
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import './models/doctorModel.js'
import './models/userModel.js'
import './models/aiDoctorModel.js'
import './models/aiChatModel.js'
import userRouter from "./routes/userRoute.js"
import doctorRouter from "./routes/doctorRoute.js"
import adminRouter from "./routes/adminRoute.js"
import healthTrackerRouter from "./routes/healthTrackerRoutes.js"
import aiDoctorRouter from "./routes/aiDoctorRoute.js"
import errorHandler from "./middleware/error.js"
import "./initAIDoctor.js"

// app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// middlewares
app.use(express.json())
const allowedOrigins = [
  'https://appointa-care-exze.vercel.app',   // ✅ uses credentials
  'https://appointa-care-admin.vercel.app'   // ✅ no credentials
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true // ✅ necessary for the frontend site that uses cookies/auth headers
  })
);


// api endpoints
app.use("/api/user", userRouter)
app.use("/api/admin", adminRouter)
app.use("/api/doctor", doctorRouter)
app.use("/api/health-tracker", healthTrackerRouter)
app.use("/api/ai-doctor", aiDoctorRouter)

app.get("/", (req, res) => {
  res.send("API Working")
});

// Error handler middleware
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on PORT:${port}`))
