/* ============================================================
   Design Studio · main logic
   v0.12.0 — split from studio.html
   ============================================================ */
'use strict';

// ============================================================
// DEFAULT TOKENS (matches index.html v0.9 morcept theme)
// ============================================================
const DEFAULT_TOKENS = {
    light: {
        '--bg':            { value: '#ffffff', group: 'Backgrounds' },
        '--bg-soft':       { value: '#fafafa', group: 'Backgrounds' },
        '--bg-section':    { value: '#f5f5f5', group: 'Backgrounds' },
        '--text':          { value: '#222222', group: 'Text' },
        '--text-secondary':{ value: '#555555', group: 'Text' },
        '--text-muted':    { value: '#999999', group: 'Text' },
        '--border':        { value: '#e8e8e8', group: 'Borders' },
        '--border-strong': { value: '#d4d4d4', group: 'Borders' },
        '--accent':        { value: '#222222', group: 'Accent' },
        '--accent-hover':  { value: '#000000', group: 'Accent' },
    },
    dark: {
        '--bg':            { value: '#0e0e10', group: 'Backgrounds' },
        '--bg-soft':       { value: '#161618', group: 'Backgrounds' },
        '--bg-section':    { value: '#1c1c1f', group: 'Backgrounds' },
        '--text':          { value: '#f0f0f0', group: 'Text' },
        '--text-secondary':{ value: '#b0b0b0', group: 'Text' },
        '--text-muted':    { value: '#707070', group: 'Text' },
        '--border':        { value: '#2a2a2e', group: 'Borders' },
        '--border-strong': { value: '#3a3a3f', group: 'Borders' },
        '--accent':        { value: '#f0f0f0', group: 'Accent' },
        '--accent-hover':  { value: '#ffffff', group: 'Accent' },
    }
};
const GROUPS = ['Backgrounds', 'Text', 'Borders', 'Accent'];

const DEFAULT_FONT_SERIF = "'Noto Sans TC', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif";
const DEFAULT_FONT_MONO  = "'JetBrains Mono', ui-monospace, SFMono-Regular, monospace";

const FONT_PRESETS = {
    serif: [
        { name: 'Default', value: DEFAULT_FONT_SERIF },
        { name: 'Inter', value: "'Inter', sans-serif" },
        { name: 'System', value: "system-ui, -apple-system, sans-serif" },
        { name: 'Georgia', value: "Georgia, 'Times New Roman', serif" },
    ],
    mono: [
        { name: 'JetBrains', value: DEFAULT_FONT_MONO },
        { name: 'Fira Code', value: "'Fira Code', monospace" },
        { name: 'IBM Plex', value: "'IBM Plex Mono', monospace" },
        { name: 'System', value: "ui-monospace, SFMono-Regular, monospace" },
    ]
};

const SHADOW_PRESETS = {
    none:   { soft: 'none',                                                            hover: 'none' },
    subtle: { soft: '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.03)',          hover: '0 8px 24px rgba(0,0,0,0.08), 0 4px 8px rgba(0,0,0,0.04)' },
    medium: { soft: '0 4px 12px rgba(0,0,0,0.06), 0 2px 4px rgba(0,0,0,0.04)',         hover: '0 16px 40px rgba(0,0,0,0.10), 0 8px 16px rgba(0,0,0,0.06)' },
    strong: { soft: '0 8px 24px rgba(0,0,0,0.10), 0 4px 8px rgba(0,0,0,0.06)',         hover: '0 24px 56px rgba(0,0,0,0.16), 0 12px 24px rgba(0,0,0,0.10)' }
};

const DEFAULT_DESIGN = {
    radiusCard: '12px',
    shadowPreset: 'subtle',
    fontSerif: DEFAULT_FONT_SERIF,
    fontMono: DEFAULT_FONT_MONO
};

