function parse_id() {
  let url_str = location.href;
  let url = new URL(url_str);
  let id = url.searchParams.get("id");
  return Number(id);
}

async function fetchData() {
  try {
    let response = await fetch("../dataBase/data.json");
    let data = await response.json();
    let id = parse_id();
    let current = data.find((obj) => obj.id === id);
    return current;
  } catch {}
}

async function render() {
  let data = await fetchData();
  let body = document.querySelector("body");
  let cardsHTML = document.createElement("div");
  let navBar = document.createElement("nav");

  let cards = createCardsHTML(data);

  cardsHTML.innerHTML = cards;
  body.appendChild(navBar);
  body.appendChild(cardsHTML);
  let basket_btn = document.querySelector(".basketbtn");
  basket_btn.addEventListener("click", addToBasket);

  navBar.innerHTML = navBarHTML();
  navBarFunction();
}

async function addToBasket() {
  let data = await fetchData();
  let id = data.id;
  let basket = localStorage.getItem("basket");
  let basket_btn = document.querySelector(".basketbtn");
  if (basket === null) {
    let arr = [data];
    localStorage.setItem("basket", JSON.stringify(arr));
  } else {
    if (JSON.parse(basket).find((obj) => obj.id === id)) {
      alert("Karzenkege Qosyldy");
    } else {
      basket = JSON.parse(basket);
      basket.push(data);
      localStorage.setItem("basket", JSON.stringify(basket));
    }
  }
}
function navBarFunction() {
  let LikedPage = document.querySelector(".LikedPage");
  let HomePage = document.querySelector(".HomePage");
  let BasketPage = document.querySelector(".BasketPage");

  LikedPage.addEventListener("click", () => {
    location.href = `LikedPage.html`;
  });
  HomePage.addEventListener("click", () => {
    location.href = `main.html`;
  });
  BasketPage.addEventListener("click", () => {
    location.href = `bask.html`;
  });
}

//HTML's Elements///////////////////////////////////////////////////////////////////
//Navigation BAR
function navBarHTML() {
  return `<h1>The Amazing Smatphones!</h1>
  <div>
  <a class="HomePage"><i class="fa-solid fa-house"></i>Bas Mazir</a>
  <a class="LikedPage"><i class="fa-solid fa-heart"></i>Unatqandar</a>
  <a class="BasketPage"><i class="fa-solid fa-cart-shopping"></i>Karzenke</a>
  <div>`;
}
function createCardsHTML(data) {
  return `
  <div id="${data.id}" class="card">
  <div class="cardImg">
  <img src="../img/${data.img}" class="img">
  <div class="cardPrice">
  <p>${data.name}</p>
  <p class="card_id">Сериний номер:${data.id}</p>
  <p>${data.salary}</p>
  <button class="basketbtn">Karzenkege Qosu</button></div></div></div>
 <div class="Params">
 ${data.description[1].map((e) => {
   return `<p class="char">
       ${e.FIELD1}: ${e.FIELD2}
     </p>`;
 })}
  </div>
  `;
}
render();
