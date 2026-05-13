# ARCHITECTURE — 專案架構紀錄

> 最後更新：2026-05-13 · 對應版本 v0.9
> 本檔記錄 repo **當下** 完整架構（檔案 / 設計 token / JS 模組 / 部署流程），並列出**未來規劃**的擴充工具。
> 每次 `index.html` 結構性大改動須同步更新此檔。

---

## 1. 檔案結構

```
0520_Claude_code_Lab/
├── index.html              # 個人簡歷網頁（單一檔案，純 HTML/CSS/JS）
├── README.md               # 專案說明 + 版本表
├── CHANGELOG.md            # Keep a Changelog 格式版本紀錄
├── TODO.md                 # 待辦 / 規劃
├── CLAUDE.md               # Claude Code 專案記憶（規則 / 連結對照 / token 位置）
└── ARCHITECTURE.md         # ← 本檔，架構紀錄
```

外部資源：
- `~/.claude/settings.json` → `env.GITHUB_PERSONAL_ACCESS_TOKEN`（推送認證）
- `~/.claude/skills/resume-push.md`（user-scope skill，**不歸屬 repo**）
- GitHub Pages：`https://a0935951152-droid.github.io/0520_Claude_code_Lab/`

---

## 2. 技術棧

| 層級 | 技術 |
|------|------|
| Frontend | 純 HTML5 + CSS3 + Vanilla JS（無框架、無 build step） |
| 字型 | Google Fonts — `Noto Sans TC` / `Inter` / `JetBrains Mono` |
| 部署 | GitHub Pages（main 分支根目錄） |
| 開發工具 | Claude Code CLI + GitHub MCP Plugin |
| 版本控制 | Git via `https://github.com/a0935951152-droid/0520_Claude_code_Lab` |
| 本地工作目錄 | `/Users/a0935951152/github/0520_Claude_code_Lab` |

---

## 3. 設計 Token（CSS Variables）

定義於 `index.html` 的 `:root` 與 `body.dark-mode`。**修改設計前必先理解這層。**

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
```

### 字型別名
```css
--serif: 'Noto Sans TC', 'Inter', -apple-system, sans-serif;  /* 內文/標題 */
--mono:  'JetBrains Mono', ui-monospace, monospace;           /* 標籤/數據 */
```

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
├── .ctrl-btns（左下，contact / lang / mode 三顆 pill）
├── .export-btn（右下，列印 / PDF）
└── .modal-overlay #contact-modal（隱藏 modal）
```

---

## 5. JavaScript 模組

全部封裝在 IIFE 內（`(() => { ... })()`），無全域汙染（除掛在 `window` 上的 modal 操作）。

| 模組 | 入口 | 功能 |
|------|------|------|
| i18n | `T = { zh: {...}, en: {...} }` + `applyLang(l)` | 中英切換，覆寫所有 `data-i18n` 屬性 |
| Theme | `applyMode(dark)` | 切換 `body.dark-mode` class |
| Skill collapse | `.skill-group-title click handler` | toggle `.skill-group.collapsed` |
| Contact modal | `openContact / closeContact / submitContact` | 顯示 / 隱藏 + mailto: 送出 |
| LocalStorage keys | `zxa_lang` / `zxa_mode` | 持久化偏好 |

---

## 6. 可點擊元素對照

| 元素 | 連結 |
|------|------|
| MAIL contact-item | `mailto:a0935951152@gmail.com` |
| GIT contact-item | `https://github.com/a0935951152-droid` |
| Edge AI 專案 → View Docs | `https://docs.google.com/document/d/1JvKEiwZu58XSDgcmFgQtnCNYhsKCS4BXV0aUHWvVqfQ/edit?usp=sharing` |
| Nanoclaw 專案 → Watch Demo | `https://www.youtube.com/watch?si=GWQhakzTJZB3ECQC&v=q3xqWqy11ho` |
| OCR 專案 → View Drive | `https://drive.google.com/drive/folders/17lfCUG3l4pKyeh4Tiow0iKpoI6pt31J9?usp=drive_link` |
| 交大 AI 專案 → View Drive | `https://drive.google.com/file/d/19aE9BpgaeGVXs9VHT1B1IDvQBwjYg0N0/view` |
| Export PDF（右下） | `window.print()` |
| Contact / Lang / Mode（左下） | JS handlers |

