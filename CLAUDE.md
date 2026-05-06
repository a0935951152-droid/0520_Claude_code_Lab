# CLAUDE.md — 專案記憶

這份文件供 Claude Code 在任何對話中快速重建專案上下文。
**每次修改 `index.html` 後，必須同步更新本檔及 CHANGELOG.md / README.md / TODO.md。**

---

## 專案基本資訊

| 項目 | 內容 |
|------|------|
| Repo | `a0935951152-droid/0520_Claude_code_Lab` |
| 主分支 | `main` |
| 主要檔案 | `index.html`（個人簡歷網頁） |
| GitHub Pages | `https://a0935951152-droid.github.io/0520_Claude_code_Lab/` |
| 本地工作目錄 | `/home/test/0520/` |
| 原始履歷 PDF | `/home/test/0520/蕭哲安.pdf` |
| 原始 HTML 模板 | `/home/test/0520/format.html` |

---

## MCP 設定

- **插件**：`github@claude-plugins-official`（已啟用）
- **Token 位置**：`~/.claude/settings.json` → `env.GITHUB_PERSONAL_ACCESS_TOKEN`
- **Skill**：`/resume-push`（位於 `~/.claude/skills/resume-push.md`）

---

## 設計規則（強制）

1. **禁止修改賽博龐克風格**：顏色（`--cyan #00f5ff` / `--magenta #ff00cc` / `--green #39ff14`）、字型、動畫、切角面板等一律不得變動，除非使用者明確要求。
2. **禁止修改排版結構**：左右雙欄、Stats Bar、Header / Footer 位置不得變動。
3. **新增連結**：用 `<a>` 包裹元素，必須加 `text-decoration:none; color:inherit; display:block`，確保視覺完全不變。
4. **每次更動 `index.html` 後**，必須同步更新 README.md（版本表）、CHANGELOG.md（新增版本條目）、TODO.md（勾選已完成項目）、CLAUDE.md（連結對照表 / 版本記錄）。

---

## index.html 可點擊元素對照表

| 元素 | 連結 | 開啟方式 |
|------|------|----------|
| MAIL 聯絡欄 | `mailto:a0935951152@gmail.com` | 預設郵件客戶端 |
| GIT 聯絡欄 | `https://github.com/a0935951152-droid` | 新分頁 |
| ⚡ Edge AI 智慧跟隨風扇系統（→ DOCS 按鈕） | `https://docs.google.com/document/d/1JvKEiwZu58XSDgcmFgQtnCNYhsKCS4BXV0aUHWvVqfQ/edit?usp=sharing` | 新分頁 |
| 🧠 OCR × Transformer 翻譯優化專案（→ DRIVE 按鈕） | `https://drive.google.com/drive/folders/17lfCUG3l4pKyeh4Tiow0iKpoI6pt31J9?usp=drive_link` | 新分頁 |
| 🔧 Nanoclaw（→ YOUTUBE 按鈕） | `https://www.youtube.com/watch?si=GWQhakzTJZB3ECQC&v=q3xqWqy11ho&feature=youtu.be` | 新分頁 |
| 🏛️ 交大 AI 架構師（→ DRIVE 按鈕） | `https://drive.google.com/file/d/19aE9BpgaeGVXs9VHT1B1IDvQBwjYg0N0/view` | 新分頁 |
| ⬇ EXPORT PDF 按鈕 | `window.print()` | 瀏覽器列印對話框 |

---

## 版本歷程（快速查閱）

| 版本 | 日期 | 摘要 |
|------|------|------|
| v0.1 | 2026-05-06 | 初始化 repo |
| v0.2 | 2026-05-06 | GitHub MCP 連線設定 |
| v0.3 | 2026-05-06 | 賽博龐克履歷 `index.html` 初版 |
| v0.4 | 2026-05-06 | 文件體系（CHANGELOG / TODO / Skill） |
| v0.5 | 2026-05-06 | PDF 連結導入履歷元素、CLAUDE.md 建立 |
| v0.6 | 2026-05-07 | 補完四張專案卡連結，改為 `.proj-btn` 按鈕設計 |
| v0.7 | 2026-05-07 | PDF 匯出按鈕、`@media print`、行動裝置優化 |

---

## 履歷資料摘要（蕭哲安）

**基本**：男 / 26歲 / 役畢 / 新竹市東區 / a0935951152@gmail.com / 0935-951-152

**目標職稱**：軟體工程師、AI 工程師
**希望地點**：新竹縣市、台北市、新北市（遠端可配合）

**學歷**：
- 國立中山大學 生物科學碩士班（2023/09–2025/09）
- 國立中山大學 生物科學系 學士（2016/09–2021/09）

**核心技能**：Python、C/C++、LLM/RAG/Fine-tuning、YOLO、PyTorch、Transformer、Claude Code Agents、STM32/ESP32/nRF52/54、Edge AI、Docker

**工作經歷**（最新→最舊）：
1. 學生研究員 — 國立交通大學（2025/10–2026/05）
2. 專任研究助理 — 國立台灣海洋大學（2025/08–2025/11）
3. 講師 — 薪哲文教（2024/03–2025/01）
4. 行政管理 — 國防部陸軍司令部（2022/04–2023/08）
5. 講師 — 明光文教（2019/09–2020/06）

**證照**：Microsoft AI-900

---

## 注意事項

- `GITHUB_PERSONAL_ACCESS_TOKEN` 已存入 `~/.claude/settings.json`，**勿在對話中重新顯示 token 明文**。
- 推送前務必用 `mcp__plugin_github_github__get_file_contents` 取得最新 SHA，避免 409 衝突。
