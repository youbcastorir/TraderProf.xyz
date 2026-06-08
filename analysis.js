// TraderProf - Analysis Module
const AnalysisModule = (() => {
  // Simulated XAU/USD market data (educational demo)
  const GOLD_DATA = {
    price: 2648.50,
    change: +12.30,
    changePct: +0.47,
    high: 2662.80,
    low: 2631.20,
    open: 2636.20,
    trend: "bullish",
    rsi: 58.4,
    macd: { value: 8.2, signal: 4.1, histogram: 4.1 },
    volume: "High",
    support: [2615, 2580, 2545],
    resistance: [2670, 2700, 2740],
    sentiment: 62, // % bullish
    ema20: 2628.10,
    ema50: 2598.40,
    ema200: 2441.20
  };

  const FOREX_DATA = [
    { pair: "EUR/USD", price: 1.0842, change: +0.0023, changePct: +0.21, trend: "bullish" },
    { pair: "GBP/USD", price: 1.2631, change: -0.0018, changePct: -0.14, trend: "bearish" },
    { pair: "USD/JPY", price: 148.92, change: +0.34, changePct: +0.23, trend: "bullish" },
    { pair: "USD/CHF", price: 0.8892, change: -0.0012, changePct: -0.13, trend: "bearish" },
    { pair: "AUD/USD", price: 0.6421, change: +0.0008, changePct: +0.12, trend: "neutral" },
    { pair: "USD/CAD", price: 1.3642, change: -0.0031, changePct: -0.23, trend: "bearish" }
  ];

  // Simulated price history for mini chart (30 candles)
  const PRICE_HISTORY = [
    2541, 2558, 2547, 2572, 2565, 2589, 2601, 2594, 2612, 2608,
    2598, 2615, 2628, 2619, 2641, 2635, 2648, 2631, 2657, 2662,
    2649, 2638, 2651, 2644, 2659, 2647, 2655, 2631, 2644, 2649
  ];

  function renderGoldDashboard(lang) {
    const t = window.TRANSLATIONS[lang].analysis;
    const section = document.getElementById('analysis-section');
    if (!section) return;

    const trendClass = GOLD_DATA.trend === 'bullish' ? 'bullish' : GOLD_DATA.trend === 'bearish' ? 'bearish' : 'neutral';
    const trendLabel = GOLD_DATA.trend === 'bullish' ? t.bullish : GOLD_DATA.trend === 'bearish' ? t.bearish : t.neutral;
    const changeSign = GOLD_DATA.change > 0 ? '+' : '';

    section.innerHTML = `
      <div class="section-header">
        <span class="section-badge">XAU/USD</span>
        <h2>${t.title}</h2>
        <p>${t.subtitle}</p>
      </div>

      <div class="analysis-grid">
        <!-- Main Price Card -->
        <div class="analysis-card price-card">
          <div class="price-header">
            <div class="price-pair">
              <span class="gold-icon">⬛</span>
              <div>
                <div class="pair-name">XAU/USD</div>
                <div class="pair-sub">Gold / US Dollar</div>
              </div>
            </div>
            <div class="live-badge">● LIVE</div>
          </div>
          <div class="price-main">${GOLD_DATA.price.toLocaleString('en-US', {minimumFractionDigits: 2})}</div>
          <div class="price-change ${trendClass}">
            ${changeSign}${GOLD_DATA.change.toFixed(2)} (${changeSign}${GOLD_DATA.changePct.toFixed(2)}%)
          </div>
          <canvas id="mini-chart" width="300" height="80"></canvas>
          <div class="price-stats">
            <div class="stat-item">
              <span class="stat-label">${t.high}</span>
              <span class="stat-val bullish">${GOLD_DATA.high.toLocaleString()}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">${t.low}</span>
              <span class="stat-val bearish">${GOLD_DATA.low.toLocaleString()}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">${t.open}</span>
              <span class="stat-val">${GOLD_DATA.open.toLocaleString()}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">${t.volume}</span>
              <span class="stat-val">${GOLD_DATA.volume}</span>
            </div>
          </div>
        </div>

        <!-- Technical Indicators -->
        <div class="analysis-card indicators-card">
          <h3>Technical Indicators</h3>
          <div class="indicator-row">
            <span class="ind-name">${t.rsi} (14)</span>
            <div class="ind-bar-wrap">
              <div class="ind-bar" style="width:${GOLD_DATA.rsi}%"></div>
            </div>
            <span class="ind-val ${GOLD_DATA.rsi > 70 ? 'bearish' : GOLD_DATA.rsi < 30 ? 'bullish' : 'neutral'}">${GOLD_DATA.rsi}</span>
          </div>
          <div class="indicator-row">
            <span class="ind-name">${t.macd}</span>
            <div class="ind-bar-wrap">
              <div class="ind-bar bullish-bar" style="width:65%"></div>
            </div>
            <span class="ind-val bullish">Bullish</span>
          </div>
          <div class="indicator-row">
            <span class="ind-name">EMA 20</span>
            <div class="ind-bar-wrap">
              <div class="ind-bar bullish-bar" style="width:72%"></div>
            </div>
            <span class="ind-val">${GOLD_DATA.ema20}</span>
          </div>
          <div class="indicator-row">
            <span class="ind-name">EMA 50</span>
            <div class="ind-bar-wrap">
              <div class="ind-bar bullish-bar" style="width:60%"></div>
            </div>
            <span class="ind-val">${GOLD_DATA.ema50}</span>
          </div>
          <div class="indicator-row">
            <span class="ind-name">EMA 200</span>
            <div class="ind-bar-wrap">
              <div class="ind-bar bullish-bar" style="width:40%"></div>
            </div>
            <span class="ind-val bullish">${GOLD_DATA.ema200}</span>
          </div>
          <div class="sentiment-block">
            <div class="sent-label">${t.sentiment}</div>
            <div class="sent-bar-outer">
              <div class="sent-bull" style="width:${GOLD_DATA.sentiment}%">
                <span>${GOLD_DATA.sentiment}% ${t.bullish}</span>
              </div>
              <div class="sent-bear" style="width:${100 - GOLD_DATA.sentiment}%">
                <span>${100 - GOLD_DATA.sentiment}% ${t.bearish}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Support / Resistance -->
        <div class="analysis-card sr-card">
          <h3>${t.support} & ${t.resistance}</h3>
          <div class="sr-list">
            ${GOLD_DATA.resistance.slice().reverse().map((r, i) => `
              <div class="sr-item resistance-item">
                <div class="sr-type">R${GOLD_DATA.resistance.length - i}</div>
                <div class="sr-price">${r.toLocaleString()}</div>
                <div class="sr-bar-out"><div class="sr-bar res-bar" style="width:${70 + i * 10}%"></div></div>
              </div>
            `).join('')}
            <div class="current-price-line">
              <span>▶ Current: ${GOLD_DATA.price}</span>
            </div>
            ${GOLD_DATA.support.map((s, i) => `
              <div class="sr-item support-item">
                <div class="sr-type">S${i + 1}</div>
                <div class="sr-price">${s.toLocaleString()}</div>
                <div class="sr-bar-out"><div class="sr-bar sup-bar" style="width:${70 + i * 10}%"></div></div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Trend Summary -->
        <div class="analysis-card trend-card">
          <h3>${t.trend}</h3>
          <div class="trend-badge ${trendClass}">${trendLabel}</div>
          <div class="timeframe-analysis">
            <div class="tf-row">
              <span class="tf-label">H1</span>
              <span class="tf-signal neutral">Neutral</span>
            </div>
            <div class="tf-row">
              <span class="tf-label">H4</span>
              <span class="tf-signal bullish">Bullish</span>
            </div>
            <div class="tf-row">
              <span class="tf-label">D1</span>
              <span class="tf-signal bullish">Bullish</span>
            </div>
            <div class="tf-row">
              <span class="tf-label">W1</span>
              <span class="tf-signal bullish">Bullish</span>
            </div>
          </div>
          <div class="analysis-disclaimer">
            ⚠️ For educational purposes only. Not financial advice.
          </div>
        </div>
      </div>

      <!-- Forex Overview -->
      <div class="forex-section">
        <h3>Forex Overview</h3>
        <div class="forex-grid">
          ${FOREX_DATA.map(fx => `
            <div class="forex-card">
              <div class="fx-pair">${fx.pair}</div>
              <div class="fx-price">${fx.price.toFixed(4)}</div>
              <div class="fx-change ${fx.change > 0 ? 'bullish' : 'bearish'}">
                ${fx.change > 0 ? '+' : ''}${fx.change.toFixed(4)} (${fx.changePct > 0 ? '+' : ''}${fx.changePct.toFixed(2)}%)
              </div>
              <div class="fx-trend ${fx.trend}">${fx.trend.toUpperCase()}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    drawMiniChart();
  }

  function drawMiniChart() {
    const canvas = document.getElementById('mini-chart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width, h = canvas.height;
    const data = PRICE_HISTORY;
    const min = Math.min(...data) - 10;
    const max = Math.max(...data) + 10;
    const range = max - min;
    const step = w / (data.length - 1);

    ctx.clearRect(0, 0, w, h);

    // Gradient fill
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, 'rgba(212, 175, 55, 0.3)');
    grad.addColorStop(1, 'rgba(212, 175, 55, 0.0)');

    ctx.beginPath();
    data.forEach((d, i) => {
      const x = i * step;
      const y = h - ((d - min) / range) * h;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    // Line
    ctx.beginPath();
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 1.5;
    data.forEach((d, i) => {
      const x = i * step;
      const y = h - ((d - min) / range) * h;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.stroke();
  }

  return { renderGoldDashboard, GOLD_DATA, FOREX_DATA };
})();

window.AnalysisModule = AnalysisModule;
