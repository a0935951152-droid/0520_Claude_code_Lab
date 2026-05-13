# 0520_Claude_code_Lab

交大 0520 課程實作 Lab — 以 Claude Code + GitHub MCP 為核心工具鏈，探索 AI 輔助開發工作流。

---

## 專案結構

```
0520_Claude_code_Lab/
├── index.html          # 個人簡歷網頁（morcept.com 簡約風，v0.9 起）
├── README.md           # 專案說明
├── CHANGELOG.md        # 版本更新紀錄
├── TODO.md             # 待辦事項
├── CLAUDE.md           # Claude 專案記憶（規則 / 連結對照 / 注意事項）
└── ARCHITECTURE.md     # 架構紀錄（檔案結構 / 設計 token / JS 模組 / 未來規劃）
```

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

### CLAUDE.md — Claude 記憶檔
- 記錄設計規則、連結對照表、歷史決策
- 供 Claude Code 在新對話中快速重建專案上下文

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

---

## 快速預覽

啟用 GitHub Pages 後可直接瀏覽：
`https://a0935951152-droid.github.io/0520_Claude_code_Lab/`

Settings → Pages → Source: `main` branch → Save
