import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { registerMyChild, getMyChildren, getMyVaccines } from "../controller/userController.js";

const userRouter = express.Router();

userRouter.post("/register-child", authMiddleware, registerMyChild);
userRouter.get("/children", authMiddleware, getMyChildren);
userRouter.get("/vaccines", authMiddleware, getMyVaccines);

export default userRouter;
