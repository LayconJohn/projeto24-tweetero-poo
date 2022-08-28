function validaUsuarioExistente(arr, username) {
    const usuarioExiste = arr.includes( value => value.username === username );
    return usuarioExiste;
}

export {validaUsuarioExistente};