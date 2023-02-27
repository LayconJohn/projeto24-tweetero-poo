import TweetService from "../services/tweetService.js";

const tweetService = new TweetService();

export default class TweetsController {
    async tweet(req, res) {
        const { tweet } = req.body;
        const { username } = req.headers;
        try {
            const createdTweet = await tweetService.createTweet(tweet, username);
            return res.status(201).send(createdTweet);
        } catch (error) {
            console.log(error);
            if (error.name === "InvalidDataError") {
                return res.status(422).send("Todos campos são obrigatórios!");
            } 
            return res.sendStatus(400);
        }
    }

    async getTweet(req, res) {
        const user = req.headers.user
        const page = req.query.page;
        try {
            const lastTweets = await tweetService.listTweets(user, page);
            return res.status(200).send(lastTweets);
        } catch (error) {
            console.log(error);
            if (error.name === "BadRequestError") {
                return res.status(400).send("Informe uma página válida!");
            } 
            if (error.name === "UnauthorizedError") {
                return res.status(401).send("Usuário não autorizado!");
            } 
            return res.sendStatus(400); 
        }
    }

    async getTweetByUser(req, res) {
        const { USERNAME } = req.params;
    
        try {
            const tweets = await tweetService.listTweetsByUser(USERNAME);
            return res.status(200).send(tweets);
        } catch (error) {
            console.log(error);
            if (error.name === "UnauthorizedError") {
                return res.status(401).send("Usuário não autorizado!");
            } 
            return res.sendStatus(400); 
        }
    }
}