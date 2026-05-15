# 0520_Claude_code_Lab

[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc/4.0/)
[![Live Site](https://img.shields.io/badge/live-github.io-0a0a0a.svg)](https://a0935951152-droid.github.io/0520_Claude_code_Lab/)

交大 0520 課程實作 Lab — 以 Claude Code + GitHub MCP 為核心工具鏈，探索 AI 輔助開發工作流。

---

## English summary

Personal résumé + portfolio site for **ZHE-AN XIAO** (蕭哲安), AI & Firmware Engineer.
Built with vanilla HTML / CSS / JavaScript — no framework, no build step — deployed via GitHub Pages.

- **Bilingual** (zh-TW / en) with localStorage-persisted preference
- **Light / Dark** mode (morcept.com minimal aesthetic since v0.9)
- **Contact form** writes to a private Google Drive Sheet via Apps Script Web App (multi-layer spam defense since v0.14.2)
- **Print-friendly** — `Export PDF` button uses native `window.print()`
- **Design Studio** (`tools/studio.html`) — in-browser visual editor for tokens / text / layout, exports patch JSON that a `/studio-merge` Claude Code skill applies back to source

This whole project is also an exploration of building production-quality code with Claude Code as the primary IDE. See `CHANGELOG.md` for the full development log (v0.1 → present).

Code is licensed under [CC BY-NC 4.0](LICENSE) — free to study and adapt for non-commercial use, but you may not reuse the résumé content or my name / portrait without permission.

---

---

## 專案結構

```
0520_Claude_code_Lab/
├── index.html              # 履歷網頁 shell（v0.12 起拆檔）
├── assets/
│   ├── styles.css          # 履歷 CSS
│   ├── scripts.js          # 履歷 JS（i18n / mode / contact form）
│   ├── config.js           # contact endpoint / shared token（v0.15.0 起抽出）
│   └── favicon.svg         # SVG favicon（v0.17.0 起，自適應 light/dark）
├── LICENSE                 # CC BY-NC 4.0（v0.17.0 起）
├── README.md               # 專案說明 + 完整版本歷程
├── CHANGELOG.md            # Keep a Changelog 格式版本紀錄
├── TODO.md                 # 待辦 / 規劃中功能
├── CLAUDE.md               # Claude Code 專案守則（精簡版，v0.12.1 起）
├── ARCHITECTURE.md         # 架構紀錄（檔案結構 / token / JS 模組 / Studio 規格）
├── RESUME.md               # （本機保留，已 gitignore）蕭哲安履歷資料摘要
├── LINKS.md                # index.html 可點擊元素 / 外部連結對照（v0.12.1 起，從 CLAUDE.md 抽出）
└── tools/
    ├── studio.html         # Design Studio shell
    ├── studio.css          # Studio CSS
    ├── studio.js           # Studio 核心（state / history / tokens / viewport / geometry）
    ├── studio-modes.js     # Text Edit + Move 模式（v0.14 抽出）
    ├── studio-inspector.js # M3 Element Inspector（v0.14）
    ├── studio-diff.js      # M6 Diff View modal（v0.14）
    └── studio-export.js    # Patch JSON / tokens.css / Full HTML 三種 export
```

> User-scope Skill（不在 repo 內）：`~/.claude/skills/studio-merge.md` — 處理 Studio patch JSON 合併。

> 拆檔守則：單一檔案達 1000 行即拆分（HTML → .css / .js）。詳見 CLAUDE.md §5。

### Design Studio（額外工具）

訪問路徑：`tools/studio.html`（線上同路徑）。

**功能（v0.13.0，M1–M8 完成）：**
- 視覺化編輯 light / dark 模式 CSS tokens（10 色 / 模式）
- 5 個 Theme Presets（Morcept / Mono / Paper / Ocean / Forest）一鍵套用
- ✏ 文字編輯模式（contenteditable 所有 `[data-i18n]` 元素）
- ↕ Move 模式：拖曳項目排序 + **整塊 panel 跨欄拖曳**
- ↶ Undo / ↷ Redo（最多 50 步、`⌘Z` / `⌘⇧Z`）
- 📱 Responsive Preview（375 / 768 / 1024 / Full 切換）
- 側欄可拖曳調寬（240–600px）
- Export Patch JSON（給 `/studio-merge` 自動合併）或 tokens.css（純 CSS 變數）

**使用流程：**

```
1. 打開履歷頁 → 左下角點「🎨 設計工具」
   ↓
2. Studio 線上開啟 → 玩配色 / 改文字 / 拖排序 / 切 viewport
   ↓
3. 滿意後點 「↓ Export」→ 選 Patch JSON
   ↓
4. 下載的 .json 拖回 Claude Code 對話 + 說「套上去」
   ↓
5. /studio-merge Skill 自動：
   - 套用 tokens / textPatches / movePatches / panelLayout
   - git add + commit + push
   ↓
6. GitHub Pages 自動部署（~30s）→ 履歷頁更新
```

**核心邊界：**
- Studio 純前端 — 不會寫回 index.html、不會觸發 git
- 所有合併動作明確發生在 Claude Code 端（有檔案系統 + git 權限）

> 註：`/resume-push` Skill 屬使用者層級（`~/.claude/skills/resume-push.md`），不歸屬本 repo。

---

## 功能說明

### index.html — 個人簡歷網頁
- **morcept.com 簡約風格**（白底深字、圓角卡片、細邊框、留白導向）— v0.9 起
- 導入 蕭哲安 PDF 履歷資料（技能、學歷、工作經歷、專案）
- 純 HTML + CSS，無框架依賴，支援 GitHub Pages 部署
- 響應式排版，桌面 / 行動裝置均可瀏覽
- 深 / 淺色雙模式（預設淺色 minimalist，深色採低調優雅而非賽博龐克）
- 可點擊元素：Email、GitHub、四張專案卡（各含 `View Docs / Watch Demo / View Drive` 按鈕）

### 文件分工（v0.12.1 起重整）

| 檔案 | 內容 | 何時讀 |
|------|------|--------|
| `CLAUDE.md` | 設計守則 + 環境參數 + 文件導覽 | 每次對話開頭自動載入 |
| `RESUME.md` | 蕭哲安履歷文字摘要（基本 / 學歷 / 經歷 / 技能 / 證照 / 專案）— **本機保留，已 gitignore** | 需要編輯履歷內容時 |
| `LINKS.md` | `index.html` 可點擊元素 / 連結對照表 | 連結變動或新增互動元素時 |
| `ARCHITECTURE.md` | 設計 token / JS 模組 / 部署流程 / Studio 規格 / Patch schema | 做結構性改動時 |
| `README.md` | 專案總覽 + 完整版本表 | 想看歷史脈絡時 |
| `CHANGELOG.md` | 詳細版本變更紀錄（Keep a Changelog 格式） | 想看特定版本細節時 |
| `TODO.md` | 待辦 / 規劃中功能 / 里程碑進度 | 規劃新功能時 |

---

## 技術工具鏈

| 工具 | 用途 |
|------|------|
| Claude Code CLI | 主要 AI 輔助開發工具 |
| GitHub MCP Server | 直接從 Claude 操作 GitHub repo |
| GitHub Pages | 靜態網頁部署 |
| HTML / CSS | 前端履歷實作 |

---

## 更新歷程

| 版本 | 日期 | 內容 |
|------|------|------|
| v0.1 | 2026-05-06 | 初始化 repo，建立課程基礎 |
| v0.2 | 2026-05-06 | 連接 GitHub MCP Server，設定 GITHUB_PERSONAL_ACCESS_TOKEN |
| v0.3 | 2026-05-06 | 新增賽博龐克風格個人簡歷 `index.html`，導入 蕭哲安 PDF 履歷 |
| v0.4 | 2026-05-06 | 新增 CHANGELOG / TODO / resume-push Skill 完整文件體系 |
| v0.5 | 2026-05-06 | 導入 PDF 連結至履歷元素（Email / GitHub / 兩張專案卡可點擊） |
| v0.6 | 2026-05-07 | 補完四張專案卡連結，改為按鈕物件設計（→ DOCS / YOUTUBE / DRIVE） |
| v0.7 | 2026-05-07 | PDF 匯出按鈕、列印樣式、行動裝置優化（Stats Bar 3×2、字體自適應） |
| v0.8 | 2026-05-07 | 深色/淺色切換、中英多語、打字機效果、技能折疊、聯絡表單、訪客計數器、resume-push Skill 升級 |
| v0.9 | 2026-05-13 | 整體風格大改版：賽博龐克 → morcept.com 簡約風（白底深字、圓角卡片、細邊框、留白排版） |
| v0.9.1 | 2026-05-13 | 新增 `ARCHITECTURE.md` 架構紀錄；規劃未來 HTML Live Editor（不 push 額外工具） |
| v0.9.2 | 2026-05-13 | 升級 §8.1 規格：HTML Live Editor → **Design Studio**（設計師等級工具，可同時操作 HTML / CSS tokens / 元件樣式） |
| v0.9.3 | 2026-05-13 | §8.1 補強核心工作流：Demo → Patch JSON → Claude Code 自動 merge + push；新增 `/studio-merge` Skill 規格與 Patch JSON Schema |
| v0.10.0 | 2026-05-13 | **Design Studio M1 上線**：`tools/studio.html` — 視覺化 Token Editor (Colors)、iframe 預覽、localStorage、Export Patch JSON |
| v0.10.1 | 2026-05-14 | `index.html` 左下加 🎨 Studio 按鈕，串接「履歷頁 → Studio → Export → Claude Code 合併」完整工作流 |
| v0.11.0 | 2026-05-14 | **Studio 增強包**：Theme Presets (5 主題) + ✏ Text Edit + ↕ Move + ↶ Undo（`⌘Z`） |
| v0.12.0 | 2026-05-14 | **拆檔**（index / studio 各拆 3 檔）+ 1000 行守則 + Sidebar 可拖移調寬 + Move 支援整塊 panel 跨欄拖曳 |
| v0.12.1 | 2026-05-14 | **文件重整**：CLAUDE.md 瘦身（129→76 行）；履歷摘要 → `RESUME.md`、連結對照表 → `LINKS.md`、版本歷程留在 README |
| v0.13.0 | 2026-05-14 | **Studio M5–M8 完成**：Responsive Preview、Redo（⌘⇧Z）、Export tokens.css、`/studio-merge` Skill 上線；studio.js 拆出 `studio-export.js` 守住 1000 行 |
| v0.14.0 | 2026-05-14 | **M2 / M3 / M4 / M6 / M7 全部完成 → M7 里程碑全綠**：Geometry/Type 控制、Element Inspector、區塊 Delete、Diff View Modal、Full HTML Export；studio.js 拆出 modes/inspector/diff 三新檔 |
| v0.14.1 | 2026-05-14 | **Contact 表單接 Google Drive**：`submitContact` 改 POST 到 Apps Script Web App（寫 Drive Sheet），失敗自動 fallback `mailto:`；新增 `CONTACT_SETUP.md` 完整設定指南 |
| v0.14.2 | 2026-05-14 | **Contact 多層 spam/DDoS 防禦**：endpoint 填上 URL；前端 honeypot + timing + token；後端 origin/validation/cooldown/rate limit；Apps Script 須重新部署 New version |
| v0.14.3 | 2026-05-14 | **新守則：部署/開發流程資訊不 push** — CLAUDE.md §6 + `.gitignore`；`CONTACT_SETUP.md` 從 repo 移除（保留本機），個人化資訊（Sheet ID / endpoint）存進 Claude memory |
| v0.15.0 | 2026-05-15 | **v1.0 RC1：程式碼健康** — Studio 6 個 bug / 死碼 / 跨檔脆弱 / inspect 性能修正；contact endpoint+token 抽到 `assets/config.js`；M9 demo 截圖標 dropped；後端方向（v0.15–v0.17 舊規劃 / B1 / B2）reset 回 v0.14.3 後重啟編號 |
| v0.16.0 | 2026-05-15 | **v1.0 RC2：文件對齊** — `ARCHITECTURE.md` 從 v0.9 全面重寫到 v0.15.0 實況：§1 補 config.js + Studio 6 模組、§3 token 位置改 styles.css、§5 補 JS 模組職責、§7 部署文字、§8 Studio 從「規劃中」改「現有架構」、§9 版本表補 v0.10–v0.15、§10 維護規則重整 |
| v0.17.0 | 2026-05-15 | **v1.0 RC3：公開分享基建** — LICENSE (CC BY-NC 4.0) / SEO meta + canonical + theme-color / Open Graph + Twitter Card / JSON-LD schema.org/Person / SVG favicon（light-dark 自適應）/ README 中英雙語化 + badges；`applyLang()` 動態切換 meta description + og:locale |

---

## 快速預覽

啟用 GitHub Pages 後可直接瀏覽：
`https://a0935951152-droid.github.io/0520_Claude_code_Lab/`

Settings → Pages → Source: `main` branch → Save
