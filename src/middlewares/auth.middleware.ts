import jwt, { type JwtPayload } from "jsonwebtoken";

import { JWT_SECRET } from "../config/env";
import User from "../models/user.model";
import type { RequestHandler } from "express";

const authorize: RequestHandler = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById((decoded as JwtPayload).userId);

    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    req.user = user;

    next();
  } catch (error) {
    res
      .status(401)
      .json({ message: "Unauthorized", error: (error as Error).message });
  }
};

export default authorize;
