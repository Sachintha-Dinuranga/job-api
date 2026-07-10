import express from "express";
import dotenv from "dotenv";
import jobs from "./routes/jobs.js";
import { connectDB } from "./config/database.js";

// setting up env file
dotenv.config();

const app = express();

// Setup body parser
app.use(express.json());

// Connecting to database
connectDB();

// define routes
app.use("/api/v1", jobs);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
