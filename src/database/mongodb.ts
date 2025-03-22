import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env";

export const connect = async (uri?: string) => {
  try {
    if (!DB_URI || !uri) {
      throw new Error("Database URI is required");
    }

    await mongoose.connect(uri || DB_URI!);

    console.log(`Connected to database in ${NODE_ENV} mode`);
  } catch (error) {
    console.error("Error connecting to database", error);
    process.exitCode = 1;
  }
};

export const dropDatabase = async () => {
  try {
    await mongoose.connection.dropDatabase();
  } catch (error) {
    console.error("Error dropping database", error);
    process.exitCode = 1;
  }
};

export const disconnect = async () => {
  try {
    await mongoose.connection.close();
  } catch (error) {
    console.error("Error disconnecting from database", error);
    process.exitCode = 1;
  }
};
