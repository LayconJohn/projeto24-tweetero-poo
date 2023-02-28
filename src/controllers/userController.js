class UserController {
    constructor() {
        this.users = []
        this.signUp = this.signUp.bind(this)
        this.validarURL = this.validarURL.bind(this)
        this.verificaUserRepetido = this.verificaUserRepetido.bind(this)
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
    }

    validarURL(link) {
        try {
            new URL(this.link);
            return true;
        } catch (error) {
            return false;
        }
    }

    verificaUserRepetido(arr, username) {
        const temRepetido = this.arr.find( value => value.username === this.username);
        if (temRepetido) {
            return true;
        }
        return false;
    }
}

export default new UserController();