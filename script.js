let allImages = [
  "./images/img1 (2).jpg",
  "./images/img1 (3).jpg",
  "./images/img2 (2).jpg",
  "./images/img2.jpg",
  "./images/img3 (2).jpg",
  "./images/img3.jpg",
  "./images/img4 (2).jpg",
  "./images/img4.jpg",
  "./images/img5.jpg",
  "./images/img5 (2).jpg",
  "./images/img6 (2).jpg",
  "./images/img6 (3).jpg",
];
let storePrev = [];

const imageContainer = document.querySelector(".game-container");

function mixedUpImages() {
  allImages
    .map((el) => [{ name: el, id: Math.random() }])
    .sort((a, b) => a[0].id - b[0].id)
    .forEach((img) => {
      let image = document.createElement("img");
      let div = document.createElement("div");
      div.classList.add("img-box");
      image.classList.add("img");
      image.setAttribute("src", img[0].name);
      image.setAttribute("draggable", "false");
      div.appendChild(image);
      imageContainer.appendChild(div);
    });

  setTimeout(hideAll, 1000);
}

window.addEventListener("load", mixedUpImages);

function hideAll() {
  document.querySelectorAll("img").forEach((el) => {
    el.closest(".img-box").classList.add("changeColor");
    el.style.opacity = "0";
  });
}

imageContainer.addEventListener("click", function (e) {
  if (!e.target.classList.contains("img")) return;

  e.target.closest(".img-box").classList.remove("changeColor");
  e.target.style.opacity = "1";

  storePrev.push(e.target.getAttribute("src"));
  const prevEl = document.querySelector(`img[src = '${storePrev[0]}']`);

  if (
    storePrev.length === 2 &&
    storePrev[0].slice(0, 13) === e.target.getAttribute("src").slice(0, 13)
  ) {
    e.target.getAttribute("src").slice(0, 13);
    e.target.classList.add("matched");
    prevEl.classList.add("matched");
  }

  if (storePrev.length > 1) {
    setTimeout(function () {
      prevEl.style.opacity = "0";
      prevEl.closest(".img-box").classList.add("changeColor");
      e.target.style.opacity = "0";
      e.target.closest(".img-box").classList.add("changeColor");
      storePrev.length = 0;
    }, 300);
  }
});