---

## 7. 部署流程（v0.9 現況）

```
本地編輯 (index.html)
   ↓
git add / commit
   ↓
git push origin main
   ↓
GitHub Pages 自動部署（約 30s ~ 1min）
   ↓
https://a0935951152-droid.github.io/0520_Claude_code_Lab/
```

認證：`git remote` 帶 PAT 或 SSH key 二擇一。目前用 PAT（存在 `~/.claude/settings.json`）。

---

## 8. 未來規劃工具

### 8.1 Design Studio（不 push 模式） — **規劃中**

> 設計師等級的本地視覺工具，可同時操作 HTML 內容、CSS tokens、元件樣式；類似 Webflow / Plasmic / Framer 的瀏覽器內編輯體驗，但**完全離線、不觸發 git push**。

#### 8.1.1 目的與定位

- 本地快速迭代設計，不污染 `index.html` 與 main 分支歷史
- 把現有的 design token 系統（§3）暴露成可視化控制，讓非工程角色（自己 / 設計師 / 同學）也能改色、改字、調間距
- 確認設計 OK 後，**使用者把 patch.json 丟給 Claude Code → Claude 自動 merge + commit + push**
- 屬於「**額外工具**」，與主簡歷 `index.html` **完全解耦**

#### 8.1.1a 核心使用流程（Demo → Merge）

```
┌─────────────────────────────────────────────────────────────┐
│  Browser ── tools/studio.html                              │
│  ┌────────────────────┐      ┌──────────────────────────┐  │
│  │  Controls Panel    │  →   │  iframe = LIVE DEMO      │  │
│  │  色彩/字型/排版/... │      │  (mutated index.html)    │  │
│  └────────────────────┘      └──────────────────────────┘  │
│           ↓                                                 │
│      [ Export Patch (JSON) ]  or  [ Copy to Clipboard ]    │
└─────────────────────────────────────────────────────────────┘
                          ↓ patch.json
┌─────────────────────────────────────────────────────────────┐
│  Claude Code CLI                                            │
│  $ /studio-merge ~/Downloads/patch.json                    │
│   或：「幫我把這個 patch 套到 index.html 然後推上去」      │
│   → 解析 patch                                              │
│   → 套用 tokens / elementOverrides / htmlPatches            │
│   → 寫回 index.html                                         │
│   → git add → commit → push                                 │
└─────────────────────────────────────────────────────────────┘
                          ↓ GitHub Pages 自動部署
                  https://...github.io/0520_Claude_code_Lab/
```

**關鍵原則**：
- studio.html 內部：iframe 是 demo，純前端 mutation，**完全不碰 `index.html`**
- 跨界（瀏覽器 → repo）：使用者主動 export patch 後拿給 Claude Code
- Claude Code：read patch → mutate `index.html` → commit + push

studio.html 本身**不能也不會**直接寫 `index.html` 或執行 git。merge 動作明確發生在 Claude Code 環境（有檔案系統與 git 權限）。

#### 8.1.2 形式（已收斂）

採方案 **(B) 獨立 HTML 頁面 + iframe 預覽**：

```
0520_Claude_code_Lab/
├── index.html              # 主簡歷（產線）
└── tools/
    └── studio.html         # ← Design Studio（額外工具）
```

- 路徑 `tools/studio.html`，避免被 GitHub Pages 當主頁
- 雖然檔案 commit 進 repo（讓他人能用），但**它本身不會修改 `index.html`、不會觸發 git**
- 開啟流程：在瀏覽器直接打開 `tools/studio.html`，左側面板控制、右側 iframe 顯示 `../index.html` 即時預覽

#### 8.1.3 功能模組

