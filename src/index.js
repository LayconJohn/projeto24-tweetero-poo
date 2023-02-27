import express from "express";
import chalk from "chalk";
import cors from "cors";

import userController from "./controllers/userController.js";
import tweetsController from "./controllers/tweetsController.js";

const app = express ();

app
    .use(cors())
    .use(express.json())
    .use(userController)
    .use(tweetsController)

app.listen(5000, () => {
    console.log(chalk.green("=.=.=.=.=.=.=.=.=.=.=.=.=.=.=.="))
    console.log(chalk.green("Servidor rodando na porta 5000"))
    console.log(chalk.green("=.=.=.=.=.=.=.=.=.=.=.=.=.=.=.="))
})