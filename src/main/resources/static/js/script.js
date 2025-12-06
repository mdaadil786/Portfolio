document.addEventListener("DOMContentLoaded", () => {
  // footer year
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // typing effect in hero
  const typingEl = document.getElementById("typing-text");
  const roles = [
    "Software Developer",
    "Java & Spring Boot Developer",
    "Full-Stack Web Developer"
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeLoop() {
    if (!typingEl) return;

    const current = roles[roleIndex];
    if (!deleting) {
      charIndex++;
      if (charIndex > current.length + 4) {
        deleting = true;
      }
    } else {
      charIndex--;
      if (charIndex <= 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }
    typingEl.textContent = current.substring(0, Math.max(0, charIndex));
    const delay = deleting ? 60 : 110;
    setTimeout(typeLoop, delay);
  }

  typeLoop();

  // smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const id = anchor.getAttribute("href").substring(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // scroll reveal
    // scroll reveal + skill bar animation
    const revealEls = document.querySelectorAll(".reveal");
    const skillSection = document.getElementById("skills");
    let skillsAnimated = false;

    const animateSkillBars = () => {
      if (skillsAnimated) return;
      const fills = document.querySelectorAll(".skill-bar-fill");
      fills.forEach((fill) => {
        const value = fill.dataset.skillValue || "0";
        // force layout so transition always plays
        fill.getBoundingClientRect();
        fill.style.width = value + "%";
      });
      skillsAnimated = true;
    };

    const onScroll = () => {
      const triggerBottom = window.innerHeight * 0.9;

      // reveal sections
      revealEls.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < triggerBottom) {
          el.classList.add("visible");
        }
      });

      // start skill bar animation when skills section enters view
      if (!skillsAnimated && skillSection) {
        const rect = skillSection.getBoundingClientRect();
        if (rect.top < triggerBottom) {
          animateSkillBars();
        }
      }
    };

    window.addEventListener("scroll", onScroll);
    onScroll();
  });