**A. Token Editor（核心）** — 視覺化編輯 design system

| 控制項 | 對應 CSS 變數 | UI |
|--------|--------------|----|
| 主文字色 | `--text` | color picker + hex 輸入 |
| 次文字色 | `--text-secondary` / `--text-muted` | color picker |
| 背景色 | `--bg` / `--bg-soft` / `--bg-section` | color picker |
| 邊框色 | `--border` / `--border-strong` | color picker |
| 強調色 | `--accent` / `--accent-hover` | color picker |
| 主字型 | `--serif` | dropdown（Noto Sans TC / Inter / 自訂） |
| 等寬字型 | `--mono` | dropdown |
| 字級基準 | `font-size` base | slider 12 ~ 18px |
| 間距比例 | padding/margin 倍率 | slider 0.8x ~ 1.4x |
| 圓角強度 | `border-radius` 倍率 | slider 0 ~ 24px |
| 陰影強度 | `--shadow-soft` / `--shadow-hover` | preset（none / soft / medium / strong） |
| 模式 | light / dark toggle | switch |

實作：透過 iframe 的 `contentDocument.documentElement.style.setProperty('--text', value)` 即時注入。

**B. Element Inspector** — 點選元件編輯個別樣式

- 點 iframe 中任一元素 → 高亮 + 顯示路徑（如 `body > .container > .panel > .panel-title`）
- 右側面板顯示該元素 computed style，可即時編輯：
  - 字型大小 / 字重 / 行高 / 字距
  - 顏色 / 背景
  - padding / margin / gap
  - border / radius / shadow
- 編輯結果以 `style=""` 注入該元素（不污染全域 token）

**C. Content Editor** — HTML 內容編輯

- contenteditable 模式：點兩下文字可直接編輯
- 區塊管理：複製 / 刪除 / 上下移動 panel / project card / exp-item
- 重新排序：拖拉左右欄區塊順序
- i18n 對齊：若編輯 `data-i18n` 元素，跳出提示同步更新對應 `T.zh` / `T.en`

**D. Component Library** — 預設元件快取

- 內建：panel 模板、project-item 模板、exp-item 模板、stat-block 模板
- 使用者可新增自訂元件並存 localStorage
- 拖拉 / 點選加入到 iframe 內

**E. Responsive Preview** — 視窗尺寸切換

| Preset | 寬度 |
|--------|------|
| Mobile | 375px |
| Tablet | 768px |
| Desktop | 1180px（max-width） |
| Full | 100% |

外加自訂寬度滑桿。

**F. History / Undo-Redo**

- 每次變更入 stack
- `Cmd/Ctrl + Z` / `Cmd/Ctrl + Shift + Z` 操作
- 顯示變更時間軸（最近 50 步）

**G. Theme Presets**

- 內建 preset：`morcept`（當前）、`cyberpunk`（v0.8 之前的備份）、`mono-paper`（純黑白印刷感）
- 使用者可儲存自訂 theme 到 localStorage（命名 + 套用 + 刪除）
- 一鍵切換 preset

**H. Diff View**

- 切換到 diff 分頁，顯示與 `index.html` 原始版本的差異
- 分組顯示：Token 變更 / HTML 變更 / Inline style 變更
- 統計：總共修改了幾個 token、幾段 HTML、幾個 inline style

**I. Export**

| 動作 | 輸出 |
|------|------|
| Export HTML | 下載 `index_<timestamp>.html` — 完整單檔（CSS 內嵌、變更套用） |
| Export Tokens | 下載 `tokens.css` — 只含 `:root { ... }` 區塊 |
| Export Diff | 下載 `studio.patch` — unified diff，可手動 apply |
| Copy to Clipboard | 複製完整 HTML 到剪貼簿 |

**完全沒有「直接寫回 `index.html`」按鈕。** 使用者必須：
1. **(推薦) Export Patch → 丟給 Claude Code** → 由 `/studio-merge` Skill 自動 merge + commit + push
2. (備援) Export HTML → 自己手動覆蓋 → 自己 commit + push

