import { Router } from "express";
import tweetsController from "../controllers/tweetsController.js";

const router = Router();

router
    .post("/tweets", tweetsController.tweet)
    .get("/tweets", tweetsController.getTweet)
    .get("/tweets/:USERNAME", tweetsController.getTweetByUser)

export default router;