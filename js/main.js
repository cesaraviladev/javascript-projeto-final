// Aumenta e diminui a quantidade alterando o valor do produto de acordo com a quantidade atual.

var qtdeAtual = parseFloat(document.querySelector("#qtdeProduto1").innerHTML);
var valorAtual = parseFloat(document.querySelector("#valorProduto1").innerHTML);

document.querySelector("#menosProduto1").onclick = function () {
  if (qtdeAtual > 1) {
    document.querySelector("#qtdeProduto1").innerHTML = --qtdeAtual;
    document.querySelector("#valorProduto1").innerHTML = valorAtual * qtdeAtual;
  }
};
document.querySelector("#maisProduto1").onclick = function () {
  if (qtdeAtual >= 1) {
    document.querySelector("#qtdeProduto1").innerHTML = ++qtdeAtual;
    document.querySelector("#valorProduto1").innerHTML = valorAtual * qtdeAtual;
  }
};

// Verifica se o e-mail digitado:
// - Valida se existir @ e o termo .com
// - Invalida se existir ponto final e depois antes do @

document.querySelector("#buttonNews").onclick = function () {
  var emailDigit = document.querySelector("#emailNews").value;
  var verifArroba = emailDigit.indexOf("@");
  var ptAntesArroba = emailDigit.indexOf(".@");
  var ptDepoisArroba = emailDigit.indexOf("@.");
  var temPontoCom = emailDigit.indexOf(".com");

  if (
    verifArroba == "-1" ||
    ptAntesArroba != "-1" ||
    ptDepoisArroba != "-1" ||
    temPontoCom == "-1"
  ) {
    // document.querySelector('#returnEmail').innerHTML = "E-mail inválido";
    alert("E-mail inválido! Por favor verifique o e-mail digitado.");
  } else {
    document.querySelector("#returnEmail").innerHTML =
      "E-mail cadastrado com sucesso!";
  }
};
