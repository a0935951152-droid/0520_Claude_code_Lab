# CHANGELOG

所有重要版本變更均記錄於此，格式依循 [Keep a Changelog](https://keepachangelog.com/zh-TW/1.0.0/)。

---

## [0.14.0] — 2026-05-14

### Added — M2 / M3 / M4 delete / M6 Diff / M7 HTML 全部完成 → M7 里程碑全綠

**M2 — Geometry & Type 控制（典型 design token：圓角 / 陰影 / 字型）**
- `assets/styles.css` 新增 `--radius-card: 12px` CSS 變數，refactor 4 個關鍵 border-radius（panel / stats-bar / project-item / modal-box）改用 var
- Studio 側欄新增「Geometry & Type」段：
  - **Card Radius** slider（0–24px，連續滑動算同一 history session）
  - **Shadow** 4 個 preset 按鈕：none / subtle / medium / strong
  - **Heading Font** / **Mono Font** dropdown（各 4 個 preset：Default / Inter / System / Georgia 等）
- 設計 token 存 `state.designTokens`，套用方式：`buildOverridesCss` 注入 `--radius-card / --shadow-soft / --shadow-hover / --serif / --mono`

**M3 — Element Inspector**（新檔 `tools/studio-inspector.js`）
- 🔍 Inspect 按鈕（與 Text / Move 互斥）
- 開啟後 cursor crosshair，hover 顯示橘色虛線、click 鎖定藍色實線
- 側欄 Inspector 面板顯示選取元素 selector + 10 個可編輯屬性：
  - color / background-color（含色盤 + hex 雙欄）
  - font-size / font-weight / padding / margin / border-radius / letter-spacing / line-height
  - text-align（dropdown）
- 變更存 `state.elementOverrides = [{ selector, styles }]`，套用為 inline `style`
- 「清除此元素所有覆寫」按鈕一鍵還原
- Selector 生成：優先 `[data-i18n="..."]`，否則 `#id`，否則 4 層 CSS path

**M4 — 區塊 Delete**（duplicate 仍延後）
- Move 模式下 hover 顯示右上紅色 ✕ 按鈕（22×22 圓形）
- 點擊立即刪除該項 + 更新 movePatches order（移除該 id）
- `applyContainerReorders` 改為「unmatched 即刪除」（從前是 append 到尾）

**M6 — Diff View Modal**（新檔 `tools/studio-diff.js`）
- 📋 Diff 按鈕 → 全螢幕 modal
- 區段化顯示：Tokens（含色塊預覽）/ Theme Preset / Text Edits / Item Reorders / Panel Layout / Element Overrides
- 空 state 顯示「尚無任何修改」
- `Esc` 或點 backdrop 關閉

**M7 — Full HTML Export**（self-contained）
- Export dropdown 新增第 3 選項「Full HTML」
- 流程：clone iframe DOM → 移除 Studio 注入 style → fetch `assets/styles.css` 並 inline → fetch `assets/scripts.js`、若有 textPatches 在 i18n table 之前 inject 覆寫 → 序列化下載
- 單檔自足，可離線打開、可分享、可印 PDF

### Changed — 拆檔（守 1000 行規則）
- `studio.js` 1105 → 781 行：text-edit / move / iframe listeners 抽到新檔 `tools/studio-modes.js`（286 行）
- Studio 變成 6 個 JS 檔案組合（studio + modes + inspector + diff + export，以及 HTML / CSS）
- LocalStorage schema 加 `designTokens` / `elementOverrides` / `inspectMode`
- History snapshot 加 `designTokens` / `elementOverrides` 欄位（Undo 也能還原 inspector 變更）

### Technical
- 檔案行數：studio.html 137 / studio.css 799 / studio.js 781 / studio-modes 286 / studio-inspector 238 / studio-diff 143 / studio-export 158（每個都 < 800）
- assets/styles.css 加 `--radius-card`（同時補到 `:root` 與 `body.dark-mode`）
- Studio 控制連續操作（slider 拖移）只算一個 history session（避免 undo 步數爆炸）
- Inspect 模式自動互斥 Text / Move（同時只能一個 mode 啟用）

---

## [0.13.0] — 2026-05-14

### Added — Studio M5 / M6 / M7 / M8 milestones（衝刺到 M9）

**M5 — Responsive Preview**
- `tools/studio.html` preview-bar 加 viewport selector 按鈕組：📱 375 / 📟 768 / 💻 1024 / ⬜ Full
- iframe `max-width` 限制 + `.preview-frame-wrap.constrained` 加置中 + 棋盤背景 + 陰影邊框
- viewport 選擇存 localStorage（`state.viewport`），下次重新打開記得

**M6 — Redo（partial，diff view 留 v0.14）**
- 新增 `redoStack`（最多 50 步）
- `undo()` 把當前狀態推到 redoStack；`redo()` 反向操作
- `⌘⇧Z` 或 `⌘Y` 快捷鍵 + 標題列 ↷ Redo 按鈕
- 新 action 自動清空 redoStack（除了 undo 本身）

**M7 — Export tokens.css（HTML export 留 v0.14）**
- Export 按鈕改 dropdown：「Patch JSON」/「tokens.css」
- 點 tokens.css → 下載純 CSS：`:root { ... } body.dark-mode { ... }` 區塊
- 對應 Patch Schema v3 但純 CSS 路徑

**M8 — `/studio-merge` Claude Code Skill 上線**
- 新檔：`~/.claude/skills/studio-merge.md`（user-scope，不在 repo 內）
- 完整流程：讀 patch → git pull → 套用 tokens/text/move/panel → diff 摘要 → 等使用者確認 → commit + push → 更新 CHANGELOG / README
- 安全閥：basedOn hash 檢查、自動 backup、不跳過確認、空 patch 拒絕

**M9 — 文件 / 整合（partial）**
- README 加「使用流程」段落（履歷頁 → Studio → Export → Claude Code 合併 → push）
- 完整 v0.1 → v0.13.0 版本表

### Changed
- `tools/studio.js` 拆出 `tools/studio-export.js`（守住 1000 行規則）：buildPatch / exportPatch / exportTokensCSS 三函式抽出
- LocalStorage key 升級 `studio_state_v3`（加 `redoStack` / `viewport`）
- `studio.html` 加 `<script src="studio-export.js">` 在 studio.js 之後載入
- Header 多了 Redo 按鈕；Export 改為 dropdown

### Deferred to v0.14
- **M2** typography / spacing / radius / shadow tokens（需 styles.css 中度重構）
- **M3** Element Inspector（點選元件編輯 inline style）
- **M4** 區塊複製 / 刪除（duplicate / delete buttons）
- **M6** Diff View（vs index.html 原版差異）
- **M7** Export HTML（fetch + inline 整合）
- 「PPT-style 自由定位」transform offset 模式

### Technical
- 所有 Studio 檔案均守住 1000 行：studio.html (111) / studio.css (522) / studio.js (924) / studio-export.js (87)
- viewport constrained 狀態加棋盤背景視覺強化「裝置模擬」
- redo 與 undo 共用 history stack 機制，靠 redoStack 對稱

---

## [0.12.1] — 2026-05-14

### Changed — 文件結構重整
- **`CLAUDE.md` 瘦身**（129 → 76 行）：只保留守則 + 環境參數 + 文件導覽
  - 移除：履歷資料摘要、可點擊元素對照表、版本歷程
  - 保留：專案基本資訊、MCP/Token 設定、設計規則、注意事項
  - 新增：「文件導覽（按需讀取）」段落，列表指向 RESUME / LINKS / README / CHANGELOG / ARCHITECTURE / TODO
- **新增 `RESUME.md`**（142 行）：蕭哲安履歷資料摘要
  - 基本資料、求職目標、學歷、工作經歷、核心技能、證照、語言能力、自我介紹（中英）、專案經歷、Stats 快照
  - 用途：Claude 在編輯履歷內容、做 i18n 翻譯、新增專案 / 經歷時讀取
- **新增 `LINKS.md`**（94 行）：可點擊元素 / 外部連結對照表
  - 聯絡資訊區、專案卡按鈕、ctrl-btns、Export PDF、內部互動、Footer、i18n keys 對照、維護規則
  - 用途：Claude 在處理連結變動或新增互動元素時讀取
- **`README.md` 補強**：版本表保留完整 v0.1 → v0.12.1；新增「文件分工」說明表
- 「每次更動同步守則」改寫為依變更性質分流（連結→LINKS / 履歷→RESUME / 結構→ARCHITECTURE / 待辦→TODO / 版本→CHANGELOG+README），**不再寫 CLAUDE.md**

### Technical
- CLAUDE.md 變成「always-loaded 核心」，其他 .md 變成「按需讀取分檔」
- 降低每次新對話的初始 context 負擔
- 內容分檔減少同步檔案數量壓力

---

## [0.12.0] — 2026-05-14

### Added — Studio 改進 + 檔案拆分守則
- **Studio 側欄可拖移調寬** — 中央 `.resize-handle`（aside 與 preview 之間）拖曳即可調整 sidebar 寬度（240–600px），自動存 localStorage
- **Move 模式擴充：整塊 panel 跨欄拖曳**
  - 開啟 Move 模式後 `.panel-title` 變成藍色拖曳區（顯示 `⋮⋮ DRAG PANEL`）
  - 拖曳 panel 標題可整塊面板上下重排，也可跨左右欄移動（Education ↔ About 互換等）
  - 對應使用者「挪動的範圍不太理想，希望像 PPT 那樣改」之需求（後續 M5 仍可加 free position）
- **Patch JSON Schema v2 → v3** — 新增 `panelLayout: { left: [...], right: [...] }`，記錄面板跨欄佈局
- **LocalStorage key 升級** `studio_state_v2` → `studio_state_v3`，新增 `panelLayout` / `sidebarWidth` 欄位

### Changed — 大規模拆檔（1000 行守則）
- `index.html` (1152 行) → **拆為 3 檔**：
  - `index.html` (308 行) — HTML shell
  - `assets/styles.css` (713 行) — CSS
  - `assets/scripts.js` (129 行) — JS (i18n table + handlers)
- `tools/studio.html` (1229 行) → **拆為 3 檔**：
  - `tools/studio.html` (91 行) — HTML shell
  - `tools/studio.css` (440 行) — CSS
  - `tools/studio.js` (898 行) — JS
- **CLAUDE.md §設計規則第 5 條**：明文 1000 行檔案分拆守則
- Preset 5 主題按鈕由 5 欄改為 **3 欄 grid**（解決超出側欄框框問題）
- Token row CSS `grid-template-columns: 26px 1fr 78px` → `26px minmax(0, 1fr) 78px`，防止內容溢出
- Move / Text Edit 模式互斥（避免衝突）
- Undo 改為 reload iframe 確保 DOM 還原乾淨

### Technical
- 所有檔案皆控制在 900 行以內（最大 `tools/studio.js` 898 行）
- 拆檔後 GitHub Pages 自動 serve `.css` / `.js`，零部署改動
- `--sidebar-w` CSS variable 用 `:root` 全域定義，方便 JS 跨檔修改
- Panel 跨欄拖曳：dragSrc 偵測 panel 類別，allowed drop = 任何 `.main-grid` 內的 panel
- 行動裝置（< 800px）resize handle 自動切為 ns-resize 垂直拖曳

---

## [0.11.0] — 2026-05-14

### Added — Design Studio M2 / M4 / M6（部分）整合包
- `tools/studio.html` — 重大升級，新增 4 大功能：

  **1. Theme Presets（5 主題快速套用）**
  - Morcept（預設）/ Mono / Paper / Ocean / Forest
  - 點擊 preset 按鈕 → 一鍵套用全套 20 個 tokens（light + dark）
  - 對應「顏色應該有表可選擇」需求

  **2. ✏ Text Edit Mode**
  - 開啟後所有 `[data-i18n]` 元素變成 contenteditable
  - 視覺提示：藍色虛線外框 + hover 高亮
  - 失焦自動儲存到 `state.textPatches[i18n-key]`
  - `Esc` 退出編輯模式
  - 對應「文字也可改」需求

  **3. ↕ Move Mode**
  - 開啟後 `.exp-item / .project-item / .edu-item / .cert-item / .lang-item` 可拖曳排序
  - 視覺提示：左側拖曳手柄 `⋮⋮` + hover 虛線框 + drop 指示線
  - 只能在同容器內重排（防 cross-container 拖錯）
  - 儲存到 `state.movePatches[container-key] = [id, id, ...]`
  - `Esc` 退出
  - 對應「元件可挪動」需求

  **4. ↶ Undo（History Stack）**
  - 每次修改自動快照（最多 50 步）
  - `⌘Z` 或按鈕還原
  - Token 連續拖色盤算「一個 session」，避免 history 爆炸
  - 對應「回上一步」需求

### Changed
- LocalStorage key 升級 `studio_state_v1` → `studio_state_v2`（新增 textPatches / movePatches / history / currentPreset / textEditMode / moveMode 欄位）
- Patch JSON Schema 升級 `studio_patch_v1` → `studio_patch_v2`（新增 `textPatches` / `movePatches` / `themePreset` 區段）
- Reset 改為 reload iframe（確保 DOM mutation 完全清除）
- Header 按鈕排版調整：mode / text / move / undo / reset / export 六顆並列

### Technical
- 拖曳排序用原生 HTML5 Drag and Drop API，無第三方 lib
- 文字編輯狀態追蹤：用元素 `data-studio-default` 屬性記錄首次值，刪除 patch 時可清掉
- Iframe listener 用 capture 階段監聽 blur（contenteditable 失焦） + 拖曳事件
- ESC 鍵在 iframe 內也能退出模式（attach 到 iframe document）
- 變更計數涵蓋 token + textPatches + movePatches，藍色高亮 `has-changes`

---

## [0.10.1] — 2026-05-14

### Added
- `index.html` — 左下 `.ctrl-btns` 新增第 4 顆按鈕 **🎨 Studio**（中文顯示「設計工具」）
  - 連結 `tools/studio.html`，`target="_blank"` 新分頁開啟，使用者體驗：在履歷頁直接進入設計器
  - 完整工作流串接：履歷頁 → 點 Studio → 線上 demo 調整 → Export Patch → 丟給 Claude Code → 合併 + push
- `index.html` — i18n 加入 `studio_btn`（zh: 設計工具 / en: Studio）

### Technical
- 連結用 `<a>` 包裹，套用 CLAUDE.md §3 規則：`text-decoration:none; color:inherit;`
- studio.html 內 `.ctrl-btns` 隱藏規則已涵蓋新按鈕（不會在 iframe 預覽中重複顯示）
- 列印樣式 `@media print` 已隱藏整個 `.ctrl-btns` 容器，新按鈕不會出現在 PDF 匯出

---

## [0.10.0] — 2026-05-13

### Added — Design Studio M1 上線
- `tools/studio.html` — 設計師等級視覺化工具，**M1 milestone 完成**
  - **Shell**：header (mode toggle / reset / export patch) + 320px sidebar + iframe preview
  - **iframe 預覽**：載入 `../index.html`，自動注入 CSS overrides，隱藏 iframe 內 ctrl-btns 避免重複
  - **Token Editor (Colors)** — 共 20 個 CSS 變數可即時編輯：
    - Light Mode：bg / bg-soft / bg-section / text / text-secondary / text-muted / border / border-strong / accent / accent-hover
    - Dark Mode：同一組 10 個變數
    - 每 token 顯示 swatch + 變數名 + hex 輸入（雙向同步）
    - 分組顯示：Backgrounds / Text / Borders / Accent
  - **Mode Toggle**：切換 light/dark 即時套用，UI 用 active section + pill 標示當前編輯模式
  - **LocalStorage 自動儲存**：key `studio_state_v1`，含 tokens 與 darkMode
  - **Reset**：清空所有 token 修改回到 v0.9 預設（有確認 dialog）
  - **Export Patch JSON**：
    - 僅輸出與預設不同的 token（diff）
    - 同時下載 `studio-patch-<timestamp>.json` + 複製到剪貼簿
    - 對應 §8.1.8 Patch JSON Schema v1（`tokens` / `tokensDark` 區段）
  - **變更計數**：右上 meta 顯示 `N changes`，協助使用者掌握修改幅度
  - **鍵盤快捷鍵**：`⌘E` 匯出 patch、`⌘D` 切換模式
- 訪問路徑：本地 `tools/studio.html` 或線上 `https://a0935951152-droid.github.io/0520_Claude_code_Lab/tools/studio.html`

### Technical
- 純 HTML/CSS/Vanilla JS 單檔（無建置、無外部 lib，除 Google Fonts CDN）
- iframe 注入：`contentDocument.head` 加入 `<style id="studio-overrides">`，內容含 `:root` + `body.dark-mode` 與隱藏 iframe 控制按鈕
- Patch 格式對齊 ARCHITECTURE.md §8.1.8 schema，但 M1 範圍 elementOverrides / htmlPatches 為空陣列（M3 / M4 補完）
- 完全不寫回 `index.html`、不觸碰 `.git/`，與 §8.1 邊界一致

---

## [0.9.3] — 2026-05-13

### Changed
- `ARCHITECTURE.md` §8.1 補強核心工作流：**Demo → Patch → Claude Code Merge**
  - 新增 §8.1.1a 流程圖：browser studio.html（demo only）→ Export Patch JSON → Claude Code 自動 merge + commit + push
  - 新增 §8.1.8 **Patch JSON Schema**：定義 studio ↔ Claude Code 的契約格式（tokens / tokensDark / elementOverrides / htmlPatches / basedOn hash 驗證）
  - 新增 §8.1.9 **`/studio-merge` Skill 規格**（Claude Code 端負責 merge）
  - 修正定位：使用者不需要「手動覆蓋 index.html」，只要把 patch 丟給 Claude Code 即可
  - 開發里程碑由 M1–M8 擴充為 **M1–M9**（新增 M8 `/studio-merge` skill、M9 文件 + 線上發佈）
- `TODO.md` 同步：M1–M9 子待辦表

### Technical
- Patch JSON Schema v1：
  - `version` / `createdAt` / `basedOn.indexHtmlSha` 驗證
  - `tokens` / `tokensDark` / `elementOverrides` / `htmlPatches` 四種變更類型
  - 合併順序與衝突檢測規則
- `/studio-merge` Skill 含 backup（`.bak.<ts>`）、diff 預覽、自動 CHANGELOG 條目

---

## [0.9.2] — 2026-05-13

### Changed
- `ARCHITECTURE.md` §8.1 升級規格：**HTML Live Editor → Design Studio**
  - 由「只編輯 HTML」擴充為**設計師等級工具**，可同時操作 HTML 內容、CSS tokens、元件樣式
  - 形式收斂為 (B) 獨立頁面 `tools/studio.html` + iframe 預覽 + 左側控制面板（類 Webflow / Plasmic）
  - 9 大功能模組：
    - **A. Token Editor**（顏色 / 字型 / 間距 / 圓角 / 陰影 / 模式）→ 視覺化編輯 design system
    - **B. Element Inspector** → 點選元件編輯個別樣式
    - **C. Content Editor** → contenteditable + 區塊管理 + i18n 對齊提示
    - **D. Component Library** → 內建元件模板 + 自訂存 localStorage
    - **E. Responsive Preview** → Mobile / Tablet / Desktop / Full + 自訂寬度
    - **F. History / Undo-Redo** → 變更 stack + 時間軸
    - **G. Theme Presets** → morcept / cyberpunk / mono-paper + 自訂
    - **H. Diff View** → vs `index.html` 原版差異
    - **I. Export** → HTML / tokens.css / patch / clipboard
  - 規劃 8 個開發里程碑（M1–M8），每個可獨立 ship
- `TODO.md` 同步：將 HTML Live Editor 條目改為 Design Studio + 拆分 M1–M8 子待辦
- `README.md` 同步版本表 v0.9.2

### Technical
- 維持「**完全不 push、不觸碰 git、不寫回 `index.html`**」核心邊界
- 單檔約束、無建置依賴；第三方僅用 CDN
- LocalStorage 結構規格化：`studio_state_v1`（tokens / elementOverrides / htmlPatches / history / currentTheme）

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
