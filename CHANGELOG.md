# CHANGELOG

所有重要版本變更均記錄於此，格式依循 [Keep a Changelog](https://keepachangelog.com/zh-TW/1.0.0/)。

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
