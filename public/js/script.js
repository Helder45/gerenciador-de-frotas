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
  let cpf = document.forms.formulario.cpf.value;

  let cpfValido = /^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}))$/;
  if (cpfValido.test(cpf) == false) {
    cpf = cpf.replace(/\D/g, ""); //Remove tudo o que não é dígito

    if (cpf.length == 11) {
      const cpfVer = cpf.split("", 11);

      let sum = 0;
      for (let index = 0; index <= cpfVer.length - 1; index++) {
        sum += parseInt(cpfVer[index]);
      }

      if (sum === 33 || sum === 44 || sum === 55 || sum === 66) {
        document.getElementById("cpf_label").style.display = "none";
        document.getElementById("botao_submit").disabled = false;
        // cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2"); //Coloca um ponto entre o terceiro e o quarto dígitos
        // cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2"); //Coloca um ponto entre o terceiro e o quarto dígitos
        // //de novo (para o segundo bloco de números)
        // cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2"); //Coloca um hífen entre o terceiro e o quarto dígitos

        document.getElementById("cpf").value = cpf;
      } else {
        document.getElementById("cpf_label").style.display = "block";
        document.getElementById("botao_submit").disabled = true;
      }

      console.log(sum);
    } else {
      document.getElementById("cpf_label").style.display = "block";
      document.getElementById("botao_submit").disabled = true;
    }
  }
}

function validaCPFLista() {
  let cpfEl = document.getElementsByClassName("cpf");

  for (let i = 0; i < cpfEl.length; i++) {
    let cpf = cpfEl[i].textContent;
    console.log(cpf);

    let cpfValido = /^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}))$/;

    if (cpfValido.test(cpf[i].textContent) == false) {
      cpf = cpf.replace(/\D/g, ""); //Remove tudo o que não é dígito

      if (cpf.length == 11) {
        cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2"); //Coloca um ponto entre o terceiro e o quarto dígitos
        cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2"); //Coloca um ponto entre o terceiro e o quarto dígitos
        //de novo (para o segundo bloco de números)
        cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2"); //Coloca um hífen entre o terceiro e o quarto dígitos

        document.getElementsByClassName("cpf")[i].textContent = cpf;
      }
    }
  }
}

window.onload = validaCPFLista();
