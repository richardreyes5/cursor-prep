/**
 * Shared navigation for ADM prep sites (study guide, technical screen, product guide).
 * Call window.initPrepSiteNav() after async content adds [data-section] elements (e.g. product guide).
 */
(function () {
  let sectionObserver = null;

  function bindMobileNavOnce() {
    if (window._prepNavMobileBound) return;
    window._prepNavMobileBound = true;

    const sidebar = document.querySelector(".sidebar");
    const toggle = document.querySelector(".menu-toggle");
    const overlay = document.querySelector(".overlay");
    const backBtn = document.querySelector(".back-to-top");

    toggle?.addEventListener("click", () => {
      sidebar?.classList.toggle("open");
      overlay?.classList.toggle("open");
    });

    overlay?.addEventListener("click", () => {
      sidebar?.classList.remove("open");
      overlay?.classList.remove("open");
    });

    sidebar?.addEventListener("click", (e) => {
      if (e.target.closest(".nav-link")) {
        sidebar.classList.remove("open");
        overlay?.classList.remove("open");
      }
    });

    window.addEventListener("scroll", () => {
      if (window.scrollY > 600) {
        backBtn?.classList.add("visible");
      } else {
        backBtn?.classList.remove("visible");
      }
    });

    backBtn?.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  function observeSections() {
    sectionObserver?.disconnect();

    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("[data-section]");
    if (sections.length === 0) return;

    sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-section");
            navLinks.forEach((l) => l.classList.remove("active"));
            const match = Array.from(navLinks).find(
              (l) => l.getAttribute("href") === "#" + id
            );
            if (match) match.classList.add("active");
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    sections.forEach((s) => sectionObserver.observe(s));
  }

  window.initPrepSiteNav = function () {
    bindMobileNavOnce();
    observeSections();
  };

  document.addEventListener("DOMContentLoaded", () => {
    window.initPrepSiteNav();
  });
})();