// ============================================================
// THEME PRESETS
// ============================================================
const PRESETS = {
    morcept: {
        name: 'Morcept',
        swatches: ['#ffffff', '#222222', '#999999'],
        light: {'--bg':'#ffffff','--bg-soft':'#fafafa','--bg-section':'#f5f5f5','--text':'#222222','--text-secondary':'#555555','--text-muted':'#999999','--border':'#e8e8e8','--border-strong':'#d4d4d4','--accent':'#222222','--accent-hover':'#000000'},
        dark:  {'--bg':'#0e0e10','--bg-soft':'#161618','--bg-section':'#1c1c1f','--text':'#f0f0f0','--text-secondary':'#b0b0b0','--text-muted':'#707070','--border':'#2a2a2e','--border-strong':'#3a3a3f','--accent':'#f0f0f0','--accent-hover':'#ffffff'}
    },
    mono: {
        name: 'Mono',
        swatches: ['#ffffff', '#000000', '#888888'],
        light: {'--bg':'#ffffff','--bg-soft':'#f5f5f5','--bg-section':'#eeeeee','--text':'#000000','--text-secondary':'#444444','--text-muted':'#888888','--border':'#dddddd','--border-strong':'#bbbbbb','--accent':'#000000','--accent-hover':'#222222'},
        dark:  {'--bg':'#000000','--bg-soft':'#0a0a0a','--bg-section':'#141414','--text':'#ffffff','--text-secondary':'#cccccc','--text-muted':'#888888','--border':'#2a2a2a','--border-strong':'#444444','--accent':'#ffffff','--accent-hover':'#eeeeee'}
    },
    paper: {
        name: 'Paper',
        swatches: ['#fbf8f3', '#3d2f1f', '#8b4513'],
        light: {'--bg':'#fbf8f3','--bg-soft':'#f5f0e5','--bg-section':'#eee7d8','--text':'#3d2f1f','--text-secondary':'#6b5742','--text-muted':'#9a8970','--border':'#d9cdb6','--border-strong':'#b8a78a','--accent':'#8b4513','--accent-hover':'#6b3410'},
        dark:  {'--bg':'#1a1410','--bg-soft':'#211a14','--bg-section':'#2a2218','--text':'#f0e5d0','--text-secondary':'#c5b89e','--text-muted':'#8a7960','--border':'#3a2f24','--border-strong':'#54462f','--accent':'#d4a574','--accent-hover':'#e8b884'}
    },
    ocean: {
        name: 'Ocean',
        swatches: ['#f7fbfd', '#0c2a3d', '#0369a1'],
        light: {'--bg':'#f7fbfd','--bg-soft':'#eef6fa','--bg-section':'#e0eef4','--text':'#0c2a3d','--text-secondary':'#3a5e7a','--text-muted':'#7a98aa','--border':'#c5dde8','--border-strong':'#9ec0d4','--accent':'#0369a1','--accent-hover':'#024c75'},
        dark:  {'--bg':'#0a1922','--bg-soft':'#0f2230','--bg-section':'#15303f','--text':'#e0eef5','--text-secondary':'#a8c4d4','--text-muted':'#647e8e','--border':'#1f3a4b','--border-strong':'#2f5165','--accent':'#38bdf8','--accent-hover':'#56cef9'}
    },
    forest: {
        name: 'Forest',
        swatches: ['#fafdf9', '#1a2e1a', '#2d6a3a'],
        light: {'--bg':'#fafdf9','--bg-soft':'#f1f7ed','--bg-section':'#e2efdc','--text':'#1a2e1a','--text-secondary':'#3d5a3d','--text-muted':'#7a907a','--border':'#c4d6c0','--border-strong':'#9bb89b','--accent':'#2d6a3a','--accent-hover':'#1f5028'},
        dark:  {'--bg':'#0c1410','--bg-soft':'#11201a','--bg-section':'#1a2e22','--text':'#e0ebd9','--text-secondary':'#b5c8a8','--text-muted':'#677a5e','--border':'#243024','--border-strong':'#3a4a34','--accent':'#4ade80','--accent-hover':'#65e495'}
    }
};

// ============================================================
// MOVABLE CONTAINERS (items within panels)
// ============================================================
const CONTAINERS = {
    experience: {
        childSelector: '.exp-item',
        getId: el => el.querySelector('.exp-title')?.dataset.i18n || el.querySelector('.exp-title')?.textContent.trim()
    },
    projects: {
        childSelector: '.project-item',
        getId: el => el.querySelector('.project-name')?.dataset.i18n || el.querySelector('.project-name')?.textContent.trim().split(' ')[0]
    },
    education: {
        childSelector: '.edu-item',
        getId: el => el.querySelector('.edu-school')?.dataset.i18n
    },
    certifications: {
        childSelector: '.cert-item',
        getId: el => el.querySelector('.cert-name')?.dataset.i18n
    },
    languages: {
        childSelector: '.lang-item',
        getId: el => el.querySelector('.lang-name')?.textContent.trim()
    }
};

