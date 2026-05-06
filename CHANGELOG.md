# CHANGELOG

所有重要版本變更均記錄於此，格式依循 [Keep a Changelog](https://keepachangelog.com/zh-TW/1.0.0/)。

---

## [0.7] — 2026-05-07

### Added
- `index.html` — PDF 匯出按鈕（右下角固定，`⬇ EXPORT PDF`，點擊呼叫 `window.print()`）
- `index.html` — `@media print` 列印樣式：深色背景保留、移除動畫 / 發光 / clip-path / 掃描線、技能條強制顯示、跨頁保護
- `index.html` — `@media (max-width: 600px)` 行動裝置優化：Stats Bar 改 3×2 格局、頭像框 clamp 自適應、Header padding 縮小、字體縮減

### Technical
- `.export-btn`：fixed 定位、magenta 色系、`backdrop-filter: blur`
- 列印時隱藏 `.export-btn` / `.proj-btn`；`name-glitch` 殘影隱藏；`skill-fill` 強制顯示寬度

---

## [0.6] — 2026-05-07

### Changed
- `index.html` — 補完所有四張專案卡連結，改用按鈕物件設計（不整張卡片可點）
  - ⚡ Edge AI：URL 補完整，加 `→ DOCS` 按鈕
  - 🔧 Nanoclaw：新增 `→ YOUTUBE` 按鈕（YouTube demo）
  - 🧠 OCR：URL 補完整，加 `→ DRIVE` 按鈕
  - 🏛️ 交大 AI：新增 `→ DRIVE` 按鈕（Google Drive 專案檔）
  - 移除 `a.project-link` 全卡包裹寫法，改為 `.proj-btn` 行內按鈕

---

## [0.5] — 2026-05-06

### Added
- `CLAUDE.md` — Claude 專案記憶檔

### Changed
- `index.html` — 導入 PDF 附件連結至對應履歷元素

---

## [0.4] — 2026-05-06

### Added
- `CHANGELOG.md` / `TODO.md` / `.claude/skills/resume-push.md` / `README.md` 更新

---

## [0.3] — 2026-05-06

### Added
- `index.html` — 個人簡歷網頁，賽博龐克風格

---

## [0.2] — 2026-05-06

### Added
- GitHub MCP Server 連線設定

---

## [0.1] — 2026-05-06

### Added
- 初始化 repository `0520_Claude_code_Lab`
- 建立 `README.md`
