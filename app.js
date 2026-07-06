import express from "express";
import dotenv from "dotenv";
import jobs from "./routes/jobs.js";

const app = express();

// setting up env file
dotenv.config();

// define routes
app.use("/api/v1", jobs);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
