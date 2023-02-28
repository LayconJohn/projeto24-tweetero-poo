import userController from "./userController.js";

class TweetsController {
    constructor() {
        this.tweets = []
        this.tweet = this.tweet.bind(this)
        this.getTweet = this.getTweet.bind(this)
        this.getTweetByUser = this.getTweetByUser.bind(this)
        this.reverseTweets = this.reverseTweets.bind(this)
    }

    async tweet(req, res) {
        const { tweet } = req.body;
        const { username } = req.headers;

        if (!username || !tweet) {
            return res.status(422).send({ message: "Todos campos são obrigatórios!" });
        }

        const { avatar } = userController.pegarUserLogado(username);
        if (!avatar) {
            return res.status(404).send({ message: "Usuário não encontrado" });
        }

        const createTweet = {
            username: username,
            tweet: tweet,
            avatar: avatar,
            id: this.tweets.length + 1
        }

        this.tweets.push(createTweet);

        return res.status(201).send(createTweet);
    }

    async getTweet(req, res) {
        const user = req.headers.user
        const page = req.query.page;

        let startTweets = 0;
        let endTweets = 10;

        if (page < 1) {
            
        } 
        if (page > 1) {
            startTweets = (page * 10) - 10;
            endTweets = (page * 10);
        }
        if (!user) {
            return res.status(401).send({ message: "Usuário não autorizado" });
        }
        if (this.tweets.length <= 10) {
            return res.status(200).send(this.reverseTweets());
        }
        const recentsTweets = this.tweets.reverse().slice(inicioTweets, fimTweets);
        return res.status(200).send(recentsTweets);
    }

    async getTweetByUser(req, res) {
        const { USERNAME } = req.params;

        const user = userController.pegarUserLogado(USERNAME);
        if (!user) {
            return res.status(404).send({ message: "Usuário não encontrado" });
        }

        const filterTweets = this.tweets.filter( tweet => tweet.username.toLowerCase() === USERNAME.toLowerCase());
        return res.status(200).send(filterTweets);
    }

    reverseTweets() {
        return [...this.tweets].reverse();
    }
}

export default new TweetsController;