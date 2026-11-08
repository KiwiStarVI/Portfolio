const defaults = {
  name: "WORARIT",
  surname: "SUNAWONG",
  shortName: "GEW SUNAWONG",
  status: "ICT STUDENT · YEAR 2 · BANGKOK",
  intro: "ผมชอบเปลี่ยนไอเดียให้เป็นสิ่งที่ใช้งานได้จริง ทำงานตามเป้าหมายอย่างตั้งใจ และค่อย ๆ เรียนรู้เพื่อเติบโตไปเป็น Full-stack Developer และนักธุรกิจ",
  aboutHeading: 'รู้จักผม<br>ให้มากขึ้น<span class="accent">.</span>',
  about: "Worarit Sunawong เป็นนักศึกษาชั้นปีที่ 2 สาขาเทคโนโลยีสารสนเทศและการสื่อสาร มหาวิทยาลัยศรีปทุม กรุงเทพฯ ให้ความสำคัญกับการพยายามทำสิ่งต่าง ๆ ให้สำเร็จตามเป้าหมาย พร้อมเปิดรับการเรียนรู้และพัฒนาตัวเองอยู่เสมอ",
  email: "kiwifruitsguji@gmail.com",
  jobTitle: "SHARP",
  jobDescription: "ประสบการณ์ทำงาน — รายละเอียดเพิ่มเติมจะเพิ่มในภายหลัง",
  skills: [],
  projects: [],
  socials: []
};

const safeUrl = (url) => {
  try {
    const parsed = new URL(url);
    return ["https:", "http:"].includes(parsed.protocol) ? parsed.href : "#";
  } catch {
    return "#";
  }
};

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[character]));
}

function addRevealAnimations() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const elements = document.querySelectorAll(".section-head, .about-grid, .skill-row, .experience-row, .project-card, .contact-main, .socials");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  elements.forEach((element, index) => {
    if (!element.classList.contains("reveal")) {
      element.classList.add("reveal");
      element.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 70}ms`);
    }
    observer.observe(element);
  });
}

function render(data) {
  document.querySelectorAll("[data-text]").forEach((element) => {
    const value = data[element.dataset.text];
    if (value == null) return;
    if (element.dataset.text === "aboutHeading") element.innerHTML = value;
    else element.textContent = value;
  });
  document.querySelectorAll("[data-name]").forEach((element) => {
    element.textContent = data[ element.dataset.name ] || defaults.shortName;
  });

  const email = document.querySelector('[data-href="emailHref"]');
  email.href = `mailto:${data.email || defaults.email}`;

  document.getElementById("skillList").innerHTML = (data.skills || []).map((skill, index) => `
    <article class="skill-row">
      <span class="skill-num">${String(index + 1).padStart(2, "0")}</span>
      <div><h3>${escapeHtml(skill.name)}</h3><p>${escapeHtml(skill.description)}</p></div>
      <div class="skill-tags">${(skill.tags || []).map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
    </article>`).join("");

  document.getElementById("projectList").innerHTML = (data.projects || []).map((project, index) => `
    <article class="project-card">
      <div class="project-card-top"><span class="project-index">0${index + 1}</span><span class="project-type">${escapeHtml(project.type)}</span></div>
      <div class="project-art ${index % 2 ? "project-art-alt" : ""}" aria-hidden="true"><span>${index % 2 ? "♫" : "< >"}</span><i></i><i></i><i></i></div>
      <div class="project-card-body"><h3>${escapeHtml(project.name)}</h3><p>${escapeHtml(project.description)}</p><div class="skill-tags">${(project.tags || []).map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div></div>
    </article>`).join("");

  document.getElementById("socials").innerHTML = (data.socials || []).map((social) =>
    `<a href="${safeUrl(social.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(social.label)} ↗</a>`
  ).join("");

  addRevealAnimations();
}

render(defaults);
fetch("data/portfolio.json")
  .then((response) => {
    if (!response.ok) throw new Error("Portfolio data unavailable");
    return response.json();
  })
  .then(render)
  .catch(() => {});

if (localStorage.getItem("gew-theme") === "light") document.body.classList.add("light");
document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("light");
  localStorage.setItem("gew-theme", document.body.classList.contains("light") ? "light" : "dark");
});
document.getElementById("year").textContent = new Date().getFullYear();
