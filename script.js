// Responsive navigation
const burger = document.querySelector(".burger");
const primaryNav = document.querySelector("#primary-nav");

if (burger && primaryNav) {
  const closeNav = () => {
    primaryNav.classList.remove("nav-active");
    burger.classList.remove("toggle-burger");
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Open menu");
  };

  burger.addEventListener("click", () => {
    const isOpen = primaryNav.classList.toggle("nav-active");
    burger.classList.toggle("toggle-burger", isOpen);
    burger.setAttribute("aria-expanded", String(isOpen));
    burger.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });

  primaryNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNav);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && primaryNav.classList.contains("nav-active")) {
      closeNav();
      burger.focus();
    }
  });
}

// Rotating hero text
if (typeof Typed !== "undefined") {
  new Typed(".input", {
    strings: ["Web Developer", "Creative Strategist", "Live Stream Operator"],
    typeSpeed: 50,
    backSpeed: 40,
    backDelay: 1500,
    loop: true,
  });
}

// Image placeholder: hide photos that fail to load
const mediaFrames = document.querySelectorAll(".media-frame");

const showPlaceholder = (frame) => {
  const image = frame.querySelector("img");
  if (image) {
    image.hidden = true;
  }
  frame.disabled = true;
  frame.removeAttribute("data-lightbox");
};

mediaFrames.forEach((frame) => {
  const image = frame.querySelector("img");
  if (!image) return;

  image.addEventListener("error", () => showPlaceholder(frame));

  if (image.complete && image.naturalWidth === 0 && image.currentSrc) {
    showPlaceholder(frame);
  }
});

// Dependency-free lightbox
const lightbox = document.querySelector("#lightbox");
const lightboxImage = lightbox ? lightbox.querySelector(".lightbox-image") : null;
const lightboxClose = lightbox ? lightbox.querySelector(".lightbox-close") : null;
let lightboxOpener = null;

const openLightbox = (image, opener) => {
  lightboxImage.src = image.currentSrc || image.src;
  lightboxImage.alt = image.alt;
  lightbox.hidden = false;
  document.body.classList.add("lightbox-open");
  lightboxOpener = opener;
  lightboxClose.focus();
};

const closeLightbox = () => {
  if (!lightbox || lightbox.hidden) return;

  lightbox.hidden = true;
  lightboxImage.removeAttribute("src");
  lightboxImage.alt = "";
  document.body.classList.remove("lightbox-open");

  if (lightboxOpener) {
    lightboxOpener.focus();
  }
  lightboxOpener = null;
};

if (lightbox && lightboxImage && lightboxClose) {
  mediaFrames.forEach((frame) => {
    frame.addEventListener("click", () => {
      if (frame.disabled || !frame.hasAttribute("data-lightbox")) return;

      const image = frame.querySelector("img");
      if (!image || image.hidden) return;

      openLightbox(image, frame);
    });
  });

  lightboxClose.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeLightbox();
    }
  });
}

// Contact form
const scriptURL =
  "https://script.google.com/macros/s/AKfycbzfRRDm2iW-0XhqUzWOCALdH2lCTx6Oy4BzRQZnvd4G5sHqQur48iGMdgmsK_4m4eWo9g/exec";
const form = document.forms["submit-to-google-sheet"];

if (form) {
  const status = form.querySelector(".form-status");
  const submitButton = form.querySelector('button[type="submit"]');

  const setStatus = (message, state) => {
    status.textContent = message;
    if (state) {
      status.dataset.state = state;
    } else {
      delete status.dataset.state;
    }
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    setStatus("Sending...", "loading");
    submitButton.disabled = true;

    fetch(scriptURL, { method: "POST", body: new FormData(form) })
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP " + response.status);
        }
        form.reset();
        setStatus("Message sent. Thank you!", "success");
        console.log("Success!", response);
      })
      .catch((error) => {
        setStatus(
          "Failed to send the message. Please try again or email me directly at jaksasetiaalam14@gmail.com.",
          "error"
        );
        console.error("Error!", error.message);
      })
      .finally(() => {
        submitButton.disabled = false;
      });
  });
}
