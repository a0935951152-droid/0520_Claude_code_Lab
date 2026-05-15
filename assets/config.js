/**
 * Runtime config for the resume site.
 *
 * Loaded before assets/scripts.js. Values live here (not inline in scripts.js)
 * so swapping endpoints / rotating the shared token only touches one file.
 *
 * Note: this file IS committed and public on GitHub Pages — the shared token
 * is shared with the Apps Script backend and is "公開但讓無腦 bot 多一道" level.
 * Real spam defense is the honeypot + timing + backend rate-limit chain.
 */

window.__SITE_CONFIG__ = {
    contact: {
        endpoint: 'https://script.google.com/macros/s/AKfycby1kve6W-Mz-PrTggPRNBla4iHpMFTMu4E89ew3IKtGGYwNub8QwGq9d3gWOQerR62o/exec',
        sharedToken: 'rms_0520_2026_x7k2',
    },
};
