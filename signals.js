// TraderProf - Trade Ideas Module
const SignalsModule = (() => {
  const TRADE_IDEAS = [
    {
      id: 1,
      asset: "XAU/USD",
      type: "buy",
      entryZone: "2630 – 2645",
      stopLoss: "2610",
      takeProfits: ["2670", "2700", "2730"],
      rr: "1:2.5",
      status: "active",
      rationale: "Price consolidating above key EMA 50 support. Bullish structure maintained. RSI recovering from oversold on H4.",
      posted: "2025-01-15",
      tags: ["EMA", "RSI", "Support Zone"]
    },
    {
      id: 2,
      asset: "XAU/USD",
      type: "sell",
      entryZone: "2700 – 2715",
      stopLoss: "2730",
      takeProfits: ["2670", "2645", "2615"],
      rr: "1:2.0",
      status: "pending",
      rationale: "Major resistance cluster at 2700–2715 zone. Bearish divergence on RSI daily. Watch for rejection candles.",
      posted: "2025-01-14",
      tags: ["Resistance", "Divergence", "H4 Setup"]
    },
    {
      id: 3,
      asset: "EUR/USD",
      type: "buy",
      entryZone: "1.0820 – 1.0840",
      stopLoss: "1.0790",
      takeProfits: ["1.0880", "1.0920"],
      rr: "1:2.0",
      status: "active",
      rationale: "Key daily support holding. EMA 200 confluence. Dollar weakness expected ahead of Fed commentary.",
      posted: "2025-01-13",
      tags: ["EMA 200", "Daily Support", "Macro"]
    },
    {
      id: 4,
      asset: "XAU/USD",
      type: "buy",
      entryZone: "2580 – 2595",
      stopLoss: "2560",
      takeProfits: ["2630", "2660"],
      rr: "1:2.3",
      status: "closed",
      rationale: "Historical analysis: Demand zone respected. Price reached TP1 and TP2. Educational example of a planned setup.",
      posted: "2025-01-10",
      tags: ["Demand Zone", "Historical Example"]
    },
    {
      id: 5,
      asset: "GBP/USD",
      type: "sell",
      entryZone: "1.2680 – 1.2700",
      stopLoss: "1.2730",
      takeProfits: ["1.2620", "1.2580"],
      rr: "1:2.0",
      status: "pending",
      rationale: "Supply zone rejection expected. UK macro uncertainty. Bearish engulfing pattern on daily chart.",
      posted: "2025-01-12",
      tags: ["Supply Zone", "Pattern", "Macro"]
    },
    {
      id: 6,
      asset: "XAU/USD",
      type: "buy",
      entryZone: "2615 – 2625",
      stopLoss: "2598",
      takeProfits: ["2658", "2680", "2710"],
      rr: "1:3.0",
      status: "active",
      rationale: "Strong support structure. EMA 20 and EMA 50 convergence. Bullish momentum building on H4 MACD.",
      posted: "2025-01-15",
      tags: ["EMA Convergence", "MACD", "Structure"]
    }
  ];

  function renderSignals(lang) {
    const t = window.TRANSLATIONS[lang].signals;
    const section = document.getElementById('signals-section');
    if (!section) return;

    section.innerHTML = `
      <div class="section-header">
        <span class="section-badge">Ideas</span>
        <h2>${t.title}</h2>
        <p>${t.subtitle}</p>
      </div>
      <div class="signals-warning">
        <span class="warn-icon">⚠️</span>
        <span>${t.warning}</span>
      </div>
      <div class="signals-filters">
        <button class="filter-btn active" data-filter="all">All</button>
        <button class="filter-btn" data-filter="active">${t.active}</button>
        <button class="filter-btn" data-filter="pending">${t.pending}</button>
        <button class="filter-btn" data-filter="closed">${t.closed}</button>
        <button class="filter-btn" data-type="buy">${t.buy}</button>
        <button class="filter-btn" data-type="sell">${t.sell}</button>
      </div>
      <div class="signals-grid" id="signals-grid">
        ${TRADE_IDEAS.map(idea => renderSignalCard(idea, t)).join('')}
      </div>
    `;

    // Filter functionality
    section.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        section.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const filter = this.dataset.filter;
        const type = this.dataset.type;
        const cards = section.querySelectorAll('.signal-card');
        cards.forEach(card => {
          const status = card.dataset.status;
          const cardType = card.dataset.type;
          if (filter === 'all' && !type) {
            card.style.display = '';
          } else if (filter && !type) {
            card.style.display = status === filter ? '' : 'none';
          } else if (type && !filter) {
            card.style.display = cardType === type ? '' : 'none';
          }
        });
      });
    });
  }

  function renderSignalCard(idea, t) {
    const typeClass = idea.type === 'buy' ? 'buy-card' : 'sell-card';
    const typeLabel = idea.type === 'buy' ? t.buy : t.sell;
    const statusClass = idea.status === 'active' ? 'status-active' : idea.status === 'pending' ? 'status-pending' : 'status-closed';
    const statusLabel = idea.status === 'active' ? t.active : idea.status === 'pending' ? t.pending : t.closed;

    return `
      <div class="signal-card ${typeClass}" data-status="${idea.status}" data-type="${idea.type}">
        <div class="signal-header">
          <div class="signal-asset">${idea.asset}</div>
          <div class="signal-type ${idea.type}">${typeLabel}</div>
          <div class="signal-status ${statusClass}">${statusLabel}</div>
        </div>
        <div class="signal-body">
          <div class="signal-detail">
            <span class="sd-label">${t.entry}</span>
            <span class="sd-val">${idea.entryZone}</span>
          </div>
          <div class="signal-detail">
            <span class="sd-label">${t.sl}</span>
            <span class="sd-val bearish">${idea.stopLoss}</span>
          </div>
          <div class="signal-detail">
            <span class="sd-label">${t.tp}</span>
            <span class="sd-val bullish">${idea.takeProfits.join(' / ')}</span>
          </div>
          <div class="signal-detail">
            <span class="sd-label">${t.rr}</span>
            <span class="sd-val highlight">${idea.rr}</span>
          </div>
        </div>
        <div class="signal-rationale">
          <div class="rationale-title">Analysis</div>
          <p>${idea.rationale}</p>
        </div>
        <div class="signal-tags">
          ${idea.tags.map(tag => `<span class="signal-tag">${tag}</span>`).join('')}
        </div>
        <div class="signal-date">Posted: ${idea.posted}</div>
        <div class="signal-disclaimer">Educational purposes only — not financial advice</div>
      </div>
    `;
  }

  return { renderSignals, TRADE_IDEAS };
})();

window.SignalsModule = SignalsModule;
