import { navbarToggle, themeToggle, storageTheme } from "/js/navbar.js";
import footerYear from "/js/footer.js";

const formElement = document.querySelector(".search");
const resultContainer = document.querySelector(".result");
const modalView = document.querySelector(".modal");
const loader = document.querySelector(".loader");
// search, diet, intolerances, include, exclude

async function getRecipes(
  search = "side salad",
  diet = "vegetarian",
  intolerances = "gluten",
  include = "cheese",
  exclude = "egg"
) {
  const url = "/api/v1/recipe/search-recipe";
  try {
    // Remove all white spaces
    intolerances = intolerances.replace(/\s+/g, "");
    include = include.replace(/\s+/g, "");
    exclude = exclude.replace(/\s+/g, "");

    const response = await fetch(
      `${url}?search=${search}&diet=${diet}&intolerances=${intolerances}&include=${include}&exclude=${exclude}`
    );

    const data = await response.json();
    return data.data.results;
  } catch {
    return null;
  }
}

async function renderRecipes(requireValues) {
  let data;
  loader.style.display = "block";
  resultContainer.innerHTML = ``;
  try {
    if (requireValues) {
      const { search, diet, intolerances, include, exclude } =
        getInputsValues();
      data = await getRecipes(search, diet, intolerances, include, exclude);
    } else {
      data = await getRecipes();
    }

    const dietSelect = document.getElementById("diet--options").value;

    // Clean the result page
    loader.style.display = "none";

    data.forEach((recipe) => {
      resultContainer.innerHTML += `
        <article class="result--card" data-id="${recipe.id}">
            <div class="card--img">
<<<<<<< HEAD
                <img src="${recipe.image}" alt="" loading="lazy" >
=======
                <img src="${recipe.image}" alt="${recipe.title} recipe image" loading="lazy" >
>>>>>>> front-end
            </div>
            <div class="card--info">
                <h3>${recipe.title}</h3>
                <h5>${dietSelect}</h5>
            </div>
        </article>
        `;
    });

    // Save in the localStorage the current search
    localStorage.setItem("recipes", JSON.stringify(data));
    handleModal();
  } catch {}
}

function getInputsValues() {
  const searchInput = document
    .getElementById("keyword--input")
    .value.toLowerCase();
  const dietSelect = document
    .getElementById("diet--options")
    .value.toLowerCase();
  const intolerancesInput = document
    .getElementById("intolerance--input")
    .value.toLowerCase();
  const includeInput = document
    .getElementById("include--input")
    .value.toLowerCase();
  const excludeInput = document
    .getElementById("exclude--input")
    .value.toLowerCase();

  return {
    search: searchInput,
    diet: dietSelect,
    intolerances: intolerancesInput,
    include: includeInput,
    exclude: excludeInput,
  };
}

function handleModal() {
  const allCards = document.querySelectorAll(".result--card");

  const dataRecipe = JSON.parse(localStorage.getItem("recipes"));
  allCards.forEach((card) => {
    card.addEventListener("click", () => {
      const cardID = card.dataset.id;
      const recipe = dataRecipe.find((data) => data.id == cardID);
      openModal(recipe);
    });
  });
}

function openModal(data) {
  modalView.style.display = "flex";

  modalView.innerHTML = `
      <div class="modal--card">
      <div class="card--img">
        <img src="${data.image}" alt="${recipe.title} recipe image" loading="lazy" />
      </div>
      <div class="card--info">
        <h3>${data.title}</h3>
        <div class="diets">
        <p></p>
        </div>
        <div class="summary">
        <h6>Summary</h6>
          <p></p>
        </div>
      </div>
    </div>
    `;

  const dietsElements = document.querySelector(".diets");
  const summaryElement = document.querySelector(".summary p");

  data.diets.forEach((diet) => {
    dietsElements.innerHTML += `
        <div class="muscle--tag">${diet}</div>
      `;
  });

  summaryElement.innerHTML = `${data.summary}`;
}

function closeModal() {
  modalView.style.display = "none";
}

modalView.addEventListener("click", closeModal);

formElement.addEventListener("submit", (event) => {
  event.preventDefault();
  renderRecipes(true);
});

// Trigger functions after the DOM were load
document.addEventListener("DOMContentLoaded", () => {
  renderRecipes();
  storageTheme();
  themeToggle();
  navbarToggle();
  footerYear();
});
