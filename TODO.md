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

- [ ] **HTML Live Editor — 不 push 額外工具**
  - 屬性：**額外工具**，與主簡歷 `index.html` 解耦；**不觸發 git push**
  - 目的：本地快速試做 UI / 版面 A/B，不污染 main 分支歷史
  - 編輯範圍：僅修改 HTML 內容（DOM 結構 / 文字 / 連結），CSS 沿用現有 token
  - 形式（待決）：
    - (A) 獨立 HTML 頁面 `tools/editor.html`（瀏覽器內 contenteditable + iframe 預覽 + export 下載）
    - (B) Claude Code Skill（如 `/html-edit`，產生 diff 等使用者確認後才 commit）
    - (C) 兩者並存
  - 儲存：localStorage 或 export `.html` 下載
  - 還原：一鍵 reset 回 `index.html` 原始狀態
  - 邊界：禁止自動寫入 `index.html`、禁止觸碰 `.git/`、禁止執行任何 git 指令
  - 詳細規格：見 `ARCHITECTURE.md` §8.1

---

## 已完成

- [x] 連接 GitHub MCP Server（2026-05-06）
- [x] 建立賽博龐克個人簡歷 `index.html`（2026-05-06）
- [x] 建立 README / CHANGELOG / TODO 文件體系（2026-05-06）
- [x] 建立 `resume-push` Skill（2026-05-06）
- [x] 導入 PDF 連結至履歷元素（Email / GitHub / Edge AI / OCR 專案卡）（2026-05-06）
- [x] 建立 `CLAUDE.md` 專案記憶檔（2026-05-06）
