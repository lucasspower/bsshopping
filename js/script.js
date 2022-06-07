let todosProdutos = document.querySelectorAll(".produto-item");
// Produtos do carrinho
const cartProdutos = document.querySelector(".grid-cart-produtos");
const urlApi = "https://fakestoreapi.com/products?limit=*";

<<<<<<< HEAD
async function initFetchApi(api) {
  const response = await fetch(api);
  const result = await response.json();
  criarItemProduto(result);
  todosProdutos = document.querySelectorAll(".produto-item");
=======
const result = fetch("https://fakestoreapi.com/products?limit=*")
  .then((resp) => {
    return resp.json();
  })
  .then((json) => {
    return json;
  });
result.then((result) => {
  createItemProduto(result);
  allProdutos = document.querySelectorAll(".produto-item");
});
function createItemProduto(ArrProdutos) {
  ArrProdutos.forEach((products) => {
    criarElemento(products);
  });
>>>>>>> 8b3b9487fad8e945586bf845d591d85658ea07f4
}
initFetchApi(urlApi);

// descrição do produto com até 20 caracteres
const formatarDescricaoProduto = function (description) {
  const textFormate =
    description.slice(0, 30) +
    "..." +
    '<a class="btn-ler-mais" >ler mais...</a>';
  return textFormate;
};

// cria um card para cada produto e o adiciona no container
function criarItemProduto(listaProdutos) {
  const containerProdutos = document.querySelector(".container-produtos");

  listaProdutos.forEach((produto) => {
    const itemProduto = document.createElement("section");
    itemProduto.classList.add("produto-item");
    itemProduto.innerHTML = `
      <span class="produto-item-categoria">
        ${produto.category}
      </span>
      <img class="produto-item-img" src="${produto.image}" />
      <h2 class="produto-item-title">
      ${produto.title}
      </h2>
      <p class="produto-item-descripton"> 
        ${formatarDescricaoProduto(produto.description)}
      </p>
      <span class="produto-item-price">$ 
        ${produto.price}
      </span>
      <button class="produto-item-carrinho">
        Comprar 
        <i class="fa-solid fa-cart-plus"></i>
      </button>
    `;
    containerProdutos.appendChild(itemProduto);
    // descricaoProduto(produto.description);
  });

  // encurtar a descrição do produto e adicinar enveto de adicionar no carrinho
  const btnCarrinho = document.querySelectorAll(".produto-item-carrinho");
  btnCarrinho.forEach((btn) => {
    btn.addEventListener("click", addProdutoCarrinho);
  });
}

// Adiciona evento no botao de comprar
const btnCarrinho = document.querySelectorAll(".produto-item-carrinho");
btnCarrinho.forEach((btn) => {
  btn.addEventListener("click", addProdutoCarrinho);
});

// Mostra toda a descriçao qunado clicar no botao "ler mais"
function descricaoProduto(descriptionAll) {
  const btnsLerMais = document.querySelectorAll(".btn-ler-mais");
  btnsLerMais.forEach((btnLerMais) => {
    btnLerMais.addEventListener("click", (e) => {
      e.currentTarget.parentElement
        ? (e.currentTarget.parentElement.innerText = descriptionAll)
        : null;
    });
  });
}

// Abrir a scola de produtos
const sacolaProdutos = document.querySelector(".bagFinish");
const showCart = function () {
  document.body.classList.add("desable");
  cartProdutos.parentElement.classList.add("active");
};
sacolaProdutos.addEventListener("click", showCart);

// Adiciona o produto no carrinho de compras
function addProdutoCarrinho(item) {
  const produtoSelecionado = item.currentTarget.parentElement;
  const title = produtoSelecionado.querySelector(
    ".produto-item-title"
  ).innerText;

  const price = produtoSelecionado
    .querySelector(".produto-item-price")
    .innerText.replace(" ", "");

  const image = produtoSelecionado.querySelector(".produto-item-img").src;

  const allItensCart = document.querySelectorAll(".grid-cart-produtos > div");

  let produtoAdicionado = false;

  Array.from(allItensCart).forEach((item) => {
    if (item.querySelector("h3").innerText == title) {
      const quantidade = item.querySelector(".valueQntdd");
      quantidade.value = +quantidade.value + 1;
      produtoAdicionado = true;
      showCart();
      calcularPreco();
    }
  });
  const objDadosProdutos = {
    title,
    price,
    image,
  };
  produtoAdicionado ? null : addProdutoCart(objDadosProdutos);
  removeProdutos();
}

// Calcula o preço de todos os produtos do carrinho
const precoTotal = document.querySelector(".valorTotal");
const calcularPreco = function () {
  const itensProdutos = document.querySelectorAll(".cart-produto-item");
  const valorTotal = Array.from(itensProdutos).reduce((acc, produto) => {
    let precoProduto = produto
      .querySelector(".price")
      .innerText.replace(",", ".");
    const quantidadeProduto = produto.querySelector(".valueQntdd");
    precoProduto = +precoProduto.replace("$", "");
    precoProduto *= quantidadeProduto.value;
    return acc + precoProduto;
  }, 0);
  precoTotal.innerText = `$${valorTotal.toFixed(2)}`;
};

// Adiciona o produto no carrinho
function addProdutoCart(produto) {
  const formateProduto = document.createElement("div");
  formateProduto.classList.add("cart-produto-item");
  formateProduto.innerHTML = `
      <img src="${produto.image}" alt="${produto.title}"/>
      <h3>${produto.title}</h3>
      <span class="price">
        ${produto.price}
      </span>
      <span class="remove-produto">X</span>
      <p class="qntddProduto">
        Quantidade:<input type="number" name="quantidade" class="valueQntdd" value="1" />
      </p>
  `;

  cartProdutos.appendChild(formateProduto);
  showCart();
  calcularPreco();

  // Calcula a quantidade de produtos selecionada
  const inputQuantidadeProd = Array.from(
    document.querySelectorAll(".valueQntdd")
  ).at(-1);
  inputQuantidadeProd.addEventListener("change", calcularPreco);
}

// Remove o produto do carrinho quando clicar no "X"
const removeProdutos = function () {
  const btnsRemoveProduto = document.querySelectorAll(".remove-produto");
  btnsRemoveProduto.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.target.parentElement.remove();
      calcularPreco();
    });
  });
};

