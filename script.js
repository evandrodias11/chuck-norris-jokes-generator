import { API_KEY } from "./utils.js";

const jokeText = document.querySelector(".joke-text");
const newJokeBtn = document.querySelector(".new-joke-btn");
const categoryForm = document.querySelector(".category-form");
const categorySelect = document.querySelector("#category-select");

function fetchJoke(category = "") {
  let url = "https://api.chucknorris.io/jokes/random";

  if (category) {
    url = `https://api.chucknorris.io/jokes/random?category=${category}`;
  }

  fetch(url)
    .then((repsonse) => repsonse.json())
    .then((data) => {
      const joke = data.value;
      const lang = "en";
      const targetLang = "pt";

      fetch(
        `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}&q=${joke}&source=${lang}&target=${targetLang}`
      )
        .then((response) => response.json())
        .then((data) => {
          const translatedJoke = data.data.translations[0].translatedText;
          jokeText.innerHTML = translatedJoke;
        });
    })
    .catch((error) => console.log(error));
}

function fetchCategories() {
  fetch("https://api.chucknorris.io/jokes/categories")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((category) => {
        const categoryEng = category;
        const lang = "en";
        const targetLang = "pt";

        fetch(
          `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}&q=${categoryEng}&source=${lang}&target=${targetLang}`
        )
          .then((response) => response.json())
          .then((data) => {
            const translatedCategory =
              data.data.translations[0].translatedText.toLowerCase();
            console.log(translatedCategory);
            const option = document.createElement("option");
            option.value = category;
            option.text = translatedCategory;
            categorySelect.add(option);
          });
      });
    })
    .catch((error) => console.log(error));
}

newJokeBtn.addEventListener("click", () => {
  const category = categorySelect.value;
  fetchJoke(category);
});

categoryForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const category = categorySelect.value;
  fetchJoke(category);
});

fetchCategories();
