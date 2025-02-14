// BUSCA DE LIVROS 

document.addEventListener("DOMContentLoaded", function () {
  // Lista de livros disponíveis
  const livrosEmEstoque = [
    "Pai rico e pai pobre",
    "O poder do hábito",
    "O poder da ação",
    "A arte da guerra",
    "Essencialismo"
  ];

  
  const form = document.querySelector("form");
  const inputBusca = document.querySelector("input[type='Busca']");

  
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Evita o recarregamento da página

    const livroPesquisado = inputBusca.value.trim();

    if (livroPesquisado === "") {
      Swal.fire({
        icon: "warning",
        title: "Campo vazio!",
        text: "Por favor, digite o nome de um livro antes de pesquisar.",
      });
      return;
    }

    // Verifica se o livro está na lista
    const livroEncontrado = livrosEmEstoque.some(
      (livro) => livro.toLowerCase() === livroPesquisado.toLowerCase()
    );

    if (livroEncontrado) {
      Swal.fire({
        icon: "success",
        title: "Livro disponível!",
        text: `Sim! O livro "${livroPesquisado}" está em nosso estoque.`,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Livro não encontrado",
        text: `Infelizmente, no momento, não temos "${livroPesquisado}" em estoque.`,
      });
    }

    
    inputBusca.value = "";
  });
});


// SESSÃO MAIS VENDIDOS

// Preços dos produtos
const precosBase = {
  valorProduto1: 39.90,
  valorProduto2: 45.00,
  valorProduto3: 37.50,
  valorProduto4: 29.90,
  valorProduto5: 42.00
};

// Função para atualizar o valor total do produto
function atualizarValor(idProduto) {
  const qtdeElement = document.getElementById(`qtdeProduto${idProduto}`);
  const valorElement = document.getElementById(`valorProduto${idProduto}`);
  
  const quantidade = parseInt(qtdeElement.textContent);
  const precoUnitario = parseFloat(valorElement.dataset.preco);
  
  const novoValor = quantidade * precoUnitario;
  valorElement.textContent = novoValor.toFixed(2).replace('.', ',');
}

// Função para aumentar a quantidade
function aumentarQuantidade(idProduto) {
  const qtdeElement = document.getElementById(`qtdeProduto${idProduto}`);
  let quantidade = parseInt(qtdeElement.textContent);
  qtdeElement.textContent = quantidade + 1;
  atualizarValor(idProduto);
}

// Função para diminuir a quantidade
function diminuirQuantidade(idProduto) {
  const qtdeElement = document.getElementById(`qtdeProduto${idProduto}`);
  let quantidade = parseInt(qtdeElement.textContent);
  if (quantidade > 1) {
    qtdeElement.textContent = quantidade - 1;
    atualizarValor(idProduto);
  }
}

// Função para adicionar ao carrinho e armazenar no localStorage
function adicionarAoCarrinho(idProduto) {
  const qtdeElement = document.getElementById(`qtdeProduto${idProduto}`);
  const valorElement = document.getElementById(`valorProduto${idProduto}`);
  const tituloElement = document.querySelector(`#maisProduto${idProduto}`).closest('.card-body').querySelector('.card-title');

  const quantidade = parseInt(qtdeElement.textContent);
  const precoTotal = parseFloat(valorElement.textContent.replace(',', '.'));
  const titulo = tituloElement.textContent;

  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  carrinho.push({ id: idProduto, titulo, quantidade, precoTotal });
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  
  atualizarCarrinho();

  Swal.fire({
    icon: 'success',
    title: 'Sucesso!',
    text: 'Seu produto foi adicionado com sucesso no carrinho!',
    timer: 2000,
    showConfirmButton: false
  });
}

// Atualizar quantidade de itens no ícone do carrinho
function atualizarCarrinho() {
  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  let totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);
  document.querySelector('.bi-cart').textContent = ` (${totalItens})`;
}

// Função para zerar o carrinho ao recarregar a página
function resetarCarrinho() {
  localStorage.removeItem('carrinho');
  atualizarCarrinho();
}


document.addEventListener("DOMContentLoaded", function () {
  resetarCarrinho();
  for (let i = 1; i <= 5; i++) {
    document.getElementById(`maisProduto${i}`).addEventListener("click", () => aumentarQuantidade(i));
    document.getElementById(`menosProduto${i}`).addEventListener("click", () => diminuirQuantidade(i));
    document.querySelector(`#maisProduto${i}`).closest('.card-body').querySelector('.btn-primary').addEventListener("click", () => adicionarAoCarrinho(i));
    atualizarValor(i);
  }
  atualizarCarrinho();
});


// Função para atualizar o valor total do produto
function atualizarValor(idProduto) {
  const qtdeElement = document.getElementById(`qtdeProduto${idProduto}`);
  const valorElement = document.getElementById(`valorProduto${idProduto}`);

  const quantidade = parseInt(qtdeElement.textContent);
  const precoUnitario = precosBase[`valorProduto${idProduto}`];

  // Multiplicação da quantidade pelo preço unitário
  const novoValor = quantidade * precoUnitario;
  valorElement.textContent = novoValor.toFixed(2).replace('.', ','); // Formatação em moeda brasileira
}

// SESSÃO NEWSLETTER

// Validação de e-mail

document.getElementById("buttonNews").addEventListener("click", function () {
  const emailInput = document.getElementById("emailNews");
  const email = emailInput.value.trim();
  

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email === "") {
    Swal.fire({
      icon: "warning",
      title: "Campo vazio",
      text: "Por favor, insira um e-mail.",
    });
  } else if (!emailPattern.test(email)) {
    Swal.fire({
      icon: "error",
      title: "E-mail inválido",
      text: "O e-mail digitado não é válido. Tente novamente!",
    });
  } else {
    Swal.fire({
      icon: "success",
      title: "Sucesso!",
      text: "E-mail cadastrado com sucesso!",
    });

    emailInput.value = "";
  }
});