// ============================================================
// STATE
// ============================================================
const STORAGE_KEY = 'studio_state_v3';
const STUDIO_VERSION = '0.12.0-M2+';

function defaultTokensFlat() {
    const out = { light: {}, dark: {} };
    for (const m of ['light', 'dark']) {
        for (const [k, v] of Object.entries(DEFAULT_TOKENS[m])) out[m][k] = v.value;
    }
    return out;
}

function loadState() {
    try {
        const s = JSON.parse(localStorage.getItem(STORAGE_KEY));
        if (s && s.tokens && s.tokens.light && s.tokens.dark) {
            s.textPatches ??= {};
            s.movePatches ??= {};
            s.panelLayout ??= null;
            s.history ??= [];
            s.redoStack ??= [];
            s.currentPreset ??= 'morcept';
            s.textEditMode ??= false;
            s.moveMode ??= false;
            s.sidebarWidth ??= null;
            s.viewport ??= 'auto';
            s.designTokens ??= { ...DEFAULT_DESIGN };
            s.elementOverrides ??= [];
            s.inspectMode ??= false;
            return s;
        }
    } catch (e) {}
    return {
        tokens: defaultTokensFlat(),
        darkMode: false,
        textPatches: {},
        movePatches: {},
        panelLayout: null,
        history: [],
        redoStack: [],
        currentPreset: 'morcept',
        textEditMode: false,
        moveMode: false,
        sidebarWidth: null,
        viewport: 'auto',
        designTokens: { ...DEFAULT_DESIGN },
        elementOverrides: [],
        inspectMode: false
    };
}

function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

const state = loadState();
const iframe = document.getElementById('preview');
let dragSrc = null;

// ============================================================
// HISTORY (Undo)
// ============================================================
function snapshotState() {
    return {
        tokens: structuredClone(state.tokens),
        textPatches: structuredClone(state.textPatches),
        movePatches: structuredClone(state.movePatches),
        panelLayout: state.panelLayout ? structuredClone(state.panelLayout) : null,
        darkMode: state.darkMode,
        currentPreset: state.currentPreset,
        designTokens: structuredClone(state.designTokens),
        elementOverrides: structuredClone(state.elementOverrides || [])
    };
}

function pushHistory(label, clearRedo = true) {
    state.history.push({ snapshot: snapshotState(), label, time: Date.now() });
    if (state.history.length > 50) state.history.shift();
    if (clearRedo) state.redoStack = [];
    updateHistoryBtns();
}

function restoreSnapshot(s) {
    state.tokens = s.tokens;
    state.textPatches = s.textPatches;
    state.movePatches = s.movePatches;
    state.panelLayout = s.panelLayout;
    state.darkMode = s.darkMode;
    state.currentPreset = s.currentPreset;
    state.designTokens = s.designTokens || { ...DEFAULT_DESIGN };
    state.elementOverrides = s.elementOverrides || [];
}

function undo() {
    if (state.history.length === 0) {
        toast('沒有可還原的步驟');
        return;
    }
    state.redoStack.push({ snapshot: snapshotState(), label: state.history[state.history.length - 1].label });
    if (state.redoStack.length > 50) state.redoStack.shift();
    const entry = state.history.pop();
    restoreSnapshot(entry.snapshot);
    saveState();
    renderControls();
    iframe.src = '../index.html';
    updateChangeCount();
    updateHistoryBtns();
    toast('↶ 已還原：' + entry.label);
}

function redo() {
    if (state.redoStack.length === 0) {
        toast('沒有可重做的步驟');
        return;
    }
    state.history.push({ snapshot: snapshotState(), label: state.redoStack[state.redoStack.length - 1].label, time: Date.now() });
    if (state.history.length > 50) state.history.shift();
    const entry = state.redoStack.pop();
    restoreSnapshot(entry.snapshot);
    saveState();
    renderControls();
    iframe.src = '../index.html';
    updateChangeCount();
    updateHistoryBtns();
    toast('↷ 已重做：' + entry.label);
}

function updateHistoryBtns() {
    document.getElementById('undo-btn').disabled = state.history.length === 0;
    document.getElementById('redo-btn').disabled = state.redoStack.length === 0;
}
const updateUndoBtn = updateHistoryBtns;

// ============================================================
// TOKEN ROW RENDERING
// ============================================================
function isValidHex(v) {
    return /^#[0-9a-fA-F]{6}$/.test(v);
}

