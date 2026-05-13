'use strict';
(() => {
    const T = {
        zh: {
            contact_loc: '新竹市東區',
            sg_sw: 'Software & AI', sg_hw: 'Hardware & MCU', sg_tools: 'Tools & Tags',
            edu1_school: '國立中山大學', edu1_dept: '生物科學碩士班 | 碩士', edu1_date: '2023/09 — 2025/09',
            edu2_school: '國立中山大學', edu2_dept: '生物科學系 | 學士', edu2_date: '2016/09 — 2021/09',
            edu3_school: '國立陽明交通大學', edu3_dept: 'Extension Program（AI 架構師）', edu3_date: '2025/10 — 2026/06',
            cert1_name: 'AI-900 AI 人工智慧基礎認證', cert1_org: 'Microsoft Certified',
            cert2_name: '普通小型車 / 重型機車', cert2_org: '駕駛執照 | 普通 + 大型重型',
            summary: '有 LLM 及 CV 專案實戰經驗，擅長雲端 AI 協作開發。具備 Transformer 競賽經歷、生醫影像辨識比賽成績及嵌入式裝置專案落地成果。熟悉 C、Python，可獨立完成從研究到部署的完整 AI 工作流，涵蓋 LLM 微調、RAG 架構設計、Docker 容器化部署，以及 MCU 韌體整合。生命科學背景，跨域整合 AI × 生醫 × 硬體開發，具政府研究計畫執行與論文撰寫經驗。',
            badge_fulltime: '全職工作', badge_remote: '遠端可配合', badge_loc: '新竹 / 台北 / 新北',
            badge_notice: '錄取後一個月可報到', badge_salary: '薪資面議',
            exp1_title: '學生研究員', exp1_company: '國立交通大學',
            exp1_date: '2025/10 — 2026/05  ·  8 個月  ·  新竹市',
            exp1_desc: 'AI 架構師實習專案，學習並實作 Cloud / Core / Edge AI 架構設計，整合 LLM 推論與嵌入式系統，參與前沿 AI 研究工作。',
            exp2_title: '專任研究助理', exp2_company: '國立台灣海洋大學',
            exp2_date: '2025/08 — 2025/11  ·  4 個月  ·  基隆市',
            exp2_desc: '數據分析師，負責研究資料清理、統計分析與可視化，協助研究計畫推進。',
            exp3_title: '講師', exp3_company: '薪哲文教股份有限公司',
            exp3_date: '2024/03 — 2025/01  ·  11 個月  ·  高雄市鼓山區',
            exp3_desc: '數理補習班老師，負責課程規劃、教學授課及學生學習輔導。',
            exp4_title: '行政管理', exp4_company: '國防部陸軍司令部',
            exp4_date: '2022/04 — 2023/08  ·  1 年 5 個月',
            exp4_desc: '行政人員，負責文書處理、行政事務協調與執行。役畢退伍 (2023/08)。',
            exp5_title: '講師', exp5_company: '明光文教事業股份有限公司',
            exp5_date: '2019/09 — 2020/06  ·  10 個月  ·  高雄市三民區',
            exp5_desc: '補習班老師，負責理工科目教學，培養邏輯表達與知識傳授能力。',
            proj1_name: 'Edge AI 智慧跟隨風扇系統',
            proj1_desc: '整合語音辨識、LLM 對話、紅外線鏡頭追蹤及居家 IoT 控制。陣列麥克風搭配輕量語音模型 + CV 追蹤模型，PID 控制 DC 風扇，減少熱流冗餘能耗，架構整合 NLP 裝置。',
            proj2_name: 'Nanoclaw 自動化編譯燒錄工具',
            proj2_desc: '以 Claude Code 平台為 Nordic nRF54 系列開發自動化韌體工作流，設計 context management、agent skill 及韌體工作流落地方案，大幅提升固件開發效率。',
            proj3_name: 'OCR × Transformer 翻譯優化專案',
            proj3_desc: '以 BYT5 知識蒸餾產生偽標籤，微調分子生物文獻 OCR 後文字翻譯模型。主流 OCR 翻譯準確率提升至 40%；千萬參數以內小模型搭配清洗小資料達 30% 整體翻譯準確率。',
            proj4_name: '交大 AI 架構師專案履歷 <span style="font-family:var(--mono);font-size:10px;color:var(--text-muted);font-weight:500;letter-spacing:1px;margin-left:8px">IN PROGRESS</span>',
            proj4_desc: '生命科學背景出身，於交通大學深化 AI 架構設計知識，整合 Cloud / Core / Edge 三層架構，探索 AI 於各產業之落地應用。進行中 (2025/10 ～)。',
            footer_name: '蕭哲安 · ZHE-AN XIAO',
            footer_status: 'Status: Seeking New Mission',
            studio_btn: '設計工具',
        },
        en: {
            contact_loc: 'Hsinchu City, East District',
            sg_sw: 'Software & AI', sg_hw: 'Hardware & MCU', sg_tools: 'Tools & Tags',
            edu1_school: 'National Sun Yat-sen University', edu1_dept: 'M.Sc. in Biological Sciences', edu1_date: '2023/09 — 2025/09',
            edu2_school: 'National Sun Yat-sen University', edu2_dept: 'B.Sc. in Biological Sciences', edu2_date: '2016/09 — 2021/09',
            edu3_school: 'Nat\'l Yang Ming Chiao Tung Univ.', edu3_dept: 'Extension Program (AI Architect)', edu3_date: '2025/10 — 2026/06',
            cert1_name: 'AI-900 Azure AI Fundamentals', cert1_org: 'Microsoft Certified',
            cert2_name: 'Driver\'s License (Car & Motorcycle)', cert2_org: 'Class B + Heavy Motorcycle',
            summary: 'Experienced in LLM and CV projects with hands-on research background, proficient in cloud-based AI collaborative development. Participated in Transformer competitions, biomedical image recognition contests, and embedded AI deployment projects. Proficient in C and Python — independently capable of the full AI workflow from research to deployment: LLM fine-tuning, RAG architecture, Docker containerization, and MCU firmware integration. Life sciences background enabling cross-domain AI × Biomedical × Hardware development.',
            badge_fulltime: 'Full-time', badge_remote: 'Remote OK', badge_loc: 'Hsinchu / Taipei / New Taipei',
            badge_notice: 'Available within 1 month', badge_salary: 'Open to Negotiation',
            exp1_title: 'Student Researcher', exp1_company: 'Nat\'l Yang Ming Chiao Tung Univ.',
            exp1_date: '2025/10 — 2026/05  ·  8 months  ·  Hsinchu',
            exp1_desc: 'AI Architect internship: learning and implementing Cloud/Core/Edge AI architecture design, integrating LLM inference with embedded systems, participating in frontier AI research.',
            exp2_title: 'Research Assistant', exp2_company: 'National Taiwan Ocean University',
            exp2_date: '2025/08 — 2025/11  ·  4 months  ·  Keelung',
            exp2_desc: 'Data analyst responsible for research data cleaning, statistical analysis, and visualization.',
            exp3_title: 'Instructor', exp3_company: 'Hsin-Zhe Education Co.',
            exp3_date: '2024/03 — 2025/01  ·  11 months  ·  Kaohsiung',
            exp3_desc: 'Math and science tutor responsible for curriculum planning, teaching, and student academic guidance.',
            exp4_title: 'Administrative Staff', exp4_company: 'Republic of China Army HQ',
            exp4_date: '2022/04 — 2023/08  ·  1 yr 5 mo',
            exp4_desc: 'Administrative officer handling documentation, coordination, and execution of administrative tasks. Completed compulsory military service (Aug 2023).',
            exp5_title: 'Instructor', exp5_company: 'Ming Guang Education Co.',
            exp5_date: '2019/09 — 2020/06  ·  10 months  ·  Kaohsiung',
            exp5_desc: 'Science and math tutor developing logical reasoning and knowledge transfer skills.',
            proj1_name: 'Edge AI Smart-Tracking Fan System',
            proj1_desc: 'Integrates voice recognition, LLM dialogue, IR camera tracking, and home IoT control. Array mic with lightweight voice model + CV tracking model, PID-controlled DC fan to reduce thermal energy waste, NLP-integrated embedded architecture.',
            proj2_name: 'Nanoclaw: Automated Compile & Flash Tool',
            proj2_desc: 'Built automated firmware workflow for Nordic nRF54 series via Claude Code platform. Designed context management, agent skills, and firmware deployment solutions — significantly boosting firmware development efficiency.',
            proj3_name: 'OCR × Transformer Translation Optimization',
            proj3_desc: 'Used BYT5 knowledge distillation to generate pseudo-labels for fine-tuning biomedical OCR translation. Improved accuracy to 40%; sub-10M parameter model with cleaned small dataset achieved 30% overall translation accuracy.',
            proj4_name: 'NYCU AI Architect Portfolio <span style="font-family:var(--mono);font-size:10px;color:var(--text-muted);font-weight:500;letter-spacing:1px;margin-left:8px">IN PROGRESS</span>',
            proj4_desc: 'Deepening AI architecture knowledge at NYCU. Integrating Cloud/Core/Edge three-tier architecture, exploring AI deployment across industries. In progress (2025/10 ~).',
            footer_name: 'ZHE-AN XIAO',
            footer_status: 'Status: Seeking New Mission',
            studio_btn: 'Studio',
        }
    };

    let lang = localStorage.getItem('zxa_lang') || 'zh';
    let darkMode = localStorage.getItem('zxa_mode') === 'dark';

    function applyLang(l) {
        lang = l;
        localStorage.setItem('zxa_lang', l);
        document.getElementById('html-root').lang = l === 'zh' ? 'zh-TW' : 'en';
        document.getElementById('lang-btn').textContent = l === 'zh' ? 'EN' : '中';
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const k = el.dataset.i18n;
            if (T[l] && T[l][k] !== undefined) el.innerHTML = T[l][k];
        });
    }

    function applyMode(dark) {
        darkMode = dark;
        localStorage.setItem('zxa_mode', dark ? 'dark' : 'light');
        document.body.classList.toggle('dark-mode', dark);
        document.getElementById('mode-btn').textContent = dark ? '◑ Light' : '◐ Dark';
    }

    window.openContact = function() { document.getElementById('contact-modal').classList.add('open'); };
    window.closeContact = function() {
        document.getElementById('contact-modal').classList.remove('open');
        document.getElementById('cf-status').textContent = '';
    };
    window.handleOverlayClick = function(e) { if (e.target === document.getElementById('contact-modal')) window.closeContact(); };
    window.submitContact = function(e) {
        e.preventDefault();
        const name = document.getElementById('cf-name').value;
        const email = document.getElementById('cf-email').value;
        const msg = document.getElementById('cf-msg').value;
        const sub = encodeURIComponent('[履歷聯絡] 來自 ' + name);
        const body = encodeURIComponent('姓名：' + name + '\nEmail：' + email + '\n\n' + msg);
        window.location.href = 'mailto:a0935951152@gmail.com?subject=' + sub + '&body=' + body;
        document.getElementById('cf-status').textContent = '✓ 已開啟郵件客戶端，請確認傳送。';
    };

    document.addEventListener('DOMContentLoaded', () => {
        applyMode(darkMode);
        applyLang(lang);
        document.querySelectorAll('.skill-group-title').forEach(t => {
            t.addEventListener('click', () => t.closest('.skill-group').classList.toggle('collapsed'));
        });
        document.getElementById('mode-btn').addEventListener('click', () => applyMode(!darkMode));
        document.getElementById('lang-btn').addEventListener('click', () => applyLang(lang === 'zh' ? 'en' : 'zh'));
    });
})();
