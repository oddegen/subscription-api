import Subscription from "../models/subscription.model";
import { workflowClient } from "../config/upstash";
import { SERVER_URL } from "../config/env";
import type { RequestHandler } from "express";
import mongoose from "mongoose";

export const getSubscriptions: RequestHandler = async (req, res, next) => {
  try {
    const subscriptions = await Subscription.find();

    res.status(200).json({ success: true, data: subscriptions });
  } catch (error) {
    next(error);
  }
};

export const getSubscription: RequestHandler = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      const error = new Error("Subscription not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ success: true, data: subscription });
  } catch (error) {
    next(error);
  }
};

export const createSubscription: RequestHandler = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const subscription = await Subscription.create(
      [
        {
          ...req.body,
          user: req.user?._id,
        },
      ],
      { session }
    );

    const { workflowRunId } = await workflowClient.trigger({
      url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
      body: {
        subscriptionId: subscription.id,
      },
      headers: {
        "content-type": "application/json",
      },
      retries: 0,
    });

    session.commitTransaction();
    session.endSession();

    res
      .status(201)
      .json({ success: true, data: { subscription, workflowRunId } });
  } catch (error) {
    next(error);
  }
};

export const updateSubscription: RequestHandler = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const subscription = await Subscription.findOne({
      id: req.params.id,
      user: req.user?._id,
    });

    if (!subscription) {
      const error = new Error("Subscription not found");
      error.statusCode = 404;
      throw error;
    }

    const updatedSubscription = await subscription.updateOne(
      { ...req.body },
      {
        new: true,
        runValidators: true,
        session,
      }
    );

    session.commitTransaction();
    session.endSession();

    res.status(200).json({
      success: true,
      message: "Subscription Updated Successfully",
      subscription: updatedSubscription,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSubscription: RequestHandler = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const subscription = await Subscription.findOne({
      id: req.params.id,
      user: req.user?._id,
    });

    if (!subscription) {
      const error = new Error("Subscription not found");
      error.statusCode = 404;
      throw error;
    }

    await subscription.deleteOne({ session });

    session.commitTransaction();
    session.endSession();

    res.status(200).json({
      success: true,
      message: "Subscription deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getUserSubscriptions: RequestHandler = async (req, res, next) => {
  try {
    if (!req.user?._id.equals(req.params.id)) {
      const error = new Error("You are not the owner of this account");
      error.statusCode = 401;
      throw error;
    }

    const subscriptions = await Subscription.find({ user: req.params.id });

    res.status(200).json({ success: true, data: subscriptions });
  } catch (error) {
    next(error);
  }
};

export const cancelSubscription: RequestHandler = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const subscription = await Subscription.findOne({
      id: req.params.id,
      user: req.user?._id,
    });

    if (!subscription) {
      const error = new Error("Subscription not found");
      error.statusCode = 404;
      throw error;
    }

    if (subscription.status !== "cancelled")
      await subscription.updateOne(
        { status: "cancelled" },
        {
          new: true,
          session,
        }
      );

    session.commitTransaction();
    session.endSession();

    res.status(200).json({
      success: true,
      message: "Subscription Cancelled",
      data: subscription,
    });
  } catch (error) {
    next(error);
  }
};

export const upcomingSubscriptionRenewals: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const subscriptions = await Subscription.find({
      status: "active",
      user: req.user?._id,
      renewalDate: { $gte: new Date() },
    });

    res.status(200).json({ success: true, data: subscriptions });
  } catch (error) {
    next(error);
  }
};
