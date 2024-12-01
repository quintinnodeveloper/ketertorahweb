const menuPreferenciaUsuario = document.getElementById("menuPreferenciaUsuario");
const nomeFuncao = document.getElementById("nomeFuncao");

nomeFuncao.addEventListener("click", function() {
    menuPreferenciaUsuario.classList.toggle("active");
});

document.addEventListener("click", function(event) {
    const menuPreferenciaUsuario = document.getElementById("menuPreferenciaUsuario");
    const nomeFuncao = document.getElementById("nomeFuncao");
    if (!nomeFuncao.contains(event.target)) {
        menuPreferenciaUsuario.classList.remove("active");
    }
});