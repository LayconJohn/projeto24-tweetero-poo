import { Router } from "express";
import TweetsController from "../controllers/tweetsController.js";

const router = Router();
const tweetsController = new TweetsController();


router
    .post("/tweets", tweetsController.tweet)
    .get("/tweets", tweetsController.getTweet)
    .get("/tweets/:USERNAME", tweetsController.getTweetByUser)

export default router;