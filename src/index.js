import express from "express";
import chalk from "chalk";
import cors from "cors";

import { users } from "./data/users.js";
import { tweets } from "./data/tweets.js";

const app = express ();

app.use(cors());
app.use(express.json());

app.post("/sign-up", (req, res) => {
    const user = req.body;

    users.push({
        ...user,
        id: users.length + 1
    });

    res.send("OK");
})

app.get("/sign-up", (req, res) => {
    res.send(users);
});

app.post("/tweets", (req, res) => {
    const tweet = req.body;

    const avatar = users.find( user => user.username === tweet.username);

    tweets.push({
        ...tweet,
        avatar: avatar.avatar,
        id: tweets.length + 1
    });

    res.send("OK");
})

app.get("/tweets", (req, res) => {
    res.send(tweets);
})

app.listen(5000, () => {
console.log(chalk.green("=.=.=.=.=.=.=.=.=.=.=.=.=.=.=.="))
console.log(chalk.green("Servidor rodando na porta 5000"))
console.log(chalk.green("=.=.=.=.=.=.=.=.=.=.=.=.=.=.=.="))
})