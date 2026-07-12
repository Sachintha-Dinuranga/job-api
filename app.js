import express from "express";
import dotenv from "dotenv";
import jobs from "./routes/jobs.js";
import { connectDB } from "./config/database.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";

// setting up env file
dotenv.config();

// Handling uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down due to uncaught exceptions");
  process.exit(1);
});

const app = express();

// Setup body parser
app.use(express.json());

// Connecting to database
connectDB();

// define routes
app.use("/api/v1", jobs);

// Middleware to handle errors
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});

// Handling unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to unhandled promise rejection`);
  server.close(() => {
    process.exit(1);
  });
});
