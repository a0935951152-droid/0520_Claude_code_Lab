# CONTACT_SETUP.md — 履歷 Contact 表單接 Google Drive

> 目的：訪客在履歷網頁 `index.html` 左下角 `✉ Contact` 填表 → 自動寫到你 Google Drive 上的試算表（Google Sheet）→ 可隨時查閱、可接後續自動化。

採方案：**Google Apps Script Web App + Google Sheet**（零成本、免註冊第三方、純 Google 帳號）。

---

## 一次性設定（約 5 分鐘）

### 步驟 1 — 建一張 Google Sheet

1. 開 [https://sheets.new](https://sheets.new) 建新試算表
2. 命名（建議：`Resume Contact 0520`）
3. 第一列加標題（A1–F1）：
   ```
   Timestamp | Name | Email | Message | Page | Lang
   ```
4. **複製試算表 ID**：網址 `https://docs.google.com/spreadsheets/d/【這段就是ID】/edit` → 把 ID 抄起來

### 步驟 2 — 建 Apps Script

1. 開 [https://script.new](https://script.new)（會建立新 Apps Script 專案）
2. 命名（如 `Resume Contact Receiver`）
3. 把預設 `function myFunction()` 整份**清空**，貼下面這段：

```javascript
const SHEET_ID = 'PASTE_YOUR_SHEET_ID_HERE';  // ← 換成步驟 1 拿到的 ID

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name || '',
      data.email || '',
      data.message || '',
      data.page || '',
      data.lang || ''
    ]);
    // Optional: email notify yourself
    // MailApp.sendEmail({
    //   to: 'a0935951152@gmail.com',
    //   subject: '[履歷聯絡] 來自 ' + data.name,
    //   body: '姓名：' + data.name + '\nEmail：' + data.email + '\n\n' + data.message
    // });
    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput('OK · Resume Contact endpoint alive');
}
```

4. 把 `PASTE_YOUR_SHEET_ID_HERE` 換成步驟 1 的 Sheet ID
5. 按 💾 儲存（`Ctrl/Cmd + S`）

### 步驟 3 — 部署為 Web App

1. 右上角點「Deploy」→「New deployment」
2. 點齒輪圖示 → 選 **Web app**
3. 填欄位：
   - **Description**：`Resume contact v1`（隨意）
   - **Execute as**：`Me (你的帳號)`
   - **Who has access**：`Anyone`（讓網頁可以匿名 POST；資料只進你的 Sheet，安全）
4. 點 **Deploy**
5. 首次部署會跳授權：
   - 點「Authorize access」
   - 選你的帳號
   - 若看到「Google hasn't verified this app」→ 點「Advanced」→「Go to (your project name)」
   - 點「Allow」
6. **複製 Web app URL**：長這樣 `https://script.google.com/macros/s/AKfycb.../exec`

### 步驟 4 — 把 URL 給 Claude Code

回到對話貼 URL，例如：
```
URL 拿到了：https://script.google.com/macros/s/AKfycb.../exec
```

Claude 會：
1. 把 URL 寫進 `assets/scripts.js` 的 `CONTACT_ENDPOINT` 常數
2. 推送一個 patch commit

---

## 設定完成後行為

| 情境 | 結果 |
|------|------|
| 訪客填寫並按 Send | 表單資料 POST 到 Apps Script → 寫進 Sheet → 顯示「✓ 已送出，將於 24 小時內回覆」→ Modal 自動關閉 |
| 訪客瀏覽器離線 / endpoint 掛了 | 自動 fallback 到 `mailto:`，照舊開郵件客戶端 |
| `CONTACT_ENDPOINT` 仍為 placeholder | 直接走 `mailto:`（現況） |

---

## 進階功能（選用）

### A. 收到信件通知

把 Apps Script 中註解的 `MailApp.sendEmail({...})` 區塊**取消註解**：每次有新留言會寄信通知你。

> 注意：免費 Google 帳號每天有 100 封 quota 限制（個人用足夠）。

### B. 防垃圾留言

在 `doPost` 加簡單 honeypot 檢查：
```javascript
if (data.website) {  // 機器人通常會填所有欄位
  return ContentService.createTextOutput(JSON.stringify({ ok: false }));
}
```
網頁端加一個隱藏 `<input name="website" style="display:none">`。

### C. 同步到 Notion / Slack

Apps Script 可呼叫任何 webhook，加在 `doPost` 內：
```javascript
UrlFetchApp.fetch('https://hooks.slack.com/services/...', {
  method: 'post',
  contentType: 'application/json',
  payload: JSON.stringify({ text: '新留言：' + data.name })
});
```

### D. 設定 reCAPTCHA

進階防垃圾：前端嵌 Google reCAPTCHA、後端驗證 token。網路上教學多。

---

## 隱私 / 安全注意

- **Web App URL 是公開的**（任何人拿到就能 POST），但只能寫進你的 Sheet，無法讀取或刪除
- Sheet 內容**只有你看得到**（除非你分享）
- Apps Script 本身**不會儲存任何資料**，純轉送
- 訪客 IP 不會自動記錄，若需要可在前端 fetch 一個 IP API 一起送
- 若擔心垃圾流量，可在 script 內加 throttle（每分鐘最多 N 筆）

---

## 重新部署（修改 script 後）

修改 Apps Script 後須重新部署才會生效：

1. Deploy → Manage deployments
2. 找到現有 deployment → 點鉛筆圖示
3. Version 選 「New version」→ Deploy
4. **URL 保持不變**，不用更新前端

---

## 疑難排解

| 現象 | 排查 |
|------|------|
| 表單送出後 Sheet 沒新增列 | 檢查 SHEET_ID 是否正確 / Apps Script 執行紀錄（Executions 頁面） |
| 顯示「送出失敗」 | Open browser DevTools → Network 看 fetch 是否 200；可能是 URL 錯或 deployment 過期 |
| CORS 錯誤 | 確認前端用 `mode: 'no-cors'`（已內建）；不要用 `application/json` content-type |
| 第一次部署被擋 | 完整按授權步驟（Advanced → Allow），Google 對未驗證 app 預設保守 |
| Apps Script 顯示「Quota exceeded」 | 個人 Gmail 帳號每日 mailapp send 限制 100 封，沒寄信則不影響 |

---

## 對應檔案

- 前端入口：`assets/scripts.js` 常數 `CONTACT_ENDPOINT`
- 觸發按鈕：`index.html` 中 `<button class="ctrl-btn" id="contact-btn">`
- Modal：`index.html` 中 `<div id="contact-modal">`
- Fallback 路徑：未設定時打開 `mailto:a0935951152@gmail.com`
