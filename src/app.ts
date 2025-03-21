import express from "express";

import { PORT } from "./config/env";

import authRouter from "./routes/auth.routes";
import userRouter from "./routes/user.routes";
import subscriptionRouter from "./routes/subscription.routes";

const app = express();

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the Subscription Tracker API");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
