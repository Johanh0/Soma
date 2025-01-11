import { navbarToggle, themeToggle, storageTheme } from "/js/navbar.js";
import footerYear from "/js/footer.js";

document.addEventListener("DOMContentLoaded", () => {
  try {
    storageTheme();
    themeToggle();
    navbarToggle();
    footerYear();
  } catch (error) {
    console.error("An error occurred during initialization:", error);
  }
});

document.getElementById("bmiForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const heightInput = document.getElementById("height");
  const weightInput = document.getElementById("weight");
  const bmiValue = document.getElementById("bmiValue");
  const bmiSuggestion = document.getElementById("bmiSuggestion");
  const heightUnit = document.getElementById("heightUnit").textContent;
  const weightUnit = document.getElementById("weightUnit").textContent;

  // Validate inputs
  if (!heightInput.value.trim() || !weightInput.value.trim()) {
    bmiValue.textContent = "Error";
    bmiSuggestion.textContent = "Height and weight fields cannot be empty.";
    return;
  }

  let height = parseFloat(heightInput.value);
  let weight = parseFloat(weightInput.value);

  if (isNaN(height) || height <= 0) {
    bmiValue.textContent = "Error";
    bmiSuggestion.textContent =
      "Please enter a valid positive number for height.";
    return;
  }

  if (isNaN(weight) || weight <= 0) {
    bmiValue.textContent = "Error";
    bmiSuggestion.textContent =
      "Please enter a valid positive number for weight.";
    return;
  }

  try {
    // Convert height from feet/inches to cm if needed
    if (heightUnit === "ft/in") {
      const feet = Math.floor(height); // Get feet from the input
      const inches = (height - feet) * 12; // Convert decimal part to inches
      if (inches < 0 || inches >= 12) {
        throw new Error("Inches should be between 0 and 12.");
      }
      height = feet * 30.48 + inches * 2.54; // Convert to cm
    }

    // Convert weight from lbs to kg if needed
    if (weightUnit === "lbs") {
      weight = weight * 0.453592; // Convert lbs to kg
    }

    const heightInMeters = height / 100; // Convert height to meters
    const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);

    bmiValue.textContent = bmi;

    // Display BMI suggestion based on value
    if (bmi < 18.5) {
      bmiSuggestion.textContent =
        "You are underweight. Consider consulting with a healthcare provider.";
    } else if (bmi < 24.9) {
      bmiSuggestion.textContent = "Your BMI suggests you’re a healthy weight.";
    } else {
      bmiSuggestion.textContent =
        "You are overweight. Consider consulting with a healthcare provider.";
    }
  } catch (error) {
    bmiValue.textContent = "Error";
    bmiSuggestion.textContent = error.message;
  }
});

// Toggle height unit button
document
  .getElementById("toggleHeightUnit")
  .addEventListener("click", function () {
    const heightUnit = document.getElementById("heightUnit");
    const heightInput = document.getElementById("height");

    if (heightUnit.textContent === "cm") {
      heightUnit.textContent = "ft/in";
      heightInput.placeholder = "Enter height in feet (e.g., 5.8)";
    } else {
      heightUnit.textContent = "cm";
      heightInput.placeholder = "Enter height in cm";
    }
  });

// Toggle weight unit button
document
  .getElementById("toggleWeightUnit")
  .addEventListener("click", function () {
    const weightUnit = document.getElementById("weightUnit");
    const weightInput = document.getElementById("weight");

    if (weightUnit.textContent === "kg") {
      weightUnit.textContent = "lbs";
      weightInput.placeholder = "Enter weight in pounds";
    } else {
      weightUnit.textContent = "kg";
      weightInput.placeholder = "Enter weight in kg";
    }
  });
