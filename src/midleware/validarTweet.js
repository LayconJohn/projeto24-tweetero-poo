export default class ValidateExistentUser {
    validaUsuarioExistente(arr, username) {
        const usuarioExiste = arr.includes( value => value.username === username );
        return usuarioExiste;
    }
}