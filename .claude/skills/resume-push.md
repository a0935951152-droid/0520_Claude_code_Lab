# resume-push

讀取本地履歷 PDF 與 HTML 模板，設計並推送個人簡歷網頁到 GitHub repository。

## 使用方式

```
/resume-push [風格] [repo]
```

- `風格`（可選）：cyberpunk（預設）、minimal、classic
- `repo`（可選）：目標 GitHub repo，格式 `owner/repo`

## 執行步驟

### Step 1 — 確認環境

確認以下工具可用：
1. GitHub MCP Server 已連線（`mcp__plugin_github_github__get_me` 可呼叫）
2. 本地工作目錄存在 PDF 履歷與 HTML 模板

掃描當前工作目錄，找出：
- `*.pdf` — 履歷原始資料
- `*.html` 或 `format.html` — 版面模板

若找不到，請用戶指定路徑：
```
找不到履歷 PDF，請問路徑為何？（例：/home/user/resume.pdf）
```

### Step 2 — 讀取資料

使用 `Read` 工具讀取：
1. HTML 模板（了解版面結構與 placeholder）
2. PDF 履歷（解析個人資訊）

從 PDF 提取以下欄位：
- 基本資訊：姓名、英文名、電話、Email、地址
- 求職條件：目標職稱、希望地點、遠端意願
- 學歷：學校、科系、學位、年份
- 工作經歷：職稱、公司、時間、職責描述
- 技能：程式語言、框架、工具、領域
- 語言能力：語言名稱、程度
- 證照：名稱、發證機構
- 專案：名稱、描述、使用技術

### Step 3 — 設計 HTML

依照指定風格生成完整 `index.html`：

**cyberpunk 風格規格：**
- 背景色：`#0a0a0f`（深黑）
- 主色：`#00f5ff`（青色霓虹）
- 副色：`#ff00cc`（洋紅霓虹）
- 強調色：`#39ff14`（綠）/ `#ffd700`（金）
- 字型：Orbitron（標題）/ Share Tech Mono（代碼風）/ Noto Sans TC（中文）
- 效果：掃描線覆蓋、網格背景、Glitch 動畫、技能條動態填充、切角面板

必要區塊（照順序）：
1. Header（姓名 Glitch + 聯絡資訊）
2. Stats Bar（年資 / 測驗分數 / 學歷 / 證照 / 專案數）
3. 左欄：技能矩陣 / 學歷 / 語言能力 / 證照
4. 右欄：個人簡介 / 工作經歷時間軸 / 專案卡片
5. Footer（狀態列）

### Step 4 — 推送到 GitHub

使用 `mcp__plugin_github_github__create_or_update_file` 推送：

```
owner: <從 get_me 取得，或用戶指定>
repo:  <目標 repo>
path:  index.html
branch: main
message: feat: update cyberpunk resume page
```

若 `index.html` 已存在，先用 `mcp__plugin_github_github__get_file_contents` 取得 SHA，再帶入更新。

### Step 5 — 回報結果

推送成功後，回報：
- commit SHA
- 檔案 URL（GitHub blob）
- GitHub Pages 預覽 URL（若已啟用）：
  `https://<owner>.github.io/<repo>/`

---

## 注意事項

- GitHub Personal Access Token 需已設定於 `~/.claude/settings.json` 的 `env.GITHUB_PERSONAL_ACCESS_TOKEN`
- 若 token 未設定，提示用戶先執行 `/mcp` 確認連線狀態
- 敏感個人資訊（電話、地址）在推送前再次確認用戶同意
- 生成的 HTML 使用 CDN 字型，需要網路才能正確顯示
