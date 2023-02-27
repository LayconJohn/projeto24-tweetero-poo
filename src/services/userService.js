import ValidateUserMiddleware from "../midleware/validarUserMiddleware.js";
import { badRequestError, invalidDataError, conflictError } from "../error/index.js";
import UserRepository from "../repository/userRepository.js";
import { users } from "../data/users.js";

const userRepository = new UserRepository();
const validateUserMiddleware = new ValidateUserMiddleware();

export default class UserService {
    async signUpUser(username, avatar) {
        if (!username || !avatar) {
            throw invalidDataError("Todos os campos são obrigatórios");
        }
        if (!validateUserMiddleware.validarURL(avatar)) {
            throw badRequestError();
        }
        if (validateUserMiddleware.verificaUserRepetido(users, username)) {
            throw conflictError("Nome de usuário já cadastrado");
        }
        const createdUser = await userRepository.create(username, avatar);
        return createdUser;
    }
}