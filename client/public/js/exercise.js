import { navbarToggle, themeToggle, storageTheme } from "/js/navbar.js";
import footerYear from "/js/footer.js";

// Ensure the user is authenticated
const token = localStorage.getItem("token");
if (!token) {
  alert("You must log in to access this page.");
  window.location.href = "/login";
}

const searchForm = document.querySelector(".search");
const exerciseOptions = document.querySelector("#exercise--options");
const targetOptions = document.querySelector("#target--options");

const resultContainer = document.querySelector(".result");

const modalView = document.querySelector(".modal");

async function fetchAllExercises() {
  try {
    const isStorage = localStorage.getItem("exercises");

    if (isStorage != null) {
      return JSON.parse(localStorage.getItem("exercises"));
    }

    const response = await fetch(`/api/v1/exercise/workouts`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include token in request
      },
    });

    if (response.status === 401 || response.status === 403) {
      alert("Your session has expired. Please log in again.");
      localStorage.removeItem("token");
      window.location.href = "/login";
      return;
    }

    const data = await response.json();

    localStorage.setItem("exercises", JSON.stringify(data));
    return data;
  } catch (error) {
    console.error("Error fetching exercises:", error);
    alert("Failed to fetch exercises. Please try again later.");
  }
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
