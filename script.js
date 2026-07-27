const { API_URL, FALLBACK_PROJECTS } = BuildAbo;

BuildAbo.renderHeader("site-header");
BuildAbo.renderFooter("site-footer");
BuildAbo.bindLeadForm("leadForm", "formSuccess", "submitBtn");

const FALLBACK_TESTIMONIALS = [
  {
    _id: "1",
    review:
      "BuildAbo turned our unfinished shell into a home that feels calm, warm, and completely ours.",
    name: "Ananya R.",
    role: "Homeowner",
  },
  {
    _id: "2",
    review:
      "Timelines were clear, finishes were immaculate, and the team never lost the design vision.",
    name: "Rohan M.",
    role: "Villa client",
  },
  {
    _id: "3",
    review:
      "Our office fit-out was delivered on schedule with a level of craft we didn't expect at this budget.",
    name: "Priya S.",
    role: "Founder",
  },
];

function renderProjects(projects) {
  const track = document.getElementById("projectsTrack");
  if (!track) return;
  track.innerHTML = projects
    .map(
      (p) => `
    <a class="project-card" href="project.html?id=${encodeURIComponent(p._id)}">
      <img src="${p.image}" alt="${p.title}" loading="lazy" />
      <div class="project-card-overlay"></div>
      <div class="project-card-meta">
        <p class="cat">${p.category || ""}</p>
        <h3>${p.title}</h3>
        <p>${p.location || ""}</p>
      </div>
    </a>`
    )
    .join("");
}

async function loadProjects() {
  try {
    const res = await fetch(`${API_URL}/projects`);
    const data = await res.json();
    if (data.success && data.projects?.length) {
      renderProjects(data.projects);
      return;
    }
  } catch (_) {}
  renderProjects(FALLBACK_PROJECTS);
}

const projectsTrack = document.getElementById("projectsTrack");
document.getElementById("projectsPrev")?.addEventListener("click", () => {
  projectsTrack.scrollBy({ left: -projectsTrack.clientWidth * 0.6, behavior: "smooth" });
});
document.getElementById("projectsNext")?.addEventListener("click", () => {
  projectsTrack.scrollBy({ left: projectsTrack.clientWidth * 0.6, behavior: "smooth" });
});

function renderTestimonials(items) {
  const track = document.getElementById("testimonialsTrack");
  if (!track) return;
  track.innerHTML = items
    .map(
      (item) => `
    <figure class="testimonial">
      <blockquote>"${item.review}"</blockquote>
      <figcaption>${item.name} · <span>${item.role || ""}</span></figcaption>
    </figure>`
    )
    .join("");
}

async function loadTestimonials() {
  try {
    const res = await fetch(`${API_URL}/testimonials`);
    const data = await res.json();
    if (data.success && data.testimonials?.length) {
      renderTestimonials(data.testimonials);
      return;
    }
  } catch (_) {}
  renderTestimonials(FALLBACK_TESTIMONIALS);
}

const popup = document.getElementById("signupPopup");
function closePopup() {
  localStorage.setItem("buildabo_popup", "closed");
  popup?.classList.add("hidden");
}
document.getElementById("popupClose")?.addEventListener("click", closePopup);
document.getElementById("popupLater")?.addEventListener("click", closePopup);
if (popup && !localStorage.getItem("buildabo_popup")) {
  setTimeout(() => popup.classList.remove("hidden"), 5000);
}
document.getElementById("popupForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = Object.fromEntries(new FormData(e.target).entries());
  try {
    const res = await fetch(`${API_URL}/enquiry`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, source: "popup" }),
    });
    const data = await res.json();
    if (data.success) {
      closePopup();
      alert("Thank you! We'll contact you soon.");
    } else {
      alert(data.message || "Something went wrong.");
    }
  } catch (_) {
    alert("Unable to connect to the server.");
  }
});

loadProjects();
loadTestimonials();