function buildTokenRow(mode, varName, value) {
    const row = document.createElement('div');
    row.className = 'token-row';
    row.innerHTML = `
        <div class="swatch" style="--c:${value}">
            <input type="color" value="${value}" data-mode="${mode}" data-var="${varName}" data-kind="color">
        </div>
        <div class="token-name" title="${varName}">${varName}</div>
        <input type="text" class="token-hex" value="${value}" data-mode="${mode}" data-var="${varName}" data-kind="hex" maxlength="7" spellcheck="false">
    `;
    return row;
}

function renderControls() {
    for (const mode of ['light', 'dark']) {
        const container = document.getElementById(`${mode}-tokens`);
        container.innerHTML = '';
        for (const groupName of GROUPS) {
            const groupDiv = document.createElement('div');
            groupDiv.className = 'token-group';
            const title = document.createElement('div');
            title.className = 'token-group-title';
            title.textContent = groupName;
            groupDiv.appendChild(title);
            for (const [varName, meta] of Object.entries(DEFAULT_TOKENS[mode])) {
                if (meta.group !== groupName) continue;
                groupDiv.appendChild(buildTokenRow(mode, varName, state.tokens[mode][varName]));
            }
            container.appendChild(groupDiv);
        }
    }
    renderPresets();
    updateActiveSection();
    updateChangeCount();
    updateUndoBtn();
    updateToggleStates();
}

function renderPresets() {
    const grid = document.getElementById('preset-grid');
    grid.innerHTML = '';
    for (const [key, preset] of Object.entries(PRESETS)) {
        const btn = document.createElement('button');
        btn.className = 'preset-btn' + (state.currentPreset === key ? ' active' : '');
        btn.dataset.preset = key;
        btn.innerHTML = `
            <div class="preset-swatches">
                ${preset.swatches.map(c => `<span style="background:${c}"></span>`).join('')}
            </div>
            <span class="preset-name">${preset.name}</span>
        `;
        btn.addEventListener('click', () => applyPreset(key));
        grid.appendChild(btn);
    }
}

function updateActiveSection() {
    document.getElementById('section-light').classList.toggle('active', !state.darkMode);
    document.getElementById('section-dark').classList.toggle('active', state.darkMode);
    document.getElementById('light-pill').style.display = state.darkMode ? 'none' : '';
    document.getElementById('dark-pill').style.display = state.darkMode ? '' : 'none';
    document.getElementById('meta-mode').textContent = state.darkMode ? 'dark' : 'light';
    const btn = document.getElementById('mode-toggle');
    btn.innerHTML = state.darkMode ? '<span>◑</span><span class="lbl">Dark</span>' : '<span>◐</span><span class="lbl">Light</span>';
}

function updateToggleStates() {
    document.getElementById('text-edit-toggle').classList.toggle('active', state.textEditMode);
    document.getElementById('move-toggle').classList.toggle('active', state.moveMode);
    document.getElementById('info-text').classList.toggle('show', state.textEditMode);
    document.getElementById('info-move').classList.toggle('show', state.moveMode);
}

function countChanges() {
    const defaults = defaultTokensFlat();
    let n = 0;
    for (const m of ['light', 'dark']) {
        for (const [k, v] of Object.entries(state.tokens[m])) {
            if (defaults[m][k].toLowerCase() !== v.toLowerCase()) n++;
        }
    }
    n += Object.keys(state.textPatches).length;
    n += Object.keys(state.movePatches).length;
    if (state.panelLayout) n += 1;
    return n;
}

function updateChangeCount() {
    const n = countChanges();
    const el = document.getElementById('meta-changes');
    el.textContent = n === 1 ? '1 change' : `${n} changes`;
    el.classList.toggle('has-changes', n > 0);
}

// ============================================================
// IFRAME OVERRIDES
// ============================================================
function buildOverridesCss() {
    const dt = state.designTokens || DEFAULT_DESIGN;
    const sh = SHADOW_PRESETS[dt.shadowPreset] || SHADOW_PRESETS.subtle;
    const designCss = `--radius-card: ${dt.radiusCard}; --shadow-soft: ${sh.soft}; --shadow-hover: ${sh.hover}; --serif: ${dt.fontSerif}; --mono: ${dt.fontMono};`;
    const lightCss = Object.entries(state.tokens.light).map(([k, v]) => `${k}: ${v};`).join(' ');
    const darkCss = Object.entries(state.tokens.dark).map(([k, v]) => `${k}: ${v};`).join(' ');
    return `:root { ${lightCss} ${designCss} } body.dark-mode { ${darkCss} ${designCss} } .ctrl-btns, .export-btn { display: none !important; }`;
}

