/* ============================================================
   Design Studio · Diff View (M6)
   v0.14.0
   Depends on: studio.js (state, defaultTokensFlat, toast)
   ============================================================ */
'use strict';

function buildDiffSummary() {
    const defaults = defaultTokensFlat();
    const lines = [];

    // Tokens
    const tokenDiffs = [];
    for (const m of ['light', 'dark']) {
        for (const [k, v] of Object.entries(state.tokens[m])) {
            const def = defaults[m][k];
            if (def.toLowerCase() !== v.toLowerCase()) {
                tokenDiffs.push({ mode: m, key: k, before: def, after: v });
            }
        }
    }
    if (tokenDiffs.length) {
        lines.push(`<div class="diff-section"><h3>Tokens (${tokenDiffs.length})</h3>`);
        tokenDiffs.forEach(d => {
            lines.push(`<div class="diff-row">
                <span class="diff-mode">${d.mode}</span>
                <span class="diff-key">${d.key}</span>
                <span class="diff-before"><span class="diff-swatch" style="background:${d.before}"></span>${d.before}</span>
                <span class="diff-arrow">→</span>
                <span class="diff-after"><span class="diff-swatch" style="background:${d.after}"></span>${d.after}</span>
            </div>`);
        });
        lines.push(`</div>`);
    }

    // Theme preset
    if (state.currentPreset && state.currentPreset !== 'morcept') {
        lines.push(`<div class="diff-section"><h3>Theme Preset</h3><div class="diff-row"><span>morcept → <strong>${state.currentPreset}</strong></span></div></div>`);
    }

    // Text edits
    const textKeys = Object.keys(state.textPatches || {});
    if (textKeys.length) {
        lines.push(`<div class="diff-section"><h3>Text Edits (${textKeys.length})</h3>`);
        textKeys.forEach(k => {
            const val = state.textPatches[k];
            const preview = String(val).slice(0, 80).replace(/</g, '&lt;');
            lines.push(`<div class="diff-row diff-text">
                <span class="diff-key">${k}</span>
                <span class="diff-after">${preview}${val.length > 80 ? '…' : ''}</span>
            </div>`);
        });
        lines.push(`</div>`);
    }

    // Move patches
    const moveKeys = Object.keys(state.movePatches || {});
    if (moveKeys.length) {
        lines.push(`<div class="diff-section"><h3>Item Reorders (${moveKeys.length})</h3>`);
        moveKeys.forEach(k => {
            const order = state.movePatches[k];
            lines.push(`<div class="diff-row diff-move">
                <span class="diff-key">${k}</span>
                <span class="diff-after">${order.length} items</span>
                <div class="diff-order">${order.map((id, i) => `<span class="diff-chip">${i+1}. ${id}</span>`).join('')}</div>
            </div>`);
        });
        lines.push(`</div>`);
    }

    // Panel layout
    if (state.panelLayout) {
        lines.push(`<div class="diff-section"><h3>Panel Layout</h3>`);
        lines.push(`<div class="diff-row diff-panel">
            <strong>Left column:</strong>
            <div class="diff-order">${state.panelLayout.left.map((t, i) => `<span class="diff-chip">${i+1}. ${t}</span>`).join('')}</div>
        </div>`);
        lines.push(`<div class="diff-row diff-panel">
            <strong>Right column:</strong>
            <div class="diff-order">${state.panelLayout.right.map((t, i) => `<span class="diff-chip">${i+1}. ${t}</span>`).join('')}</div>
        </div>`);
        lines.push(`</div>`);
    }

    // Element overrides
    const overrides = state.elementOverrides || [];
    if (overrides.length) {
        lines.push(`<div class="diff-section"><h3>Element Overrides (${overrides.length})</h3>`);
        overrides.forEach(o => {
            const styles = Object.entries(o.styles).map(([k, v]) => `${k}: ${v}`).join('; ');
            lines.push(`<div class="diff-row diff-override">
                <span class="diff-key">${o.selector}</span>
                <span class="diff-after">${styles}</span>
            </div>`);
        });
        lines.push(`</div>`);
    }

    if (lines.length === 0) {
        return `<div class="diff-empty">尚無任何修改</div>`;
    }

    return lines.join('\n');
}

function openDiffModal() {
    let modal = document.getElementById('diff-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'diff-modal';
        modal.className = 'diff-modal-overlay';
        modal.innerHTML = `
            <div class="diff-modal-box">
                <div class="diff-modal-header">
                    <div>
                        <div class="diff-modal-title">Patch Diff</div>
                        <div class="diff-modal-subtitle">vs Morcept 預設 / index.html 原版</div>
                    </div>
                    <button class="diff-modal-close" id="diff-modal-close">×</button>
                </div>
                <div class="diff-modal-content" id="diff-modal-content"></div>
            </div>
        `;
        document.body.appendChild(modal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeDiffModal();
        });
        document.getElementById('diff-modal-close').addEventListener('click', closeDiffModal);
    }
    document.getElementById('diff-modal-content').innerHTML = buildDiffSummary();
    modal.classList.add('open');
}

function closeDiffModal() {
    document.getElementById('diff-modal')?.classList.remove('open');
}

function initDiff() {
    document.getElementById('diff-btn')?.addEventListener('click', openDiffModal);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeDiffModal();
    });
}
