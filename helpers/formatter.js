function dateFormatted(date) {
  return date.split("-").reverse().join("/");
}

function cpfFormatter(cpf) {
  var cpfValido = /^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}))$/;
  if (cpfValido.test(cpf) == false) {
    cpf = cpf.replace(/\D/g, ""); //Remove tudo o que não é dígito

    if (cpf.length == 11) {
      cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2"); //Coloca um ponto entre o terceiro e o quarto dígitos
      cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2"); //Coloca um ponto entre o terceiro e o quarto dígitos
      //de novo (para o segundo bloco de números)
      cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2"); //Coloca um hífen entre o terceiro e o quarto dígitos

      return cpf;
    } else {
      return null;
    }
  }
}

function mphone(v) {
  var r = v.replace(/\D/g, "");
  r = r.replace(/^0/, "");
  if (r.length > 10) {
    // 11+ digits. Format as 5+4.
    r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "(0$1) $2-$3");
  } else if (r.length > 5) {
    // 6..10 digits. Format as 4+4
    r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "(0$1) $2-$3");
  } else if (r.length > 2) {
    // 3..5 digits. Add (0XX..)
    r = r.replace(/^(\d\d)(\d{0,5})/, "(0$1) $2");
  } else {
    // 0..2 digits. Just add (0XX
    r = r.replace(/^(\d*)/, "(0$1");
  }
  return r;
}

module.exports = { dateFormatted, cpfFormatter, mphone };
