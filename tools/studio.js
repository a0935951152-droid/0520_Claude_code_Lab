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
            s.currentPreset ??= 'morcept';
            s.textEditMode ??= false;
            s.moveMode ??= false;
            s.sidebarWidth ??= null;
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
        currentPreset: 'morcept',
        textEditMode: false,
        moveMode: false,
        sidebarWidth: null
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
        currentPreset: state.currentPreset
    };
}

function pushHistory(label) {
    state.history.push({ snapshot: snapshotState(), label, time: Date.now() });
    if (state.history.length > 50) state.history.shift();
    updateUndoBtn();
}

function undo() {
    if (state.history.length === 0) {
        toast('沒有可還原的步驟');
        return;
    }
    const entry = state.history.pop();
    state.tokens = entry.snapshot.tokens;
    state.textPatches = entry.snapshot.textPatches;
    state.movePatches = entry.snapshot.movePatches;
    state.panelLayout = entry.snapshot.panelLayout;
    state.darkMode = entry.snapshot.darkMode;
    state.currentPreset = entry.snapshot.currentPreset;
    saveState();
    renderControls();
    // Reload iframe to ensure DOM matches restored state
    iframe.src = '../index.html';
    updateChangeCount();
    updateUndoBtn();
    toast('↶ 已還原：' + entry.label);
}

function updateUndoBtn() {
    document.getElementById('undo-btn').disabled = state.history.length === 0;
}

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
    const lightCss = Object.entries(state.tokens.light).map(([k, v]) => `${k}: ${v};`).join(' ');
    const darkCss = Object.entries(state.tokens.dark).map(([k, v]) => `${k}: ${v};`).join(' ');
    return `:root { ${lightCss} } body.dark-mode { ${darkCss} } .ctrl-btns, .export-btn { display: none !important; }`;
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
        for (const id of order) {
            const el = byId.get(id);
            if (el) parent.appendChild(el);
        }
        for (const el of children) {
            if (!order.includes(cfg.getId(el))) parent.appendChild(el);
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
    doc.body.classList.toggle('dark-mode', state.darkMode);
    // Re-apply edit/move modes if toggled
    setTextEditMode(state.textEditMode);
    setMoveMode(state.moveMode);
}

// ============================================================
// TEXT EDIT MODE
// ============================================================
function setTextEditMode(on) {
    state.textEditMode = on;
    const doc = iframe.contentDocument;
    if (!doc) return;
    const editables = doc.querySelectorAll('[data-i18n]');
    editables.forEach(el => {
        if (on) {
            el.contentEditable = 'true';
            el.classList.add('studio-editable');
        } else {
            el.removeAttribute('contenteditable');
            el.classList.remove('studio-editable');
        }
    });
    let style = doc.getElementById('studio-text-edit-style');
    if (on && !style) {
        style = doc.createElement('style');
        style.id = 'studio-text-edit-style';
        style.textContent = `
            .studio-editable {
                outline: 2px dashed #2563eb !important;
                outline-offset: 3px;
                cursor: text !important;
                min-height: 1em;
                border-radius: 2px;
                transition: outline-color 0.15s, background 0.15s;
            }
            .studio-editable:hover { outline-color: #1d4ed8 !important; background: rgba(37,99,235,0.04); }
            .studio-editable:focus { outline-color: #1d4ed8 !important; background: rgba(37,99,235,0.08); }
        `;
        doc.head.appendChild(style);
    } else if (!on && style) {
        style.remove();
    }
    updateToggleStates();
}

function handleTextEditBlur(e) {
    if (!e.target.matches?.('.studio-editable')) return;
    const key = e.target.dataset.i18n;
    if (!key) return;
    const html = e.target.innerHTML.trim();
    const defaultHtml = e.target.dataset.studioDefault;
    if (defaultHtml === undefined) {
        e.target.dataset.studioDefault = html;
        return;
    }
    if (state.textPatches[key] === html) return;
    pushHistory('text:' + key);
    if (html === defaultHtml) {
        delete state.textPatches[key];
    } else {
        state.textPatches[key] = html;
    }
    saveState();
    updateChangeCount();
}

