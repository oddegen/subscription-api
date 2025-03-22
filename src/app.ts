import express from "express";
import cookieParser from "cookie-parser";

import { PORT } from "./config/env";

import authRouter from "./routes/auth.routes";
import userRouter from "./routes/user.routes";
import subscriptionRouter from "./routes/subscription.routes";
import * as db from "./database/mongodb";
import arcjetMiddleware from "./middlewares/arcjet.middleware";
import errorMiddleware from "./middlewares/error.middleware";
import type { Server } from "node:http";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(arcjetMiddleware);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);

app.use(errorMiddleware);

function handleExceptions(error: unknown) {
  console.error(error);
  process.exitCode = 1;
}

function handleServerExit(signal: string, server: Server) {
  return () => {
    console.info(`${signal} received! shutting down`);
    void db.disconnect();

    server.close(() => {
      process.exitCode = 0;
    });
  };
}

async function startServer() {
  await db.connect();

  const server = app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
  });

  server.on("error", handleExceptions);

  process.on("unhandledRejection", handleExceptions);
  process.on("uncaughtException", handleExceptions);
  process.on("SIGINT", handleServerExit("SIGINT", server));
  process.on("SIGTERM", handleServerExit("SIGTERM", server));
}

startServer();

export default app;
