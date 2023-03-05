import { RssBuilder, GetRssAsJson } from "./util/rssBuilder/rssBuilder.js";

const RSS_URL = "https://anchor.fm/s/34182390/podcast/rss";
const ITEMS_PER_LOAD = 5;
const DEBOUNCE_VALUE = 100;

const rssSection = document.getElementById("content");
const loadingCircle = document.getElementById("loading-circle");
const sortSwitch = document.getElementById("sort");

//load spinner from html
const parser = new DOMParser();
let response = await fetch("./util/loading-spinner-4/dist/index.html");
let text = await response.text();
const spinner = parser
  .parseFromString(text, "text/html")
  .querySelector(".spinner-container");
console.log(spinner);
loadingCircle.appendChild(spinner);

let loadCounter = 0;
let sort = "forward";

//order selector
sortSwitch.addEventListener("change", () => {
  rssSection.innerHTML = "";
  loadCounter = 0;
  if (sortSwitch.checked) {
    sort = "forward";
  } else {
    sort = "reverse";
  }
  loadingCircle.classList.remove("hide");
  loadContent(rssSection, ITEMS_PER_LOAD);
});

//method for loading content
const loadContent = async (appendTarget, amount) => {
  const json = await GetRssAsJson(RSS_URL);
  const items = json.rss.channel.item;
  if (loadCounter < items.length) {
    RssBuilder(appendTarget, items, loadCounter, loadCounter + amount, sort);
    loadCounter += amount;
  } else {
    loadingCircle.setAttribute("class", "hide");
  }
};

//first load
loadContent(rssSection, ITEMS_PER_LOAD);

//on bottom of page
let lastLoad = Date.now();

window.onscroll = function (ev) {
  if (
    window.innerHeight + window.pageYOffset >=
    document.body.offsetHeight - 5
  ) {
    if (Date.now() - lastLoad > DEBOUNCE_VALUE) {
      loadContent(rssSection, ITEMS_PER_LOAD);
      lastLoad = Date.now();
    }
  }
};

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
window.onclick = function (e) {
  console.log(e);
  //reset all dropdowns
  handleDropdowns(e);
};

function handleDropdowns(e) {
  let myDropdown = document.querySelectorAll(".dropbtn + div");
  myDropdown.forEach((element) => {
    if (element.classList.contains("show")) {
      element.classList.remove("show");
    }
  });

  //if target is a dropdown button - open dropdown menu
  if (e.target.matches(".dropbtn")) {
    let myDropdown = document.querySelector("#" + e.target.id + " + div");
    myDropdown.classList.toggle("show");
  }
}
