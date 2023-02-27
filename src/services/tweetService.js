import { users } from "../data/users.js";
import { invalidDataError, notFoundError, badRequestError, unauthorizedError } from "../error/index.js";
import TweetsRepository from "../repository/tweetsRepository.js";

const tweetsRepository = new TweetsRepository();

export default class TweetService {
    async createTweet(tweet, username) {
        if (!username || !tweet) {
            throw invalidDataError("Todos os campos são obrigatórios");
        }
        const avatar = users.find( user => user.username === username);
    
        if (!avatar) {
            throw notFoundError();
        }
    
        const createdTweet = await tweetsRepository.create(tweet, username, avatar);
        return createdTweet;
    }
    
    async listTweets(user, page) {
        let startTweets = 0;
        let endTweets = 10;
    
        if (page < 1) {
            throw badRequestError();
        } 
    
        if (page > 1) {
            startTweets = (page * 10) - 10;
            endTweets = (page * 10);
        }
    
        if (!user) {
            throw unauthorizedError();
        }
    
        const lastTweets = await tweetsRepository.list(startTweets, endTweets);
        return lastTweets;
    }
    
    async listTweetsByUser(USERNAME) {
        const user = users.filter(user => user.username.toLowerCase() === USERNAME.toLowerCase());
        if (!user) {
            throw unauthorizedError();
        }
    
        const tweets = await tweetsRepository.listByUser(USERNAME);
        return tweets;
    
    }
}