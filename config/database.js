import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    // Attempt connection using the URI
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `Database connected successfully to host: ${conn.connection.host}`,
    );
  } catch (error) {
    console.error(`Database Connection failed: ${error.message}`);
  }
};
