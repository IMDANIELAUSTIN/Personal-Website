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
  const sections = [
    {
      title: 'DANIEL LEE AUSTIN STUDIO',
      items: [
        { label: 'Home', href: '#/' },
        { label: 'Work', href: '#/work' },
        { label: 'About', href: '#/about' },
        { label: 'Contact', href: '#/contact' },
      ],
    },

    {
      title: 'Social Media',
      items: [
        { label: 'Substack', href: 'https://imdanielaustin.substack.com', external: true },
        { label: 'LinkedIn', href: 'https://www.linkedin.com/in/IMDANIELAUSTIN', external: true },
        { label: 'Twitter', href: 'https://www.X.com/bydanielaustin', external: true },
        { label: 'Threads', href: 'https://www.threads.com/IMDANIELAUSTIN', external: true },
        { label: 'Instagram', href: 'https://www.instagram.com/ASTNDSGN', external: true },
        { label: 'Store', href: 'https://imdanielaustin.gumroad.com', external: true },
        { label: 'Patreon', href: 'https://www.imdanielaustin.com', external: true },
      ],
    },
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: 'privacy-policy.html' },
    { label: 'Terms of Service', href: 'terms-of-service.html' },
    { label: 'Sitemap', href: '#/sitemap.xml' },
  ];

  const renderItem = (item) => {
    const classes = `footer-item${item.emphasis ? ' footer-item-strong' : ''}`;
    if (item.href) {
      const externalAttrs = item.external ? ' target="_blank" rel="noreferrer"' : '';
      return `<a class="${classes}" href="${item.href}"${externalAttrs}>${item.label}</a>`;
    }

    return `<span class="${classes}">${item.label}</span>`;
  };

  return `
    <footer class="site-footer">
      <div class="footer-shell">
        <div class="footer-accordion">
          ${sections.map(section => `
            <details class="footer-section">
              <summary>
                <span>${section.title}</span>
                <svg class="footer-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </summary>
              <div class="footer-section-body">
                ${section.items.map(renderItem).join('')}
              </div>
            </details>
          `).join('')}
        </div>
        <div class="footer-meta">
          <p class="footer-note">
            Available for brand identity, print design, and visual systems. Email
            <a href="mailto:daustin@inside.artcenter.edu">daustin@inside.artcenter.edu</a>
            or call
            <a href="tel:6268382231">626.838.2231</a>.
          </p>
          <div class="footer-legal">
            <span>Copyright © 2016-2026 Daniel Lee Austin. All rights reserved.</span>
            <div class="footer-legal-links">
              ${legalLinks.map((item, index) => `
                ${index ? '<span class="footer-divider" aria-hidden="true">|</span>' : ''}
                <a href="${item.href}">${item.label}</a>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    </footer>
  `;
}

// ── Project Grid ─────────────────────────────────────────
let sortMode = 'az';
let showAll = false;
const INITIAL_COUNT = 9;

// Protected project content lives behind the API and is only cached in memory after unlock.
const protectedProjectCache = new Map();
const protectedProjectState = new Map();

function getSorted() {
  let list = [...projects];
  if (sortMode === 'az') list.sort((a, b) => a.name.localeCompare(b.name));
  if (sortMode === 'newest') list.sort((a, b) => b.year - a.year);
  if (sortMode === 'brand') list = list.filter((p) => p.type.toLowerCase().includes('brand'));
  if (sortMode === 'print') list = list.filter((p) => p.type.toLowerCase().includes('print'));
  if (sortMode === 'visual') list = list.filter((p) => p.type.toLowerCase().includes('visual'));
  return list;
}

function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug);
}

function getProjectMetaDescription(project) {
  if (typeof project.teaser === 'string' && project.teaser.trim()) return project.teaser;
  if (typeof project.description === 'string' && project.description.trim()) {
    return `${project.description.substring(0, 150)}...`;
  }
  if (Array.isArray(project.description) && typeof project.description[0] === 'string') {
    return project.description[0];
  }
  return project.name;
}

function getProtectedProjectStatus(slug) {
  return protectedProjectState.get(slug) || { status: 'idle', message: '' };
}

function buildProjectBlocks(blocks) {
  return blocks.map((block) => {
    if (block.type === 'text') {
      return `<div class="project-desc"><p>${block.content}</p></div>`;
    }

    if (block.type === 'image') {
      if (block.bgColor || block.color || block.caption) {
        const bgStyle = block.bgColor ? `background-color: ${block.bgColor};` : '';
        const fgStyle = block.color ? `color: ${block.color};` : '';
        const captionHtml = block.caption ? `<div class="image-caption"><p>${block.caption}</p></div>` : '';
        return `
          <div class="project-feature-image" style="${bgStyle} ${fgStyle}">
            <div class="project-img"><img src="${block.url}" alt="" loading="lazy" decoding="async" /></div>
            ${captionHtml}
          </div>
        `;
      }

      return `<div class="project-img"><img src="${block.url}" alt="" loading="lazy" decoding="async" /></div>`;
    }

    if (block.type === 'embed') {
      return `
        <div class="project-embed-wrapper">
          ${block.html}
        </div>
      `;
    }

    if (block.type === 'button') {
      const bgStyle = block.bgColor ? `background-color: ${block.bgColor};` : '';
      const fgStyle = block.color ? `color: ${block.color}; border-color: ${block.color};` : '';
      return `
        <div class="project-button-wrapper">
          <a href="${block.url}" target="_blank" rel="noopener noreferrer" class="project-button" style="${bgStyle} ${fgStyle}">
            ${block.text}
          </a>
        </div>
      `;
    }

    if (block.type === 'quote') {
      const bgStyle = block.bgColor ? `background-color: ${block.bgColor};` : '';
      const fgStyle = block.color ? `color: ${block.color};` : '';
      return `
        <div class="project-quote" style="${bgStyle} ${fgStyle}">
          <blockquote>${block.text}</blockquote>
          ${block.author ? `<cite>${block.author}</cite>` : ''}
        </div>
      `;
    }

    if (block.type === 'gif') {
      return `<div class="project-img"><img src="${block.url}" alt="" class="replay-gif" data-src="${block.url}" /></div>`;
    }

    return '';
  }).join('');
}

function renderProjectLayout(project, contentHtml, extraClass = '') {
  return `
    ${renderHeader()}
    <div class="project-detail${extraClass ? ` ${extraClass}` : ''}">
      <div class="breadcrumb">
        <a href="#/work">Projects</a> &gt;
      </div>
      <div class="project-title">
        <h1>${project.name}</h1>
      </div>
      ${contentHtml}
      <div class="project-meta">
        <span>${project.type}</span>
        <span>${project.year}</span>
      </div>
    </div>
    ${renderFooter()}
  `;
}

function renderFullProject(project, publicProject = project) {
  const mergedProject = { ...publicProject, ...project };
  updateMeta(mergedProject.name, getProjectMetaDescription(mergedProject));

  let contentHtml = '';

  if (Array.isArray(mergedProject.blocks)) {
    contentHtml = buildProjectBlocks(mergedProject.blocks);
  } else if (Array.isArray(mergedProject.description)) {
    contentHtml = `
      <div class="project-img">
        <img src="${mergedProject.image}" alt="${mergedProject.name}" loading="lazy" decoding="async" />
      </div>
      <div class="project-desc">
        <p>${mergedProject.description[0]}</p>
      </div>
      <div class="project-img">
        <img src="${mergedProject.image}" alt="${mergedProject.name} application" loading="lazy" decoding="async" />
      </div>
      ${mergedProject.description[1] ? `
        <div class="project-desc">
          <p>${mergedProject.description[1]}</p>
        </div>
      ` : ''}
      ${mergedProject.description[2] ? `
        <div class="project-desc">
          <p class="label">Enterprises</p>
          <p>${mergedProject.description[2]}</p>
        </div>
      ` : ''}
    `;
  } else {
    contentHtml = `
      <div class="project-desc">
        <p>${mergedProject.teaser || 'Project details are not available yet.'}</p>
      </div>
    `;
  }

  return renderProjectLayout(mergedProject, contentHtml);
}

function renderProtectedProjectGate(project, gateState = getProtectedProjectStatus(project.slug)) {
  updateMeta(project.name, getProjectMetaDescription(project));

  const status = gateState.status || 'idle';
  const message = gateState.message || '';
  const buttonLabel = status === 'loading' ? 'Checking Password...' : 'Unlock Case Study';

  return `
    ${renderHeader()}
    <div class="project-detail project-detail-locked">
      <div class="breadcrumb">
        <a href="#/work">Projects</a> &gt;
      </div>
      <div class="project-title">
        <p class="project-eyebrow">Protected Case Study</p>
        <h1>${project.name}</h1>
      </div>
      <div class="project-lock-panel">
        <div class="project-lock-copy">
          <p>${project.teaser || 'This case study is available with a password.'}</p>
          <p>The project remains visible in the grid, but its full case study only loads after password verification.</p>
        </div>
        <form class="project-password-form" onsubmit="submitProjectPassword(event, '${project.slug}')">
          <label class="sr-only" for="project-password-${project.slug}">Project password</label>
          <input
            id="project-password-${project.slug}"
            name="password"
            type="password"
            autocomplete="current-password"
            placeholder="Enter password"
            ${status === 'loading' ? 'disabled' : ''}
          />
          <button class="project-button" type="submit" ${status === 'loading' ? 'disabled' : ''}>
            ${buttonLabel}
          </button>
        </form>
        ${message ? `<p class="project-gate-message${status === 'error' ? ' is-error' : ''}">${message}</p>` : ''}
      </div>
      <div class="project-meta">
        <span>${project.type}</span>
        <span>${project.year}</span>
      </div>
    </div>
    ${renderFooter()}
  `;
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
        ${visible.map((project) => `
          <a href="#/project/${project.slug}" class="project-card${project.protected ? ' project-card-protected' : ''}">
            <div class="thumb">
              <img src="${project.image}" alt="${project.name}" loading="lazy" />
              ${project.protected ? '<span class="project-lock-badge">Protected</span>' : ''}
            </div>
            <div class="info">
              <strong>${project.name}</strong>
              <span> - ${project.type}</span>
              ${project.protected ? `<small class="project-card-note">${project.teaser || 'Password required to view the full case study.'}</small>` : ''}
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

