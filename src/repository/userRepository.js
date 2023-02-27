import { users } from "../data/users.js";

async function create(username, avatar) {
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

const userRepository = {
    create,
};

export default userRepository;