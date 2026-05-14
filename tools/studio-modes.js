/* ============================================================
   Design Studio · iframe edit modes (Text Edit / Move)
   v0.14.0 — extracted from studio.js for 1000-line rule
   Depends on: studio.js (state, iframe, dragSrc, pushHistory, saveState,
                          updateChangeCount, updateToggleStates, toast,
                          getPanelTitle, CONTAINERS)
   ============================================================ */
'use strict';

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
// MOVE MODE (items + panels with cross-column support + delete)
// ============================================================
function setMoveMode(on) {
    state.moveMode = on;
    const doc = iframe.contentDocument;
    if (!doc) return;
    const movables = doc.querySelectorAll('.exp-item, .project-item, .edu-item, .cert-item, .lang-item');
    movables.forEach(el => {
        if (on) {
            el.draggable = true;
            el.classList.add('studio-movable');
            if (!el.querySelector('.studio-del-btn')) {
                const btn = doc.createElement('button');
                btn.className = 'studio-del-btn';
                btn.type = 'button';
                btn.textContent = '×';
                btn.title = '刪除此項';
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    const parent = el.parentNode;
                    pushHistory('delete:item');
                    el.remove();
                    captureContainerOrder(parent);
                    saveState();
                    updateChangeCount();
                    toast('已刪除一個項目');
                });
                el.appendChild(btn);
            }
        } else {
            el.draggable = false;
            el.classList.remove('studio-movable');
            el.querySelector('.studio-del-btn')?.remove();
        }
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
            .studio-movable { cursor: move !important; position: relative; transition: transform 0.15s, opacity 0.15s; }
            .studio-movable:hover { outline: 2px dashed #2563eb !important; outline-offset: 2px; border-radius: 4px; }
            .studio-movable::before {
                content: '⋮⋮'; position: absolute; left: -16px; top: 50%;
                transform: translateY(-50%); color: #2563eb; font-size: 14px;
                letter-spacing: -3px; font-weight: 900; opacity: 0.8; pointer-events: none;
            }
            .studio-movable.dragging { opacity: 0.4; }
            .studio-movable.drag-over-top { box-shadow: 0 -3px 0 #2563eb; }
            .studio-movable.drag-over-bottom { box-shadow: 0 3px 0 #2563eb; }
            .studio-panel-handle {
                cursor: move !important; position: relative;
                background: rgba(37,99,235,0.06) !important; border-radius: 4px;
                padding: 6px 10px !important; margin: -6px -10px 12px !important;
            }
            .studio-panel-handle:hover { background: rgba(37,99,235,0.16) !important; }
            .studio-panel-handle::after {
                content: '⋮⋮ DRAG PANEL'; font-family: 'JetBrains Mono', monospace;
                font-size: 9px; letter-spacing: 1px; color: #2563eb;
                margin-left: auto; padding-left: 8px; opacity: 0.8;
            }
            .main-grid > div > .panel.studio-panel-target.drag-over-top { box-shadow: 0 -3px 0 #2563eb; border-radius: 12px; }
            .main-grid > div > .panel.studio-panel-target.drag-over-bottom { box-shadow: 0 3px 0 #2563eb; border-radius: 12px; }
            .main-grid > div > .panel.studio-panel-dragging { opacity: 0.4; }
            .studio-del-btn {
                position: absolute; right: -10px; top: -10px;
                width: 22px; height: 22px; border-radius: 50%;
                background: #ef4444; color: white; border: 2px solid white;
                box-shadow: 0 2px 8px rgba(239,68,68,0.4); cursor: pointer;
                display: none; align-items: center; justify-content: center;
                font-size: 14px; font-weight: 600; line-height: 1; z-index: 10;
                padding: 0; font-family: sans-serif;
            }
            .studio-movable:hover .studio-del-btn { display: flex; }
            .studio-del-btn:hover { transform: scale(1.15); background: #dc2626; }
        `;
        doc.head.appendChild(style);
    } else if (!on && style) {
        style.remove();
    }
    updateToggleStates();
}

// ============================================================
// IFRAME LISTENERS (drag & drop, ESC, blur for text)
// ============================================================
function attachIframeListeners() {
    const doc = iframe.contentDocument;
    if (!doc || doc._studioListenersAttached) return;
    doc._studioListenersAttached = true;

    doc.addEventListener('blur', handleTextEditBlur, true);

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
        if (dragSrc) dragSrc.classList.remove('dragging', 'studio-panel-dragging');
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

    doc.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (state.textEditMode) { setTextEditMode(false); saveState(); toast('已退出文字編輯'); }
            else if (state.moveMode) { setMoveMode(false); saveState(); toast('已退出排序模式'); }
            else if (state.inspectMode && typeof setInspectMode === 'function') { setInspectMode(false); saveState(); toast('已退出 Inspector'); }
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
