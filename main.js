// ===== Animación de burbujas =====
const canvas = document.getElementById('bubbles');
const ctx = canvas.getContext('2d');

let bubbles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Bubble {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + Math.random() * 100;
    this.size = 2 + Math.random() * 6;
    this.speed = 0.5 + Math.random() * 1.5;
    this.opacity = 0.1 + Math.random() * 0.4;
    this.color = ['#ffffff33', '#7f5af055', '#3f8efc55'][Math.floor(Math.random() * 3)];
  }

  update() {
    this.y -= this.speed;
    if (this.y < -this.size) this.reset();
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

for (let i = 0; i < 60; i++) {
  bubbles.push(new Bubble());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let b of bubbles) {
    b.update();
    b.draw();
  }
  requestAnimationFrame(animate);
}

animate();

// ===== Proyectos Destacados desde GitHub =====
const GITHUB_USERNAME = "Ziscofania";

// Lista de proyectos destacados
const PROYECTOS_DESTACADOS = [
  "Guia-de-programacion-",
  "E-comerce",
  "EcoTrack",
  "sing-languaje-app",
  "Sistema-de-comunicacion-con-lenguaje-de-se-as-",
  "TO-DO-list"
];

async function cargarRepos() {
  try {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos`);
    const repos = await response.json();

    const container = document.getElementById("repos-container");
    container.innerHTML = "";

    repos
      .filter(repo => PROYECTOS_DESTACADOS.includes(repo.name))
      .forEach(repo => {
        const card = document.createElement("div");
        card.className = "repo-card";
        card.innerHTML = `
          <h3>${repo.name}</h3>
          <p>${repo.description || "Sin descripción."}</p>
          <div class="repo-links">
            <a href="${repo.html_url}" target="_blank">Ver en GitHub</a>
            ${repo.homepage ? `<a href="${repo.homepage}" target="_blank">Demo</a>` : ""}
          </div>
        `;
        container.appendChild(card);
      });
  } catch (error) {
    console.error("Error al cargar los repositorios:", error);
  }
}

document.addEventListener("DOMContentLoaded", cargarRepos);

