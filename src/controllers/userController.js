class UserController {
    constructor() {
        this.users = []
        this.signUp = this.signUp.bind(this)
        this.validarURL = this.validarURL.bind(this)
        this.verificaUserRepetido = this.verificaUserRepetido.bind(this)
        this.pegarUserLogado = this.pegarUserLogado.bind(this)
    }

    async signUp(req, res) {
        const { username, avatar} = req.body;

        if (!username || !avatar) {
            return res.status(422).send({ message: "Todos campos são obrigatórios!" });
        }
        if (!this.validarURL(avatar)) {
            return res.status(400).send({ message: "Envie uma URL válida" });
        }
        if (this.verificaUserRepetido(this.users, username)) {
            return res.status(409).send({ message: "Nome de usuário já cadastrado" });
        }
        this.users.push({
            username: username,
            avatar: avatar,
            id: this.users.length + 1
        });

        return res.sendStatus(201);
    }

    validarURL(link) {
        try {
            new URL(link);
            return true;
        } catch (error) {
            return false;
        }
    }

    verificaUserRepetido(arr, username) {
        const temRepetido = arr.find( value => value.username === username);
        if (temRepetido) {
            return true;
        }
        return false;
    }

    pegarUserLogado(username) {
        return this.users.find( user => user.username === username);
    }
}

export default new UserController();