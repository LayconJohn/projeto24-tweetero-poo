import { validarURL, verificaUserRepetido } from "../midleware/validarUserMiddleware.js";
import { badRequestError, invalidDataError, conflictError } from "../error/index.js";
import userRepository from "../repository/userRepository.js";
import { users } from "../data/users.js";

async function signUpUser(username, avatar) {
    if (!username || !avatar) {
        throw invalidDataError("Todos os campos são obrigatórios");
    }
    if (!validarURL(avatar)) {
        throw badRequestError();
    }
    if (verificaUserRepetido(users, username)) {
        throw conflictError("Nome de usuário já cadastrado");
    }
    const createdUser = await userRepository.create(username, avatar);
    return createdUser;
}

const userService = {
    signUpUser,
};

export default userService;