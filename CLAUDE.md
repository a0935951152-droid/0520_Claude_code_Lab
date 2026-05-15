# CLAUDE.md — Claude Code 專案守則

> 這份是 **核心規則 + 環境參數**，每次新對話都會被讀取。
> 詳細內容（履歷文字、連結、版本歷程）依需求才讀取對應分檔。

---

## 專案基本資訊

| 項目 | 內容 |
|------|------|
| Repo | `a0935951152-droid/0520_Claude_code_Lab` |
| 主分支 | `main` |
| 主要檔案 | `index.html`（履歷網頁 shell，v0.12 起拆檔） |
| GitHub Pages | `https://a0935951152-droid.github.io/0520_Claude_code_Lab/` |
| 本地工作目錄 | `/Users/a0935951152/github/0520_Claude_code_Lab` |
| 原始履歷 PDF | `/home/test/0520/蕭哲安.pdf`（已不在本機，純參考） |

---

## MCP / Token 設定

- **插件**：`github@claude-plugins-official`
- **Token 位置**：`~/.claude/settings.json` → `env.GITHUB_PERSONAL_ACCESS_TOKEN`
- **Skills**（user-scope，住在 `~/.claude/skills/`，不歸屬 repo）：
  - `/resume-push` — PDF 履歷 → 設計 → 推送
  - `/studio-merge` — Design Studio patch JSON → 套用到 repo → commit + push（v0.13.0 起）

---

## 設計規則（強制）

1. **目前風格：morcept.com 簡約風（v0.9 起）**
   - 配色：黑白灰中性色系（`--bg #fff` / `--text #222` / `--border #e8e8e8` / `--accent #222`，dark mode 對稱對應）
   - 字型：`Noto Sans TC` + `Inter`（內文 / 標題）、`JetBrains Mono`（數據 / 標籤）
   - 元件：圓角 12px 卡片、細邊框 + soft shadow + hover lift、pill button（黑底白字）
   - 動效：僅保留 hover lift / scale；**禁止**霓虹、glitch、scanline、clip-path 角切
   - 任何「賽博龐克」元素一律不得加回，除非使用者明確要求復古

2. **禁止修改排版結構**：左右雙欄、Stats Bar、Header / Footer 位置不得變動。

3. **新增連結**：用 `<a>` 包裹元素，必須加 `text-decoration:none; color:inherit; display:block`，確保視覺完全不變。

4. **檔案分拆規則（強制）**：任何單一檔案 **達 1000 行即須拆分**。
   - HTML 檔：抽 `<style>` 到 `.css`、`<script>` 到 `.js`，用 `<link>` / `<script src="">` 載入
   - 大型 JS：分成 modules / 多個 .js 檔
   - 大型 CSS：依功能拆檔（如 `tokens.css` / `layout.css` / `components.css`）
   - 維持單檔 700–900 行內為佳

5. **變更同步守則**：每次更動 `index.html` / `assets/*` / `tools/*` 後，依變更性質同步：
   - 連結變動 → `LINKS.md`
   - 履歷內容變動 → `RESUME.md` + `assets/scripts.js` 的 `T.zh` / `T.en`
   - 結構 / token / JS 模組變動 → `ARCHITECTURE.md`
   - 待辦進度 → `TODO.md`
   - 每個版本 → `CHANGELOG.md`（新增條目）+ `README.md`（版本表新增一列）
   - **不要把這些寫進 CLAUDE.md** — CLAUDE.md 只放守則 / 環境，內容資料分檔。

---

## 文件導覽（按需讀取）

| 想知道什麼 | 讀哪個檔 |
|------------|----------|
| 蕭哲安履歷文字 / 經歷 / 技能 / 證照 | `RESUME.md`（本機保留，已 gitignore） |
| `index.html` 所有可點擊元素 / 外部連結 | `LINKS.md` |
| 完整版本歷程（v0.1 → 現在） | `README.md`（總表）或 `CHANGELOG.md`（詳細） |
| 架構 / CSS tokens / JS 模組 / Studio 規格 / Patch JSON schema | `ARCHITECTURE.md` |
| 待辦 / 規劃中功能 / 里程碑進度 | `TODO.md` |

> 不要在 CLAUDE.md 重述以上內容。對話中需要時，直接讀對應檔案。

---

## 注意事項

- `GITHUB_PERSONAL_ACCESS_TOKEN` 在 `~/.claude/settings.json`，**勿在對話中重新顯示 token 明文**。
- 推送前若用 MCP，須先 `mcp__plugin_github_github__get_file_contents` 取得最新 SHA 避免 409 衝突；目前主要走本地 git clone + push。
- 履歷內容（i18n）修改須同步 `assets/scripts.js` 內 `T.zh` 與 `T.en` 雙語。
