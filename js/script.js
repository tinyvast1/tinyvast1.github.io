const hamburger = document.querySelector(".hamburger"),
  menu = document.querySelector(".menu"),
  closeElem = document.querySelector(".menu__close"),
  closeOver = document.querySelector(".menu__overlay"),
  menuelem = document.querySelectorAll(".menu__elem");
hamburger.addEventListener("click", () => {
  menu.classList.add("active");
  closeOver.classList.add("active");
});
// hamburger.addEventListener("click", () => {
//   // menu.classList.add("active");
//   closeOver.classList.add("active");
// });
closeElem.addEventListener("click", () => {
  menu.classList.remove("active");
  closeOver.classList.remove("active");
});
closeOver.addEventListener("click", () => {
  menu.classList.remove("active");
  closeOver.classList.remove("active");
});
// menuelem.addEventListener("click", () => {
//   menu.classList.remove("active");
//   closeOver.classList.remove("active");
// });

function handleClick() {
  menu.classList.remove("active");
  closeOver.classList.remove("active");
}
menuelem.forEach((menuelem) => {
  menuelem.addEventListener("click", handleClick);
});

const percent = document.querySelectorAll(".skills__rating-percent"),
  scale = document.querySelectorAll(".skills__rating-scale span");

percent.forEach((item, i) => {
  scale[i].style.width = item.innerHTML;
});
