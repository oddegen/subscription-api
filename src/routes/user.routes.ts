import { Router } from "express";
import { getUser, getUsers } from "../controllers/user.controller";
import authorize from "../middlewares/auth.middleware";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", authorize, getUser);
userRouter.post("/", (req, res) => {});
userRouter.put("/:id", (req, res) => {});
userRouter.delete("/:id", (req, res) => {});

export default userRouter;