function updateMeta(title, description) {
  document.title = title ? `${title} | DANIEL LEE AUSTIN` : 'DANIEL LEE AUSTIN';
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && description) {
    metaDesc.setAttribute('content', description);
  }
}

// ── Pages ────────────────────────────────────────────────
function pageIndex() {
  updateMeta('Home', 'Daniel Austin is a Multi-Disciplinary Brand Designer and Product Conceptual Artist.');
  sortMode = 'popular';
  showAll = false;
  return `
    ${renderHeader()}
    <section class="hero">
      <h1>Independent graphic designer crafting brand identities and visual systems for enterprises worldwide.</h1>
      <a href="./Daniel Austin MASTER RÉSUMÉ.pdf" class="cta" download="Daniel Austin Graphic Design Resume">Download My Resume →</a>
      <a href="https://shop.beacons.ai/imdanielaustin/86dd0e96-ec70-486c-9f87-615d09f93e7b" class="cta" download="Schedule Link">Book Your Free Consultation Today →</a>
    </section>
    <div id="project-grid-wrapper">${renderProjectGrid()}</div>
    ${renderFooter()}
  `;
}

function pageWork() {
  updateMeta('Work', 'Explore the portfolio of Daniel Lee Austin.');
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
  updateMeta('About', 'Learn about Daniel Lee Austin, Independent Designer based in Los Angeles.');
  return `
    ${renderHeader()}
    <section class="page-hero">
      <p>To deliver design at the highest level, I keep my practice independent and research focused while working from my Los Angeles studio for clients around the world. Every project receives my full creative vision and strategic thinking, ensuring a personal and intentional approach from start to finish.</p>
    </section>
    <div class="studio-photos">
      <img src="assets/studio-1.jpg" alt="Group Photo at Snap Inc HQ in Santa Monica, CA" />
      <img src="assets/studio-3.jpg" alt="Daniel Austin pictured at ArtCenter College of Design with faculty in Pasadena, CA" />
      <img src="assets/studio-4.jpg" alt="Project Team Photo Collage" />

    </div>
    <div class="about-text">
      <a href="https://la-tech.org/daniel-austin" class="cta" download="Daniel Austin Feature on LA-Tech.org">Read Feature  →</a>
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
  updateMeta('Contact', 'Get in touch with Daniel Lee Austin for work or press inquiries.');
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

async function submitProjectPassword(event, slug) {
  event.preventDefault();

  const form = event.currentTarget;
  const password = form.password.value.trim();

  if (!password) {
    protectedProjectState.set(slug, {
      status: 'error',
      message: 'Enter a password to continue.',
    });
    render();
    return;
  }

  protectedProjectState.set(slug, {
    status: 'loading',
    message: 'Checking password...',
  });
  render();

  try {
    const accessRes = await fetch('/api/project-access', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ slug, password }),
    });

    if (!accessRes.ok) {
      protectedProjectState.set(slug, {
        status: 'error',
        message: accessRes.status === 401 || accessRes.status === 403
          ? 'Incorrect password. Please try again.'
          : 'Protected project access is not available yet. Add the API endpoints to finish the unlock flow.',
      });
      render();
      return;
    }

    const projectRes = await fetch(`/api/projects/${encodeURIComponent(slug)}`, {
      credentials: 'include',
    });

    if (!projectRes.ok) {
      protectedProjectState.set(slug, {
        status: 'error',
        message: 'Password accepted, but the protected project content could not be loaded.',
      });
      render();
      return;
    }

    const privateProject = await projectRes.json();

    if (!privateProject || !Array.isArray(privateProject.blocks)) {
      protectedProjectState.set(slug, {
        status: 'error',
        message: 'The protected project response must include a blocks array.',
      });
      render();
      return;
    }

    const publicProject = getProjectBySlug(slug);
    protectedProjectCache.set(slug, {
      ...publicProject,
      ...privateProject,
      protected: true,
    });
    protectedProjectState.delete(slug);
    render();
  } catch (error) {
    console.error('Protected project unlock failed:', error);
    protectedProjectState.set(slug, {
      status: 'error',
      message: 'Protected project access is not available yet. Connect the API routes to finish the unlock flow.',
    });
    render();
  }
}

function pageProject(slug) {
  const project = getProjectBySlug(slug);
  if (!project) return page404();

  if (project.protected) {
    const unlockedProject = protectedProjectCache.get(slug);
    if (unlockedProject) return renderFullProject(unlockedProject, project);
    return renderProtectedProjectGate(project);
  }

  return renderFullProject(project);
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
        
        if (entry.target.classList.contains('replay-gif')) {
          const src = entry.target.getAttribute('data-src');
          if (src) {
            entry.target.src = '';
            // Force reflow
            void entry.target.offsetWidth;
            entry.target.src = src;
          }
        }
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

  document.querySelectorAll('.project-card, .studio-photos img, .leader img, .contact-art img, .project-img img, .project-quote')
    .forEach(el => {
      el.classList.add('scroll-fade');
      observer.observe(el);
    });
}

initScrollTop();
