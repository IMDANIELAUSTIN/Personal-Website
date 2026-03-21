// ── Router ──────────────────────────────────────────────
function getRoute() {
  const path = location.hash.replace('#', '') || '/';
  return path;
}

function navigate(path) {
  location.hash = path;
}

window.addEventListener('hashchange', render);
window.addEventListener('load', render);

// ── Header ──────────────────────────────────────────────
function renderHeader() {
  const path = getRoute();
  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Work', path: '/work' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  return `
    <header>
      <a href="#/" class="logo">
        <img src="assets/logo.svg" alt="Daniel Lee Austin" />
      </a>
      <nav class="desktop">
        ${navItems.map(item => `
          <a href="#${item.path}" class="${path === item.path ? 'active' : ''}">${item.label}</a>
        `).join('')}
      </nav>
      <button class="hamburger" onclick="toggleMenu()" aria-label="Toggle menu" id="hamburger-btn">
        <svg id="icon-menu" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        <svg id="icon-close" class="hidden" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </header>
    <nav class="mobile" id="mobile-nav">
      ${navItems.map(item => `
        <a href="#${item.path}" class="${path === item.path ? 'active' : ''}" onclick="closeMenu()">${item.label}</a>
      `).join('')}
    </nav>
  `;
}

function toggleMenu() {
  const nav = document.getElementById('mobile-nav');
  const iconMenu = document.getElementById('icon-menu');
  const iconClose = document.getElementById('icon-close');
  nav.classList.toggle('open');
  iconMenu.classList.toggle('hidden');
  iconClose.classList.toggle('hidden');
}

function closeMenu() {
  const nav = document.getElementById('mobile-nav');
  const iconMenu = document.getElementById('icon-menu');
  const iconClose = document.getElementById('icon-close');
  nav.classList.remove('open');
  iconMenu.classList.remove('hidden');
  iconClose.classList.add('hidden');
}

// ── Footer ──────────────────────────────────────────────
function renderFooter() {
  return `
    <footer>
      <div class="footer-grid">
        <nav>
          <a href="#/">Home</a>
          <a href="#/work">Work</a>
          <a href="#/about">About</a>
          <a href="#/contact">Contact</a>
        </nav>
        <div>
          <span class="bold">Daniel Lee Austin</span>
          <span>Independent Designer</span>
          <span>Los Angeles, CA</span>
          <span>626.838.2231</span>
        </div>
        <div>
          <span class="bold">Work Inquiries</span>
          <a href="mailto:daustin@inside.artcenter.edu">daustin@inside.artcenter.edu</a>
          <span style="margin-top:.75rem" class="bold">Press Inquiries</span>
          <span>Daniel Lee Austin</span>
          <span>626.838.2231</span>
          <a href="mailto:daustin@inside.artcenter.edu">daustin@inside.artcenter.edu</a>
        </div>
        <nav>
          <a href="https://www.linkedin.com/in/IMDANIELAUSTIN">LinkedIn</a>
          <a href="https://www.X.com/bydanielaustin">Twitter</a>
          <a href="https://www.threads.com/IMDANIELAUSTIN">Threads</a>
          <a href="https://www.instagram.com/ASTNDSGN">Instagram</a>
          <a href="https://imdanielaustin.gumroad.com">Store</a>
          <a href="https://www.imdanielaustin.com">Personal Blog</a> 
        </nav>
        <div>
          <span>Copyright © 2016-2026 DANIEL LEE AUSTIN. All rights reserved.</span>
        </div>
      </div>
    </footer>
  `;
}

// ── Project Grid ─────────────────────────────────────────
let sortMode = 'popular';
let showAll = false;
const INITIAL_COUNT = 6;

function getSorted() {
  let list = [...projects];
  if (sortMode === 'az') list.sort((a, b) => a.name.localeCompare(b.name));
  if (sortMode === 'newest') list.sort((a, b) => b.year - a.year);
  if (sortMode === 'brand') list = list.filter(p => p.type.toLowerCase().includes('brand'));
  if (sortMode === 'print') list = list.filter(p => p.type.toLowerCase().includes('print'));
  if (sortMode === 'visual') list = list.filter(p => p.type.toLowerCase().includes('visual'));
  return list;
}

function renderProjectGrid() {
  const sorted = getSorted();
  const visible = showAll ? sorted : sorted.slice(0, INITIAL_COUNT);

  return `
    <div class="filters">
      <span class="label"></span>
      <div class="filter-btns">
        <button class="filter-btn ${sortMode === 'popular' ? 'active' : ''}" onclick="setSort('popular')">All</button>
        <button class="filter-btn ${sortMode === 'newest' ? 'active' : ''}" onclick="setSort('newest')">Newest</button>
        <button class="filter-btn ${sortMode === 'brand' ? 'active' : ''}" onclick="setSort('brand')">Brand Design</button>
        <button class="filter-btn ${sortMode === 'print' ? 'active' : ''}" onclick="setSort('print')">Print Design</button>
        <button class="filter-btn ${sortMode === 'visual' ? 'active' : ''}" onclick="setSort('visual')">Visual Design</button>
      </div>
    </div>
    <div class="grid-section">
      <div class="project-grid" id="project-grid">
        ${visible.map(p => `
          <a href="#/project/${p.slug}" class="project-card">
            <div class="thumb">
              <img src="${p.image}" alt="${p.name}" loading="lazy" />
            </div>
            <div class="info">
              <strong>${p.name}</strong>
              <span> - ${p.type}</span>
            </div>
          </a>
        `).join('')}
      </div>
    </div>
    ${!showAll && projects.length > INITIAL_COUNT ? `
      <div class="load-more">
        <button onclick="loadMore()">View More Projects</button>
      </div>
    ` : ''}
  `;
}

function setSort(mode) {
  sortMode = mode;
  document.getElementById('project-grid-wrapper').innerHTML = renderProjectGrid();
}

function loadMore() {
  showAll = true;
  document.getElementById('project-grid-wrapper').innerHTML = renderProjectGrid();
}

// ── Pages ────────────────────────────────────────────────
function pageIndex() {
  sortMode = 'popular';
  showAll = false;
  return `
    ${renderHeader()}
    <section class="hero">
      <h1>Independent graphic designer crafting brand identities and visual systems for enterprises worldwide.</h1>
      <a href="./Daniel Austin MASTER RÉSUMÉ.pdf" class="cta" download="Daniel Austin Graphic Design Resume">Download My Resume →</a>
    </section>
    <div id="project-grid-wrapper">${renderProjectGrid()}</div>
    ${renderFooter()}
  `;
}

function pageWork() {
  sortMode = 'popular';
  showAll = false;
  return `
    ${renderHeader()}
    <section class="page-hero">
      <h1>My Work</h1>
    </section>
    <div id="project-grid-wrapper">${renderProjectGrid()}</div>
    ${renderFooter()}
  `;
}

function pageAbout() {
  return `
    ${renderHeader()}
    <section class="page-hero">
      <p>To deliver design at the highest level, I keep my practice independent and research focused while working from my Los Angeles studio for clients around the world. Every project receives my full creative vision and strategic thinking, ensuring a personal and intentional approach from start to finish.</p>
    </section>
    <div class="studio-photos">
      <img src="assets/studio-1.jpg" alt="Design studio workspace" />
      <img src="assets/studio-2.jpg" alt="Team collaboration" />
      <img src="assets/studio-3.jpg" alt="Design library" />
      <img src="assets/studio-4.jpg" alt="Design library" />

    </div>
    <div class="about-text">
      <p>Since 2016, I have built an independent design practice rooted in ideas and craft while specializing in brand identities and print design for clients across the United States and around the world.</p>
      <p>My approach is collaborative and deeply personal. I am involved in every project from the first conversation to the final detail, bringing the same level of care and intention to work of every scale.</p>
    </div>
    <div class="leadership">
      <h2>Designer</h2>
      <div class="leaders-grid">
        <div class="leader">
          <img src="assets/leader-daniel.jpg" alt="Daniel Lee Austin" />
          <p>Daniel Austin</p>
          <p>Los Angeles, California</p>
        </div>
      </div>
    </div>
    ${renderFooter()}
  `;
}

function pageContact() {
  return `
    ${renderHeader()}
    <div class="contact-grid">
      <div class="contact-info">
        <h1>Contact</h1>
        <div class="contact-block">
          <span class="bold">Work Inquiries</span>
          <a href="mailto:daustin@inside.artcenter.edu">daustin@inside.artcenter.edu</a>
          <span>626.838.2231</span>
        </div>
        <div class="contact-block">
          <span class="bold">Press Inquiries</span>
          <span>Daniel Lee Austin</span>
          <span>626.838.2231</span>
          <a href="mailto:daustin@inside.artcenter.edu">daustin@inside.artcenter.edu</a>
        </div>
        <div class="contact-block">
          <span class="bold">Daniel Lee Austin</span>
          <span>Independent Designer</span>
          <span>Los Angeles, CA</span>
        </div>
        <div class="contact-block">
          <a href="https://www.linkedin.com/in/IMDANIELAUSTIN">LinkedIn</a>
          <a href="https://www.X.com/bydanielaustin">Twitter</a>
          <a href="https://www.threads.com/IMDANIELAUSTIN">Threads</a>
          <a href="https://www.instagram.com/ASTNDSGN">Instagram</a>
          <a href="https://imdanielaustin.gumroad.com">Store</a>
          <a href="https://www.imdanielaustin.com">Personal Blog</a> 
        </div>
      </div>
      <div class="contact-art">
        <img src="assets/contact-art.jpg" alt="Colorful paper cut-out botanical artwork" />
      </div>
    </div>
  `;
}

function pageProject(slug) {
  const project = projects.find(p => p.slug === slug);
  if (!project) return page404();

  return `
    ${renderHeader()}
    <div class="project-detail">
      <div class="breadcrumb">
        <a href="#/">Projects</a> &gt;
      </div>
      <div class="project-title">
        <h1>${project.name}</h1>
      </div>
      <div class="project-img">
        <img src="${project.image}" alt="${project.name}" />
      </div>
      <div class="project-desc">
        <p>${project.description[0]}</p>
      </div>
      <div class="project-img">
        <img src="${project.image}" alt="${project.name} application" />
      </div>
      ${project.description[1] ? `
        <div class="project-desc">
          <p>${project.description[1]}</p>
        </div>
      ` : ''}
      ${project.description[2] ? `
        <div class="project-desc">
          <p class="label">Enterprises</p>
          <p>${project.description[2]}</p>
        </div>
      ` : ''}
      <div class="project-meta">
        <span>${project.type}</span>
        <span>${project.year}</span>
      </div>
    </div>
    ${renderFooter()}
  `;
}

function page404() {
  return `
    <div class="not-found">
      <div>
        <h1>404</h1>
        <p>Oops! Page not found</p>
        <a href="#/">Return to Home</a>
      </div>
    </div>
  `;
}

// ── Scroll to top ────────────────────────────────────────
function initScrollTop() {
  const btn = document.getElementById('scroll-top');
  let lastY = window.scrollY;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y > 300 && y > lastY) btn.classList.add('visible');
    else if (y < lastY || y <= 100) btn.classList.remove('visible');
    lastY = y;
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ── Render ───────────────────────────────────────────────
function render() {
  const path = getRoute();
  const app = document.getElementById('app');
  window.scrollTo(0, 0);

  if (path === '/') app.innerHTML = pageIndex();
  else if (path === '/work') app.innerHTML = pageWork();
  else if (path === '/about') app.innerHTML = pageAbout();
  else if (path === '/contact') app.innerHTML = pageContact();
  else if (path.startsWith('/project/')) {
    const slug = path.replace('/project/', '');
    app.innerHTML = pageProject(slug);
  }
  else app.innerHTML = page404();

  initScrollAnimations(); // ← add this line
}
// ── Scroll animations ────────────────────────────────────
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        entry.target.classList.remove('hidden-below');
      } else {
        // Determine if scrolling up or down
        if (entry.boundingClientRect.top > 0) {
          // Element is below viewport — hide it again
          entry.target.classList.remove('visible');
          entry.target.classList.add('hidden-below');
        }
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.project-card, .studio-photos img, .leader img, .contact-art img, .project-img img')
    .forEach(el => {
      el.classList.add('scroll-fade');
      observer.observe(el);
    });
}

initScrollTop();
