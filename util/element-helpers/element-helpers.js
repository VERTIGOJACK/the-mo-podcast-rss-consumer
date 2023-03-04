export const TextElement = (type, inputText) => {
    let element = document.createElement(type);
    let text = document.createTextNode(inputText);
    element.appendChild(text);
    return element;
  };