const toast = document.getElementById("toast");
const barraProgresso = document.getElementById("barraProgresso");
const mensagemToast = document.getElementById("mensagemToast");

document.getElementById("fecharToast").addEventListener("click", function() {
    toast.classList.remove("show");
});

export function apresentarToastSuccess() {
    toast.classList.add("show");
    toast.classList.add("success");
    barraProgresso.style.width = "0%";
    mensagemToast.textContent = "Operação Realizada com Sucesso!";
    setTimeout(() => {
        barraProgresso.classList.add("success");
        barraProgresso.style.width = "100%";
    }, 25);
    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

export function apresentarToastDanger() {
    toast.classList.add("show");
    toast.classList.add("danger");
    barraProgresso.style.width = "0%";
    setTimeout(() => {
        barraProgresso.classList.add("danger");
        barraProgresso.style.width = "100%";
    }, 25);
    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

export function apresentarToastWarning() {
    toast.classList.add("show");
    toast.classList.add("warning");
    barraProgresso.style.width = "0%";
    setTimeout(() => {
        barraProgresso.classList.add("warning");
        barraProgresso.style.width = "100%";
    }, 25);
    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}