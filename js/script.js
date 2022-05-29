// https://demo.minotheme.com/zangi/html/?i=243246&aff=entheos
let allProdutos = document.querySelectorAll(".produto-item");

const result = fetch("https://fakestoreapi.com/products?limit=5")
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
}
// BTN CARRINHO

function criarElemento(products) {
  const itemProduto = document.createElement("section");
  itemProduto.classList.add("produto-item");
  itemProduto.innerHTML = `
      <span class="produto-item-categoria">${products.category}</span>
      <img class="produto-item-img" src="${products.image}" />
      <h2 class="produto-item-title">${products.title}</h2>
      <p class="produto-item-descripton"> 
      ${formateItemProduto(products.description)}
      </p>
      <span class="produto-item-price">$ ${products.price}</span>
      <span class="produto-item-carrinho">
      <i class="fa-solid fa-cart-plus"></i>
      </span>
    `;
  appendProduto(itemProduto);
  extendDescription(products.description);
  const btnCarrinho = document.querySelectorAll(".produto-item-carrinho");
  btnCarrinho.forEach((btn) => {
    btn.addEventListener("click", addCarinhoItem);
  });
}

const containerProdutos = document.querySelector(".container-produtos");
function appendProduto(produto) {
  containerProdutos.appendChild(produto);
}

function formateItemProduto(description) {
  const textFormate =
    description.slice(0, 20) +
    "..." +
    '<a class="btn-ler-mais" >ler mais...</a>';
  // return `${textFormate} ${btnLerMais.innerHTML}`;

  return textFormate;
}

function extendDescription(descriptionAll) {
  const btnsLerMais = document.querySelectorAll(".btn-ler-mais");
  btnsLerMais.forEach((btnLerMais) => {
    btnLerMais.addEventListener("click", (e) => {
      btnLerMais.parentElement.innerText = descriptionAll;
    });
  });
}

function addCarinhoItem(item) {
  // console.log(item.path);
  const title = item.path[2].querySelector(".produto-item-title").innerText;
  const price = item.path[2]
    .querySelector(".produto-item-price")
    .innerText.replace(" ", "");
  const image = item.path[2].querySelector(".produto-item-img").src;

  const allItensCart = document.querySelectorAll(".grid-cart-produtos > div");
  let adicionado = false;
  Array.from(allItensCart).forEach((item) => {
    if (item.querySelector("h3").innerText == title) {
      const quantidade = item.querySelector(".valueQntdd");
      quantidade.value = +quantidade.value + 1;
      adicionado = true;
      showCart();
      calcPrice();
    }
  });
  const objDadosProdutos = {
    title,
    price,
    image,
  };
  !adicionado ? addProdutoCart(objDadosProdutos) : null;
  removeProdutos();
  // const quantidade = document.querySelector(".valueQntdd");
  // quantidade.addEventListener("change", calcPrice);
}
function addProdutoCart(produto) {
  const formateProduto = document.createElement("div");
  formateProduto.innerHTML = `
  <div class="cart-produto-item">
    <img src="${produto.image}" alt="${produto.title}"/>
    <h3>${produto.title}</h3>
    <span class="price">${produto.price}</span>
    <span class="remove-produto">X</span>
    <p class="qntddProduto">Quantidade:<input type="number" name="quantidade" class="valueQntdd" value="1" /></p>
  </div>
  <hr />
  `;

  cartProdutos.appendChild(formateProduto);
  showCart();
  calcPrice();
  const inputsQuantidade = document.querySelectorAll(".valueQntdd");
  inputsQuantidade.forEach((item) => {
    item.addEventListener("change", calcPrice);
  });
}

const btnCarrinho = document.querySelectorAll(".produto-item-carrinho");
btnCarrinho.forEach((btn) => {
  btn.addEventListener("click", addCarinhoItem);
});

const cartProdutos = document.querySelector(".grid-cart-produtos");

const precoTotal = document.querySelector(".valorTotal");
function calcPrice() {
  const itensProdutos = document.querySelectorAll(".cart-produto-item");
  const valorTotal = Array.from(itensProdutos).reduce((acc, prod) => {
    let priceProduto = prod.querySelector(".price").innerText.replace(",", ".");
    const qntddProd = prod.querySelector(".valueQntdd");
    priceProduto = +priceProduto.replace("$", "");
    priceProduto *= qntddProd.value;
    // console.log(qntddProd.value);
    return acc + priceProduto;
  }, 0);

  precoTotal.innerText = `$${valorTotal.toFixed(2)}`;
}

// FUNCAO PARA BUSCA SEARCH
allProdutos = document.querySelectorAll(".produto-item");
const inputSearch = document.getElementById("search");

const normalizeText = function (value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

function handleKeypress(e) {
  allProdutos.forEach((produto) => {
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
}

inputSearch.addEventListener("keyup", handleKeypress);

// NUNHUM PRODUTO ENCONTRADO
/*
function zeroProdutos() {
  const resulZeroProdutos = Array.from(allProdutos).every((produto) => {
    return produto.classList.contains("inativeSearch");
  });
  resulZeroProdutos ? console.log("ZEOO") : null;
}
*/
//CLOSET CART
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

// REMOVE PRODUTO;
function removeProdutos() {
  const btnsRemoveProduto = document.querySelectorAll(".remove-produto");
  btnsRemoveProduto.forEach((btn) => {
    btn.addEventListener("click", removerProduto);
  });
}

function removerProduto(e) {
  e.path[2].remove();
  calcPrice();
}

// TESTE OBSERVE
// const itemProduto = document.querySelectorAll(".produto-item")[0];
// const observar = new MutationObserver(() => {
//   console.log(this);
// });
// observar.observe(itemProduto, {
//   attributeFilter: ["class"],
// });

const titleSemProduto = document.querySelector(".sem-produtos");
function produtoNaoEncontrado() {
  const result = Array.from(allProdutos).every((produto) => {
    return produto.classList.contains("inativeSearch");
  });
  result
    ? titleSemProduto.classList.add("active")
    : titleSemProduto.classList.remove("active");
}

// FORMATANDO A BAG
const sacolaProdutos = document.querySelector(".bagFinish");
sacolaProdutos.addEventListener("click", showCart);
function showCart() {
  document.body.classList.add("desable");
  cartProdutos.parentElement.classList.add("active");
}

const btnHamburguer = document.querySelector(".btn-hamburguer");

btnHamburguer.addEventListener("click", handleMenuMobile);
function handleMenuMobile(e) {
  btnHamburguer.classList.toggle("active");
  menuHeader.classList.toggle("active");
}

const menuHeader = document.querySelector(".menu-header");
