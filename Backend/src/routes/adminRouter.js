import express from "express";
import { authMiddleware, authorizeRole } from "../middlewares/authMiddleware.js";
import { getAllUsers, registerChild, getPendingVaccinesForComingMonth } from "../controller/adminController.js";

const adminRouter = express.Router();

adminRouter.get("/users", authMiddleware, authorizeRole("admin"), getAllUsers);
adminRouter.post("/register-child", authMiddleware, authorizeRole("admin"), registerChild);
adminRouter.get("/pending-vaccines", authMiddleware, authorizeRole("admin"), getPendingVaccinesForComingMonth);

export default adminRouter;
