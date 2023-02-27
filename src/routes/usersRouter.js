import { Router } from "express";
import UserController from "../controllers/userController.js";

const router = Router();
const userController = new UserController();

router
    .post("/sign-up", userController.signUp)

export default router;