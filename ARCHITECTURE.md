# ARCHITECTURE — 專案架構紀錄

> 最後更新：2026-05-15 · 對應版本 v0.15.0（v1.0 RC1）
> 本檔記錄 repo **當下** 完整架構（檔案 / 設計 token / JS 模組 / Studio / 部署）。
> 結構性大改動須同步更新此檔（§10 維護規則）。

---

## 1. 檔案結構

```
0520_Claude_code_Lab/
├── index.html              # 履歷網頁 shell（v0.12 起拆檔，純瀏覽不需登入）
├── assets/
│   ├── styles.css          # 履歷 CSS（design tokens / 排版 / 元件 / print）
│   ├── scripts.js          # 履歷 JS（i18n / mode / skill collapse / contact）
│   └── config.js           # contact endpoint / shared token（v0.15.0 起抽出）
├── tools/                  # 本地 Design Studio（純前端 + localStorage）
│   ├── studio.html         # Studio shell
│   ├── studio.css          # Studio UI 樣式
│   ├── studio.js           # 核心（state / history / tokens / viewport / geometry / wire-up）
│   ├── studio-modes.js     # Text Edit + Move 模式（v0.14 抽出）
│   ├── studio-inspector.js # Element Inspector / 個別元素 override（v0.14 新檔）
│   ├── studio-diff.js      # Diff View modal（v0.14 新檔）
│   └── studio-export.js    # Patch JSON / tokens.css / Full HTML 三種 export
├── CLAUDE.md               # Claude Code 專案守則（每次對話自動載入）
├── ARCHITECTURE.md         # ← 本檔
├── README.md               # 專案總覽 + 完整版本表
├── CHANGELOG.md            # 詳細版本變更（Keep a Changelog 格式）
├── TODO.md                 # 待辦 / 規劃中功能
├── LINKS.md                # index.html 可點擊元素 / 外部連結對照
└── .gitignore              # 排除 CONTACT_SETUP.md / RESUME.md / Studio 匯出 / 系統雜物
```

**本機保留（gitignored，不在 repo 內）**：
```
├── CONTACT_SETUP.md        # Apps Script Web App 部署 + spam/DDoS 防禦設定步驟
└── RESUME.md               # 蕭哲安履歷文字摘要（v0.15.0 起 gitignore，個人化資訊不入 public repo）
```

**外部資源（user-scope，不歸屬 repo）**：
- `~/.claude/settings.json` → `env.GITHUB_PERSONAL_ACCESS_TOKEN`（推送認證）
- `~/.claude/skills/resume-push.md` — PDF 履歷 → 設計 → 推送
- `~/.claude/skills/studio-merge.md` — Studio patch JSON → 套用 → commit + push（v0.13.0）
- `~/.claude/projects/-Users-a0935951152/memory/` — 個人化資訊（endpoint / Sheet ID / token 等）
- GitHub Pages：`https://a0935951152-droid.github.io/0520_Claude_code_Lab/`

**檔案分拆守則（v0.12 起）**：單一檔案達 1000 行即拆分。詳見 CLAUDE.md。

---

## 2. 技術棧

| 層級 | 技術 |
|------|------|
| Frontend | 純 HTML5 + CSS3 + Vanilla JS（無框架、無 build step） |
| 字型 | Google Fonts — `Noto Sans TC` / `Inter` / `JetBrains Mono` |
| Contact form 後端 | Google Apps Script Web App → Google Drive Sheet（v0.14.1 起） |
| 部署 | GitHub Pages（main 分支根目錄，auto-deploy） |
| 開發工具 | Claude Code CLI + GitHub MCP plugin |
| 版本控制 | Git via `https://github.com/a0935951152-droid/0520_Claude_code_Lab` |
| 本地工作目錄 | `/Users/a0935951152/github/0520_Claude_code_Lab` |

**無 build step / 無依賴管理**：所有檔案直接由 GH Pages 服務，瀏覽器即時跑。第三方僅引 Google Fonts（CDN）。

---

## 3. 設計 Token（CSS Variables）

定義於 `assets/styles.css` 開頭的 `:root` 與 `body.dark-mode`（v0.12 起從 `index.html` 拆出）。**修改設計前必先理解這層。**

