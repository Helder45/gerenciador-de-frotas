const alertFailure = document.getElementById("alertFailure");
const botaoAlertaFailure = document.getElementById("botaoAlertaFailure");
const alertSuccess = document.getElementById("alertSuccess");
const botaoAlertaSuccess = document.getElementById("botaoAlertaSuccess");

if (alertFailure) {
    botaoAlertaFailure.addEventListener("click", (event) => {
    event.preventDefault();
    alertFailure.parentNode.removeChild(alertFailure);
  });
}

if (alertSuccess) {
    botaoAlertaSuccess.addEventListener("click", (event) => {
    event.preventDefault();
    alertSuccess.parentNode.removeChild(alertSuccess);
  });
}