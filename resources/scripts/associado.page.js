const abrirModal = document.getElementById("abrir-modal");
const dialog = document.getElementById("dialog");
const sombreamento = document.getElementById("sombreamento");

abrirModal.addEventListener("click", function() {
    sombreamento.style.display = "block";
    dialog.show();
});

const botaoCadastrar = document.getElementById("botaoCadastrar");

botaoCadastrar.addEventListener("click", function() {
    console.log("Cadastrar...");
    sombreamento.style.display = "none";
    dialog.close();
});