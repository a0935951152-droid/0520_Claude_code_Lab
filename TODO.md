# TODO

未來可能的功能擴充與改善方向。

---

## 高優先度

- [x] **啟用 GitHub Pages**（已確認上線）（2026-05-07）
  - URL: `https://a0935951152-droid.github.io/0520_Claude_code_Lab/`

- [x] **補齊 Nanoclaw / 交大 專案外部連結**（2026-05-07）
  - Nanoclaw → YouTube Demo；交大 AI → Google Drive

- [x] **列印 / PDF 匯出版本**（2026-05-07）
  - 深色保留、移除動畫與切角、右下角固定 `⬇ EXPORT PDF` 按鈕

- [x] **行動裝置優化**（2026-05-07）
  - Stats Bar 改 3×2 grid、頭像 clamp、字體縮減、Header padding 縮小

---

## 中優先度

- [x] **深色 / 淺色模式切換**（2026-05-07）
  - 底部左側 `☀ LIGHT / 🌙 DARK` toggle，localStorage 持久化

- [x] **動態打字效果（Typewriter）**（2026-05-07）
  - 頁面載入時對姓名「蕭哲安」逐字顯示，glitch 期間暫隱

- [x] **技能分組可折疊**（2026-05-07）
  - 點擊技能群組標題可展開 / 收合；`.skill-content` max-height transition

---

## 低優先度 / 探索中

- [x] **多語言版本**（中文 / 英文切換）（2026-05-07）
  - `EN / 中` toggle；data-i18n 屬性 + JS translations，覆蓋所有中文內容

- [x] **聯絡表單**（2026-05-07）
  - `✉ CONTACT` modal；姓名 / Email / 留言欄位；送出呼叫 mailto:

- [x] **訪客計數器**（2026-05-07）
  - Footer 加入 visitor-badge.laobi.icu badge（自動計數）

- [x] **自動化更新 Skill 改進**（2026-05-07）
  - `resume-push` skill 支援 `PDF路徑` 參數、`分支` 參數、`minimal` / `classic` 風格主題

- [x] **整體風格大改版：morcept.com 簡約風**（2026-05-13）
  - 移除賽博龐克元素（霓虹、scanline、glitch、clip-path 切角）
  - 改採白底深字、圓角卡片、細邊框、generous whitespace
  - 字型改為 Noto Sans TC + Inter + JetBrains Mono
  - 預設模式由 dark cyberpunk 改為 light minimalist
  - 保留所有可點擊元素、i18n、PDF 匯出、Contact modal、訪客計數器等功能

- [x] **建立 `ARCHITECTURE.md` 架構紀錄檔**（2026-05-13）
  - 記錄檔案結構、設計 token、JS 模組、可點擊元素、部署流程
  - 列出未來工具規劃段落

---

## 規劃中（未開工）

- [ ] **Design Studio — 設計師等級的本地工具**（不 push 額外工具）
  - 路徑：`tools/studio.html`，與主 `index.html` 完全解耦
  - 形式：獨立 HTML 頁面 + iframe 預覽 + 左側控制面板（類 Webflow / Plasmic 體驗）
  - **同時編輯 HTML 內容 + CSS tokens + 元件樣式**（非僅 HTML）
  - 9 大功能模組：
    - [x] **M1** — 基礎 shell + iframe 預覽 + Token Editor (Colors)（2026-05-13，v0.10.0）
    - [~] **M2** — Token Editor 完整（字型 / 間距 / 圓角 / 陰影）+ localStorage 自動儲存
      - [x] Theme Presets（Morcept / Mono / Paper / Ocean / Forest）（v0.11.0）
      - [ ] 字型 / 間距 / 圓角 / 陰影 控制（保留下個 iteration）
    - [ ] **M3** — Element Inspector（點選元件編輯個別 style）
    - [~] **M4** — Content Editor
      - [x] 文字編輯（contenteditable 所有 `[data-i18n]` 元素，含 ESC 退出）（v0.11.0）
      - [x] 區塊排序（drag-drop on exp/project/edu/cert/lang items）（v0.11.0）
      - [x] **整塊 panel 拖曳跨欄**（panel-title 為 drag handle，2026-05-14，v0.12.0）
      - [ ] 區塊複製 / 刪除（保留）
      - [ ] PPT-style 自由定位（free position via transform offset，研究中）
    - [ ] **M5** — Responsive Preview（Mobile/Tablet/Desktop/Full）
    - [~] **M6** — History / Undo-Redo + Diff View
      - [x] Undo（history stack 50 步、`⌘Z`、按鈕）（v0.11.0）
      - [ ] Redo（`⌘⇧Z`）
      - [ ] Diff View（保留 / 視需求）
    - [ ] **M7** — Export 全套（HTML / tokens.css / patch JSON / clipboard）+ 對接 patch JSON schema
    - [ ] **M8** — `/studio-merge` Claude Code Skill（讀 patch.json → 套用到 index.html → 自動 commit + push）
    - [ ] **M9** — 文件 + Demo 截圖、更新 README、開放線上版
  - 邊界（強制）：
    - 禁止自動寫入 `index.html`（使用者必須自己 export → 手動覆蓋 → commit）
    - 禁止觸碰 `.git/`、禁止執行 git 指令
    - 禁止上傳到任何遠端 / API（純本地）
  - 詳細規格：見 `ARCHITECTURE.md` §8.1

---

## 已完成

- [x] 連接 GitHub MCP Server（2026-05-06）
- [x] 建立賽博龐克個人簡歷 `index.html`（2026-05-06）
- [x] 建立 README / CHANGELOG / TODO 文件體系（2026-05-06）
- [x] 建立 `resume-push` Skill（2026-05-06）
- [x] 導入 PDF 連結至履歷元素（Email / GitHub / Edge AI / OCR 專案卡）（2026-05-06）
- [x] 建立 `CLAUDE.md` 專案記憶檔（2026-05-06）