function injectOverrideStyle(doc) {
    let style = doc.getElementById('studio-overrides');
    if (!style) {
        style = doc.createElement('style');
        style.id = 'studio-overrides';
        doc.head.appendChild(style);
    }
    style.textContent = buildOverridesCss();
}

function getPanelTitle(panel) {
    return panel.querySelector('.panel-title')?.textContent.trim();
}

function applyPanelLayout(doc) {
    if (!state.panelLayout) return;
    const grid = doc.querySelector('.main-grid');
    if (!grid) return;
    const cols = grid.children;
    if (cols.length < 2) return;
    const allPanels = doc.querySelectorAll('.main-grid > div > .panel');
    const byTitle = new Map();
    allPanels.forEach(p => {
        const t = getPanelTitle(p);
        if (t) byTitle.set(t, p);
    });
    state.panelLayout.left?.forEach(title => {
        const p = byTitle.get(title);
        if (p) cols[0].appendChild(p);
    });
    state.panelLayout.right?.forEach(title => {
        const p = byTitle.get(title);
        if (p) cols[1].appendChild(p);
    });
}

function applyContainerReorders(doc) {
    for (const [key, order] of Object.entries(state.movePatches)) {
        const cfg = CONTAINERS[key];
        if (!cfg) continue;
        const sample = doc.querySelector(cfg.childSelector);
        if (!sample) continue;
        const parent = sample.parentElement;
        const children = Array.from(parent.querySelectorAll(`:scope > ${cfg.childSelector}`));
        const byId = new Map();
        children.forEach(el => byId.set(cfg.getId(el), el));
        const usedIds = new Set();
        for (const id of order) {
            const el = byId.get(id);
            if (el) { parent.appendChild(el); usedIds.add(id); }
        }
        // Remove unmatched (= deleted)
        for (const el of children) {
            if (!usedIds.has(cfg.getId(el))) el.remove();
        }
    }
}

function applyTextPatches(doc) {
    for (const [key, html] of Object.entries(state.textPatches)) {
        const el = doc.querySelector(`[data-i18n="${CSS.escape(key)}"]`);
        if (el) el.innerHTML = html;
    }
}

function applyToIframe() {
    const doc = iframe.contentDocument;
    if (!doc || !doc.body) return;
    injectOverrideStyle(doc);
    applyPanelLayout(doc);
    applyContainerReorders(doc);
    applyTextPatches(doc);
    if (typeof applyElementOverrides === 'function') applyElementOverrides(doc);
    doc.body.classList.toggle('dark-mode', state.darkMode);
    // Re-apply mode states
    setTextEditMode(state.textEditMode);
    setMoveMode(state.moveMode);
    if (typeof setInspectMode === 'function') setInspectMode(state.inspectMode);
}

// Text Edit + Move Mode + iframe listeners moved to studio-modes.js (1000-line rule)

// ============================================================
// TOAST
// ============================================================
function toast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => t.classList.remove('show'), 1900);
}

// Export functions (buildPatch / exportTokensCSS / exportPatch) live in studio-export.js
// to comply with the 1000-line file split rule.

// ============================================================
// PRESET APPLY
// ============================================================
function applyPreset(key) {
    const preset = PRESETS[key];
    if (!preset) return;
    pushHistory('preset:' + key);
    state.tokens = {
        light: structuredClone(preset.light),
        dark: structuredClone(preset.dark)
    };
    state.currentPreset = key;
    saveState();
    renderControls();
    applyToIframe();
    updateChangeCount();
    toast(`套用 ${preset.name} 主題`);
}

// ============================================================
// TOKEN CHANGE HANDLER
// ============================================================
let activeTokenSession = null;
let tokenSessionTimer = null;

