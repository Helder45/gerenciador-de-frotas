const botaoAlerta = document.getElementById("botaoAlerta");

botaoAlerta.addEventListener("click", (event) => {
    event.preventDefault();
    botaoAlerta.parentNode.parentNode.removeChild(document.getElementById("alert"));
});