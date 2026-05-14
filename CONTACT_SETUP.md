# CONTACT_SETUP.md — 履歷 Contact 表單接 Google Drive（含 DDoS / Spam 防禦）

> 目的：訪客在履歷網頁 `index.html` 左下角 `✉ Contact` 填表 → 自動寫到你 Google Drive 上的試算表（Google Sheet）→ 可隨時查閱、可接後續自動化。
> **v0.14.2 起內建多層防禦**，避免 spam bot / DDoS 把 Apps Script daily quota 打爆。

採方案：**Google Apps Script Web App + Google Sheet**（零成本、免註冊第三方、純 Google 帳號）。

---

## 一次性設定（約 6 分鐘）

### 步驟 1 — 建一張 Google Sheet ✅（Claude 已用 Drive MCP 幫你建好）

- **Sheet 名稱**：`Resume Contact 0520`
- **Sheet ID**：`1zEJsCffy7OlLgIz3hqmWOMCGYBXCRE4K4Jbh-zf-hOY`
- **URL**：https://docs.google.com/spreadsheets/d/1zEJsCffy7OlLgIz3hqmWOMCGYBXCRE4K4Jbh-zf-hOY/edit
- 標題列（A1–G1）：`Timestamp | Name | Email | Message | Page | Lang | Meta`

如果想重建：直接走 sheets.new 開新試算表、把標題列打好、抄 ID。

### 步驟 2 — 建 Apps Script（**硬化版**，v0.14.2）

1. 開 https://script.new
2. 把預設 `function myFunction()` 整段刪掉
3. 貼下面這段（SHEET_ID 已內建）：

```javascript
// ============================================================
// Resume Contact 0520 — Hardened Web App (v0.14.2)
// ============================================================
const SHEET_ID = '1zEJsCffy7OlLgIz3hqmWOMCGYBXCRE4K4Jbh-zf-hOY';
const SHARED_TOKEN = 'rms_0520_2026_x7k2';       // 與前端 CONTACT_TOKEN 同步
const ALLOWED_ORIGINS = [
  'https://a0935951152-droid.github.io',
  'http://localhost',
  'http://127.0.0.1'
];
const EMAIL_COOLDOWN_SEC = 60;          // 同 email 兩次提交最小間隔
const GLOBAL_LIMIT_PER_MIN = 10;        // 全域每分鐘上限
const MIN_FORM_DWELL_MS = 2500;         // 表單開啟後須停留 ≥ 2.5 秒才能送
const MAX_NAME = 100;
const MAX_EMAIL = 200;
const MAX_MESSAGE = 5000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function doPost(e) {
  try {
    const raw = e.postData && e.postData.contents;
    if (!raw || raw.length > 8000) return reject('size');

    let data;
    try { data = JSON.parse(raw); } catch (_) { return reject('json'); }

    // 1. Shared token
    if (data.token !== SHARED_TOKEN) return reject('token');

    // 2. Honeypot — 隱藏欄位，bot 通常會填
    if (data.website && String(data.website).trim() !== '') return reject('honeypot');

    // 3. Timing — 表單開啟到送出至少 MIN_FORM_DWELL_MS
    const opened = Number(data.formOpenedAt) || 0;
    if (!opened || Date.now() - opened < MIN_FORM_DWELL_MS) return reject('too_fast');

    // 4. Origin / Referer 軟檢查（前端送 page）
    const page = String(data.page || '');
    if (!ALLOWED_ORIGINS.some(o => page.startsWith(o))) return reject('origin');

    // 5. 欄位 validation
    const name = String(data.name || '').trim();
    const email = String(data.email || '').trim().toLowerCase();
    const message = String(data.message || '').trim();
    if (!name || name.length > MAX_NAME) return reject('name');
    if (!email || email.length > MAX_EMAIL || !EMAIL_RE.test(email)) return reject('email');
    if (!message || message.length < 5 || message.length > MAX_MESSAGE) return reject('message');

    const props = PropertiesService.getScriptProperties();
    const now = Date.now();

    // 6. 全域 rate limit（每分鐘）
    const minuteKey = 'min_' + Math.floor(now / 60000);
    const minuteCount = parseInt(props.getProperty(minuteKey) || '0', 10);
    if (minuteCount >= GLOBAL_LIMIT_PER_MIN) return reject('global_rate');

    // 7. 同 email cooldown
    const emailHash = Utilities.base64Encode(
      Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, email)
    ).slice(0, 16);
    const lastKey = 'last_' + emailHash;
    const lastSubmit = parseInt(props.getProperty(lastKey) || '0', 10);
    if (now - lastSubmit < EMAIL_COOLDOWN_SEC * 1000) return reject('email_cooldown');

    // 通過所有檢查 — 寫入 Sheet
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];
    sheet.appendRow([
      new Date().toISOString(),
      name,
      email,
      message,
      page,
      String(data.lang || ''),
      JSON.stringify({ ua: String(data.userAgent || '').slice(0, 200), dwell: now - opened })
    ]);

    // 更新 counter
    props.setProperty(minuteKey, String(minuteCount + 1));
    props.setProperty(lastKey, String(now));

    // 10% 機率清掉 5 分鐘前的舊 minute key（避免 Properties 爆）
    if (Math.random() < 0.1) {
      const cutoff = Math.floor(now / 60000) - 5;
      const all = props.getProperties();
      Object.keys(all).forEach(k => {
        if (k.startsWith('min_') && parseInt(k.slice(4), 10) < cutoff) props.deleteProperty(k);
      });
    }

    return okJson({ ok: true });
  } catch (err) {
    return reject('exception:' + String(err).slice(0, 60));
  }
}

function reject(reason) {
  // 對外只回統一錯誤，不洩漏拒絕原因（避免攻擊者調 payload 試探）
  console.log('Reject:', reason);
  return okJson({ ok: false });
}

function okJson(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  return ContentService.createTextOutput('OK · v0.14.2 hardened');
}
```

