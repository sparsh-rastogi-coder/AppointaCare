import express from "express"
import cors from 'cors'
import 'dotenv/config'
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import './models/doctorModel.js'
import './models/userModel.js'
import userRouter from "./routes/userRoute.js"
import doctorRouter from "./routes/doctorRoute.js"
import adminRouter from "./routes/adminRoute.js"
import healthTrackerRouter from "./routes/healthTrackerRoutes.js"
import errorHandler from "./middleware/error.js"

// app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// middlewares
app.use(express.json())
app.use(
  cors({
    origin: 'https://appointa-care-exze.vercel.app', // ✅ frontend URL
    credentials: true, // include this if using cookies/auth
  })
);

// api endpoints
app.use("/api/user", userRouter)
app.use("/api/admin", adminRouter)
app.use("/api/doctor", doctorRouter)
app.use("/api/health-tracker", healthTrackerRouter)

app.get("/", (req, res) => {
  res.send("API Working")
});

// Error handler middleware
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on PORT:${port}`))
