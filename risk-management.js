// TraderProf - Risk Management Module
const RiskModule = (() => {

  const JOURNAL_STORAGE_KEY = 'traderprof_journal';

  function getJournal() {
    try {
      return JSON.parse(localStorage.getItem(JOURNAL_STORAGE_KEY) || '[]');
    } catch(e) { return []; }
  }

  function saveJournal(entries) {
    localStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(entries));
  }

  function renderRiskTools(lang) {
    const t = window.TRANSLATIONS[lang].risk;
    const section = document.getElementById('risk-section');
    if (!section) return;

    section.innerHTML = `
      <div class="section-header">
        <span class="section-badge">Tools</span>
        <h2>${t.title}</h2>
        <p>${t.subtitle}</p>
      </div>

      <div class="risk-tabs">
        <button class="risk-tab active" data-tab="position">${t.posSize}</button>
        <button class="risk-tab" data-tab="rr">${t.rrCalc}</button>
        <button class="risk-tab" data-tab="journal">${t.journal}</button>
        <button class="risk-tab" data-tab="guide">Capital Guide</button>
      </div>

      <div class="risk-content" id="risk-content">
        ${renderPositionSizeCalc(t)}
      </div>
    `;

    // Tab switching
    section.querySelectorAll('.risk-tab').forEach(tab => {
      tab.addEventListener('click', function() {
        section.querySelectorAll('.risk-tab').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const tabName = this.dataset.tab;
        const content = document.getElementById('risk-content');
        if (tabName === 'position') content.innerHTML = renderPositionSizeCalc(t);
        else if (tabName === 'rr') content.innerHTML = renderRRCalc(t);
        else if (tabName === 'journal') content.innerHTML = renderJournal(t);
        else if (tabName === 'guide') content.innerHTML = renderCapitalGuide();
        bindCalculators();
      });
    });

    bindCalculators();
  }

  function renderPositionSizeCalc(t) {
    return `
      <div class="calc-card">
        <h3>📐 ${t.posSize}</h3>
        <div class="calc-grid">
          <div class="calc-input-group">
            <label>${t.accountSize}</label>
            <input type="number" id="acc-size" value="10000" min="100" step="100">
          </div>
          <div class="calc-input-group">
            <label>${t.riskPercent}</label>
            <input type="number" id="risk-pct" value="1" min="0.1" max="5" step="0.1">
            <div class="risk-slider-wrap">
              <input type="range" id="risk-slider" min="0.1" max="5" step="0.1" value="1">
              <div class="slider-labels"><span>0.1%</span><span>Conservative: 1%</span><span>5%</span></div>
            </div>
          </div>
          <div class="calc-input-group">
            <label>${t.slPips}</label>
            <input type="number" id="sl-pips" value="20" min="1" step="1">
          </div>
        </div>
        <button class="calc-btn" id="calc-pos-btn">${t.calculate}</button>
        <div class="calc-result" id="pos-result" style="display:none">
          <div class="result-header">${t.positionSize}</div>
          <div class="result-main" id="pos-result-val">--</div>
          <div class="result-details" id="pos-result-details"></div>
        </div>
        <div class="calc-disclaimer">
          ⚠️ This calculator provides educational estimates only. Actual position sizing depends on your broker's specifications and leverage settings.
        </div>
      </div>
    `;
  }

  function renderRRCalc(t) {
    return `
      <div class="calc-card">
        <h3>⚖️ ${t.rrCalc}</h3>
        <div class="calc-grid">
          <div class="calc-input-group">
            <label>${t.entry}</label>
            <input type="number" id="rr-entry" value="2640" step="0.01">
          </div>
          <div class="calc-input-group">
            <label>${t.sl}</label>
            <input type="number" id="rr-sl" value="2620" step="0.01">
          </div>
          <div class="calc-input-group">
            <label>${t.tp}</label>
            <input type="number" id="rr-tp" value="2680" step="0.01">
          </div>
        </div>
        <button class="calc-btn" id="calc-rr-btn">${t.calculate}</button>
        <div class="calc-result" id="rr-result" style="display:none">
          <div class="rr-stats">
            <div class="rr-stat">
              <div class="rrs-label">${t.ratio}</div>
              <div class="rrs-val" id="rr-ratio">--</div>
            </div>
            <div class="rr-stat">
              <div class="rrs-label">${t.potentialProfit}</div>
              <div class="rrs-val bullish" id="rr-profit">--</div>
            </div>
            <div class="rr-stat">
              <div class="rrs-label">${t.potentialLoss}</div>
              <div class="rrs-val bearish" id="rr-loss">--</div>
            </div>
          </div>
          <div class="rr-visual" id="rr-visual"></div>
        </div>
        <div class="calc-disclaimer">
          ⚠️ Results are for educational planning purposes only. Always verify with your broker.
        </div>
      </div>
    `;
  }

  function renderJournal(t) {
    const entries = getJournal();
    return `
      <div class="journal-card">
        <h3>📓 ${t.journal}</h3>
        <div class="journal-form">
          <div class="jf-row">
            <input type="text" id="j-asset" placeholder="Asset (e.g. XAU/USD)" />
            <select id="j-type">
              <option value="buy">Buy</option>
              <option value="sell">Sell</option>
            </select>
          </div>
          <div class="jf-row">
            <input type="number" id="j-entry" placeholder="Entry Price" step="0.01" />
            <input type="number" id="j-exit" placeholder="Exit Price" step="0.01" />
          </div>
          <div class="jf-row">
            <input type="number" id="j-size" placeholder="Position Size" step="0.01" />
            <input type="number" id="j-pnl" placeholder="P&L ($)" step="0.01" />
          </div>
          <textarea id="j-notes" placeholder="Trade notes, learnings, emotions..."></textarea>
          <button class="calc-btn" id="j-save-btn">+ Add Trade</button>
        </div>
        <div class="journal-entries" id="journal-entries">
          ${entries.length === 0 ? '<div class="journal-empty">No journal entries yet. Start tracking your trades above.</div>' :
            entries.slice().reverse().map((e, i) => renderJournalEntry(e, entries.length - 1 - i)).join('')
          }
        </div>
        ${entries.length > 0 ? `
          <div class="journal-stats">
            <div class="js-stat">
              <div class="jss-label">Total Trades</div>
              <div class="jss-val">${entries.length}</div>
            </div>
            <div class="js-stat">
              <div class="jss-label">Win Rate</div>
              <div class="jss-val bullish">${calcWinRate(entries)}%</div>
            </div>
            <div class="js-stat">
              <div class="jss-label">Total P&L</div>
              <div class="jss-val ${calcTotalPnL(entries) >= 0 ? 'bullish' : 'bearish'}">$${calcTotalPnL(entries).toFixed(2)}</div>
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }

  function renderJournalEntry(e, idx) {
    const pnlClass = (e.pnl || 0) >= 0 ? 'bullish' : 'bearish';
    return `
      <div class="journal-entry" data-idx="${idx}">
        <div class="je-header">
          <span class="je-asset">${e.asset}</span>
          <span class="je-type ${e.type}">${e.type.toUpperCase()}</span>
          <span class="je-pnl ${pnlClass}">$${parseFloat(e.pnl || 0).toFixed(2)}</span>
          <button class="je-delete" data-idx="${idx}">×</button>
        </div>
        <div class="je-details">
          Entry: ${e.entry || '--'} | Exit: ${e.exit || '--'} | Size: ${e.size || '--'}
        </div>
        ${e.notes ? `<div class="je-notes">${e.notes}</div>` : ''}
        <div class="je-date">${e.date}</div>
      </div>
    `;
  }

  function calcWinRate(entries) {
    if (!entries.length) return 0;
    const wins = entries.filter(e => parseFloat(e.pnl || 0) > 0).length;
    return ((wins / entries.length) * 100).toFixed(1);
  }

  function calcTotalPnL(entries) {
    return entries.reduce((sum, e) => sum + parseFloat(e.pnl || 0), 0);
  }

  function renderCapitalGuide() {
    const rules = [
      { icon: "🎯", title: "The 1-2% Rule", desc: "Never risk more than 1-2% of your total trading capital on a single trade. This ensures no single loss is catastrophic to your account." },
      { icon: "🛡️", title: "Always Use Stop-Losses", desc: "Every trade must have a predefined stop-loss. This is non-negotiable. Removing a stop-loss in the hope of recovery is one of the fastest ways to blow an account." },
      { icon: "⚖️", title: "Minimum 1:2 Risk/Reward", desc: "Aim for at least a 1:2 risk-to-reward ratio. This means you can be wrong 50% of the time and still break even — with good execution you can be profitable long-term." },
      { icon: "📊", title: "Diversify Your Trades", desc: "Avoid putting all your capital into a single trade or correlated pairs simultaneously. Spread risk across different setups and timeframes." },
      { icon: "📝", title: "Track Everything", desc: "Maintain a trading journal. Record every trade — entry, exit, reason, emotion, and outcome. Review weekly to identify patterns in your performance." },
      { icon: "🧘", title: "Protect Your Psychology", desc: "Define maximum daily/weekly loss limits. If you hit your limit, stop trading for that period. Emotional trading after losses amplifies damage." },
      { icon: "📉", title: "Reduce Size in Drawdowns", desc: "If you enter a losing streak, reduce your position size. Return to full sizing only after demonstrating consistent performance on smaller positions." },
      { icon: "⚠️", title: "Understand Leverage", desc: "High leverage amplifies both gains and losses. Use leverage conservatively. A 10% move against a 10x leverage position wipes out 100% of your capital." }
    ];

    return `
      <div class="guide-card">
        <h3>💼 Capital Management Guide</h3>
        <div class="disclaimer-box">
          Trading involves significant risk of loss. The guidelines below are educational principles, not guarantees of profitability. Always consult a qualified financial advisor before trading.
        </div>
        <div class="rules-grid">
          ${rules.map(r => `
            <div class="rule-card">
              <div class="rule-icon">${r.icon}</div>
              <div class="rule-title">${r.title}</div>
              <div class="rule-desc">${r.desc}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function bindCalculators() {
    // Position size calculator
    const calcPosBtn = document.getElementById('calc-pos-btn');
    if (calcPosBtn) {
      calcPosBtn.addEventListener('click', () => {
        const acc = parseFloat(document.getElementById('acc-size').value) || 10000;
        const riskPct = parseFloat(document.getElementById('risk-pct').value) || 1;
        const slPips = parseFloat(document.getElementById('sl-pips').value) || 20;
        const riskAmount = acc * (riskPct / 100);
        const posSize = (riskAmount / slPips).toFixed(2);
        const result = document.getElementById('pos-result');
        const resultVal = document.getElementById('pos-result-val');
        const resultDetails = document.getElementById('pos-result-details');
        result.style.display = 'block';
        resultVal.textContent = `${posSize} units`;
        resultDetails.innerHTML = `
          Risk Amount: <strong>$${riskAmount.toFixed(2)}</strong> |
          Max Loss: <strong>$${riskAmount.toFixed(2)}</strong> |
          Risk %: <strong>${riskPct}%</strong>
        `;
      });

      const slider = document.getElementById('risk-slider');
      const riskInput = document.getElementById('risk-pct');
      if (slider && riskInput) {
        slider.addEventListener('input', () => { riskInput.value = slider.value; });
        riskInput.addEventListener('input', () => { slider.value = riskInput.value; });
      }
    }

    // R/R Calculator
    const calcRRBtn = document.getElementById('calc-rr-btn');
    if (calcRRBtn) {
      calcRRBtn.addEventListener('click', () => {
        const entry = parseFloat(document.getElementById('rr-entry').value) || 0;
        const sl = parseFloat(document.getElementById('rr-sl').value) || 0;
        const tp = parseFloat(document.getElementById('rr-tp').value) || 0;
        const risk = Math.abs(entry - sl);
        const reward = Math.abs(tp - entry);
        const ratio = risk > 0 ? (reward / risk).toFixed(2) : 0;
        const result = document.getElementById('rr-result');
        result.style.display = 'block';
        document.getElementById('rr-ratio').textContent = `1 : ${ratio}`;
        document.getElementById('rr-profit').textContent = `+${reward.toFixed(2)}`;
        document.getElementById('rr-loss').textContent = `-${risk.toFixed(2)}`;
        const visual = document.getElementById('rr-visual');
        const total = reward + risk;
        const profitWidth = total > 0 ? (reward / total * 100).toFixed(1) : 50;
        visual.innerHTML = `
          <div class="rr-bar">
            <div class="rr-loss-bar" style="width:${100 - profitWidth}%">SL</div>
            <div class="rr-profit-bar" style="width:${profitWidth}%">TP</div>
          </div>
          <div class="rr-quality ${ratio >= 2 ? 'good' : ratio >= 1 ? 'ok' : 'poor'}">
            ${ratio >= 2 ? '✅ Good R/R Ratio' : ratio >= 1 ? '⚠️ Acceptable R/R Ratio' : '❌ Poor R/R Ratio — Consider Adjusting'}
          </div>
        `;
      });
    }

    // Journal save
    const jSaveBtn = document.getElementById('j-save-btn');
    if (jSaveBtn) {
      jSaveBtn.addEventListener('click', () => {
        const entry = {
          date: new Date().toLocaleDateString(),
          asset: document.getElementById('j-asset').value || 'N/A',
          type: document.getElementById('j-type').value,
          entry: document.getElementById('j-entry').value,
          exit: document.getElementById('j-exit').value,
          size: document.getElementById('j-size').value,
          pnl: document.getElementById('j-pnl').value,
          notes: document.getElementById('j-notes').value
        };
        const journal = getJournal();
        journal.push(entry);
        saveJournal(journal);
        // Refresh journal tab
        const content = document.getElementById('risk-content');
        if (content) {
          content.innerHTML = renderJournal(window.TRANSLATIONS[window.currentLang || 'en'].risk);
          bindCalculators();
        }
      });

      // Delete entries
      document.querySelectorAll('.je-delete').forEach(btn => {
        btn.addEventListener('click', function() {
          const idx = parseInt(this.dataset.idx);
          const journal = getJournal();
          journal.splice(idx, 1);
          saveJournal(journal);
          const content = document.getElementById('risk-content');
          if (content) {
            content.innerHTML = renderJournal(window.TRANSLATIONS[window.currentLang || 'en'].risk);
            bindCalculators();
          }
        });
      });
    }
  }

  return { renderRiskTools };
})();

window.RiskModule = RiskModule;