### Light Mode（預設）
```css
--bg: #ffffff;            /* 主背景 */
--bg-soft: #fafafa;       /* 卡片次背景 */
--bg-section: #f5f5f5;    /* 軌道 / fill 背景 */
--text: #222222;          /* 主文字 / 主色（黑） */
--text-secondary: #555;   /* 內文次文字 */
--text-muted: #999999;    /* 標籤 / 日期 / 元資料 */
--border: #e8e8e8;        /* 一般邊框 */
--border-strong: #d4d4d4; /* hover / 強調邊框 */
--accent: #222222;
--accent-hover: #000000;
--shadow-soft: 0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.03);
--shadow-hover: 0 8px 24px rgba(0,0,0,0.08), 0 4px 8px rgba(0,0,0,0.04);
--radius-card: 12px;
```

### Dark Mode（alternate，**非賽博龐克**）
```css
--bg: #0e0e10;
--bg-soft: #161618;
--bg-section: #1c1c1f;
--text: #f0f0f0;
--text-secondary: #b0b0b0;
--text-muted: #707070;
--border: #2a2a2e;
--border-strong: #3a3a3f;
--accent: #f0f0f0;
--accent-hover: #ffffff;
```

### 字型別名
```css
--serif: 'Noto Sans TC', 'Inter', -apple-system, sans-serif;  /* 內文/標題 */
--mono:  'JetBrains Mono', ui-monospace, monospace;           /* 標籤/數據 */
```

### Studio 可調 Design Tokens（runtime override）
Studio 暴露以下變數為 UI 控制項（v0.14 起）：`--radius-card`、`--shadow-soft` / `--shadow-hover`（4 preset）、`--serif` / `--mono`（dropdown）。

---

## 4. 排版結構

```
.container (max-width: 1180px, padding: 64px 32px 80px)
├── .header                       # 圓形 avatar + 姓名 + title-tag + contact
├── .stats-bar                    # 6 欄 grid（手機 3 欄）
└── .main-grid                    # 340px sidebar + 1fr main
    ├── 左欄
    │   ├── .panel  Skill Matrix    （三組可折疊：SW/AI、HW/MCU、Tools）
    │   ├── .panel  Education
    │   ├── .panel  Languages
    │   └── .panel  Certifications
    └── 右欄
        ├── .panel  About            （summary + badges）
        ├── .panel  Work Experience  （5 段時間軸）
        └── .panel  Selected Projects（4 張專案卡）

.footer + 訪客計數器

固定元素：
├── .ctrl-btns（左下，4 顆 pill：Contact / Lang / Mode / 🎨 Studio）
├── .export-btn（右下，PDF 列印）
└── .modal-overlay #contact-modal（隱藏 modal）
```

**禁改項**（CLAUDE.md §2）：左右雙欄、Stats Bar、Header / Footer 位置不得變動。

---

## 5. JavaScript 模組

### 履歷頁（`assets/scripts.js`）
封裝在 IIFE 內（`(() => { ... })()`），無全域汙染（除掛在 `window` 上的 modal 操作）。讀取 `window.__SITE_CONFIG__`（由 `assets/config.js` 提供）取得 contact endpoint。

| 模組 | 入口 | 功能 |
|------|------|------|
| i18n | `T = { zh: {...}, en: {...} }` + `applyLang(l)` | 中英切換，覆寫所有 `data-i18n` 屬性 |
| Theme | `applyMode(dark)` | 切換 `body.dark-mode` class |
| Skill collapse | `.skill-group-title` click handler | toggle `.skill-group.collapsed` |
| Contact modal | `openContact / closeContact / submitContact` | 顯示 modal + POST 到 Apps Script Web App，失敗 fallback `mailto:` |
| LocalStorage keys | `zxa_lang` / `zxa_mode` | 持久化偏好 |
| Studio inject marker | `// __STUDIO_INJECT__`（v0.15.0） | Studio Full HTML export 在此點注入 textPatches |

### Studio（`tools/studio-*.js`）
6 個檔，總計約 1,750 行；遵守 1000 行拆檔守則（v0.12 起）。檔間透過 script-top 共享 binding（無 IIFE 包裹）。

