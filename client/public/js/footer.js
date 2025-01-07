export default function footerYear() {
  const spanElement = document.querySelector("#year");
  const year = new Date().getFullYear();
  spanElement.textContent = year;
}
