function getData() {
  let json = localStorage.getItem("basket");
  if (json === null) {
    return [];
  }
  return JSON.parse(json);
}
function render() {
  let body = document.querySelector("body");
  let data = getData();
  let cardsHTML = document.createElement("div");

  let navBar = document.createElement("nav");
  cardsHTML.classList.add("cards");

  navBar.innerHTML = navBarHTML();

  cardsHTML.innerHTML = data
    .map((obj) => {
      return generateCardHTML(obj);
    })
    .join("");

  body.appendChild(navBar);
  body.appendChild(cardsHTML);

  let del_btn = document.querySelectorAll(".deleteIcon");
  del_btn.forEach((btn) => {
    btn.addEventListener("click", onDeleteCard);
  });

  navBarFunction();
  changePageEvent();
}

//Basqa bet
function changePageEvent() {
  let images = document.querySelectorAll(".img");
  images.forEach((img) => {
    img.addEventListener("click", onCardPage);
  });
}
function onCardPage(img) {
  let id = img.currentTarget.parentElement.parentElement.id;
  location.href = `card.html?id=${id}`;
}

//Delete
function onDeleteCard(e) {
  let current = e.currentTarget;
  current.closest(".card").remove();
  let id = Number(current.closest(".card").id);
  let items = JSON.parse(localStorage.getItem("basket"));
  let data = items.filter((item) => item.id !== id);

  localStorage.setItem("basket", JSON.stringify(data));
}
function navBarFunction() {
  let LikedPage = document.querySelector(".LikedPage");
  let HomePage = document.querySelector(".HomePage");

  LikedPage.addEventListener("click", () => {
    location.href = `LikedPage.html`;
  });
  HomePage.addEventListener("click", () => {
    location.href = `main.html`;
  });
}

//HTML's Elements///////////////////////////////////////////////////////////////////
//Navigation BAR
function navBarHTML() {
  return `<h1>The Amazing Smatphones!</h1>
  <div>
  <a class="HomePage"><i class="fa-solid fa-house"></i>Bas Mazir</a>
  <a class="LikedPage"><i class="fa-solid fa-heart"></i>Unatqandar</a>

  <div>`;
}
function generateCardHTML(data) {
  return `
  <div id="${data.id}" class="card">
 
  <div class="card_image">
  <img src="../img/${data.img}" class="img">
  <p class="card_conf">${data.description[0]}</p>
  <span class="fa-solid fa-circle-xmark deleteIcon"></span>
  </div>

  <p class="card_name">${data.name}</p>
  <p class="card_id">Сериний номер:${data.id}</p>
  <p class="card_price">${data.salary}</p>

  </div>
  `;
}
render();