| 檔 | 行 | 職責 |
|----|----|------|
| `studio.js` | ~780 | 核心：state / history (undo/redo) / token render / preset / 跨檔 shared (`state` / `iframe` / `studioDrag`) |
| `studio-modes.js` | ~290 | Text Edit + Move 模式 + iframe drag/drop listeners |
| `studio-inspector.js` | ~240 | Element Inspector：點元素 → 10 屬性編輯 → `state.elementOverrides` |
| `studio-diff.js` | ~145 | Diff View modal — 顯示與預設值的差異 |
| `studio-export.js` | ~165 | 3 種 export：Patch JSON / tokens.css / Full HTML（self-contained） |

LocalStorage key：`studio_state_v3`（schema 隨 patch JSON 演進到 v3）。

---

## 6. 可點擊元素對照

完整清單見 `LINKS.md`。摘要：

| 元素 | 連結 / 動作 |
|------|------|
| MAIL contact-item | `mailto:a0935951152@gmail.com` |
| GIT contact-item | `https://github.com/a0935951152-droid` |
| 四張專案卡 → 各自 `→ View Docs / Watch Demo / View Drive` | 外部 URL（Google Docs / YouTube / Drive） |
| Export PDF（右下） | `window.print()` |
| ✉ Contact / EN / ◐ Dark（左下） | JS handlers |
| 🎨 Studio（左下，v0.10.1+） | `tools/studio.html`（新分頁） |

---

## 7. 部署流程

```
本地編輯
   ↓
git add / commit / push origin main
   ↓
GitHub Pages 自動部署（約 30s ~ 1min）
   ↓
https://a0935951152-droid.github.io/0520_Claude_code_Lab/
```

**設定**：repo Settings → Pages → Source: `Deploy from a branch` → Branch: `main` / `/ (root)`。無 GitHub Actions workflow（v0.15.0 起，曾於 v0.17.0 試過 Actions inject secrets 後 reset 回此設計）。

**認證**：`git remote` 帶 PAT 或 SSH key 二擇一。本機用 PAT（存在 `~/.claude/settings.json`）。

**單一入口**：純瀏覽 → `index.html`（無認證）。Cloud / 後端方向已於 2026-05-15 放棄，不在 v1.0 scope。

---

## 8. Design Studio

> 本地視覺設計工具，類 Webflow / Plasmic / Framer 的瀏覽器內編輯體驗，**完全離線、不觸發 git push**。M1–M8 已完成（v0.10–v0.14），M9 demo 截圖標 dropped（v0.15.0）。

### 8.1 定位

- 本地快速迭代設計，不污染 `index.html` 與 main 歷史
- 把 §3 design token 系統暴露成可視化控制
- 確認設計 OK 後，使用者把 patch.json 丟給 Claude Code → `/studio-merge` skill 自動 merge + commit + push
- 屬於「**額外工具**」，與主簡歷 `index.html` 完全解耦

### 8.2 核心工作流（Demo → Merge）

```
┌─────────────────────────────────────────────────────────────┐
│  Browser ── tools/studio.html                              │
│  ┌────────────────────┐      ┌──────────────────────────┐  │
│  │  Controls Panel    │  →   │  iframe = LIVE DEMO      │  │
│  │  色彩/字型/排版/... │      │  (mutated index.html)    │  │
│  └────────────────────┘      └──────────────────────────┘  │
│           ↓                                                 │
│      [ Export ▼ Patch JSON / tokens.css / Full HTML ]      │
└─────────────────────────────────────────────────────────────┘
                          ↓ patch.json
┌─────────────────────────────────────────────────────────────┐
│  Claude Code CLI                                            │
│  $ /studio-merge ~/Downloads/studio-patch-*.json           │
│   → 讀 patch、驗 indexHtmlSha                               │
│   → 套用 tokens / textPatches / movePatches / panelLayout   │
│   → 寫回 index.html                                         │
│   → 自動更新 CHANGELOG                                      │
│   → git add → commit → push                                 │
└─────────────────────────────────────────────────────────────┘
                          ↓ GH Pages auto-deploy
                  https://...github.io/0520_Claude_code_Lab/
```

**界線（強制）**：studio.html 純前端，**永不**寫回 `index.html`、**永不**碰 git、**永不**上傳。

