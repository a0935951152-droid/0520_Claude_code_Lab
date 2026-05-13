# LINKS.md — 可點擊元素 / 外部連結對照表

> `index.html` 內所有互動元素與外部連結的索引。
> **新增 / 修改 / 移除任何連結時須同步更新本檔。**

---

## 聯絡資訊（Header 區）

| 元素 | 連結 / 動作 | 開啟方式 |
|------|-------------|----------|
| MAIL contact-item | `mailto:a0935951152@gmail.com` | 預設郵件客戶端 |
| TEL contact-item | `0935-951-152`（純文字） | — |
| LOC contact-item | `新竹市東區`（i18n: `contact_loc`） | — |
| GIT contact-item | `https://github.com/a0935951152-droid` | 新分頁 |

---

## 專案卡按鈕（Selected Projects 區）

| 專案 | 按鈕 | 連結 |
|------|------|------|
| ⚡ Edge AI 智慧跟隨風扇系統 | `→ View Docs` | `https://docs.google.com/document/d/1JvKEiwZu58XSDgcmFgQtnCNYhsKCS4BXV0aUHWvVqfQ/edit?usp=sharing` |
| 🔧 Nanoclaw 自動化編譯燒錄工具 | `→ Watch Demo` | `https://www.youtube.com/watch?si=GWQhakzTJZB3ECQC&v=q3xqWqy11ho&feature=youtu.be` |
| 🧠 OCR × Transformer 翻譯優化專案 | `→ View Drive` | `https://drive.google.com/drive/folders/17lfCUG3l4pKyeh4Tiow0iKpoI6pt31J9?usp=drive_link` |
| 🏛️ 交大 AI 架構師專案履歷 | `→ View Drive` | `https://drive.google.com/file/d/19aE9BpgaeGVXs9VHT1B1IDvQBwjYg0N0/view` |

---

## 左下角控制按鈕（Fixed `.ctrl-btns`）

| 按鈕 | 動作 | 行為 |
|------|------|------|
| ✉ Contact | `openContact()` 開啟 modal | 填寫姓名/Email/留言 → 送出後 `mailto:` |
| EN / 中 | `applyLang()` | 中英內容互換，`data-i18n` 屬性同步；localStorage 持久化 `zxa_lang` |
| ◐ Dark / ◑ Light | `applyMode()` | toggle `body.dark-mode` class；localStorage 持久化 `zxa_mode` |
| 🎨 Studio / 設計工具 | `tools/studio.html` | 新分頁開啟 Design Studio（v0.10.1 起） |

> 注意：v0.9 起 light 為預設模式，`zxa_mode === 'dark'` 才切深色。

---

## 右下角 Export PDF（Fixed `.export-btn`）

| 按鈕 | 動作 |
|------|------|
| ↓ Export PDF | `window.print()` → 瀏覽器列印對話框 → 可選「另存為 PDF」 |

`@media print` 樣式自動隱藏 `.ctrl-btns / .export-btn / .modal-overlay / .proj-btn`。

---

## 內部互動（無外部連結）

| 元素 | 動作 |
|------|------|
| 技能分組標題（Software & AI / Hardware & MCU / Tools & Tags） | toggle `.skill-group.collapsed`；圖示 `+` ↔ `×`（45° rotate） |
| Contact modal 表單 | 送出後 `mailto:a0935951152@gmail.com?subject=...&body=...` |

---

## Footer

| 元素 | 連結 |
|------|------|
| 訪客計數器 | `https://visitor-badge.laobi.icu/badge?page_id=a0935951152-droid.0520_Claude_code_Lab` |

---

## i18n Keys 對照（重要 keys）

文字編輯時須意識：所有 `data-i18n` 元素都有對應的中英文字串在 `assets/scripts.js` 的 `T.zh` / `T.en` 物件內。

主要 keys：
- `studio_btn` — Studio 按鈕標籤
- `contact_loc` — 居住地（contact 區）
- `summary` — 自我介紹
- `exp1_title` ～ `exp5_desc` — 5 段工作經歷
- `proj1_name` ～ `proj4_desc` — 4 個專案
- `edu1_*` ～ `edu3_*` — 3 段學歷
- `cert1_*`、`cert2_*` — 2 張證照
- `badge_*` — About 區 5 個 badges
- `footer_*` — Footer 區

完整列表見 `assets/scripts.js`。

---

## 維護規則

- 連結失效時優先更新 `index.html` + 本檔
- 新增專案 / 經歷 → 同步更新 `index.html`、`assets/scripts.js`（i18n 雙語）、`RESUME.md`、本檔
- 連結加 `target="_blank"` 須同時加 `rel="noopener"`
- 文字連結用 `<a>` 包裹時遵守 CLAUDE.md §3：`text-decoration:none; color:inherit;`
