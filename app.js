import express from "express";
import dotenv from "dotenv";

const app = express();

// setting up env file
dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
