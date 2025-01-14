import { navbarToggle, themeToggle, storageTheme } from "/js/navbar.js";
import footerYear from "/js/footer.js";

const searchForm = document.querySelector(".search");
const exerciseOptions = document.querySelector("#exercise--options");
const targetOptions = document.querySelector("#target--options");
const loader = document.querySelector(".loader");

const resultContainer = document.querySelector(".result");
const modalView = document.querySelector(".modal");

// Fetch all exercises from the API
async function fetchAllExercises() {
  try {
    const isStorage = localStorage.getItem("exercises");

    if (isStorage != null) {
      console.log("Loaded exercises from localStorage");
      return JSON.parse(isStorage);
    }

    const response = await fetch(`/api/v1/exercise/workouts`);

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        alert("Your session has expired. Please log in again.");
        window.location.href = "/login";
      }
      throw new Error("Failed to fetch exercises");
    }

    const data = await response.json();
    localStorage.setItem("exercises", JSON.stringify(data));
    console.log("Fetched exercises from API:", data);

    return data;
  } catch (error) {
    console.error("Error fetching exercises:", error);
    alert("Failed to fetch exercises. Please try again later.");
  }
}

async function handleModal() {
  const allExercises = await fetchAllExercises();

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

modalView.addEventListener("click", (event) => {
  if (event.target === modalView) {
    closeModal();
  }
});

// Handle search form submission
searchForm.addEventListener("submit", async (event) => {
  const allExercises = await fetchAllExercises();
  event.preventDefault();
  const exercise = exerciseOptions.value;
  const target = targetOptions.value;
  resultContainer.innerHTML = "";
  loader.style.display = "block";

  const filterExercise = allExercises.data
    .filter((data) => data.bodyPart === exercise && data.target === target)
    .slice(0, 20);

  if (filterExercise.length === 0) {
    loader.style.display = "none";
    resultContainer.innerHTML = `
      <h4>We Couldn't Find Any Data With These Options.</h4>
    `;
    return;
  }

  loader.style.display = "none";
  filterExercise.forEach((data) => {
    resultContainer.innerHTML += `
      <article class="result--card" data-id="${data.id}">
        <div class="card--img">
          <img src="${data.gifUrl}" alt="" loading="lazy" />
        </div>
        <div class="card--info">
          <h3>${data.target} - ${data.name}</h3>
          <h4>${data.bodyPart}</h4>
        </div>
      </article>
    `;
  });

  handleModal();
});

// Trigger functions after the DOM is loaded
document.addEventListener("DOMContentLoaded", async () => {
  const allExercises = await fetchAllExercises();

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
