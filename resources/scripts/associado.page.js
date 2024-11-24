const abrirModal = document.getElementById("abrir-modal");
const dialog = document.getElementById("dialog");
const sombreamento = document.getElementById("sombreamento");

sombreamento.style.display = "block";

abrirModal.addEventListener("click", function() {
    sombreamento.style.display = "block";
    dialog.show();
});