### 8.3 功能模組（v0.14.0 完成版）

| 模組 | 控制 | 對應 patch 欄位 |
|------|------|--------|
| **Token Editor** — 10 色 / 模式 + Card Radius slider + Shadow 4 preset + Heading/Mono font dropdown | `--bg / --text / --border / --accent / --radius-card / --shadow-* / --serif / --mono` | `tokens` / `tokensDark` |
| **Theme Presets** — 一鍵套用 | 5 個內建：Morcept / Mono / Paper / Ocean / Forest | `themePreset` |
| **Text Edit ✏** — contenteditable 所有 `[data-i18n]` | innerHTML 自動 capture | `textPatches` |
| **Move ↕** — 拖曳項目排序 + 整塊 panel 跨欄拖曳 + 區塊 Delete（hover ×） | 5 容器：experience / projects / education / certifications / languages | `movePatches` + `panelLayout` |
| **Element Inspector 🔍** — 點元素 → 10 屬性（color / bg / font-size / weight / padding / margin / radius / letter-spacing / line-height / text-align） | inline style override 到指定 selector | `elementOverrides` |
| **Diff View 📋** — 與預設比對，分組顯示 token / text / move / panel / inspector 變更 | modal | — |
| **Responsive Preview 📱** — 375 / 768 / 1024 / Full | viewport switcher | — |
| **History** — Undo / Redo，最多 50 步，`⌘Z` / `⌘⇧Z` | localStorage 持久化 | — |
| **Sidebar resize** — 240–600px 可拖 | localStorage 持久化 | — |

### 8.4 LocalStorage 結構

Key：`studio_state_v3`

```jsonc
{
  "tokens": { "light": {...}, "dark": {...} },
  "darkMode": false,
  "textPatches": { "exp1_desc": "...", ... },
  "movePatches": { "experience": ["exp3_title", ...], ... },
  "panelLayout": { "left": [...], "right": [...] },
  "history": [...],       // 最多 50 個 snapshot
  "redoStack": [...],
  "currentPreset": "morcept",
  "textEditMode": false,
  "moveMode": false,
  "sidebarWidth": 320,
  "viewport": "auto",
  "designTokens": { "radiusCard": "12px", "shadowPreset": "subtle", ... },
  "elementOverrides": [...],
  "inspectMode": false
}
```

自動儲存（每次變更後 `saveState()`）。「Reset」按鈕清空回 Morcept 預設。

### 8.5 Patch JSON Schema（v3）

studio.html → Claude Code 之間的合約。`/studio-merge` 必須能 100% 還原這份 patch 到 `index.html`。

```jsonc
{
  "version": "studio_patch_v3",
  "createdAt": "2026-05-15T15:42:00Z",
  "basedOn": {
    "indexHtmlSha": "abc123...",     // 可選；merge 時驗證未變
    "studioVersion": "0.12.0-M2+"
  },
  "themePreset": "morcept",          // morcept / mono / paper / ocean / forest / custom
  "tokens":     { "--text": "#1a1a1a", ... },   // light, diff vs Morcept 預設
  "tokensDark": { "--text": "#fafafa", ... },   // dark, diff vs Morcept 預設
  "textPatches": { "exp1_desc": "改過的描述...", "proj1_name": "新標題" },
  "movePatches": { "experience": ["exp3_title", "exp1_title", ...], ... },
  "panelLayout": { "left": [...], "right": [...] },
  "elementOverrides": [ { "selector": ".panel-title", "styles": {...} } ],
  "htmlPatches": []                  // 預留欄位（未實作）
}
```

**容器 key 對照表（movePatches）**：

| key | childSelector | 識別子 |
|-----|---------------|--------|
| `experience` | `.exp-item` | `.exp-title` 的 `data-i18n` |
| `projects` | `.project-item` | `.project-name` 的 `data-i18n` |
| `education` | `.edu-item` | `.edu-school` 的 `data-i18n` |
| `certifications` | `.cert-item` | `.cert-name` 的 `data-i18n` |
| `languages` | `.lang-item` | `.lang-name` 的 textContent |

**合併規則**：tokens → tokensDark → movePatches → panelLayout → textPatches → elementOverrides，順序執行。