// Informa que o produto buscado não foi encontrado
const titleSemProduto = document.querySelector(".sem-produtos");
const produtoNaoEncontrado = function () {
  const result = Array.from(todosProdutos).every((produto) => {
    return produto.classList.contains("inativeSearch");
  });
  result
    ? titleSemProduto.classList.add("active")
    : titleSemProduto.classList.remove("active");
};

// Buscar os produtos / Search
const initSearch = function () {
  todosProdutos = document.querySelectorAll(".produto-item");
  const inputSearch = document.getElementById("search");

  // Remove acentos do texto
  const normalizeText = function (value) {
    return value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };

  const handleKeypress = function (e) {
    todosProdutos.forEach((produto) => {
      const titleProduto = produto.querySelector(".produto-item-title");
      if (
        normalizeText(titleProduto.innerText).includes(
          normalizeText(inputSearch.value)
        )
      ) {
        produto.classList.contains("inativeSearch")
          ? produto.classList.remove("inativeSearch")
          : null;
      } else produto.classList.add("inativeSearch");
      produtoNaoEncontrado();
    });
  };

  inputSearch.addEventListener("keyup", handleKeypress);
};
initSearch();

//Fechar o carrinho de compras ou continuar comprando
const intiFecharCarrinho = function () {
  const btnFechar = document.querySelector(".btn-fechar-cart");
  const btnContinuarComprando = document.querySelector(
    ".btn-continuar-comprando"
  );
  btnFechar.addEventListener("click", handleClickCloseCart);
  btnContinuarComprando.addEventListener("click", handleClickCloseCart);

  function handleClickCloseCart(e) {
    cartProdutos.parentElement.classList.remove("active");
    document.body.classList.remove("desable");
  }
};
intiFecharCarrinho();

// Botão mobile - Menu mobile
const initBtnMobile = function () {
  const btnHamburguer = document.querySelector(".btn-hamburguer");
  const menuHeader = document.querySelector(".menu-header");
  btnHamburguer.addEventListener("click", handleMenuMobile);
  function handleMenuMobile(e) {
    btnHamburguer.classList.toggle("active");
    menuHeader.classList.toggle("active");
  }
};
initBtnMobile();