function handleTokenChange(e) {
    const t = e.target;
    if (!t.dataset?.var) return;
    const mode = t.dataset.mode;
    const varName = t.dataset.var;
    let val = t.value.trim();
    if (t.dataset.kind === 'hex') {
        if (!val.startsWith('#')) val = '#' + val;
        if (!isValidHex(val)) {
            t.classList.add('invalid');
            return;
        }
        t.classList.remove('invalid');
    }
    val = val.toLowerCase();
    if (state.tokens[mode][varName] === val) return;
    const sessionKey = mode + ':' + varName;
    if (activeTokenSession !== sessionKey) {
        pushHistory('token:' + varName);
        activeTokenSession = sessionKey;
    }
    clearTimeout(tokenSessionTimer);
    tokenSessionTimer = setTimeout(() => { activeTokenSession = null; }, 800);

    state.tokens[mode][varName] = val;
    const row = t.closest('.token-row');
    if (row) {
        row.querySelector('.swatch').style.setProperty('--c', val);
        row.querySelectorAll(`input[data-var="${varName}"][data-mode="${mode}"]`).forEach(inp => {
            if (inp !== t) inp.value = val;
        });
    }
    applyToIframe();
    saveState();
    updateChangeCount();
}

// ============================================================
// MODE / RESET / TOGGLES
// ============================================================
function toggleMode() {
    pushHistory('mode-toggle');
    state.darkMode = !state.darkMode;
    updateActiveSection();
    applyToIframe();
    saveState();
}

function resetAll() {
    if (countChanges() > 0 && !confirm('清空所有修改回到 Morcept 預設？\n（包含 token、文字編輯、排序）')) return;
    pushHistory('reset');
    state.tokens = defaultTokensFlat();
    state.textPatches = {};
    state.movePatches = {};
    state.panelLayout = null;
    state.currentPreset = 'morcept';
    saveState();
    renderControls();
    iframe.src = '../index.html';
    toast('已重置為 Morcept 預設');
}

function toggleTextEdit() {
    if (!state.textEditMode && state.moveMode) {
        setMoveMode(false);
    }
    setTextEditMode(!state.textEditMode);
    saveState();
}

function toggleMoveMode() {
    if (!state.moveMode && state.textEditMode) {
        setTextEditMode(false);
    }
    setMoveMode(!state.moveMode);
    saveState();
}

// ============================================================
// RESPONSIVE VIEWPORT
// ============================================================
function setViewport(vw) {
    state.viewport = vw || 'auto';
    const wrap = document.getElementById('preview-wrap');
    if (state.viewport === 'auto') {
        wrap.classList.remove('constrained');
        iframe.style.maxWidth = '';
    } else {
        wrap.classList.add('constrained');
        iframe.style.maxWidth = state.viewport + 'px';
    }
    document.querySelectorAll('#viewport-selector button').forEach(b => {
        b.classList.toggle('active', b.dataset.vw === state.viewport);
    });
    saveState();
}

function initViewportSelector() {
    document.querySelectorAll('#viewport-selector button').forEach(b => {
        b.addEventListener('click', () => setViewport(b.dataset.vw));
    });
    setViewport(state.viewport);
}

// ============================================================
// EXPORT DROPDOWN
// ============================================================
function initExportDropdown() {
    const btn = document.getElementById('export-btn');
    const dropdown = btn.closest('.dropdown');
    const menu = document.getElementById('export-menu');
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('open');
    });
    document.addEventListener('click', () => dropdown.classList.remove('open'));
    menu.addEventListener('click', (e) => {
        const item = e.target.closest('[data-export]');
        if (!item) return;
        dropdown.classList.remove('open');
        if (item.dataset.export === 'patch') exportPatch();
        else if (item.dataset.export === 'css') exportTokensCSS();
        else if (item.dataset.export === 'html') exportHTML();
    });
}

// ============================================================
// SIDEBAR RESIZE
// ============================================================
function initResizeHandle() {
    const handle = document.getElementById('resize-handle');
    if (!handle) return;
    let resizing = false;
    handle.addEventListener('mousedown', (e) => {
        resizing = true;
        handle.classList.add('dragging');
        document.body.style.userSelect = 'none';
        e.preventDefault();
    });
    document.addEventListener('mousemove', (e) => {
        if (!resizing) return;
        const w = Math.max(240, Math.min(600, e.clientX));
        document.documentElement.style.setProperty('--sidebar-w', `${w}px`);
    });
    document.addEventListener('mouseup', () => {
        if (!resizing) return;
        resizing = false;
        handle.classList.remove('dragging');
        document.body.style.userSelect = '';
        const w = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sidebar-w'));
        state.sidebarWidth = w;
        saveState();
    });
    if (state.sidebarWidth) {
        document.documentElement.style.setProperty('--sidebar-w', `${state.sidebarWidth}px`);
    }
}

