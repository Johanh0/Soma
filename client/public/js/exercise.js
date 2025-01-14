import { navbarToggle, themeToggle, storageTheme } from "/js/navbar.js";
import footerYear from "/js/footer.js";

const searchForm = document.querySelector(".search");
const exerciseOptions = document.querySelector("#exercise--options");
const targetOptions = document.querySelector("#target--options");

const resultContainer = document.querySelector(".result");

const modalView = document.querySelector(".modal");

async function fetchAllExercises() {
  try {
    // Try to bring information from the localStorage. If it is empty the result will be null
    const isStorage = localStorage.getItem("exercises");

    // Check if the exercises data exist in localStorage
    if (isStorage != null) {
      // If it exist use the data from localStorage and prevent make a the call to the API
      return JSON.parse(localStorage.getItem("exercises"));
    }

    // If it doesn't exist call the API and bring all the data
    const response = await fetch(`/api/v1/exercise/workouts`);
    const data = await response.json();

    // Save the data in localStorage
    localStorage.setItem("exercises", JSON.stringify(data));
    return data;
  } catch {}
}

const allExercises = await fetchAllExercises();

function handleModal() {
  const allCards = document.querySelectorAll(".result--card");

  allCards.forEach((card) => {
    card.addEventListener("click", () => {
      const cardID = card.dataset.id;
      const exercise = allExercises.data.find((data) => data.id === cardID);
      openModal(exercise);
    });
  });
}

function openModal(data) {
  modalView.style.display = "flex";

  modalView.innerHTML = `
    <div class="modal--card">
    <div class="card--img">
      <img src="${data.gifUrl}" alt="" loading="lazy" />
    </div>
    <div class="card--info">
      <h3>${data.name}</h3>
      <h5>${data.target}</h5>
      <div class="secondary--muscles">
      <p>Other muscles:</p>
      </div>
      <div class="instructions">
      <p>Instructions</p>
        <ol>
  
        </ol>
      </div>
    </div>
  </div>
  `;

  // <div class="muscle--tag">Muscle</div>
  // <div class="muscle--tag">Muscle</div>

  const secondaryMusclesElement = document.querySelector(".secondary--muscles");
  const instructionsElement = document.querySelector(".instructions ol");

  data.secondaryMuscles.forEach((muscle) => {
    secondaryMusclesElement.innerHTML += `
      <div class="muscle--tag">${muscle}</div>
    `;
  });

  data.instructions.forEach((instruction) => {
    instructionsElement.innerHTML += `
    <li>${instruction}</li>
    `;
  });
}

function closeModal() {
  modalView.style.display = "none";
}

modalView.addEventListener("click", closeModal);

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const exercise = exerciseOptions.value;
  const target = targetOptions.value;

  const filterExercise = allExercises.data
    .filter((data) => data.bodyPart === exercise && data.target === target)
    .slice(0, 20);

  resultContainer.innerHTML = "";

  if (filterExercise.length === 0) {
    resultContainer.innerHTML = `
    <h4>We Couldn't Found Any Data With This Options.</h4>
    `;
  }

  filterExercise.forEach((data) => {
    resultContainer.innerHTML += `
        <article class="result--card" data-id="${data.id}">
        <div class="card--img">
            <img src="${data.gifUrl}" alt="" loading="lazy" >
        </div>
        <div class="card--info">
            <h3>${data.target} - ${data.name}</h3>
            <h4>${data.bodyPart}</h4>
            <h5>instruc</h5>
        </div>
    </article>
    `;
  });

  handleModal();
});

document.addEventListener("DOMContentLoaded", async () => {
  allExercises.data.slice(0, 20).forEach((data) => {
    resultContainer.innerHTML += `
        <article class="result--card" data-id="${data.id}">
        <div class="card--img">
            <img src="${data.gifUrl}" alt="" loading="lazy" >
        </div>
        <div class="card--info">
            <h3>${data.name}</h3>
            <h5>${data.target}</h5>
        </div>
    </article>
    `;
  });

  handleModal();
  storageTheme();
  themeToggle();
  navbarToggle();
  footerYear();
});
