import { navbarToggle, themeToggle, storageTheme } from "/js/navbar.js";
import footerYear from "/js/footer.js";

// Ensure the user is authenticated
const token = localStorage.getItem("token");
console.log("Token from localStorage:", token);

// if (!token) {
//   alert("You must log in to access this page.");
//   window.location.href = "/login";
//   return;
// }

// Fetch the exercise page to ensure the user is authenticated
fetch("/exercise", {
  method: "GET",
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
  .then((response) => {
    console.log("Authorization Header Sent:", `Bearer ${token}`);
    console.log("Response status:", response.status);

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        alert("Your session has expired. Please log in again.");
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
      throw new Error("Unauthorized access");
    }
    return response.text();
  })
  .then((html) => {
    console.log("Page content fetched successfully");
    document.body.innerHTML = html;
  })
  .catch((error) => {
    console.error("Error fetching page:", error);
  });

const searchForm = document.querySelector(".search");
const exerciseOptions = document.querySelector("#exercise--options");
const targetOptions = document.querySelector("#target--options");
const loader = document.querySelector(".loader");
const resultContainer = document.querySelector(".result");
const modalView = document.querySelector(".modal");

// Fetch all exercises from API or localStorage
async function fetchAllExercises() {
  try {
    const isStorage = localStorage.getItem("exercises");

    if (isStorage != null) {
      console.log("Loaded exercises from localStorage");
      return JSON.parse(isStorage);
    }

    console.log("Fetching exercises from API");
    const response = await fetch(`/api/v1/exercise/workouts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        alert("Your session has expired. Please log in again.");
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
      throw new Error("Failed to fetch exercises");
    }

    const data = await response.json();
    console.log("Fetched exercises from API:", data);

    localStorage.setItem("exercises", JSON.stringify(data));
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
          <ol></ol>
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

modalView.addEventListener("click", (event) => {
  if (event.target === modalView) {
    closeModal();
  }
});

// Handle search form submission
searchForm.addEventListener("submit", async (event) => {
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
      <h4>We Couldn't Found Any Data With This Options.</h4>
    `;
    return;
  }

  loader.style.display = "none";
  filterExercise.forEach((data) => {
    resultContainer.innerHTML += `
      <article class="result--card" data-id="${data.id}">
        <div class="card--img">
            <img src="${data.gifUrl}" alt="${data.name} exercise image" loading="lazy" >
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

// Load exercises on page load
if (!allExercises || !allExercises.data) {
  alert("No exercises available.");
} else {
  allExercises.data.slice(0, 20).forEach((data) => {
    resultContainer.innerHTML += `
      <article class="result--card" data-id="${data.id}">
        <div class="card--img">
            <img src="${data.gifUrl}" alt="${data.name} exercise image" loading="lazy" >
        </div>
        <div class="card--info">
          <h3>${data.name}</h3>
          <h5>${data.target}</h5>
        </div>
      </article>
    `;
  });

  handleModal();
}

// Trigger functions after the DOM were load
document.addEventListener("DOMContentLoaded", () => {
  storageTheme();
  themeToggle();
  navbarToggle();
  footerYear();
});