studio.html 本身仍然零接觸 `index.html` 與 git。

**J. Reset**

- `Reset to current index.html` — 清空所有修改，重新 fetch `../index.html`
- `Reset to last save` — 回到最近一次 localStorage 儲存點

#### 8.1.4 資料儲存

- LocalStorage key：`studio_state_v1`
- 結構：
  ```json
  {
    "tokens": { "--text": "#333", "--bg": "#fff", ... },
    "elementOverrides": [{ "selector": "...", "styles": {...} }],
    "htmlPatches": [{ "selector": "...", "innerHTML": "..." }],
    "history": [...],
    "currentTheme": "morcept"
  }
  ```
- 自動儲存（debounce 500ms）
- 提供「清空 localStorage」按鈕

#### 8.1.5 界線（強制）

| 動作 | 允許 |
|------|------|
| 讀取 `index.html` 內容 | ✅（透過 `fetch('../index.html')`） |
| 修改 iframe 內 DOM / style | ✅ |
| 儲存到 localStorage | ✅ |
| 下載檔案 / 複製剪貼簿 | ✅ |
| 寫入 `index.html` | ❌ |
| 觸碰 `.git/` 或任何 git 指令 | ❌ |
| 上傳到任何遠端 / API | ❌ |
| 修改 `tools/studio.html` 自己 | ❌（須走正規 commit 流程） |

#### 8.1.6 技術棧（單檔約束）

- 純 HTML/CSS/Vanilla JS（與主專案一致，**無建置依賴**）
- 第三方僅用 CDN：
  - Color picker（建議用原生 `<input type="color">` 即可，避免引外部 lib）
  - 字型 preview 用 Google Fonts API
- 必要時引入 `diff` 庫做 Diff View（CDN ESM）
- iframe sandbox: `sandbox="allow-same-origin allow-scripts"` 確保可注入 style 又可隔離

#### 8.1.7 介面草案

```
┌──────────────────────────────────────────────────────────────┐
│  Design Studio — 0520 Resume                  [Reset] [Export ▼]│
├────────────┬─────────────────────────────────────────────────┤
│  ▸ Tokens  │                                                 │
│   • Colors │                                                 │
│   • Type   │              ┌──────────────────────┐          │
│   • Space  │              │                      │          │
│  ▸ Inspect │              │   iframe preview     │          │
│  ▸ Content │              │   (index.html)       │          │
│  ▸ Themes  │              │                      │          │
│  ▸ History │              │                      │          │
│  ▸ Diff    │              └──────────────────────┘          │
│            │                                                 │
│  📱 ☐ 💻 ☑  │  [ Mobile  Tablet  Desktop  Full ]              │
└────────────┴─────────────────────────────────────────────────┘
```

左側：tab 切換面板  
中間：響應式 iframe 預覽  
頂部：全域操作（reset / export / undo / redo）

#### 8.1.8 Patch JSON Schema

studio.html → Claude Code 之間的合約。Claude Code 端的 `/studio-merge` 必須能 100% 還原這份 patch 到 `index.html`。

```json
{
  "version": "studio_patch_v1",
  "createdAt": "2026-05-13T15:42:00Z",
  "basedOn": {
    "indexHtmlSha": "abc123...",     // 從 index.html 算 hash，merge 時驗證未變
    "studioVersion": "0.9.x"
  },
  "tokens": {                         // 修改 :root { } 內 CSS 變數
    "--text": "#1a1a1a",
    "--accent": "#4a90e2"
  },
  "tokensDark": {                     // 修改 body.dark-mode { } 內 CSS 變數
    "--text": "#fafafa"
  },
  "elementOverrides": [               // 加 inline style 到指定元素
    {
      "selector": ".panel-title",
      "styles": { "letter-spacing": "3px", "color": "var(--accent)" }
    }
  ],
  "htmlPatches": [                    // 替換指定元素的 innerHTML
    {
      "selector": "h1.name-glitch",
      "innerHTML": "新的姓名"
    }
  ],
  "themePreset": "morcept-custom"     // 命名儲存，optional
}
```

