const toast = document.getElementById("toast");
const barraProgresso = document.getElementById("barraProgresso");

document.getElementById("fecharToast").addEventListener("click", function() {
    toast.classList.remove("show");
});

export function apresentarToastSuccess() {
    toast.classList.add("show");
    barraProgresso.style.width = "0%";
    setTimeout(() => {
        barraProgresso.style.width = "100%";
    }, 25);
    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}