// ============================================================
// MOVE MODE (items + panels with cross-column support)
// ============================================================
function setMoveMode(on) {
    state.moveMode = on;
    const doc = iframe.contentDocument;
    if (!doc) return;
    const movables = doc.querySelectorAll('.exp-item, .project-item, .edu-item, .cert-item, .lang-item');
    movables.forEach(el => {
        if (on) { el.draggable = true; el.classList.add('studio-movable'); }
        else { el.draggable = false; el.classList.remove('studio-movable'); }
    });
    const panelHandles = doc.querySelectorAll('.main-grid > div > .panel > .panel-title');
    panelHandles.forEach(el => {
        if (on) { el.draggable = true; el.classList.add('studio-panel-handle'); }
        else { el.draggable = false; el.classList.remove('studio-panel-handle'); }
    });
    let style = doc.getElementById('studio-move-style');
    if (on && !style) {
        style = doc.createElement('style');
        style.id = 'studio-move-style';
        style.textContent = `
            .studio-movable {
                cursor: move !important;
                position: relative;
                transition: transform 0.15s, opacity 0.15s;
            }
            .studio-movable:hover {
                outline: 2px dashed #2563eb !important;
                outline-offset: 2px;
                border-radius: 4px;
            }
            .studio-movable::before {
                content: '⋮⋮';
                position: absolute;
                left: -16px;
                top: 50%;
                transform: translateY(-50%);
                color: #2563eb;
                font-size: 14px;
                letter-spacing: -3px;
                font-weight: 900;
                opacity: 0.8;
                pointer-events: none;
            }
            .studio-movable.dragging { opacity: 0.4; }
            .studio-movable.drag-over-top { box-shadow: 0 -3px 0 #2563eb; }
            .studio-movable.drag-over-bottom { box-shadow: 0 3px 0 #2563eb; }

            .studio-panel-handle {
                cursor: move !important;
                position: relative;
                background: rgba(37,99,235,0.06) !important;
                border-radius: 4px;
                padding: 6px 10px !important;
                margin: -6px -10px 12px !important;
            }
            .studio-panel-handle:hover {
                background: rgba(37,99,235,0.16) !important;
            }
            .studio-panel-handle::after {
                content: '⋮⋮ DRAG PANEL';
                font-family: 'JetBrains Mono', monospace;
                font-size: 9px;
                letter-spacing: 1px;
                color: #2563eb;
                margin-left: auto;
                padding-left: 8px;
                opacity: 0.8;
            }
            .main-grid > div > .panel.studio-panel-target.drag-over-top { box-shadow: 0 -3px 0 #2563eb; border-radius: 12px; }
            .main-grid > div > .panel.studio-panel-target.drag-over-bottom { box-shadow: 0 3px 0 #2563eb; border-radius: 12px; }
            .main-grid > div > .panel.studio-panel-dragging { opacity: 0.4; }
        `;
        doc.head.appendChild(style);
    } else if (!on && style) {
        style.remove();
    }
    updateToggleStates();
}

function attachIframeListeners() {
    const doc = iframe.contentDocument;
    if (!doc || doc._studioListenersAttached) return;
    doc._studioListenersAttached = true;

    // Text edit: capture blur
    doc.addEventListener('blur', handleTextEditBlur, true);

    // Drag & drop for move mode
    doc.addEventListener('dragstart', (e) => {
        let src = null;
        if (e.target.classList?.contains('studio-panel-handle')) {
            src = e.target.closest('.panel');
            if (src) src.classList.add('studio-panel-dragging');
        } else if (e.target.classList?.contains('studio-movable')) {
            src = e.target;
            src.classList.add('dragging');
        }
        if (!src) return;
        dragSrc = src;
        try {
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', '');
        } catch {}
    });

    doc.addEventListener('dragend', () => {
        if (dragSrc) {
            dragSrc.classList.remove('dragging', 'studio-panel-dragging');
        }
        doc.querySelectorAll('.drag-over-top, .drag-over-bottom').forEach(el => {
            el.classList.remove('drag-over-top', 'drag-over-bottom', 'studio-panel-target');
        });
        dragSrc = null;
    });

    doc.addEventListener('dragover', (e) => {
        if (!dragSrc) return;
        let target;
        if (dragSrc.classList.contains('panel')) {
            target = e.target.closest?.('.panel');
            if (!target || target === dragSrc) return;
            if (!target.closest('.main-grid')) return;
            target.classList.add('studio-panel-target');
        } else {
            target = e.target.closest?.('.studio-movable');
            if (!target || target === dragSrc || target.parentNode !== dragSrc.parentNode) return;
        }
        e.preventDefault();
        doc.querySelectorAll('.drag-over-top, .drag-over-bottom').forEach(el => {
            if (el !== target) el.classList.remove('drag-over-top', 'drag-over-bottom');
        });
        const rect = target.getBoundingClientRect();
        const before = e.clientY < rect.top + rect.height / 2;
        target.classList.remove('drag-over-top', 'drag-over-bottom');
        target.classList.add(before ? 'drag-over-top' : 'drag-over-bottom');
    });

    doc.addEventListener('drop', (e) => {
        if (!dragSrc) return;
        let target;
        const isPanel = dragSrc.classList.contains('panel');
        if (isPanel) {
            target = e.target.closest?.('.panel');
            if (!target || target === dragSrc || !target.closest('.main-grid')) return;
        } else {
            target = e.target.closest?.('.studio-movable');
            if (!target || target === dragSrc || target.parentNode !== dragSrc.parentNode) return;
        }
        e.preventDefault();
        const parent = target.parentNode;
        const rect = target.getBoundingClientRect();
        const before = e.clientY < rect.top + rect.height / 2;

        if (isPanel) {
            pushHistory('move:panel');
            parent.insertBefore(dragSrc, before ? target : target.nextSibling);
            captureLayoutSnapshot();
        } else {
            pushHistory('move:' + identifyContainer(parent));
            parent.insertBefore(dragSrc, before ? target : target.nextSibling);
            captureContainerOrder(parent);
        }

        target.classList.remove('drag-over-top', 'drag-over-bottom', 'studio-panel-target');
        saveState();
        updateChangeCount();
    });

    // ESC to exit modes
    doc.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (state.textEditMode) {
                setTextEditMode(false);
                saveState();
                toast('已退出文字編輯');
            } else if (state.moveMode) {
                setMoveMode(false);
                saveState();
                toast('已退出排序模式');
            }
        }
    });
}