### 8.6 `/studio-merge` Claude Code Skill

| 屬性 | 內容 |
|------|------|
| 位置 | `~/.claude/skills/studio-merge.md`（user-scope，不歸屬 repo） |
| 觸發 | `/studio-merge <patch.json 路徑>` 或自然語言「套用這個 patch」 |
| 流程 | 1. 讀 patch.json → 2. 驗 schema → 3. 讀 `index.html` 並驗 indexHtmlSha → 4. 套用 → 5. 自動產生 CHANGELOG 條目 → 6. git add + commit + push |
| 安全閥 | 衝突或 hash 不符 → 暫停等使用者確認 |

### 8.7 開發里程碑（完整紀錄）

| Milestone | 範圍 | 版本 |
|-----------|------|------|
| M1 | 基礎 shell + iframe 預覽 + Token Editor (Colors) | v0.10.0 |
| M2 | Token Editor 完整 — Theme Presets / Card Radius / Shadow / Font dropdown | v0.11–v0.14 |
| M3 | Element Inspector — 10 屬性編輯 | v0.14.0 |
| M4 | Content Editor — Text Edit + Move + Panel 跨欄 + Delete | v0.11–v0.14 |
| M5 | Responsive Preview | v0.13.0 |
| M6 | History + Diff View | v0.13–v0.14 |
| M7 | Export 全套 — Patch JSON / tokens.css / Full HTML | v0.10–v0.14 |
| M8 | `/studio-merge` Skill | v0.13.0 |
| M9 | 文件 + 線上發佈 — README / ARCHITECTURE | v0.13.0；~~Demo gif / 截圖~~ dropped v0.15.0 |

**延後 / 不做**（規格未收斂或 ROI 低）：
- M2 「間距 base 控制」— 需 styles.css 大幅重構
- M4 「區塊 Duplicate」— patch schema 需擴充
- M4 「PPT-style 自由定位」— 與履歷風格衝突

### 8.8 技術約束

- 純 HTML / CSS / Vanilla JS（與主專案一致，**無建置依賴**）
- 第三方僅用原生 `<input type="color">` + Google Fonts
- iframe 同源（`../index.html`），透過 `contentDocument` DOM 注入 style 與監聽 drag/drop
- 跨檔共享：`state` / `iframe` / `studioDrag`（script-top binding，不走 IIFE）

---

## 9. 版本對應

| 版本 | 主要架構變更 |
|------|--------------|
| v0.3 | 賽博龐克 `index.html` 初版上線 |
| v0.6 | 四張專案卡完整連結化 |
| v0.7 | `@media print` 列印樣式、行動裝置斷點 |
| v0.8 | i18n 模組、深淺模式、Contact modal、訪客計數器 |
| **v0.9** | **morcept.com 簡約風大改版**（移除霓虹/glitch/clip-path、改 token 系統、本檔建立） |
| v0.10 | **Design Studio M1 上線** — `tools/studio.html` 視覺化 Token Editor (Colors) + iframe 預覽 + Export Patch JSON |
| v0.11 | **Studio 增強包**（M2/M4/M6 部分） — Theme Presets (5) / Text Edit / Move / Undo；patch schema v2 |
| v0.12 | **檔案拆分守則 + Studio panel 跨欄拖曳** — index/studio 各拆 3 檔；sidebar resizable；patch schema v3 含 `panelLayout` |
| v0.12.1 | **文件結構重整** — CLAUDE.md 瘦身、`RESUME.md` / `LINKS.md` 分檔 |
| v0.13 | **Studio M5–M8 完成** — Responsive Preview、Redo、Export tokens.css、`/studio-merge` Skill；studio.js 拆出 `studio-export.js` |
| v0.14 | **M2 / M3 / M4 / M6 / M7 全部完成** — Geometry & Type 控制、Element Inspector、區塊 Delete、Diff View Modal、Full HTML Export；studio 拆 6 個 JS 檔 |
| v0.14.1 | **Contact 接 Google Drive** — Apps Script Web App，失敗 fallback `mailto:` |
| v0.14.2 | **Contact 多層 spam/DDoS 防禦** — token / honeypot / timing / origin / cooldown / rate limit |
| v0.14.3 | **守則：部署資訊不入 repo** — `CONTACT_SETUP.md` gitignored + Claude memory 接手 |
| **v0.15.0** | **v1.0 RC1：程式碼健康** — Studio 6 個 bug / 死碼 / 跨檔脆弱 / inspect 性能修正；contact endpoint+token 抽 `assets/config.js`；M9 demo 截圖標 dropped；後端方向（v0.15–v0.17 舊規劃 / B1 / B2）reset 回 v0.14.3 |

