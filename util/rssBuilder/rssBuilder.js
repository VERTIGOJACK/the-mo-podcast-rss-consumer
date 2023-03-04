import { xml2json } from "../xml2json/xml2json.js";
import * as el from "../element-helpers/element-helpers.js";

export const GetRssAsJson = async (url) => {
  const response = await fetch(url);
  const responseText = await response.text();

  const dataDom = new window.DOMParser().parseFromString(
    responseText,
    "text/xml"
  );

  let jsonString = xml2json(dataDom);
  jsonString = jsonString.split("undefined");
  jsonString = jsonString.join("");
  const json = JSON.parse(jsonString);

  return json;
};

export const RssBuilder = (appendTarget ,items, startindex, endindex) => {
  if (endindex == 0) {
    endindex = items.length;
  }
  const container = appendTarget

  console.log(items[0]);

  for (let i = startindex; i < endindex; i++) {
    const element = items[i];

    //create item container
    let itemPost = document.createElement("div");
    itemPost.setAttribute("id", "item" + i);
    itemPost.setAttribute("class", "item");

    //create and append titlecontainer
    const title = document.createElement("div");
    title.setAttribute("class", "title");
    title.appendChild(el.TextElement("h1", (items.length - i)+" :"));
    //create and append title
    title.appendChild(el.TextElement("p", element.title["#cdata"]));
    //create and append episode number
    
    itemPost.appendChild(title);

    //create and append container under title section
    let itemBody = document.createElement("div");
    itemBody.setAttribute("class", "item-body");

    //create and append audioplayer with image
    let audioContainer = document.createElement("div");
    audioContainer.setAttribute("class", "audio-container");

    //image
    const episodeImage = document.createElement("img");
    episodeImage.setAttribute("src", element["itunes:image"]["@href"]);
    audioContainer.appendChild(episodeImage);

    //audio
    const audio = document.createElement("audio");
    audio.setAttribute("controls", "metadata");
    audio.setAttribute("preload", "metadata");

    const audiosrc = document.createElement("source");
    audiosrc.setAttribute("src", items[i].enclosure["@url"]);
    audiosrc.setAttribute("type", "audio/mp3");

    audio.appendChild(audiosrc);
    audioContainer.appendChild(audio);
    itemBody.appendChild(audioContainer);

    //create info container
    const info = document.createElement("div");
    info.setAttribute("class", "info");

    //create and append description
    const dummy = document.createElement("html");
    dummy.innerHTML = element.description["#cdata"];
    let descriptions = dummy.querySelectorAll("p");
    descriptions.forEach((element) => {
      element.setAttribute("class", "description");
      info.appendChild(element);
    });

    //append info to itembody
    itemBody.appendChild(info);

    //append to itempoost
    itemPost.appendChild(itemBody);

    //append itemPost to container
    container.appendChild(itemPost);
  }
};
