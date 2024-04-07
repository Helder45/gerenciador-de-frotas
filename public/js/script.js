const alerta = document.getElementById("alert");
const botaoAlerta = document.getElementById("botaoAlerta");

if (alerta) {
    botaoAlerta.addEventListener("click", (event) => {
    event.preventDefault();
    alerta.parentNode.removeChild(alerta);
  });
}
