export default function navbarToggle() {
  // Get the menu icon
  const menuIcon = document.querySelector(".navbar__menu");
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
