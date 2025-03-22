import { Router } from "express";
import {
  cancelSubscription,
  createSubscription,
  deleteSubscription,
  getSubscription,
  getSubscriptions,
  getUserSubscriptions,
  upcomingSubscriptionRenewals,
  updateSubscription,
} from "../controllers/subscription.controller";
import authorize from "../middlewares/auth.middleware";

const subscriptionRouter = Router();

subscriptionRouter.use(authorize);

subscriptionRouter.get("/", getSubscriptions);
subscriptionRouter.get("/:id", getSubscription);
subscriptionRouter.post("/", createSubscription);
subscriptionRouter.put("/:id", updateSubscription);
subscriptionRouter.delete("/:id", deleteSubscription);
subscriptionRouter.get("/user/:id", getUserSubscriptions);
subscriptionRouter.put("/:id/cancel", cancelSubscription);
subscriptionRouter.get("/upcoming-renewals", upcomingSubscriptionRenewals);

export default subscriptionRouter;
