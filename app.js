// TraderProf - Main Application Controller
(function() {
  'use strict';

  let currentLang = localStorage.getItem('traderprof_lang') || 'en';
  window.currentLang = currentLang;

  // Economic Calendar Data
  const CALENDAR_EVENTS = [
    { date: "Jan 15", time: "15:30", currency: "USD", event: "Core CPI m/m", impact: "high", previous: "0.3%", forecast: "0.3%", actual: "--" },
    { date: "Jan 16", time: "13:30", currency: "USD", event: "Retail Sales m/m", impact: "high", previous: "-0.1%", forecast: "0.4%", actual: "--" },
    { date: "Jan 20", time: "19:00", currency: "USD", event: "FOMC Meeting Minutes", impact: "high", previous: "--", forecast: "--", actual: "--" },
    { date: "Jan 21", time: "09:00", currency: "EUR", event: "ECB Meeting Accounts", impact: "medium", previous: "--", forecast: "--", actual: "--" },
    { date: "Jan 22", time: "13:30", currency: "USD", event: "Unemployment Claims", impact: "medium", previous: "201K", forecast: "210K", actual: "--" },
    { date: "Jan 24", time: "13:30", currency: "USD", event: "Flash Manufacturing PMI", impact: "medium", previous: "49.4", forecast: "49.8", actual: "--" },
    { date: "Jan 29", time: "19:00", currency: "USD", event: "FOMC Rate Decision", impact: "high", previous: "5.50%", forecast: "5.25%", actual: "--" },
    { date: "Jan 30", time: "13:30", currency: "USD", event: "Advance GDP q/q", impact: "high", previous: "2.8%", forecast: "2.6%", actual: "--" },
    { date: "Feb 7",  time: "13:30", currency: "USD", event: "Non-Farm Payrolls", impact: "high", previous: "256K", forecast: "170K", actual: "--" },
    { date: "Feb 12", time: "13:30", currency: "USD", event: "CPI y/y", impact: "high", previous: "2.9%", forecast: "2.9%", actual: "--" }
  ];

  function init() {
    setLanguage(currentLang);
    renderNav();
    renderHero();
    renderStats();
    renderDisclaimerBanner();
    renderAnalysis();
    renderSignals();
    renderCalendar();
    renderEducation();
    renderRisk();
    renderBlog();
    renderContact();
    renderFooter();
    renderWhatsAppButton();
    setupNavLinks();
    setupLangSwitcher();
    setupThemeToggle();
    setupMobileMenu();

    // Animate numbers
    setTimeout(animateStats, 500);
  }

  function setLanguage(lang) {
    currentLang = lang;
    window.currentLang = lang;
    localStorage.setItem('traderprof_lang', lang);
    const t = window.TRANSLATIONS[lang];
    document.documentElement.lang = t.lang;
    document.documentElement.dir = t.dir;
    document.body.classList.toggle('rtl', t.dir === 'rtl');
  }

  function renderNav() {
    const t = window.TRANSLATIONS[currentLang].nav;
    const nav = document.getElementById('main-nav');
    if (!nav) return;
    nav.innerHTML = `
      <div class="nav-container">
        <div class="nav-logo">
          <span class="logo-icon">◈</span>
          <span class="logo-text">TraderProf<span class="logo-dot">.xyz</span></span>
        </div>
        <button class="mobile-menu-btn" id="mobile-menu-btn" aria-label="Menu">☰</button>
        <ul class="nav-links" id="nav-links">
          <li><a href="#home" class="nav-link active">${t.home}</a></li>
          <li><a href="#analysis" class="nav-link">${t.analysis}</a></li>
          <li><a href="#signals" class="nav-link">${t.signals}</a></li>
          <li><a href="#education" class="nav-link">${t.education}</a></li>
          <li><a href="#risk" class="nav-link">${t.risk}</a></li>
          <li><a href="#blog" class="nav-link">${t.blog}</a></li>
          <li><a href="#contact" class="nav-link">${t.contact}</a></li>
        </ul>
        <div class="nav-actions">
          <div class="lang-switcher" id="lang-switcher">
            <button class="lang-btn ${currentLang === 'en' ? 'active' : ''}" data-lang="en">EN</button>
            <button class="lang-btn ${currentLang === 'ar' ? 'active' : ''}" data-lang="ar">AR</button>
            <button class="lang-btn ${currentLang === 'fr' ? 'active' : ''}" data-lang="fr">FR</button>
          </div>
          <button class="theme-btn" id="theme-btn" title="Toggle Dark/Light Mode">🌙</button>
        </div>
      </div>
    `;
  }

  function renderHero() {
    const t = window.TRANSLATIONS[currentLang].hero;
    const hero = document.getElementById('hero-section');
    if (!hero) return;
    hero.innerHTML = `
      <div class="hero-bg-grid"></div>
      <div class="hero-particles" id="hero-particles"></div>
      <div class="hero-content">
        <div class="hero-badge">${t.badge}</div>
        <h1 class="hero-title">
          ${t.title}<br>
          <span class="hero-accent">${t.titleAccent}</span>
        </h1>
        <p class="hero-subtitle">${t.subtitle}</p>
        <div class="hero-cta">
          <a href="#analysis" class="cta-primary">${t.ctaAnalysis}</a>
          <a href="#education" class="cta-secondary">${t.ctaEducation}</a>
        </div>
        <div class="hero-disclaimer">${t.disclaimer}</div>
        <div class="hero-ticker" id="hero-ticker">
          <div class="ticker-inner">
            <span class="tick-item">XAU/USD <span class="bullish">2,648.50 ▲+0.47%</span></span>
            <span class="tick-item">EUR/USD <span class="bullish">1.0842 ▲+0.21%</span></span>
            <span class="tick-item">GBP/USD <span class="bearish">1.2631 ▼-0.14%</span></span>
            <span class="tick-item">USD/JPY <span class="bullish">148.92 ▲+0.23%</span></span>
            <span class="tick-item">XAU/USD <span class="bullish">2,648.50 ▲+0.47%</span></span>
            <span class="tick-item">EUR/USD <span class="bullish">1.0842 ▲+0.21%</span></span>
            <span class="tick-item">GBP/USD <span class="bearish">1.2631 ▼-0.14%</span></span>
            <span class="tick-item">USD/JPY <span class="bullish">148.92 ▲+0.23%</span></span>
          </div>
        </div>
      </div>
    `;
  }

  function renderStats() {
    const t = window.TRANSLATIONS[currentLang].stats;
    const section = document.getElementById('stats-section');
    if (!section) return;
    section.innerHTML = `
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-number" data-target="12">0</div>
          <div class="stat-label">${t.markets}</div>
        </div>
        <div class="stat-card">
          <div class="stat-number" data-target="90">0</div>
          <div class="stat-label">${t.articles}</div>
        </div>
        <div class="stat-card">
          <div class="stat-number" data-target="8">0</div>
          <div class="stat-label">${t.tools}</div>
        </div>
        <div class="stat-card">
          <div class="stat-number" data-target="3">0</div>
          <div class="stat-label">${t.languages}</div>
        </div>
      </div>
    `;
  }

  function renderDisclaimerBanner() {
    const t = window.TRANSLATIONS[currentLang].disclaimer;
    const el = document.getElementById('disclaimer-banner');
    if (!el) return;
    el.innerHTML = `
      <div class="disclaimer-inner">
        <strong>⚠️ ${t.title}:</strong> ${t.text}
      </div>
    `;
  }

  function renderAnalysis() {
    window.AnalysisModule.renderGoldDashboard(currentLang);
  }

  function renderSignals() {
    window.SignalsModule.renderSignals(currentLang);
  }

  function renderCalendar() {
    const t = window.TRANSLATIONS[currentLang].calendar;
    const section = document.getElementById('calendar-section');
    if (!section) return;
    section.innerHTML = `
      <div class="section-header">
        <span class="section-badge">Events</span>
        <h2>${t.title}</h2>
        <p>${t.subtitle}</p>
      </div>
      <div class="calendar-table-wrap">
        <table class="calendar-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>${t.currency}</th>
              <th>${t.event}</th>
              <th>${t.impact}</th>
              <th>${t.previous}</th>
              <th>${t.forecast}</th>
              <th>${t.actual}</th>
            </tr>
          </thead>
          <tbody>
            ${CALENDAR_EVENTS.map(e => `
              <tr class="cal-row impact-${e.impact}">
                <td>${e.date}</td>
                <td>${e.time}</td>
                <td><span class="cal-currency">${e.currency}</span></td>
                <td class="cal-event">${e.event}</td>
                <td><span class="cal-impact ${e.impact}">${e.impact === 'high' ? t.high : e.impact === 'medium' ? t.medium : t.low}</span></td>
                <td>${e.previous}</td>
                <td>${e.forecast}</td>
                <td class="cal-actual">${e.actual}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  function renderEducation() {
    window.EducationModule.renderEducation(currentLang);
  }

  function renderRisk() {
    window.RiskModule.renderRiskTools(currentLang);
  }

  function renderBlog() {
    const t = window.TRANSLATIONS[currentLang].blog;
    const section = document.getElementById('blog-section');
    if (!section) return;
    const articles = window.BLOG_ARTICLES[currentLang] || [];
    const preview = articles.slice(0, 6);

    section.innerHTML = `
      <div class="section-header">
        <span class="section-badge">Blog</span>
        <h2>${t.title}</h2>
        <p>${t.subtitle}</p>
      </div>
      <div class="blog-grid">
        ${preview.map(a => `
          <article class="blog-card">
            <div class="blog-category">${a.category}</div>
            <h3 class="blog-title">${a.title}</h3>
            <p class="blog-excerpt">${a.excerpt}</p>
            <div class="blog-meta">
              <span class="blog-date">${t.publishedOn} ${a.date}</span>
              <span class="blog-read">⏱ ${a.readTime} min</span>
            </div>
            <button class="blog-read-btn" onclick="showBlogArticle('${a.id}')">${t.readMore} →</button>
          </article>
        `).join('')}
      </div>
      <div class="blog-load-more">
        <button class="load-more-btn" id="load-more-blog">View All ${articles.length} Articles</button>
      </div>
      <div id="blog-modal" class="blog-modal" style="display:none">
        <div class="modal-overlay" onclick="closeBlogModal()"></div>
        <div class="modal-content" id="modal-content"></div>
      </div>
    `;

    document.getElementById('load-more-blog').addEventListener('click', () => {
      const grid = section.querySelector('.blog-grid');
      const remaining = articles.slice(6);
      grid.innerHTML += remaining.map(a => `
        <article class="blog-card">
          <div class="blog-category">${a.category}</div>
          <h3 class="blog-title">${a.title}</h3>
          <p class="blog-excerpt">${a.excerpt}</p>
          <div class="blog-meta">
            <span class="blog-date">${t.publishedOn} ${a.date}</span>
            <span class="blog-read">⏱ ${a.readTime} min</span>
          </div>
          <button class="blog-read-btn" onclick="showBlogArticle('${a.id}')">${t.readMore} →</button>
        </article>
      `).join('');
      document.getElementById('load-more-blog').style.display = 'none';
    });
  }

  function renderContact() {
    const t = window.TRANSLATIONS[currentLang].contact;
    const section = document.getElementById('contact-section');
    if (!section) return;
    section.innerHTML = `
      <div class="section-header">
        <span class="section-badge">Contact</span>
        <h2>${t.title}</h2>
        <p>${t.subtitle}</p>
      </div>
      <div class="contact-grid">
        <div class="contact-info">
          <div class="contact-card">
            <div class="contact-icon">📱</div>
            <div class="contact-label">${t.whatsapp}</div>
            <a href="https://wa.me/212612605737" class="contact-val" target="_blank" rel="noopener">+212 612 605 737</a>
          </div>
          <div class="contact-card">
            <div class="contact-icon">📧</div>
            <div class="contact-label">${t.email}</div>
            <a href="mailto:salatrir@gmail.com" class="contact-val">salatrir@gmail.com</a>
          </div>
          <div class="contact-whatsapp-btn">
            <a href="https://wa.me/212612605737" target="_blank" rel="noopener" class="wa-contact-btn">
              <span class="wa-icon">💬</span>
              Chat on WhatsApp
            </a>
          </div>
          <div class="contact-disclaimer">
            ⚠️ We provide market analysis and education only. We do not provide personal financial advice or manage funds.
          </div>
        </div>
        <div class="contact-form">
          <div class="form-group">
            <label>${t.name}</label>
            <input type="text" id="contact-name" placeholder="${t.name}">
          </div>
          <div class="form-group">
            <label>${t.email}</label>
            <input type="email" id="contact-email" placeholder="your@email.com">
          </div>
          <div class="form-group">
            <label>${t.message}</label>
            <textarea id="contact-message" placeholder="${t.message}" rows="5"></textarea>
          </div>
          <button class="form-submit" id="form-submit-btn">${t.send}</button>
          <div id="form-success" style="display:none" class="form-success">✅ Message sent! We'll respond shortly.</div>
        </div>
      </div>
    `;

    document.getElementById('form-submit-btn').addEventListener('click', () => {
      const name = document.getElementById('contact-name').value;
      const email = document.getElementById('contact-email').value;
      const message = document.getElementById('contact-message').value;
      if (name && email && message) {
        document.getElementById('form-success').style.display = 'block';
        document.getElementById('contact-name').value = '';
        document.getElementById('contact-email').value = '';
        document.getElementById('contact-message').value = '';
      }
    });
  }

  function renderFooter() {
    const t = window.TRANSLATIONS[currentLang].footer;
    const footer = document.getElementById('main-footer');
    if (!footer) return;
    footer.innerHTML = `
      <div class="footer-content">
        <div class="footer-col footer-brand">
          <div class="footer-logo">◈ TraderProf<span class="logo-dot">.xyz</span></div>
          <p>${t.description}</p>
          <div class="footer-contact">
            <a href="https://wa.me/212612605737" target="_blank" rel="noopener">📱 +212 612 605 737</a>
            <a href="mailto:salatrir@gmail.com">📧 salatrir@gmail.com</a>
          </div>
        </div>
        <div class="footer-col">
          <h4>${t.links}</h4>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#analysis">Analysis</a></li>
            <li><a href="#signals">Trade Ideas</a></li>
            <li><a href="#education">Education</a></li>
            <li><a href="#risk">Risk Tools</a></li>
            <li><a href="#blog">Blog</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>${t.legal}</h4>
          <ul>
            <li><a href="#disclaimer">${t.disclaimer}</a></li>
            <li><a href="#privacy">${t.privacy}</a></li>
            <li><a href="#terms">${t.terms}</a></li>
          </ul>
          <div class="footer-langs">
            <button class="fl-btn ${currentLang === 'en' ? 'active' : ''}" onclick="switchLang('en')">EN</button>
            <button class="fl-btn ${currentLang === 'ar' ? 'active' : ''}" onclick="switchLang('ar')">AR</button>
            <button class="fl-btn ${currentLang === 'fr' ? 'active' : ''}" onclick="switchLang('fr')">FR</button>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="footer-disclaimer">
          ⚠️ Trading involves significant risk of loss and is not suitable for all investors. The information on this website is for educational and informational purposes only and does not constitute financial advice. Past performance is not indicative of future results.
        </div>
        <div class="footer-copy">© ${new Date().getFullYear()} TraderProf.xyz — ${t.rights}</div>
      </div>
    `;
  }

  function renderWhatsAppButton() {
    const existing = document.getElementById('wa-float-btn');
    if (existing) existing.remove();
    const btn = document.createElement('a');
    btn.id = 'wa-float-btn';
    btn.href = 'https://wa.me/212612605737';
    btn.target = '_blank';
    btn.rel = 'noopener';
    btn.title = 'Chat on WhatsApp';
    btn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    `;
    document.body.appendChild(btn);
  }

  function setupNavLinks() {
    document.addEventListener('click', function(e) {
      if (e.target.classList.contains('nav-link')) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        e.target.classList.add('active');
        // Close mobile menu
        const navLinks = document.getElementById('nav-links');
        if (navLinks) navLinks.classList.remove('open');
      }
    });
  }

  function setupLangSwitcher() {
    document.addEventListener('click', function(e) {
      if (e.target.classList.contains('lang-btn')) {
        const lang = e.target.dataset.lang;
        if (lang) switchLang(lang);
      }
    });
  }

  function setupThemeToggle() {
    const savedTheme = localStorage.getItem('traderprof_theme') || 'dark';
    document.body.classList.toggle('light-mode', savedTheme === 'light');
    updateThemeBtn();

    document.addEventListener('click', function(e) {
      if (e.target.id === 'theme-btn' || e.target.closest('#theme-btn')) {
        document.body.classList.toggle('light-mode');
        localStorage.setItem('traderprof_theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
        updateThemeBtn();
      }
    });
  }

  function updateThemeBtn() {
    const btn = document.getElementById('theme-btn');
    if (btn) btn.textContent = document.body.classList.contains('light-mode') ? '🌙' : '☀️';
  }

  function setupMobileMenu() {
    document.addEventListener('click', function(e) {
      if (e.target.id === 'mobile-menu-btn') {
        const navLinks = document.getElementById('nav-links');
        if (navLinks) navLinks.classList.toggle('open');
      }
    });
  }

  function animateStats() {
    document.querySelectorAll('.stat-number[data-target]').forEach(el => {
      const target = parseInt(el.dataset.target);
      let current = 0;
      const step = Math.ceil(target / 30);
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current + (target > 10 ? '+' : '');
        if (current >= target) clearInterval(timer);
      }, 40);
    });
  }

  // Global functions
  window.switchLang = function(lang) {
    setLanguage(lang);
    renderNav();
    renderHero();
    renderStats();
    renderDisclaimerBanner();
    renderAnalysis();
    renderSignals();
    renderCalendar();
    renderEducation();
    renderRisk();
    renderBlog();
    renderContact();
    renderFooter();
    renderWhatsAppButton();
    setupNavLinks();
    setupLangSwitcher();
    setupThemeToggle();
    setupMobileMenu();
    animateStats();
  };

  window.showBlogArticle = function(articleId) {
    const allArticles = [
      ...window.BLOG_ARTICLES.en,
      ...window.BLOG_ARTICLES.ar,
      ...window.BLOG_ARTICLES.fr
    ];
    const article = allArticles.find(a => a.id === articleId);
    if (!article) return;

    const modal = document.getElementById('blog-modal');
    const content = document.getElementById('modal-content');
    if (!modal || !content) return;

    content.innerHTML = `
      <button class="modal-close" onclick="closeBlogModal()">✕</button>
      <div class="modal-category">${article.category}</div>
      <h2 class="modal-title">${article.title}</h2>
      <div class="modal-meta">
        <span>${article.date}</span>
        <span>⏱ ${article.readTime} min read</span>
      </div>
      <div class="modal-body">
        <p>${article.excerpt}</p>
        <div class="modal-disclaimer">
          <strong>⚠️ Educational Content Only:</strong> This article is for educational and informational purposes only. 
          It does not constitute financial advice. Trading involves significant risk of loss. 
          Always conduct your own research and consult a qualified financial advisor.
        </div>
        <p>This article explores in depth the concepts surrounding ${article.title.toLowerCase()}. 
        Understanding these concepts is essential for any trader seeking to improve their market knowledge 
        and trading discipline.</p>
        <p>Key principles covered in this educational piece include technical and fundamental analysis frameworks, 
        risk management considerations, and the importance of maintaining a systematic approach to market analysis.</p>
        <p><strong>Important Reminder:</strong> All market analysis presented here is educational in nature. 
        Past market patterns do not guarantee future results. Risk management and capital preservation 
        should always be your primary focus.</p>
      </div>
      <div class="modal-contact">
        <p>Have questions? Contact us:</p>
        <a href="https://wa.me/212612605737" target="_blank" rel="noopener" class="modal-wa-btn">💬 WhatsApp Us</a>
      </div>
    `;

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  };

  window.closeBlogModal = function() {
    const modal = document.getElementById('blog-modal');
    if (modal) modal.style.display = 'none';
    document.body.style.overflow = '';
  };

  // Init on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
