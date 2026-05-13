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

### 8.1 HTML Live Editor（不 push 模式） — **規劃中**

**目的**：本地快速迭代 / 試做 UI 變更，不污染 main 分支歷史。

**使用情境**：
- 試做新區塊（如新專案卡、版面 A/B）
- 微調樣式 / 試色 / 改字型
- 與設計師對 demo 時即時 hot-reload
- 確認 OK 後才走正規 commit + push 流程

**規格草案（待實作時細化）**：

| 項目 | 說明 |
|------|------|
| 形式 | 額外頁面 / 工具，**不替代 `index.html`** |
| 路徑建議 | `tools/editor.html` 或 `playground/index.html`（單獨子目錄，避免 GitHub Pages 把它當主頁） |
| 編輯範圍 | **僅修改 HTML 內容**（DOM 結構 / 文字 / 連結），CSS 仍依現有設計 token |
| 推送行為 | **完全不觸發 git push**，純本地操作 |
| 儲存 | 變更存 `localStorage` 或 export 為 `.html` 檔案下載 |
| 還原 | 一鍵 reset 回 `index.html` 原始狀態 |
| 預覽 | iframe 即時渲染或 contenteditable 直編 |

**界線（重要）**：
- 此工具**不可**自動寫入 `index.html`，必須使用者明確 export / copy
- 此工具**不可**觸碰 `.git/` 或執行任何 git 指令
- 此工具屬於「**額外工具**」，與主簡歷 `index.html` 解耦

**待決定**：
- 是否做成 Skill（如 `/html-edit`），由 Claude Code 操作
- 是否做成獨立 HTML 頁面，瀏覽器內運作
- 兩者並存？（Claude skill 負責結構性大改、頁面負責微調）

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
