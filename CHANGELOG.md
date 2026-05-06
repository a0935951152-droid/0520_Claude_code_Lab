# CHANGELOG

所有重要版本變更均記錄於此，格式依循 [Keep a Changelog](https://keepachangelog.com/zh-TW/1.0.0/)。

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
  - Glitch 動畫姓名標題
  - 頂部掃描光條動畫
  - 技能進度條動態填充 + 霓虹發光
  - 切角 `clip-path` 面板設計
  - 六邊形頭像框
  - 統計欄 Stats Bar（年資 / TOEIC / 學歷 / 證照 / 專案數）
  - 時間軸工作經歷（菱形節點）
  - 完整導入 蕭哲安 PDF 履歷（技能、學歷、工作、專案、語言、證照）

### Technical
- 使用 GitHub MCP Server 直接從 Claude Code 推送，無需本地 git 操作
- 純 HTML + CSS，Google Fonts（Orbitron / Share Tech Mono / Noto Sans TC）

---

## [0.2] — 2026-05-06

### Added
- GitHub MCP Server 連線設定
  - 安裝 `github@claude-plugins-official` 插件
  - 設定 `GITHUB_PERSONAL_ACCESS_TOKEN` 至 `~/.claude/settings.json`
  - 驗證 MCP 連線狀態（`/mcp` 確認 Reconnected）

### Changed
- `~/.claude/settings.json` 加入 `env.GITHUB_PERSONAL_ACCESS_TOKEN`

---

## [0.1] — 2026-05-06

### Added
- 初始化 repository `0520_Claude_code_Lab`
- 建立 `README.md`（交大 0520 教材上課用）
