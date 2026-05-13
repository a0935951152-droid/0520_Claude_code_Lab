# CHANGELOG

所有重要版本變更均記錄於此，格式依循 [Keep a Changelog](https://keepachangelog.com/zh-TW/1.0.0/)。

---

## [0.9.1] — 2026-05-13

### Added
- `ARCHITECTURE.md` — 新增專案架構紀錄檔，內容包含：
  - §1 檔案結構、§2 技術棧、§3 設計 token（CSS variables）、§4 排版結構
  - §5 JavaScript 模組對照、§6 可點擊元素對照表、§7 部署流程
  - §8 **未來規劃工具**：「HTML Live Editor — 不 push 模式」規格草案
    - 額外工具，與主 `index.html` 解耦
    - 僅編輯 HTML 內容（DOM / 文字 / 連結），CSS 沿用現有 token
    - 完全不觸發 git push，純本地操作（localStorage / export 下載）
  - §9 版本對應、§10 維護規則
- `CLAUDE.md` — 維護規則加入「結構性變更須同步更新 ARCHITECTURE.md」
- `TODO.md` — 新增「規劃中（未開工）」段落，列出 HTML Live Editor 詳細待辦

### Changed
- 無 `index.html` 變更（純文件版本）

---

## [0.9] — 2026-05-13

### Changed
- `index.html` — **整體風格大改版**：由「賽博龐克」轉為「morcept.com 簡約風格」（參考 https://morcept.com/）
  - 配色：霓虹三色（cyan/magenta/green）→ 黑白灰中性色系（#222 主色、#fafafa 區塊背景、#e8e8e8 邊框）
  - 字型：Orbitron / Share Tech Mono → Noto Sans TC + Inter + JetBrains Mono（標題用 sans-serif，數據/標籤用 mono）
  - 排版：clip-path 切角面板 → border-radius 12px 圓角卡片；霓虹發光 → 細邊框 + soft shadow（hover lift）
  - 動畫：移除 scanline、glitch、flicker；保留打字機效果（可選）；新增 hover lift 微動效
  - 頭像：六邊形 cyber 風 → 完整圓形深色 avatar circle，hover scale
  - Stats Bar：clip-path 平行四邊形 → 等寬 grid 6 欄圓角卡片
  - 經歷時間軸：菱形節點 + cyan 邊框 → 圓形描邊節點 + 細灰線
  - 專案卡按鈕：cyan 發光邊框 → 黑底白字 pill button，hover 箭頭右移
  - 技能折疊：▼ 旋轉 → `+` 與 `×` 切換（45° rotate）
  - Modal：cyber clip-path → 圓角 + 陰影 + slideUp 入場動畫
  - 預設模式：dark cyberpunk → **light minimalist**（dark mode 改為「優雅深色」非賽博龐克）
  - 裝飾元素：scanline / grid background → 右上角放射狀漸層圓形（呼應 morcept 圓形元素）
- `README.md` — 更新 v0.9 版本歷程
- `CLAUDE.md` — 更新設計規則（賽博龐克 → morcept 簡約）、連結對照表、版本歷程
- `TODO.md` — 新增「整體風格轉換」項目並勾選完成

### Technical
- CSS variables 全面重構：`--cyan/--magenta/--green` 退役，改為 `--text/--text-secondary/--text-muted/--border/--bg/--bg-soft` 等語意化命名
- 字型 import：移除 Orbitron / Share Tech Mono，新增 Inter / JetBrains Mono；保留 Noto Sans TC
- Light/Dark mode 邏輯反轉：light 為預設值（`localStorage.zxa_mode === 'dark'`）
- 所有 i18n 內容、連結、可點擊元素皆保留（功能 zero regression）

---

## [0.8] — 2026-05-07

### Added
- `index.html` — 深色/淺色模式切換（`☀ LIGHT` / `🌙 DARK` 按鈕，底部左側固定）；CSS 變數切換，localStorage 持久化
- `index.html` — 中/英多語切換（`EN` / `中` 按鈕）；`data-i18n` 屬性 + JS translations 物件，覆蓋所有中文內容（描述、公司名、教育、專案等）
- `index.html` — 姓名打字機效果（頁面載入後逐字顯示「蕭哲安」，glitch 殘影打字期間暫時隱藏）
- `index.html` — 技能分組可折疊（點擊 `// SOFTWARE & AI` / `// HARDWARE & MCU` / `// TOOLS & TAGS` 標題展開/收合）；`.skill-content` 包裹器 + CSS `max-height` transition
- `index.html` — 標籤群重構為第三個 skill-group `// TOOLS & TAGS`（可折疊）
- `index.html` — 聯絡表單 modal（`✉ CONTACT` 按鈕）；欄位：姓名、Email、留言；送出後 `mailto:` 開啟郵件客戶端
- `index.html` — 訪客計數器（footer 下方 visitor-badge.laobi.icu badge）
- `resume-push.md` — 支援 `PDF路徑` 參數（直接指定）、`分支` 參數、`minimal` / `classic` 風格主題；更新完整使用說明與範例

### Technical
- 左側固定按鈕群 `.ctrl-btns`：contact / lang / mode 三顆按鈕垂直排列
- Light mode：CSS 變數全套覆蓋（--dark → #ffffff、--cyan → #0070c8 等）；隱藏 scanline / grid / glitch 殘影
- `@media print` 新增隱藏 `.ctrl-btns`、`.modal-overlay`；`.skill-content` 強制顯示避免折疊內容消失列印

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
  - ⚡ Edge AI：URL 補完整（`...1JvKEiwZu58XSDgcmFgQtnCNYhsKCS4BXV0aUHWvVqfQ/edit?usp=sharing`），加 `→ DOCS` 按鈕
  - 🔧 Nanoclaw：新增 `→ YOUTUBE` 按鈕（YouTube demo）
  - 🧠 OCR：URL 補完整（`...17lfCUG3l4pKyeh4Tiow0iKpoI6pt31J9?usp=drive_link`），加 `→ DRIVE` 按鈕
  - 🏛️ 交大 AI：新增 `→ DRIVE` 按鈕（Google Drive 專案檔）
  - 移除 `a.project-link` 全卡包裹寫法，改為 `.proj-btn` 行內按鈕
- `CLAUDE.md` — 更新連結對照表與版本歷程
- `README.md` — 補充 v0.6 更新紀錄
- `TODO.md` — 勾選「補齊 Nanoclaw / 交大 專案外部連結」

### Technical
- 新增 `.proj-btn` CSS：`Share Tech Mono`、cyan 邊框、hover 發光，與風格一致

---

## [0.5] — 2026-05-06

### Added
- `CLAUDE.md` — Claude 專案記憶檔，記錄設計規則、連結對照、歷史決策

### Changed
- `index.html` — 導入 PDF 附件連結至對應履歷元素，**零風格 / 排版變動**
  - MAIL 聯絡欄 → `mailto:a0935951152@gmail.com`（點擊開啟郵件客戶端）
  - GIT 聯絡欄 → `https://github.com/a0935951152-droid`（新分頁開啟）
  - ⚡ Edge AI 智慧跟隨風扇系統 → `docs.google.com/document/d/1JvKEiwZu58XSDgcmF`（PDF 本地多併發建置文件）
  - 🧠 OCR × Transformer 翻譯優化專案 → `drive.google.com/drive/folders/17lfCUG3l4pKyeh4Tiow`（PDF 機器學習專案 Drive）
  - 🔧 Nanoclaw、🏛️ 交大 — PDF 無對應外部連結，保持純展示
- `README.md` — 補充 v0.5 更新紀錄、CLAUDE.md 說明
- `TODO.md` — 專案連結項目標記為已完成

### Technical
- 使用 `<a class="project-link">` 包裹專案卡，`display:block; text-decoration:none; color:inherit` 確保外觀不變
- 聯絡欄由 `<div>` 改為 `<a>`，繼承既有 `.contact-item` 樣式

---

## [0.4] — 2026-05-06

### Added
- `CHANGELOG.md` — 版本更新紀錄文件（本檔案）
- `TODO.md` — 待辦事項與未來規劃
- `.claude/skills/resume-push.md` — 履歷讀取→設計→推送 Skill（可用 `/resume-push` 呼叫）
- `README.md` 更新：補充專案結構、工具鏈、更新歷程表格

---

## [0.3] — 2026-05-06

### Added
- `index.html` — 個人簡歷網頁，賽博龐克風格
  - 霓虹三色系：青色 `#00f5ff` / 洋紅 `#ff00cc` / 綠 `#39ff14`
  - Glitch 動畫姓名標題、頂部掃描光條動畫
  - 技能進度條動態填充 + 霓虹發光、切角 `clip-path` 面板
  - 六邊形頭像框、統計欄 Stats Bar、時間軸工作經歷
  - 完整導入 蕭哲安 PDF 履歷（技能、學歷、工作、專案、語言、證照）

### Technical
- 使用 GitHub MCP Server 直接推送，無需本地 git 操作
- 純 HTML + CSS，Google Fonts（Orbitron / Share Tech Mono / Noto Sans TC）

---

## [0.2] — 2026-05-06

### Added
- GitHub MCP Server 連線設定
  - 安裝 `github@claude-plugins-official` 插件
  - 設定 `GITHUB_PERSONAL_ACCESS_TOKEN` 至 `~/.claude/settings.json`
  - 驗證 MCP 連線狀態（`/mcp` 確認 Reconnected）

---

## [0.1] — 2026-05-06

### Added
- 初始化 repository `0520_Claude_code_Lab`
- 建立 `README.md`（交大 0520 教材上課用）
