const btnOpenMenu = document.querySelector(".nav__menu-open");
const btnCloseMenu = document.querySelector(".nav__menu-close");
const menu = document.querySelector(".menu");
const menuOverlay = document.querySelector(".menu-overlay");

const actionOpenMenu = () => {
  if (window.innerWidth < 860) {
    btnOpenMenu.style.display = "none";
    btnCloseMenu.style.display = "block";
    menu.classList.toggle("show");
  }
};
const actionCloseMenu = () => {
  if (window.innerWidth < 860) {
    btnOpenMenu.style.display = "block";
    btnCloseMenu.style.display = "none";
    menu.classList.toggle("show");
  }
};
btnOpenMenu.addEventListener("click", actionOpenMenu);
btnCloseMenu.addEventListener("click", actionCloseMenu);

const arrMenuLink = document.querySelectorAll(".menu-link");
for (let i = 0; i < arrMenuLink.length; i++) {
  const element = arrMenuLink[i];
  element.addEventListener("click", actionCloseMenu);
}

document
  .querySelector(".nav-actions__action-connect")
  .addEventListener("click", actionCloseMenu);
