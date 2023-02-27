import { users } from "../data/users.js";

export default class UserRepository {
    async create(username, avatar) {
        users.push({
            username: username,
            avatar: avatar,
            id: users.length + 1
        });
        return {
            username: username,
            avatar: avatar,
            id: users.length + 1
        };
    }
}