// ============================================================
// WIRE EVENTS
// ============================================================
document.addEventListener('input', handleTokenChange);
document.addEventListener('change', handleTokenChange);

document.getElementById('mode-toggle').addEventListener('click', toggleMode);
document.getElementById('text-edit-toggle').addEventListener('click', toggleTextEdit);
document.getElementById('move-toggle').addEventListener('click', toggleMoveMode);
document.getElementById('undo-btn').addEventListener('click', undo);
document.getElementById('redo-btn').addEventListener('click', redo);
document.getElementById('reset-btn').addEventListener('click', resetAll);

iframe.addEventListener('load', () => {
    applyToIframe();
    attachIframeListeners();
    if (typeof attachInspectorListeners === 'function') attachInspectorListeners();
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    const cmd = e.metaKey || e.ctrlKey;
    if (cmd && e.key.toLowerCase() === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
    } else if (cmd && (e.key.toLowerCase() === 'z' && e.shiftKey || e.key.toLowerCase() === 'y')) {
        e.preventDefault();
        redo();
    } else if (cmd && e.key.toLowerCase() === 'e') {
        e.preventDefault();
        exportPatch();
    } else if (cmd && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        toggleMode();
    }
});

// ============================================================
// M2 GEOMETRY & TYPE CONTROLS
// ============================================================
function renderGeometryControls() {
    const sec = document.getElementById('geometry-section');
    if (!sec) return;
    const dt = state.designTokens;
    const radiusNum = parseInt(dt.radiusCard) || 12;
    sec.innerHTML = `
        <div class="ctl-row">
            <label>Card Radius</label>
            <input type="range" min="0" max="24" value="${radiusNum}" id="radius-slider" step="1">
            <span class="ctl-val" id="radius-val">${radiusNum}px</span>
        </div>
        <div class="ctl-row ctl-row-col">
            <label>Shadow</label>
            <div class="shadow-presets">
                ${Object.keys(SHADOW_PRESETS).map(k => `<button type="button" data-shadow="${k}" class="${dt.shadowPreset === k ? 'active' : ''}">${k}</button>`).join('')}
            </div>
        </div>
        <div class="ctl-row">
            <label>Heading Font</label>
            <select id="font-serif-select">
                ${FONT_PRESETS.serif.map(f => `<option value="${f.value}" ${dt.fontSerif === f.value ? 'selected' : ''}>${f.name}</option>`).join('')}
            </select>
        </div>
        <div class="ctl-row">
            <label>Mono Font</label>
            <select id="font-mono-select">
                ${FONT_PRESETS.mono.map(f => `<option value="${f.value}" ${dt.fontMono === f.value ? 'selected' : ''}>${f.name}</option>`).join('')}
            </select>
        </div>
    `;
    document.getElementById('radius-slider').addEventListener('input', (e) => {
        const v = e.target.value + 'px';
        if (state.designTokens.radiusCard === v) return;
        if (activeTokenSession !== 'radius') {
            pushHistory('radius');
            activeTokenSession = 'radius';
        }
        clearTimeout(tokenSessionTimer);
        tokenSessionTimer = setTimeout(() => { activeTokenSession = null; }, 800);
        state.designTokens.radiusCard = v;
        document.getElementById('radius-val').textContent = v;
        applyToIframe();
        saveState();
        updateChangeCount();
    });
    sec.querySelectorAll('[data-shadow]').forEach(btn => {
        btn.addEventListener('click', () => {
            const k = btn.dataset.shadow;
            if (state.designTokens.shadowPreset === k) return;
            pushHistory('shadow:' + k);
            state.designTokens.shadowPreset = k;
            applyToIframe();
            saveState();
            renderGeometryControls();
            updateChangeCount();
        });
    });
    document.getElementById('font-serif-select').addEventListener('change', (e) => {
        pushHistory('font:serif');
        state.designTokens.fontSerif = e.target.value;
        applyToIframe();
        saveState();
        updateChangeCount();
    });
    document.getElementById('font-mono-select').addEventListener('change', (e) => {
        pushHistory('font:mono');
        state.designTokens.fontMono = e.target.value;
        applyToIframe();
        saveState();
        updateChangeCount();
    });
}

// ============================================================
// INIT
// ============================================================
renderControls();
renderGeometryControls();
initResizeHandle();
initViewportSelector();
initExportDropdown();
if (typeof initInspector === 'function') initInspector();
if (typeof initDiff === 'function') initDiff();
