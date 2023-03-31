const menuBar = document.getElementById("menuBar");
const menuButton = document.getElementById("menuButton");
const back = document.getElementById("back");

menuButton.addEventListener("click", (e) => {
  menuBar.classList.toggle("slide-back");
  menuBar.classList.toggle("ul-slider-animation");
  menuBar.classList.toggle("menu-hide");
});

back.addEventListener("click", (e) => {
  menuBar.classList.toggle("ul-slider-animation");
  menuBar.classList.toggle("slide-back");

  setTimeout(() => {
    menuBar.classList.toggle("menu-hide");
  }, 490);
});

const lang = document.querySelector("#lang");
const langList = document.querySelectorAll(".dropdown-content a");

for (let i = 0; i < langList.length; i++) {
  langList[i].setAttribute("onclick", "select(this)");
}

const select = (element) => {
  let selectData = element.textContent;
  console.log(selectData);
  console.log(lang);
  lang.innerText = selectData;
};
