import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env";

if (!DB_URI) {
  throw new Error("MONGODB_URI is not defined");
}

const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URI!);

    console.log(`Connected to database in ${NODE_ENV} mode`);
  } catch (error) {
    console.error("Error connecting to database", error);
    process.exitCode = 1;
  }
};

export default connectToDatabase;
