import userService from "../services/userService.js";

async function signUp(req, res) {
    const { username, avatar} = req.body;
    try {
        const createdUser = await userService.signUpUser(username, avatar);
        return res.status(201).send(createdUser);
    } catch (error) {
        console.log(error);
        if (error.name === "BadRequestError") {
            return res.status(400).send({message: "Envie uma URL válida"});
        }
        if (error.name === "InvalidDataError") {
            return res.status(422).send("Todos campos são obrigatórios!");
        }
        if (error.name === "ConflictError") {
            return res.status(409).send("Nome de usuário já cadastrado");
        }
        return res.sendStatus(400);
    }
}

const userController = {
    signUp,
};

export default userController;