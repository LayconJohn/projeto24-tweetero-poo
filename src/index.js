import express from "express";
import chalk from "chalk";
import cors from "cors";

import { users } from "./data/users.js";
import { tweets } from "./data/tweets.js";
import { validarURL, verificaUserRepetido } from "./midleware/validarUserMiddleware.js";
import { validaUsuarioExistente } from "./midleware/validarTweet.js";

const app = express ();

app.use(cors());
app.use(express.json());

app.post("/sign-up", (req, res) => {
    const { username, avatar} = req.body;

    if (!username || !avatar) {
        return res.status(422).send("Todos campos são obrigatórios!");
    }

    if (!validarURL(avatar)) {
        return res.status(400).send("Envie uma url válida")
    }

    if (verificaUserRepetido(users, username)) {
        return res.status(409).send("Nome de usuário já cadastrado")
    }

    users.push({
        username: username,
        avatar: avatar,
        id: users.length + 1
    });

    res.status(201).send("Criado");
})

app.get("/sign-up", (req, res) => {
    res.status(200).send(users);
});

app.post("/tweets", (req, res) => {
    const { tweet } = req.body;
    const { username } = req.headers;
    console.log(username)

    const avatar = users.find( user => user.username === username);

    if (!username || !tweet) {
        return res.status(422).send("Todos campos são obrigatórios!");
    }

    /*if (validaUsuarioExistente(users, username)) {
        return res.status(401).send("Usuário não cadastrado")
    }*/ 

    tweets.push({
        username: username,
        tweet: tweet,
        avatar: avatar.avatar,
        id: tweets.length + 1
    });

    res.sendStatus(201).send("OK");
})

app.get("/tweets", (req, res) => {
    const user = req.headers.user
    const page = req.query.page;
    let inicioTweets = 0;
    let fimTweets = 10;

    if (page < 1) {
        return res.status(400).send("Informe uma página válida!");
    } 

    if (page > 1) {
        inicioTweets = (page * 10) - 10;
        fimTweets = (page * 10);
    }

    if (!user) {
        return res.status(401).send("Usuário não autorizado!")
    }

    const tweetsRecentes = tweets.reverse().slice(inicioTweets, fimTweets);
    
    res.send(tweetsRecentes);
})

app.get("/tweets/:USERNAME", (req, res) => {
    const { USERNAME } = req.params;

    const tweetsFiltrados = tweets.filter( tweet => tweet.username.toLowerCase() === USERNAME.toLowerCase());

    console.log(tweetsFiltrados);

    res.status(200).send(tweetsFiltrados)
})

app.listen(5000, () => {
console.log(chalk.green("=.=.=.=.=.=.=.=.=.=.=.=.=.=.=.="))
console.log(chalk.green("Servidor rodando na porta 5000"))
console.log(chalk.green("=.=.=.=.=.=.=.=.=.=.=.=.=.=.=.="))
})