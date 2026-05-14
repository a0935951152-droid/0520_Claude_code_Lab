/* ============================================================
   Design Studio · Element Inspector (M3)
   v0.14.0
   Depends on: studio.js (state, saveState, applyToIframe, pushHistory, toast,
                          updateChangeCount, iframe, setTextEditMode, setMoveMode)
   ============================================================ */
'use strict';

const INSPECTOR_PROPS = [
    { key: 'color',           label: 'Color',         type: 'color' },
    { key: 'background-color',label: 'Background',    type: 'color' },
    { key: 'font-size',       label: 'Font Size',     type: 'text', placeholder: '16px' },
    { key: 'font-weight',     label: 'Font Weight',   type: 'text', placeholder: '400' },
    { key: 'padding',         label: 'Padding',       type: 'text', placeholder: '16px' },
    { key: 'margin',          label: 'Margin',        type: 'text', placeholder: '0' },
    { key: 'border-radius',   label: 'Border Radius', type: 'text', placeholder: '8px' },
    { key: 'letter-spacing',  label: 'Letter Space',  type: 'text', placeholder: '0' },
    { key: 'line-height',     label: 'Line Height',   type: 'text', placeholder: '1.5' },
    { key: 'text-align',      label: 'Text Align',    type: 'select', options: ['', 'left', 'center', 'right', 'justify'] },
];

let inspectorSelected = null;

function getInspectorSelector(el) {
    if (el.dataset?.i18n) return `[data-i18n="${el.dataset.i18n}"]`;
    if (el.id) return `#${el.id}`;
    // Build short path
    const parts = [];
    let cur = el;
    let depth = 0;
    while (cur && cur.nodeType === 1 && depth < 4) {
        let part = cur.tagName.toLowerCase();
        if (cur.classList?.length) {
            const cls = Array.from(cur.classList).filter(c => !c.startsWith('studio-') && !c.includes('drag-')).slice(0, 2);
            if (cls.length) part += '.' + cls.join('.');
        }
        const sibs = cur.parentElement ? Array.from(cur.parentElement.children).filter(c => c.tagName === cur.tagName) : [];
        if (sibs.length > 1) {
            const idx = sibs.indexOf(cur) + 1;
            part += `:nth-of-type(${idx})`;
        }
        parts.unshift(part);
        cur = cur.parentElement;
        depth++;
    }
    return parts.join(' > ');
}

function setInspectMode(on) {
    state.inspectMode = on;
    const doc = iframe.contentDocument;
    if (!doc) return;
    let style = doc.getElementById('studio-inspect-style');
    if (on && !style) {
        style = doc.createElement('style');
        style.id = 'studio-inspect-style';
        style.textContent = `
            .studio-hover-inspect { outline: 2px dashed #f59e0b !important; outline-offset: 2px; cursor: crosshair !important; }
            .studio-selected-inspect { outline: 2px solid #2563eb !important; outline-offset: 2px; box-shadow: 0 0 0 4px rgba(37,99,235,0.15) !important; }
            * { cursor: crosshair !important; }
        `;
        doc.head.appendChild(style);
    } else if (!on && style) {
        style.remove();
    }
    if (!on) {
        doc.querySelectorAll('.studio-selected-inspect, .studio-hover-inspect').forEach(el => {
            el.classList.remove('studio-selected-inspect', 'studio-hover-inspect');
        });
        inspectorSelected = null;
        renderInspectorPanel();
    }
    document.getElementById('inspect-toggle')?.classList.toggle('active', on);
    document.getElementById('info-inspect')?.classList.toggle('show', on);
    document.getElementById('inspector-section')?.classList.toggle('visible', on);
}

function toggleInspect() {
    if (!state.inspectMode) {
        if (state.textEditMode) setTextEditMode(false);
        if (state.moveMode) setMoveMode(false);
    }
    setInspectMode(!state.inspectMode);
    saveState();
}

function handleInspectClick(e) {
    if (!state.inspectMode) return;
    const target = e.target;
    if (!target || target.nodeType !== 1) return;
    e.preventDefault();
    e.stopPropagation();
    const doc = iframe.contentDocument;
    doc.querySelectorAll('.studio-selected-inspect').forEach(el => el.classList.remove('studio-selected-inspect'));
    target.classList.add('studio-selected-inspect');
    inspectorSelected = target;
    renderInspectorPanel();
}

function handleInspectHover(e) {
    if (!state.inspectMode) return;
    const doc = iframe.contentDocument;
    doc.querySelectorAll('.studio-hover-inspect').forEach(el => el.classList.remove('studio-hover-inspect'));
    if (e.target && e.target.nodeType === 1 && e.target !== inspectorSelected) {
        e.target.classList.add('studio-hover-inspect');
    }
}

