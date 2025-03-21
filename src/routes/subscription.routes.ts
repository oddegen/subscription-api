import { Router } from "express";
import {
  createSubscription,
  getUserSubscriptions,
} from "../controllers/subscription.controller";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => {});
subscriptionRouter.get("/:id", (req, res) => {});
subscriptionRouter.post("/", createSubscription);
subscriptionRouter.put("/:id", (req, res) => {});
subscriptionRouter.delete("/:id", (req, res) => {});
subscriptionRouter.get("/user/:id", getUserSubscriptions);
subscriptionRouter.put("/:id/cancel", (req, res) => {});
subscriptionRouter.get("/upcoming-renewals", (req, res) => {});

export default subscriptionRouter;
