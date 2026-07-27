/* Shared site chrome + helpers for plain-html pages */
(function () {
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();

  function isActive(href) {
    const file = href.split("/").pop().toLowerCase();
    if (file === "index.html" && (path === "" || path === "index.html")) return true;
    if (file === "projects.html" && path === "project.html") return true;
    return path === file;
  }

  function navLink(href, label) {
    const active = isActive(href) ? ' style="color: var(--accent)"' : "";
    return `<a href="${href}"${active}>${label}</a>`;
  }

  window.BuildAbo = {
    API_URL: "https://buildabo.onrender.com/api",
    FALLBACK_PROJECTS: [
      {
        _id: "1",
        title: "Lakeview Villa",
        category: "Residential",
        location: "Bengaluru",
        sqft: "4,200",
        year: "2024",
        image: "assets/project-villa.jpg",
        description:
          "A lakeside villa designed for light, air, and everyday living — warm materials, calm proportions, and a seamless indoor-outdoor flow.",
      },
      {
        _id: "2",
        title: "Warm Kitchen",
        category: "Interiors",
        location: "Whitefield",
        sqft: "280",
        year: "2023",
        image: "assets/project-kitchen.jpg",
        description:
          "A bespoke kitchen with custom joinery, soft lighting, and durable finishes built for daily cooking and entertaining.",
      },
      {
        _id: "3",
        title: "Spa Bathroom",
        category: "Renovations",
        location: "Indiranagar",
        sqft: "160",
        year: "2024",
        image: "assets/project-bath.jpg",
        description:
          "A spa-like bathroom renovation with stone, timber, and carefully layered lighting for a quiet, restorative feel.",
      },
      {
        _id: "4",
        title: "Boutique Office",
        category: "Commercial",
        location: "Koramangala",
        sqft: "3,800",
        year: "2023",
        image: "assets/project-office.jpg",
        description:
          "A boutique office fit-out balancing brand presence with comfort — focused work zones, meeting rooms, and natural materials.",
      },
    ],
    renderHeader(mountId) {
      const el = document.getElementById(mountId);
      if (!el) return;
      el.innerHTML = `
      <header class="site-header">
        <div class="container header-inner">
          <a href="index.html" class="brand">
            <img src="assets/logo-light.png" alt="BuildAbo Construction & Interiors" />
            <span>BuildAbo</span>
          </a>
          <nav class="nav-desktop" aria-label="Primary">
            ${navLink("index.html", "Home")}
            ${navLink("services.html", "Services")}
            ${navLink("projects.html", "Projects")}
            ${navLink("about.html", "About")}
            ${navLink("contact.html", "Contact")}
            <a href="contact.html" class="btn-primary">Get a Quote</a>
          </nav>
          <button class="menu-toggle" id="menuToggle" aria-label="Menu" aria-expanded="false">
            <svg id="menuIcon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="4" x2="20" y1="12" y2="12"></line>
              <line x1="4" x2="20" y1="6" y2="6"></line>
              <line x1="4" x2="20" y1="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="mobile-nav" id="mobileNav">
          <div class="mobile-nav-inner">
            <a href="index.html">Home</a>
            <a href="services.html">Services</a>
            <a href="projects.html">Projects</a>
            <a href="about.html">About</a>
            <a href="contact.html">Contact</a>
            <a href="contact.html" class="btn-primary">Get a Quote</a>
          </div>
        </div>
      </header>`;
      this.bindMenu();
    },
    renderFooter(mountId) {
      const el = document.getElementById(mountId);
      if (!el) return;
      el.innerHTML = `
      <footer class="site-footer">
        <div class="container footer-grid">
          <div class="footer-brand">
            <img src="assets/logo-dark.png" alt="BuildAbo Construction and Interiors" />
            <p class="tagline">Crafting homes and spaces that stand the test of time.</p>
            <p class="desc">
              BuildAbo Construction & Interiors — turnkey residential and
              commercial builds, from foundation to final finish.
            </p>
          </div>
          <div class="footer-col">
            <h3 class="eyebrow">Explore</h3>
            <ul>
              <li><a href="services.html">Services</a></li>
              <li><a href="projects.html">Projects</a></li>
              <li><a href="about.html">About</a></li>
              <li><a href="contact.html">Contact</a></li>
            </ul>
          </div>
          <div class="footer-col footer-contact">
            <h3 class="eyebrow">Contact</h3>
            <ul>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <span>+91 98765 43210</span>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.99 5.34a2 2 0 0 1-2.02 0L2 7"/></svg>
                <span>hello@buildabo.com</span>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>
                <span>3rd Floor, 44 Main Rd,<br />Kallumantapa, Horamavu,<br />Bengaluru, Karnataka 560113</span>
              </li>
            </ul>
            <div class="socials">
              <a href="#" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/></svg>
              </a>
              <a href="#" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z"/></svg>
              </a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          © <span id="year"></span> BuildAbo Construction & Interiors. All rights reserved.
        </div>
      </footer>`;
      const year = document.getElementById("year");
      if (year) year.textContent = new Date().getFullYear();
    },
    bindMenu() {
      const menuToggle = document.getElementById("menuToggle");
      const mobileNav = document.getElementById("mobileNav");
      const menuIcon = document.getElementById("menuIcon");
      if (!menuToggle || !mobileNav) return;
      menuToggle.addEventListener("click", () => {
        const open = mobileNav.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", String(open));
        menuIcon.innerHTML = open
          ? '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>'
          : '<line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line>';
      });
      mobileNav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
          mobileNav.classList.remove("open");
          menuToggle.setAttribute("aria-expanded", "false");
        });
      });
    },
    bindLeadForm(formId, successId, submitId) {
      const leadForm = document.getElementById(formId);
      const formSuccess = document.getElementById(successId);
      const submitBtn = document.getElementById(submitId);
      if (!leadForm) return;
      leadForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending…";
        const formData = Object.fromEntries(new FormData(leadForm).entries());
        try {
          const res = await fetch(`${this.API_URL}/enquiry`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          });
          const data = await res.json();
          if (data.success) {
            leadForm.classList.add("hidden");
            formSuccess.classList.remove("hidden");
          } else {
            alert(data.message || "Something went wrong");
            submitBtn.disabled = false;
            submitBtn.textContent = "Request Consultation";
          }
        } catch (_) {
          alert("Something went wrong");
          submitBtn.disabled = false;
          submitBtn.textContent = "Request Consultation";
        }
      });
    },
  };
})();
