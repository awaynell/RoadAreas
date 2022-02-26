"use strict";

window.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form"),
    button = form.querySelector("button"),
    template = document.querySelector("#template").content.querySelector(".col-3"),
    wrapper = document.querySelector(".wrapper > .row");

  const tasks = Object.keys(localStorage);

  button.disabled = true;
  button.style.cursor = "default";
  form.addEventListener("input", () => {
    if (form.title.value.trim().length) {
      button.disabled = false;
      button.style.cursor = "pointer";
    }
  });

  function renderCard(task) {
    const card = template.cloneNode(true);
    let btnDel = card.querySelector(".btnDel");
    btnDel.addEventListener("click", () => {
      location.reload();
      localStorage.removeItem(task);
      card.remove();
    });
    card.querySelector(".card-title").textContent = task;
    card.querySelector(".card-text").textContent = localStorage.getItem(task);

    return card;
  }

  form.addEventListener("submit", (evt) => {
    let result = form.height.value * form.width.value + " м²";
    evt.preventDefault();
    localStorage.setItem(form.title.value, result);
    wrapper.insertAdjacentElement("afterbegin", renderCard(form.title.value));
    form.reset();
    location.reload();
    return result;
  });

  const fragment = document.createDocumentFragment();
  for (let task of tasks) {
    fragment.prepend(renderCard(task));
  }
  wrapper.prepend(fragment);

  let elements = Array.from(document.querySelectorAll(".card-text"));
  const squares = elements.map(function (el) {
    return Number.parseFloat(el.textContent);
  });

  let sum = squares.reduce((accumulator, curValue) => accumulator + curValue);

  let areaAllHtml = document.createElement("p");
  areaAllHtml.className = "area__all";
  areaAllHtml.innerHTML = "Итого: " + sum + " м²";
  document.body.append(areaAllHtml);
});
