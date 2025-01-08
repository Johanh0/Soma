export function navbarToggle() {
  // Get the menu icon
  const menuIcon = document.querySelector(".navbar--icon");
  const menu = document.querySelector(".menu");

  //   Add the event to toggle the menu
  menuIcon.addEventListener("click", () => {
    // Add the toggle method
    menuIcon.classList.toggle("menu--open");
    // Check if the menu is open
    const isOpen = menuIcon.classList.contains("menu--open");
    const srcPath = "/assets/svg/";
    // Switch the icon and open or close the menu depending on the condition
    switch (isOpen) {
      case true:
        menuIcon.src = `${srcPath}/x.svg`;
        menu.style.display = "block";
        break;
      case false:
        menuIcon.src = `${srcPath}/menu.svg`;
        menu.style.display = "none";
        break;
    }
  });
}

export function themeToggle() {
  const themeIcon = document.querySelector(".theme--icon");
  const bodyElement = document.querySelector("body");

  themeIcon.addEventListener("click", () => {
    // Add the toggle method
    bodyElement.classList.toggle("dark--theme");
    // Check if the menu is open
    const isDarkTheme = bodyElement.classList.contains("dark--theme");
    const srcPath = "/assets/svg/";
    // Switch the icon and open or close the menu depending on the condition
    switch (isDarkTheme) {
      case true:
        themeIcon.src = `${srcPath}/sun.svg`;
        break;
      case false:
        themeIcon.src = `${srcPath}/moon.svg`;
        break;
    }
  });
}
