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

const scriptURL =
  "https://script.google.com/macros/s/AKfycbzfRRDm2iW-0XhqUzWOCALdH2lCTx6Oy4BzRQZnvd4G5sHqQur48iGMdgmsK_4m4eWo9g/exec";
const form = document.forms["submit-to-google-sheet"];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      form.reset();
      console.log("Success!", response);
    })
    .catch((error) => console.error("Error!", error.message));
});
