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

function ValidaCPF() {
  let cpf = document.forms.form_cadastro.cpf.value;

  let cpfValido = /^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}))$/;
  if (cpfValido.test(cpf) == false) {
    cpf = cpf.replace(/\D/g, ""); //Remove tudo o que não é dígito

    if (cpf.length == 11) {
      const cpfVer = cpf.split("", 11);

      let indexes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        sum = 0;
      for (let index of indexes) {
        sum += parseInt(cpfVer[index]);
      }

      console.log(sum);
      cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2"); //Coloca um ponto entre o terceiro e o quarto dígitos
      cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2"); //Coloca um ponto entre o terceiro e o quarto dígitos
      //de novo (para o segundo bloco de números)
      cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2"); //Coloca um hífen entre o terceiro e o quarto dígitos

      let valorValido = (document.getElementById("cpf").value = cpf);
      console.log(valorValido);
    } else {
      console.log("CPF invalido");
    }
  }
}
