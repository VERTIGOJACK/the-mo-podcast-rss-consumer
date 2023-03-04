import { RssBuilder, GetRssAsJson } from "./util/rssBuilder/rssBuilder.js";

const RSS_URL = "https://anchor.fm/s/34182390/podcast/rss";

const rssSection = document.getElementById("rss");

const json = await GetRssAsJson(RSS_URL);
const items = json.rss.channel.item;
const result = RssBuilder(items, 0, 10);
rssSection.appendChild(result);

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
