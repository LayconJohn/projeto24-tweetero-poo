import { tweets } from "../data/tweets.js";

export default class TweetsRepository {
    async create(tweet, username, avatar) {
        tweets.push({
            username: username,
            tweet: tweet,
            avatar: avatar.avatar,
            id: tweets.length + 1
        });
    
        return {
            username: username,
            tweet: tweet,
            avatar: avatar.avatar,
            id: tweets.length + 1
        };
    }
    
    async list(inicioTweets, fimTweets) {
        const recentsTweets = tweets.reverse().slice(inicioTweets, fimTweets);
        return recentsTweets;
    }
    
    async listByUser(USERNAME) {
        const filterTweets = tweets.filter( tweet => tweet.username.toLowerCase() === USERNAME.toLowerCase());
        return filterTweets;
    }
}