function identifyContainer(parent) {
    for (const [key, cfg] of Object.entries(CONTAINERS)) {
        const sample = parent.querySelector(`:scope > ${cfg.childSelector}`);
        if (sample) return key;
    }
    return 'unknown';
}

function captureContainerOrder(parent) {
    for (const [key, cfg] of Object.entries(CONTAINERS)) {
        const sample = parent.querySelector(`:scope > ${cfg.childSelector}`);
        if (!sample) continue;
        const order = Array.from(parent.querySelectorAll(`:scope > ${cfg.childSelector}`)).map(el => cfg.getId(el)).filter(Boolean);
        state.movePatches[key] = order;
        return;
    }
}

function captureLayoutSnapshot() {
    const doc = iframe.contentDocument;
    const grid = doc.querySelector('.main-grid');
    if (!grid) return;
    const cols = grid.children;
    if (cols.length < 2) return;
    state.panelLayout = {
        left: Array.from(cols[0].querySelectorAll(':scope > .panel')).map(getPanelTitle).filter(Boolean),
        right: Array.from(cols[1].querySelectorAll(':scope > .panel')).map(getPanelTitle).filter(Boolean)
    };
}

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

// ============================================================
// PATCH JSON BUILD / EXPORT
// ============================================================
function buildPatch() {
    const defaults = defaultTokensFlat();
    const tokens = {};
    const tokensDark = {};
    for (const [k, v] of Object.entries(state.tokens.light)) {
        if (defaults.light[k].toLowerCase() !== v.toLowerCase()) tokens[k] = v;
    }
    for (const [k, v] of Object.entries(state.tokens.dark)) {
        if (defaults.dark[k].toLowerCase() !== v.toLowerCase()) tokensDark[k] = v;
    }
    return {
        version: 'studio_patch_v3',
        createdAt: new Date().toISOString(),
        basedOn: { studioVersion: STUDIO_VERSION },
        themePreset: state.currentPreset,
        tokens,
        tokensDark,
        textPatches: { ...state.textPatches },
        movePatches: { ...state.movePatches },
        panelLayout: state.panelLayout ? structuredClone(state.panelLayout) : null,
        elementOverrides: [],
        htmlPatches: []
    };
}

async function exportPatch() {
    const patch = buildPatch();
    const isEmpty = Object.keys(patch.tokens).length === 0
        && Object.keys(patch.tokensDark).length === 0
        && Object.keys(patch.textPatches).length === 0
        && Object.keys(patch.movePatches).length === 0
        && !patch.panelLayout;
    if (isEmpty) {
        toast('沒有修改可匯出');
        return;
    }
    const json = JSON.stringify(patch, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `studio-patch-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    let copied = false;
    try {
        await navigator.clipboard?.writeText(json);
        copied = true;
    } catch (e) {}
    toast(copied ? '✓ Patch 已下載 + 複製剪貼簿' : '✓ Patch 已下載');
}

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
document.getElementById('reset-btn').addEventListener('click', resetAll);
document.getElementById('export-btn').addEventListener('click', exportPatch);

iframe.addEventListener('load', () => {
    applyToIframe();
    attachIframeListeners();
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
    }
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'e') {
        e.preventDefault();
        exportPatch();
    }
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        toggleMode();
    }
});

// Initial render
renderControls();
initResizeHandle();