4. `Cmd/Ctrl + S` 儲存

### 步驟 3 — 重新部署（**重點：必須選 New version**）

> 改了 script 後一定要建新版本，否則舊版仍在跑。

1. 右上 Deploy → **Manage deployments**（不是 New deployment）
2. 找到既有 deployment → 點鉛筆 ✏ 編輯
3. Version → 下拉選 **New version**
4. Description: `Hardened v0.14.2`
5. Deploy
6. **URL 保持不變**，前端不用更新

> 首次部署的人：走「New deployment」、Anyone 存取、授權 → 抄 URL 回對話告訴 Claude。

---

## 防禦層詳解

| # | 防禦層 | 阻擋什麼 | 強度 |
|---|---|---|---|
| 1 | **Shared token** | 不讀前端 JS 的笨 bot 直接 POST 亂打 | ⭐⭐ |
| 2 | **Honeypot** (`website` 隱藏欄位) | 通用表單填寫 bot（會填所有欄位） | ⭐⭐⭐ |
| 3 | **Timing** (≥ 2.5s 停留) | 快速送機器 / 自動腳本 | ⭐⭐⭐ |
| 4 | **Origin 檢查** | 從別的網站 / curl 假冒提交 | ⭐⭐ |
| 5 | **Field validation** | 巨大 payload、無效 email、空白 | ⭐⭐⭐⭐ |
| 6 | **全域 rate limit** | DDoS 灌爆 quota | ⭐⭐⭐⭐ |
| 7 | **Email cooldown** | 同人快速重複送 | ⭐⭐⭐⭐ |
| 8 | **Payload size cap** (8KB) | 超大 body 攻擊 | ⭐⭐⭐⭐ |
| 9 | **統一錯誤回應** | 攻擊者試探拒絕原因 | ⭐⭐ |

**通用建議**：
- token / URL 都是公開可讀的（client JS 無法藏 secret）→ 別把它們當機密，多層防禦才有效
- 真實 DDoS 防禦（百萬級流量）需要 Cloudflare Worker / Turnstile 擋在前面 — 本架構頂多擋 daily quota 用完
- Sheet 第 7 欄 `Meta` 記錄 UA + dwell 時間，可事後分析可疑提交

---

## 進階（選用）

### A. 通知信件

在 Apps Script 加（取消 console.log 那行附近）：
```javascript
MailApp.sendEmail({
  to: 'a0935951152@gmail.com',
  subject: '[履歷聯絡] ' + name,
  body: '姓名：' + name + '\nEmail：' + email + '\n\n' + message
});
```
> Gmail 個人帳號每日寄信上限 100 封；rate limit 啟動時不會觸發，所以安全。

### B. Cloudflare Turnstile（無打擾 CAPTCHA）

若要更強的人機驗證：
1. https://dash.cloudflare.com/?to=/:account/turnstile 申請 site key
2. 前端 contact form 嵌入 widget，submit 時拿 token
3. POST 時夾帶 token → Apps Script 用 `UrlFetchApp` 打 Cloudflare 驗證 API
4. 通過才寫入 Sheet

需要時請我加。

### C. 簽名驗證（HMAC）

更嚴格時可前端用 `crypto.subtle.sign` 對 payload 簽名，後端驗。但前端 secret 仍是公開的，效益有限。

### D. 緊急封鎖

若被打爆，最快止血方法：
1. Apps Script → Deploy → Manage deployments → ✏ → Archive
2. 立即失效，所有請求都會 fail
3. 修補後重新部署（URL 會變，需要更新前端）

---

## 隱私 / 安全注意

- **Web App URL 是公開的**（任何人拿到都能 POST），但只能寫進你的 Sheet，無法讀/刪
- Sheet 內容**只有你看得到**（除非你分享）
- Apps Script 本身**不儲存任何資料**，純轉送
- **訪客 IP 不會記錄**（Apps Script 不直接給）；若要記錄需前端 fetch IP API（會洩漏，慎用）
- Sheet 內含訪客 email — 屬於 PII，避免公開分享連結

---

## 疑難排解

| 現象 | 排查 |
|------|------|
| 表單一直顯示「送出失敗」 | DevTools Network 看 fetch 是否回 200；常見是 deployment 過期 → 重新部署 |
| Sheet 沒新增列但無錯誤 | Apps Script Executions 頁面看是否被 reject（看 console.log 的 reason）— 通常是 origin / token 對不上 |
| 通過所有檢查但被拒 | 檢查 SHEET_ID 是否對；Apps Script 授權是否仍有效 |
| 用 curl 測試怎麼樣都過不了 | 必須帶 token + 模擬 honeypot 為空 + 模擬正確的 page origin + dwell time — 故意設計成這樣 |
| 「Quota exceeded」 | 表示真的被打了；考慮加 Cloudflare Turnstile（§ B） |

---

## 對應檔案

- 前端 endpoint：`assets/scripts.js` 常數 `CONTACT_ENDPOINT` / `CONTACT_TOKEN`
- 前端 honeypot：`index.html` 中 `<input id="cf-website">`
- 前端 timing：`scripts.js` 中 `formOpenedAt` 變數
- Fallback：未設定 / 失敗時走 `mailto:a0935951152@gmail.com`