function applyElementOverride(selector, propKey, propValue) {
    if (!state.elementOverrides) state.elementOverrides = [];
    let entry = state.elementOverrides.find(o => o.selector === selector);
    if (!entry) {
        entry = { selector, styles: {} };
        state.elementOverrides.push(entry);
    }
    if (propValue === '' || propValue == null) {
        delete entry.styles[propKey];
        if (Object.keys(entry.styles).length === 0) {
            state.elementOverrides = state.elementOverrides.filter(o => o.selector !== selector);
        }
    } else {
        entry.styles[propKey] = propValue;
    }
    // Apply to iframe
    const doc = iframe.contentDocument;
    if (doc && inspectorSelected) {
        inspectorSelected.style.setProperty(propKey, propValue || '');
    }
    saveState();
    updateChangeCount();
}

function renderInspectorPanel() {
    const panel = document.getElementById('inspector-content');
    if (!panel) return;
    if (!inspectorSelected) {
        panel.innerHTML = `<div class="inspector-hint">點擊 iframe 中任何元素開始編輯</div>`;
        return;
    }
    const selector = getInspectorSelector(inspectorSelected);
    const computed = iframe.contentWindow.getComputedStyle(inspectorSelected);
    const override = state.elementOverrides?.find(o => o.selector === selector);
    const rows = INSPECTOR_PROPS.map(p => {
        const curr = override?.styles[p.key] ?? '';
        const placeholder = curr ? '' : (computed[p.key] || p.placeholder || '');
        if (p.type === 'color') {
            const colorVal = curr || rgbToHex(computed[p.key]) || '#ffffff';
            return `
                <div class="inspector-row">
                    <label>${p.label}</label>
                    <div class="inspector-color-wrap">
                        <input type="color" data-prop="${p.key}" value="${colorVal}">
                        <input type="text" data-prop="${p.key}" data-text="1" value="${curr}" placeholder="${placeholder}">
                    </div>
                </div>`;
        }
        if (p.type === 'select') {
            const opts = p.options.map(o => `<option value="${o}" ${curr === o ? 'selected' : ''}>${o || '(default)'}</option>`).join('');
            return `
                <div class="inspector-row">
                    <label>${p.label}</label>
                    <select data-prop="${p.key}">${opts}</select>
                </div>`;
        }
        return `
            <div class="inspector-row">
                <label>${p.label}</label>
                <input type="text" data-prop="${p.key}" value="${curr}" placeholder="${placeholder}">
            </div>`;
    }).join('');
    panel.innerHTML = `
        <div class="inspector-selector">${selector}</div>
        <div class="inspector-fields">${rows}</div>
        <button class="inspector-clear" id="inspector-clear-btn">清除此元素所有覆寫</button>
    `;
    panel.querySelectorAll('input, select').forEach(input => {
        input.addEventListener('change', (e) => {
            if (!inspectorSelected) return;
            const sel = getInspectorSelector(inspectorSelected);
            pushHistory('inspect:' + e.target.dataset.prop);
            applyElementOverride(sel, e.target.dataset.prop, e.target.value);
            // If color input, sync the text field
            if (e.target.type === 'color') {
                const txt = panel.querySelector(`input[type="text"][data-prop="${e.target.dataset.prop}"]`);
                if (txt) txt.value = e.target.value;
            }
        });
    });
    document.getElementById('inspector-clear-btn')?.addEventListener('click', () => {
        if (!inspectorSelected) return;
        const sel = getInspectorSelector(inspectorSelected);
        pushHistory('inspect:clear');
        state.elementOverrides = (state.elementOverrides || []).filter(o => o.selector !== sel);
        // Remove all inline styles set by us
        inspectorSelected.removeAttribute('style');
        saveState();
        renderInspectorPanel();
        updateChangeCount();
        toast('已清除此元素覆寫');
    });
}

function rgbToHex(rgb) {
    if (!rgb || !rgb.startsWith('rgb')) return '';
    const m = rgb.match(/\d+/g);
    if (!m || m.length < 3) return '';
    return '#' + m.slice(0, 3).map(n => parseInt(n).toString(16).padStart(2, '0')).join('');
}

function applyElementOverrides(doc) {
    if (!state.elementOverrides) return;
    for (const { selector, styles } of state.elementOverrides) {
        try {
            const el = doc.querySelector(selector);
            if (!el) continue;
            for (const [k, v] of Object.entries(styles)) {
                el.style.setProperty(k, v);
            }
        } catch (e) {}
    }
}

function attachInspectorListeners() {
    const doc = iframe.contentDocument;
    if (!doc || doc._studioInspectorAttached) return;
    doc._studioInspectorAttached = true;
    doc.addEventListener('click', handleInspectClick, true);
    doc.addEventListener('mouseover', handleInspectHover, true);
    doc.addEventListener('mouseout', (e) => {
        if (!state.inspectMode) return;
        e.target?.classList?.remove?.('studio-hover-inspect');
    }, true);
}

function initInspector() {
    document.getElementById('inspect-toggle')?.addEventListener('click', toggleInspect);
    renderInspectorPanel();
}
