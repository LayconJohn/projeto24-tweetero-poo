import { tweets } from "../data/tweets.js";

async function create(tweet, username, avatar) {
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

async function list(inicioTweets, fimTweets) {
    const recentsTweets = tweets.reverse().slice(inicioTweets, fimTweets);
    return recentsTweets;
}

async function listByUser(USERNAME) {
    const filterTweets = tweets.filter( tweet => tweet.username.toLowerCase() === USERNAME.toLowerCase());
    return filterTweets;
}

const tweetsRepository = {
    create,
    list,
    listByUser,
};

export default tweetsRepository;