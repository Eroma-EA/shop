async function fetchData() {
  try {
    let res = await fetch("../dataBase/data.json");
    let data = await res.json();
    return data;
  } catch (e) {
    console.log(e);
  }
}

async function render() {
  let data = await fetchData();
  let json = localStorage.getItem("dataBase");
  if (json === null) {
    localStorage.setItem("dataBase", JSON.stringify(data));
  }

  InputSeach();
  let url = new URL(location.href);
  let text = url.searchParams.get("search");
  if (text !== null) {
    data = data.filter((obj) =>
      obj.name.toLowerCase().includes(text.toLowerCase())
    );
    let body = document.querySelector("body");
    body.style.alignItems = "start";
    let cardsHTML = document.createElement("div");
    cardsHTML.style.marginLeft = "20px";
  }

  let body = document.querySelector("body");
  //create
  let cardsHTML = document.createElement("div");
  let seachHTML = document.createElement("div");
  seachHTML.classList.add("seach");

  //add class cards to div
  cardsHTML.classList.add("cards");

  //added to body our cards div

  body.appendChild(seachHTML);
  body.appendChild(cardsHTML);

  let cards = data
    .map((e) => {
      return generateCardHTML(e);
    })
    .join("");
  cardsHTML.innerHTML = cards;

  //Delete
  addDeleteEvent();
  changePageEvent();

  //Liked
  addLikeEvent();
  navBarFunction();
}
//input Seach Products
function InputSeach() {
  let inputText = document.querySelector("input[type='text']");
  let SearchBtn = document.querySelector("input[type='submit']");

  SearchBtn.addEventListener("click", () => {
    let url = new URL(location.href);
    url.searchParams.set("search", inputText.value);
    location.href = url;
  });
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

//phones is like
function addLikeEvent() {
  let likeButtuns = document.querySelectorAll(".like_icon");

  likeButtuns.forEach((likebtn) => {
    likebtn.addEventListener("click", onLikeCard);
  });
}

//Like   /////////////////
function onLikeCard(e) {
  let currentButton = e.currentTarget;
  currentButton.style.scale = 1;
  setTimeout(() => {
    currentButton.style.scale = 1.1;
  }, 300);

  let id = currentButton.closest(".card").id;
  let local = JSON.parse(localStorage.getItem("dataBase"));

  let idlocal = local.find((i) => {
    if (i.id == id) {
      return i;
    }
  });

  if (currentButton.style.color == "white") {
    currentButton.style.color = "red";
    idlocal.islike = true;
    dataLiked(idlocal);
  } else {
    let data = localStorage.getItem("dataLiked");
    data = JSON.parse(data);
    let arr = data.filter((Obj) => Obj.id !== idlocal.id);
    localStorage.setItem("dataLiked", JSON.stringify(arr));
    currentButton.style.color = "white";
    idlocal.islike = false;
  }
  //True or False key Islike
  local.map((like) => {
    if (like.id == idlocal.id) {
      like.islike = idlocal.islike;
    }
  });
  localStorage.setItem("dataBase", JSON.stringify(local));
}
//Save in localStorage DataLiked
function dataLiked(like) {
  let data = localStorage.getItem("dataLiked");
  if (data === null) {
    localStorage.setItem("dataLiked", JSON.stringify([like]));
  } else {
    data = JSON.parse(data);
    data.push(like);
    localStorage.setItem("dataLiked", JSON.stringify(data));
  }
}

//Delete ////////////
function addDeleteEvent() {
  let buttons = document.querySelectorAll(".fa-circle-xmark");
  buttons.forEach((button) => {
    button.addEventListener("click", onDeleteCard);
  });
}

function onDeleteCard(e) {
  let currentButton = e.currentTarget;
  currentButton.closest(".card").remove();
}

//NavBar Function
function navBarFunction() {
  let LikedPage = document.querySelector(".LikedPage");
  let BasketPage = document.querySelector(".BasketPage");

  LikedPage.addEventListener("click", () => {
    location.href = `LikedPage.html`;
  });
  BasketPage.addEventListener("click", () => {
    location.href = `bask.html`;
  });
}

//Render's a Card
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

    <div class="colorLike">
   
    </div>
    <i class="fa-solid fa-heart like_icon" style="color:${colorLike(
      data
    )};"></i>
    </div>
    `;
}
//Card's liked colors
function colorLike(data) {
  let like = localStorage.getItem("dataBase");
  like = JSON.parse(like);
  let color = like.find((Obj) => Obj.id === data.id);
  if (color.islike === false) {
    return `white`;
  } else {
    return `red`;
  }
}
render();
