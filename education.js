// TraderProf - Education Module
const EducationModule = (() => {
  const COURSES = [
    {
      id: 1,
      level: "beginner",
      icon: "📊",
      titleEn: "Introduction to Gold Trading",
      titleAr: "مقدمة إلى تداول الذهب",
      titleFr: "Introduction au Trading d'Or",
      descEn: "Learn the basics of gold markets, what drives prices, and how to start trading XAU/USD.",
      descAr: "تعلم أساسيات أسواق الذهب وما يحرك الأسعار وكيف تبدأ في تداول XAU/USD.",
      descFr: "Apprenez les bases des marchés de l'or, ce qui fait bouger les prix, et comment commencer à trader XAU/USD.",
      readTime: 8,
      topics: ["Market Structure", "XAU/USD Basics", "Price Drivers", "Getting Started"]
    },
    {
      id: 2,
      level: "beginner",
      icon: "🕯️",
      titleEn: "Candlestick Patterns Masterclass",
      titleAr: "دورة أنماط الشموع اليابانية",
      titleFr: "Masterclass Chandeliers Japonais",
      descEn: "Master the 20 most powerful candlestick patterns used by professional gold traders worldwide.",
      descAr: "إتقان أقوى 20 نمطاً للشموع اليابانية يستخدمها متداولو الذهب المحترفون حول العالم.",
      descFr: "Maîtrisez les 20 modèles de chandeliers les plus puissants utilisés par les traders d'or professionnels.",
      readTime: 15,
      topics: ["Doji Patterns", "Engulfing Patterns", "Hammer & Shooting Star", "Morning/Evening Star"]
    },
    {
      id: 3,
      level: "intermediate",
      icon: "📈",
      titleEn: "Technical Analysis Fundamentals",
      titleAr: "أساسيات التحليل التقني",
      titleFr: "Fondamentaux de l'Analyse Technique",
      descEn: "Understand trend analysis, support/resistance levels, chart patterns, and indicator usage.",
      descAr: "فهم تحليل الاتجاه ومستويات الدعم والمقاومة وأنماط الرسم البياني واستخدام المؤشرات.",
      descFr: "Comprenez l'analyse de tendance, les niveaux S/R, les patterns graphiques et l'utilisation des indicateurs.",
      readTime: 20,
      topics: ["Trend Identification", "Support & Resistance", "Chart Patterns", "Key Indicators"]
    },
    {
      id: 4,
      level: "intermediate",
      icon: "🔢",
      titleEn: "Fibonacci & Elliott Wave Analysis",
      titleAr: "فيبوناتشي وتحليل موجات إليوت",
      titleFr: "Fibonacci & Analyse d'Elliott Wave",
      descEn: "Apply Fibonacci retracements and Elliott Wave theory to gold trading strategies.",
      descAr: "تطبيق نسب فيبوناتشي ونظرية موجات إليوت على استراتيجيات تداول الذهب.",
      descFr: "Appliquez les retracements Fibonacci et la théorie des vagues d'Elliott au trading sur l'or.",
      readTime: 18,
      topics: ["Fibonacci Levels", "Retracement Zones", "Elliott Wave Basics", "Practical Application"]
    },
    {
      id: 5,
      level: "intermediate",
      icon: "🧠",
      titleEn: "Trading Psychology & Discipline",
      titleAr: "علم نفس التداول والانضباط",
      titleFr: "Psychologie du Trading et Discipline",
      descEn: "Understand the psychological edge needed for consistent trading: managing fear, greed, and FOMO.",
      descAr: "فهم الميزة النفسية اللازمة للتداول المتسق: إدارة الخوف والطمع والخوف من ضياع الفرص.",
      descFr: "Comprenez l'avantage psychologique nécessaire pour un trading cohérent: gérer la peur, la cupidité et le FOMO.",
      readTime: 12,
      topics: ["Fear & Greed", "FOMO Management", "Discipline Building", "Mental Framework"]
    },
    {
      id: 6,
      level: "advanced",
      icon: "⚙️",
      titleEn: "Building a Complete Trading System",
      titleAr: "بناء نظام تداول متكامل",
      titleFr: "Construire un Système de Trading Complet",
      descEn: "Design, backtest, and deploy a complete trading system with entry, exit, and risk rules.",
      descAr: "تصميم واختبار ونشر نظام تداول متكامل مع قواعد الدخول والخروج وإدارة المخاطر.",
      descFr: "Concevez, backtestez et déployez un système de trading complet avec règles d'entrée, sortie et risque.",
      readTime: 25,
      topics: ["System Design", "Backtesting", "Risk Rules", "Performance Review"]
    }
  ];

  const CANDLESTICK_PATTERNS = [
    { name: "Doji", signal: "Indecision / Reversal", description: "Opens and closes at nearly the same price. Signals market indecision. Context-dependent." },
    { name: "Bullish Engulfing", signal: "Bullish Reversal", description: "Larger bullish candle engulfs the previous bearish candle. Strong reversal signal at support." },
    { name: "Bearish Engulfing", signal: "Bearish Reversal", description: "Larger bearish candle engulfs the previous bullish candle. Strong reversal signal at resistance." },
    { name: "Hammer", signal: "Bullish Reversal", description: "Small body with long lower wick. Indicates buyers rejecting lower prices. Look for at support." },
    { name: "Shooting Star", signal: "Bearish Reversal", description: "Small body with long upper wick. Indicates sellers rejecting higher prices. Look for at resistance." },
    { name: "Morning Star", signal: "Bullish Reversal", description: "Three-candle pattern signaling a potential bottom. Bearish, indecision, then bullish candle." },
    { name: "Evening Star", signal: "Bearish Reversal", description: "Three-candle pattern signaling a potential top. Bullish, indecision, then bearish candle." },
    { name: "Spinning Top", signal: "Indecision", description: "Small real body with upper and lower wicks. Signals uncertainty between buyers and sellers." }
  ];

  function renderEducation(lang) {
    const t = window.TRANSLATIONS[lang].education;
    const section = document.getElementById('education-section');
    if (!section) return;

    const getTitle = (c) => lang === 'ar' ? c.titleAr : lang === 'fr' ? c.titleFr : c.titleEn;
    const getDesc = (c) => lang === 'ar' ? c.descAr : lang === 'fr' ? c.descFr : c.descEn;

    const levelLabel = (level) => {
      if (level === 'beginner') return t.beginner;
      if (level === 'intermediate') return t.intermediate;
      return t.advanced;
    };

    section.innerHTML = `
      <div class="section-header">
        <span class="section-badge">Learn</span>
        <h2>${t.title}</h2>
        <p>${t.subtitle}</p>
      </div>

      <div class="edu-tabs">
        <button class="edu-tab active" data-tab="courses">Courses</button>
        <button class="edu-tab" data-tab="patterns">Candlestick Patterns</button>
        <button class="edu-tab" data-tab="glossary">Glossary</button>
      </div>

      <div class="edu-content" id="edu-content">
        <div class="edu-grid">
          ${COURSES.map(c => `
            <div class="edu-card level-${c.level}">
              <div class="edu-icon">${c.icon}</div>
              <div class="edu-level">${levelLabel(c.level)}</div>
              <h3>${getTitle(c)}</h3>
              <p>${getDesc(c)}</p>
              <div class="edu-topics">
                ${c.topics.map(topic => `<span class="edu-topic">${topic}</span>`).join('')}
              </div>
              <div class="edu-footer">
                <span class="edu-time">⏱ ${c.readTime} ${t.minRead}</span>
                <button class="edu-btn">${t.readMore} →</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    // Tab switching
    section.querySelectorAll('.edu-tab').forEach(tab => {
      tab.addEventListener('click', function() {
        section.querySelectorAll('.edu-tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        const tabName = this.dataset.tab;
        const content = document.getElementById('edu-content');

        if (tabName === 'courses') {
          content.innerHTML = `<div class="edu-grid">${COURSES.map(c => `
            <div class="edu-card level-${c.level}">
              <div class="edu-icon">${c.icon}</div>
              <div class="edu-level">${levelLabel(c.level)}</div>
              <h3>${getTitle(c)}</h3>
              <p>${getDesc(c)}</p>
              <div class="edu-topics">${c.topics.map(topic => `<span class="edu-topic">${topic}</span>`).join('')}</div>
              <div class="edu-footer">
                <span class="edu-time">⏱ ${c.readTime} ${t.minRead}</span>
                <button class="edu-btn">${t.readMore} →</button>
              </div>
            </div>
          `).join('')}</div>`;
        } else if (tabName === 'patterns') {
          content.innerHTML = `
            <div class="patterns-grid">
              ${CANDLESTICK_PATTERNS.map(p => `
                <div class="pattern-card">
                  <div class="pattern-header">
                    <div class="pattern-name">${p.name}</div>
                    <div class="pattern-signal">${p.signal}</div>
                  </div>
                  <p>${p.description}</p>
                </div>
              `).join('')}
            </div>
          `;
        } else if (tabName === 'glossary') {
          content.innerHTML = renderGlossary();
        }
      });
    });
  }

  function renderGlossary() {
    const terms = [
      { term: "Support", def: "A price level where buying interest is strong enough to prevent further decline. Acts as a floor." },
      { term: "Resistance", def: "A price level where selling pressure is strong enough to halt an advance. Acts as a ceiling." },
      { term: "Trend", def: "The general direction of price movement: uptrend (higher highs/lows), downtrend (lower highs/lows), or sideways." },
      { term: "Stop-Loss", def: "A pre-set order to close a trade if price moves against you by a specified amount. Essential for risk management." },
      { term: "Take-Profit", def: "A pre-set order to close a trade when price reaches your target, locking in gains." },
      { term: "Risk/Reward Ratio", def: "The ratio of potential profit to potential loss. A 1:2 ratio means risking 50 to potentially gain 100." },
      { term: "Pip", def: "The smallest standard unit of price movement. For XAU/USD typically $0.10 per troy ounce." },
      { term: "RSI", def: "Relative Strength Index (0–100). Above 70 suggests overbought; below 30 suggests oversold conditions." },
      { term: "MACD", def: "Moving Average Convergence Divergence. Shows momentum by comparing two EMAs and their crossovers." },
      { term: "Fibonacci", def: "Retracement levels (23.6%, 38.2%, 50%, 61.8%) derived from the Fibonacci sequence, used to find potential reversal zones." },
      { term: "Leverage", def: "Borrowed capital that amplifies both gains and losses. High leverage significantly increases risk." },
      { term: "Position Size", def: "The amount of an asset bought or sold in a trade. Must be calculated relative to account size and risk tolerance." }
    ];
    return `<div class="glossary-grid">${terms.map(g => `
      <div class="glossary-item">
        <div class="glos-term">${g.term}</div>
        <div class="glos-def">${g.def}</div>
      </div>
    `).join('')}</div>`;
  }

  return { renderEducation };
})();

window.EducationModule = EducationModule;
