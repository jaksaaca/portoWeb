// Toggle & Responsive Navigation
const navSlide = () => {
  const burger = document.querySelector(".burger");
  const navLists = document.querySelector("nav");

  burger.addEventListener("click", () => {
    // Toggle nav list and burger class
    navLists.classList.toggle("nav-active");
    burger.classList.toggle("toggle-burger");
  });
};

navSlide();

var typed = new Typed(".input", {
  strings: ["Mobile Apps Developer", "Front-End Developer"],
  typedSpeed: 10,
  backSpeed: 50,
  loop: true,
});
