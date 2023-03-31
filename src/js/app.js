import "../scss/app.scss";
import "./navBar.js";

/* Your JS Code goes here */

/* Demo JS */
// Form card

const checkInDate = document.getElementById("checkInDate");
const checkOutDate = document.getElementById("checkOutDate");
const adults = document.getElementById("adults");
const children = document.getElementById("children");
const check = document.getElementById("check");

let formDB = [];

const emailId = document.getElementById("emailId");
const joinUs = document.getElementById("join");
console.log(emailId.value);
console.log(joinUs);
const join = () => {
  fetch("http://localhost:8080/join-us", {
    method: "POST",
    headers: {
      "content-Type": "application/json; charset=UTF-8",
    },
    body: `id=${Date.now()},&emailID=${emailId.value}`,
  }).then((res) => {
    console.log("Email request completed! ", res);
    setTimeout(() => {
      joinUs.textContent = "Submit";
    }, 3000);
  });
};

const checkButton = async () => {
  formDB.push({
    "check-in-date": checkInDate.value,
    "check-out-date": checkOutDate.value,
    adults: adults.value,
    children: children.value,
  });
  console.log(formDB);

  await fetch("http://localhost:8080/search-room", {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: `id=${Date.now()}&checkInDate=${checkInDate.value}&checkOutDate=${
      checkOutDate.value
    }&noOfAdults=${adults.value}&noOfchildren=${children.value}`,
  }).then((res) => {
    console.log("Request complete! response:", res);
    check.textContent = "✓";
    setTimeout(() => {
      check.textContent = "Submit";
    }, 5000);
  });
};

// Update Card data

const serviceCards = document.querySelectorAll(".service-card");
const cardImage = document.querySelectorAll(".service-image");
const cardName = document.querySelectorAll(".service-name");
const cardTitle = document.querySelectorAll(".service-title");
const cardDetails = document.querySelectorAll(".service-details");

console.log("serviceCards", serviceCards);
console.log("cardImage", cardImage);
console.log("cardName", cardName);
console.log("cardTitle", cardTitle);
console.log("cardDetails", cardDetails);

const getData = (apiId) => {
  let result = fetch(apiId).then((res) => {
    console.log(res);
    return res.json();
  });
  return result;
};
getData("http://localhost:8080/card-data").then((res) => {
  for (i = 0; i < serviceCards.length; i++) {
    cardImage[i].src = res[i].image;
    cardName[i].textContent = res[i].name;
    cardTitle[i].textContent = res[i].title;
    cardDetails[i].textContent = res[i].details;
  }
});

// Carousel

const nextButtom = document.getElementById("next");
const prevButton = document.getElementById("prev");
const totalSlide = document.querySelectorAll(".swiper-slide");
const roomType = document.querySelector(".room-type");
const price = document.querySelector(".price");
const roomTitle = document.querySelector(".room-title");
const bed = document.querySelector(".bed");
const capacity = document.querySelector(".capacity");
const roomSize = document.querySelector(".room-size");
const view = document.querySelector(".view");

let slideCount = 0;
let flag = true;

const insertCarouselData = (res, count) => {
  console.log("res : ", res);
  console.log("count : ", count);
  roomType.textContent = res[count].roomType;
  price.textContent = res[count].price;
  roomTitle.textContent = res[count].roomTitle;
  bed.textContent = res[count].bed;
  capacity.textContent = res[count].capacity;
  roomSize.textContent = res[count].roomSize;
  view.textContent = res[count].view;
};

getData("http://localhost:8080/room-data").then((res) => {
  if (slideCount === 0) {
    insertCarouselData(res, slideCount);
    slideCount++;
  }
  nextButtom.addEventListener("click", (e) => {
    if (flag === false) slideCount++;
    console.log("nextButton");
    if (slideCount > totalSlide.length) {
      slideCount = totalSlide.length - 1;
    } else {
      insertCarouselData(res, slideCount);
      slideCount++;
    }
    flag = true;
  });
  prevButton.addEventListener("click", (e) => {
    if (flag === true) slideCount--;
    console.log("prevbutton", slideCount);
    if (slideCount <= 0 || slideCount === totalSlide.length - 1) {
      slideCount = 0;
      insertCarouselData(res, slideCount);
      // console.log("slideCount :", slideCount);
    } else {
      slideCount--;
      insertCarouselData(res, slideCount);
    }
    flag = false;
  });
});
