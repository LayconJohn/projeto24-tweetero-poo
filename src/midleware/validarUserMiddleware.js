export default class ValidateUserMiddleware {
    validarURL(link) {
        try {
            let url = new URL(link);
            //console.log(url)
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
} 