**已從 history 移除**（2026-05-15 reset，不在版本表）：v0.15.0 舊版（後端規劃）/ v0.16.0 (B1 Supabase) / v0.16.1 / v0.16.2 / v0.17.0 (B2 Auth UI)。編號被 v0.15.0 RC1 重新使用。

---

## 10. 維護規則

### 10.1 設計風格（morcept 簡約風，v0.9 起）
- 配色：黑白灰中性色（`--bg #fff` / `--text #222` / `--border #e8e8e8` / `--accent #222`，dark mode 對稱對應）
- 字型：`Noto Sans TC` + `Inter`（內文 / 標題）、`JetBrains Mono`（標籤 / 數據）
- 元件：圓角 12px 卡片、細邊框 + soft shadow + hover lift、pill button（黑底白字）
- 動效：僅保留 hover lift / scale；**禁止**霓虹、glitch、scanline、clip-path 角切
- 任何「賽博龐克」元素不得加回，除非使用者明確要求復古

### 10.2 排版結構（禁改）
左右雙欄、Stats Bar、Header / Footer 位置不得變動。

### 10.3 連結包裹
新增連結用 `<a>` 包裹，必加 `text-decoration:none; color:inherit; display:block`，確保視覺完全不變。

### 10.4 檔案分拆（1000 行強制）
任何單一檔案達 1000 行即拆分：
- HTML：抽 `<style>` → `.css`、`<script>` → `.js`
- 大型 JS：分 modules / 多 `.js`
- 大型 CSS：依功能拆（如 `tokens.css` / `layout.css` / `components.css`）
- 目標單檔 700–900 行內

### 10.5 變更同步路徑

| 變更性質 | 同步檔案 |
|----------|----------|
| 連結 / 可點擊元素 | `LINKS.md` + 本檔 §6 |
| 履歷內容 | `RESUME.md`（本機）+ `assets/scripts.js` 的 `T.zh` / `T.en` 雙語 |
| Frontend 結構 / token / JS 模組 | 本檔 §1 / §3 / §5 |
| Studio 功能 / patch schema | 本檔 §8 |
| 待辦進度 / 里程碑 | `TODO.md` |
| 每個版本 | `CHANGELOG.md`（詳細）+ `README.md` 版本表（一列） |

> 修改 `index.html` 前先檢查 design token 是否需要新增（避免硬編碼顏色）。
> 新增可點擊元素：必更新本檔 §6 + `LINKS.md`。

### 10.6 部署 / 開發資訊不入 repo（v0.14.3 起）

**不該 push**：
- 帳號設定步驟、第三方服務一次性設定（Apps Script 部署 / OAuth provider 設定）
- API key / Sheet ID / endpoint URL 的「設定指南」（程式碼裡實際用到的常數可以，純設定文件不行）
- 個人履歷文字（`RESUME.md` v0.15.0 起 gitignore）
- 操作步驟截圖、內部說明書、長篇「Action Required」段落

**改放這裡**：
- Claude memory 系統（`~/.claude/projects/.../memory/`）— 跨對話可調閱
- User-scope skill（`~/.claude/skills/*.md`）
- 本機 notes + gitignore

理由：public repo 是「成果」不是「過程」；部署細節洩漏增加攻擊面、且資訊容易過期。

### 10.7 推送前 / Token 安全
- 推送前 `git status` 須乾淨；不用 `--no-verify`
- `GITHUB_PERSONAL_ACCESS_TOKEN` 在 `~/.claude/settings.json`，**勿在對話中重新顯示 token 明文**
- MCP push 前先 `mcp__plugin_github_github__get_file_contents` 取最新 SHA（避免 409）；目前主走本地 git push
