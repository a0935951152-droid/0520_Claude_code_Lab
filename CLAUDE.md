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
| 架構文件 | `ARCHITECTURE.md`（**結構性變更須先讀此檔**） |
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

1. **目前風格：morcept.com 簡約風（v0.9 起）**
   - 配色：黑白灰中性色系
     - 主文字 `--text: #222222`（深色模式 `#f0f0f0`）
     - 次文字 `--text-secondary: #555555`、`--text-muted: #999999`
     - 背景 `--bg: #ffffff`、`--bg-soft: #fafafa`
     - 邊框 `--border: #e8e8e8`、`--border-strong: #d4d4d4`
   - 字型：`Noto Sans TC` + `Inter`（內文/標題）、`JetBrains Mono`（數據/標籤）
   - 元件：圓角 12px 卡片、細邊框 + soft shadow（hover lift）、pill button（黑底白字）
   - 動效：僅保留 hover lift / scale 微動效；**禁止**新增霓虹、glitch、scanline 類動畫
   - 任何「賽博龐克」相關元素（霓虹色、clip-path 切角、glitch、scanline）一律不得加回，除非使用者明確要求復古
2. **禁止修改排版結構**：左右雙欄、Stats Bar、Header / Footer 位置不得變動。
3. **新增連結**：用 `<a>` 包裹元素，必須加 `text-decoration:none; color:inherit; display:block`，確保視覺完全不變。
4. **每次更動 `index.html` 後**，必須同步更新 README.md（版本表）、CHANGELOG.md（新增版本條目）、TODO.md（勾選已完成項目）、CLAUDE.md（連結對照表 / 版本記錄）、ARCHITECTURE.md（若涉及結構 / token / JS 模組變更）。
5. **檔案分拆規則（強制）**：任何單一檔案 **達 1000 行即須拆分**。
   - HTML 檔：把 `<style>` 抽到 `.css`、`<script>` 抽到 `.js`，用 `<link>` / `<script src="">` 載入。
   - 大型 JS：分成 modules / 多個 .js 檔。
   - 大型 CSS：依功能或元件拆檔（如 `tokens.css` / `layout.css` / `components.css`）。
   - 維持單一檔案在 700–900 行內為佳；提早拆比拖到爆表才動手好。
   - 範例對照（v0.12 起）：
     - `index.html` (308) + `assets/styles.css` (713) + `assets/scripts.js` (129)
     - `tools/studio.html` (91) + `tools/studio.css` (440) + `tools/studio.js` (898)

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
| ↓ Export PDF 按鈕（右下角固定） | `window.print()` | 瀏覽器列印對話框 |
| ◐ Dark / ◑ Light 模式切換（左下角） | toggle `body.dark-mode`（**注意：v0.9 起改為以 dark-mode class 為 alternate；預設為 light**） | 切換深/淺色，localStorage 持久化（`zxa_mode === 'dark'`） |
| EN / 中 語言切換（左下角） | `data-i18n` 屬性 + JS translations | 中英內容互換，localStorage 持久化 |
| ✉ Contact 聯絡按鈕（左下角） | 開啟 modal → 送出後 `mailto:` | 填寫姓名/Email/留言後開啟郵件客戶端 |
| 🎨 Studio 設計工具按鈕（左下角） | `tools/studio.html` | 新分頁開啟 Design Studio（v0.10.1 起） |
| 技能分組標題（Software & AI 等） | toggle `.skill-group.collapsed` | 點擊展開/收合該組技能列表，`+` / `×` 圖示切換 |
| 訪客計數器（footer 下方） | `https://visitor-badge.laobi.icu/badge?page_id=...` | 自動計數圖示 |

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
| v0.8 | 2026-05-07 | 深色/淺色切換、中英多語、打字機效果、技能折疊、聯絡表單、訪客計數器、Skill 升級 |
| v0.9 | 2026-05-13 | 整體風格大改版：賽博龐克 → morcept.com 簡約風（白底深字、圓角卡片、細邊框、留白） |
| v0.9.1 | 2026-05-13 | 新增 `ARCHITECTURE.md` 架構紀錄檔；記錄未來「HTML Live Editor（不 push）」規劃 |
| v0.9.2 | 2026-05-13 | 升級 Design Studio 規格（HTML + CSS tokens + 元件 inspector + responsive preview + theme presets + diff view + export） |
| v0.9.3 | 2026-05-13 | §8.1 加入「Demo → Patch → Claude Code merge」工作流；新增 Patch JSON Schema 與 `/studio-merge` Skill 規格 |
| v0.10.0 | 2026-05-13 | **Design Studio M1 上線**（`tools/studio.html`）：視覺化 Token Editor (Colors) + iframe 預覽 + localStorage + Export Patch JSON |
| v0.10.1 | 2026-05-14 | `index.html` 左下加 🎨 Studio 入口按鈕，完整串接「履歷 → Studio → Export → Claude Code 合併」工作流 |
| v0.11.0 | 2026-05-14 | **Studio 增強**：Theme Presets (5) + Text Edit + Move + Undo；patch schema v2 含 textPatches / movePatches |
| v0.12.0 | 2026-05-14 | **檔案拆分**（index / studio 各拆 3 檔）+ 1000 行守則 + Sidebar 可拖移調寬 + Preset 溢出修正 + Move 支援整塊 panel 跨欄拖曳 |

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

- PDF 連結為截斷版（`...` 結尾），若用戶反映連結失效，請求完整 URL 後更新對照表與 `index.html`。
- `GITHUB_PERSONAL_ACCESS_TOKEN` 已存入 `~/.claude/settings.json`，**勿在對話中重新顯示 token 明文**。
- 推送前務必用 `mcp__plugin_github_github__get_file_contents` 取得最新 SHA，避免 409 衝突。
