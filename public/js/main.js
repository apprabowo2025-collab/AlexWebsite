const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-tabs a");


window.addEventListener("scroll", () => {
  let currentSection = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;

    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
});


const revealElements = document.querySelectorAll(".reveal");

console.log("Reveal elements found:", revealElements.length);

revealElements.forEach((element, index) => {
  console.log("Reveal element", index, element);
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      console.log("Observed:", entry.target.id, entry.isIntersecting);

      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.1
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});