合併規則：
1. `tokens` / `tokensDark` → 直接替換 `index.html` 內 `:root { }` 與 `body.dark-mode { }` 區塊內對應變數
2. `elementOverrides` → 走 querySelectorAll，在元素上加 `style="..."`（或注入 `<style>` block）
3. `htmlPatches` → 走 querySelectorAll，替換 `innerHTML`
4. 順序執行：tokens → tokensDark → elementOverrides → htmlPatches
5. 衝突檢測：basedOn.indexHtmlSha 與當前不符時，警告並要求人工確認

#### 8.1.9 `/studio-merge` Claude Code Skill — **規劃中**

| 屬性 | 內容 |
|------|------|
| 位置 | `~/.claude/skills/studio-merge.md`（user-scope，不歸屬 repo） |
| 觸發 | `/studio-merge <patch.json 路徑>` 或自然語言「套用這個 patch」 |
| 步驟 | 1. 讀 patch.json<br>2. 讀 `index.html` 並驗證 basedOn.indexHtmlSha<br>3. 套用 tokens / overrides / htmlPatches<br>4. Diff 預覽（讓使用者確認）<br>5. 寫回 `index.html`<br>6. 同步更新 CHANGELOG（自動產生 v0.x.x 條目）<br>7. git add + commit + push |
| 安全閥 | 沖突或 hash 不符時暫停，等使用者決定<br>每次 merge 自動 backup `index.html.bak.<timestamp>` |

> 此 Skill 屬於 Claude Code 端的工具，與 studio.html（瀏覽器端）共同構成完整工作流。

#### 8.1.10 開發里程碑

| Milestone | 範圍 | 預估 |
|-----------|------|------|
| M1 | 基礎 shell + iframe 預覽 + Token Editor（顏色）| 1 PR |
| M2 | Token Editor 完整（字型 / 間距 / 圓角）+ localStorage | 1 PR |
| M3 | Element Inspector + Inline style 編輯 | 1 PR |
| M4 | Content Editor（contenteditable + 區塊管理） | 1 PR |
| M5 | Responsive Preview + Theme Presets | 1 PR |
| M6 | History / Undo-Redo + Diff View | 1 PR |
| M7 | Export 全套（HTML / tokens / patch / clipboard） + 對接 patch JSON schema | 1 PR |
| M8 | `/studio-merge` Skill（Claude Code 端）— 解析 patch、套用、自動 commit+push | 1 PR |
| M9 | 文件 + Demo 截圖，更新 README、開放 GitHub Pages tools 路徑 | 1 PR |

每個 milestone 自成完整可用版本，可獨立 ship。

**M1–M7 在 repo 內、瀏覽器執行**；**M8 是 user-scope skill**（住在 `~/.claude/skills/`，不歸屬 repo）；**M9 是文件與發佈**。

### 8.2 其他未來方向（從 TODO.md 引用）

詳見 `TODO.md`。

---

## 9. 版本對應

| 版本 | 主要架構變更 |
|------|--------------|
| v0.3 | 賽博龐克 `index.html` 初版上線 |
| v0.6 | 四張專案卡完整連結化 |
| v0.7 | `@media print` 列印樣式、行動裝置斷點 |
| v0.8 | i18n 模組、深淺模式、Contact modal、訪客計數器 |
| **v0.9** | **morcept.com 簡約風大改版**（移除霓虹/glitch/clip-path、改 token 系統、本檔建立） |

---

## 10. 維護規則

1. 修改 `index.html` 後，**先檢查設計 token 是否需要新增**（避免硬編碼顏色）
2. 重大結構變更（新區塊、新模組）→ 同步更新本檔 §4 / §5
3. 新增可點擊元素 → 更新 §6 對照表 + CLAUDE.md
4. 未來工具實作完成 → 從 §8 移到對應的「現有架構」段落並加版本紀錄
