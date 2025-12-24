import React, { useState, useMemo } from 'react';
import './OakMega_ModuleCenter.css';

const OakMegaModuleCenter = () => {
  // 完整的模組資料
  const modules = [
    {
      id: 1,
      name: "好友清單管理",
      icon: "👥",
      category: "engagement",
      difficulty: 1,
      description: "實時管理所有 LINE 好友，支援標籤分類、分層管理",
      features: ["即時同步", "標籤分類", "批量操作", "成員詳情"],
      fullDescription: "強大的好友管理系統，提供完整的成員資料庫、實時狀態同步、智能標籤分類和分層管理功能。支援批量匯入匯出、成員去重、自動分層。",
      keyBenefits: ["提升管理效率", "降低人工操作", "數據統一性"]
    },
    {
      id: 2,
      name: "OMA 用戶追蹤",
      icon: "📊",
      category: "analytics",
      difficulty: 3,
      description: "通過 LINE OAuth 追蹤實名用戶行為，突破第三方 Cookie 限制",
      features: ["實名追蹤", "行為分析", "完整記錄", "隱私合規"],
      fullDescription: "OakMega 獨家的 OMA (OakMega Member Analytics) 追蹤系統，突破第三方 Cookie 限制，實現真實用戶追蹤。支援點擊、轉換、購買等全路徑追蹤。",
      keyBenefits: ["第三方 Cookie 替代方案", "完整用戶旅程", "數據驅動決策"]
    },
    {
      id: 3,
      name: "時間/強度標籤系統",
      icon: "⏱️",
      category: "engagement",
      difficulty: 2,
      description: "根據時間和互動頻率自動為成員打標籤，支援個性化推薦",
      features: ["自動標籤", "時間分層", "強度分析", "實時更新"],
      fullDescription: "智能標籤系統自動根據用戶互動時間和頻率進行分類。支援自定義標籤規則、標籤優先級設置、批量標籤操作。",
      keyBenefits: ["自動化標籤", "精準分層", "個性化推薦"]
    },
    {
      id: 4,
      name: "無代碼行銷自動化",
      icon: "🔄",
      category: "automation",
      difficulty: 2,
      description: "拖拉式流程建構器，設計複雜的行銷旅程無需代碼",
      features: ["流程建構", "條件觸發", "延時設置", "效果追蹤"],
      fullDescription: "強大的視覺化行銷自動化引擎。支援複雜的多分支流程、條件判斷、延時控制、事件觸發。內置 50+ 行銷場景模板。",
      keyBenefits: ["無需開發技能", "快速部署", "持續優化"]
    },
    {
      id: 5,
      name: "訊息模板庫",
      icon: "📝",
      category: "engagement",
      difficulty: 1,
      description: "內置 1000+ 行業訊息模板，支援個性化變數",
      features: ["模板庫", "個性化變數", "A/B 測試", "版本控制"],
      fullDescription: "海量訊息模板庫涵蓋各行業最佳實踐。支援動態變數、圖片/影片插入、按鈕互動元素、詳細分析統計。",
      keyBenefits: ["節省創意時間", "提高轉化率", "最佳實踐參考"]
    },
    {
      id: 6,
      name: "Rich Menu 設計器",
      icon: "🎨",
      category: "engagement",
      difficulty: 2,
      description: "WYSIWYG 編輯器設計 LINE Rich Menu，支援圖片上傳",
      features: ["視覺編輯", "即時預覽", "圖片上傳", "多版本管理"],
      fullDescription: "直觀的 Rich Menu 設計工具。支援自定義背景、區域分割、按鈕設置、圖片最佳化。可同時管理多個版本。",
      keyBenefits: ["快速設計", "無需設計師", "高轉化界面"]
    },
    {
      id: 7,
      name: "廣播訊息發送",
      icon: "📢",
      category: "engagement",
      difficulty: 1,
      description: "一對多廣播訊息推送，支援分眾定向投放",
      features: ["廣播發送", "分眾定向", "排程發送", "發送統計"],
      fullDescription: "高效的訊息廣播系統。支援按標籤/分層分眾投放、定時排程、重試機制、詳細發送報告。",
      keyBenefits: ["精準投放", "提升到達率", "降低打擾"]
    },
    {
      id: 8,
      name: "互動式投票調查",
      icon: "🗳️",
      category: "engagement",
      difficulty: 2,
      description: "在 LINE 內創建投票和調查，實時收集用戶反饋",
      features: ["投票建構", "選項管理", "即時分析", "數據導出"],
      fullDescription: "交互式投票和調查工具。支援多選/單選、圖片投票、加權計分、詳細的實時分析儀表板。",
      keyBenefits: ["實時反饋", "用戶洞察", "決策支持"]
    },
    {
      id: 9,
      name: "優惠券/禮品卡系統",
      icon: "🎁",
      category: "engagement",
      difficulty: 2,
      description: "生成、發放和追蹤優惠券，支援限制條件設置",
      features: ["生成發放", "使用限制", "有效期管理", "兌換追蹤"],
      fullDescription: "完整的優惠券管理系統。支援唯一碼生成、批量發放、使用限制、自動失效、詳細兌換報告。",
      keyBenefits: ["增加轉化", "提升回訪", "精準促銷"]
    },
    {
      id: 10,
      name: "會員等級系統",
      icon: "⭐",
      category: "engagement",
      difficulty: 2,
      description: "創建分層會員制，自動升降級和權益管理",
      features: ["等級設置", "自動升級", "權益配置", "進度追蹤"],
      fullDescription: "靈活的會員等級管理系統。支援自定義等級、升級規則、等級特權、進度可視化、精準激勵。",
      keyBenefits: ["提升黏著度", "增加消費", "用戶分層"]
    },
    {
      id: 11,
      name: "積分/回饋系統",
      icon: "💰",
      category: "engagement",
      difficulty: 2,
      description: "設計積分規則，支援積分兌換和自動發放",
      features: ["積分規則", "兌換設置", "自動發放", "過期管理"],
      fullDescription: "完整的積分系統。支援多種積分獲取方式、靈活兌換規則、自動有效期管理、詳細積分報告。",
      keyBenefits: ["增加重複購買", "提升用戶價值", "數據驅動"]
    },
    {
      id: 12,
      name: "內容分發管理",
      icon: "📄",
      category: "engagement",
      difficulty: 1,
      description: "管理和分發文章、影片、產品資訊等多媒體內容",
      features: ["內容發布", "多媒體支持", "排程發布", "效能追蹤"],
      fullDescription: "靈活的內容管理系統。支援文章/影片/圖片、標籤分類、排程發布、內容分析、評論互動。",
      keyBenefits: ["提升閱讀", "培育粉絲", "內容復用"]
    },
    {
      id: 13,
      name: "客服聊天機器人",
      icon: "🤖",
      category: "automation",
      difficulty: 3,
      description: "AI 驅動的聊天機器人，支援自然語言和關鍵詞匹配",
      features: ["自然語言", "關鍵詞匹配", "轉人工", "學習優化"],
      fullDescription: "智能聊天機器人。支援 AI 對話、規則匹配、人工轉接、對話紀錄、性能優化。",
      keyBenefits: ["降低客服成本", "24/7 響應", "提升滿意度"]
    },
    {
      id: 14,
      name: "預約/訂位系統",
      icon: "📅",
      category: "engagement",
      difficulty: 2,
      description: "在 LINE 內完成預約、訂位、掛號等服務",
      features: ["日期選擇", "時間段管理", "自動確認", "提醒通知"],
      fullDescription: "完整的預約系統。支援時間段設置、自動確認郵件、提前通知、取消管理、預約統計。",
      keyBenefits: ["降低爽約率", "自動化流程", "改善體驗"]
    },
    {
      id: 15,
      name: "產品/服務目錄",
      icon: "🛍️",
      category: "engagement",
      difficulty: 1,
      description: "展示產品和服務，支援搜尋、篩選和詳情查看",
      features: ["商品展示", "搜尋篩選", "詳情頁面", "價格管理"],
      fullDescription: "靈活的產品目錄系統。支援分類管理、高清圖片、詳細描述、實時庫存、評價展示。",
      keyBenefits: ["提升產品曝光", "便利瀏覽", "增加轉化"]
    },
    {
      id: 16,
      name: "訂單管理系統",
      icon: "📦",
      category: "automation",
      difficulty: 2,
      description: "管理訂單的完整生命週期，從下單到配送",
      features: ["訂單追蹤", "狀態更新", "物流整合", "簽核流程"],
      fullDescription: "完整的訂單管理平台。支援訂單確認、支付管理、物流追蹤、發票生成、售後管理。",
      keyBenefits: ["提升操作效率", "改善客戶體驗", "降低錯誤"]
    },
    {
      id: 17,
      name: "支付整合",
      icon: "💳",
      category: "integration",
      difficulty: 3,
      description: "支援多種支付方式：信用卡、電子錢包、銀行轉帳",
      features: ["多支付方式", "安全加密", "發票開立", "對帳管理"],
      fullDescription: "安全的支付整合系統。支援 LINE Pay、街口支付、信用卡、銀行轉帳、自動對帳。",
      keyBenefits: ["降低結帳流失", "支持多管道", "資金安全"]
    },
    {
      id: 18,
      name: "銷售分析儀表板",
      icon: "📈",
      category: "analytics",
      difficulty: 2,
      description: "實時銷售數據、客單價、轉化率等核心指標",
      features: ["實時數據", "自定義圖表", "對比分析", "報告導出"],
      fullDescription: "強大的分析工具。支援 30+ 指標、自定義儀表板、日/週/月/年分析、自動報告。",
      keyBenefits: ["數據驅動", "快速決策", "性能優化"]
    },
    {
      id: 19,
      name: "客戶行為分析",
      icon: "🔍",
      category: "analytics",
      difficulty: 2,
      description: "追蹤用戶互動、購買行為、留存率等深層數據",
      features: ["行為追蹤", "路徑分析", "留存分析", "群體分析"],
      fullDescription: "深度行為分析系統。支援用戶旅程、轉化漏斗、留存曲線、RFM 分析、群體標籤。",
      keyBenefits: ["深度洞察", "優化策略", "個性化推薦"]
    },
    {
      id: 20,
      name: "A/B 測試平台",
      icon: "🧪",
      category: "analytics",
      difficulty: 2,
      description: "設計 A/B 測試，對比訊息、時間、內容效果",
      features: ["實驗設置", "統計分析", "結果對比", "自動化推薦"],
      fullDescription: "科學的 A/B 測試平台。支援訊息/時間/創意測試、統計顯著性檢驗、結果可視化、最佳方案推薦。",
      keyBenefits: ["科學決策", "降低風險", "持續優化"]
    },
    {
      id: 21,
      name: "客服報表中心",
      icon: "📊",
      category: "analytics",
      difficulty: 1,
      description: "統計客服回應時間、滿意度、問題分類等指標",
      features: ["回應統計", "滿意度評分", "問題分類", "績效排名"],
      fullDescription: "完整的客服分析系統。支援回應時間、首次解決率、客戶滿意度、按客服排名、趨勢分析。",
      keyBenefits: ["提升服務品質", "績效管理", "持續改進"]
    },
    {
      id: 22,
      name: "CRM 整合與同步",
      icon: "🔗",
      category: "integration",
      difficulty: 3,
      description: "與 Salesforce、HubSpot 等 CRM 系統實時同步數據",
      features: ["實時同步", "數據映射", "錯誤日誌", "API 支持"],
      fullDescription: "企業級 CRM 整合系統。支援 Salesforce、HubSpot、NetSuite、自定義 API、webhook。",
      keyBenefits: ["統一數據", "工作流自動化", "提升效率"]
    },
    {
      id: 23,
      name: "進階數據導出",
      icon: "💾",
      category: "integration",
      difficulty: 1,
      description: "導出各類數據至 Excel、CSV，支援自定義欄位",
      features: ["多格式導出", "自定義欄位", "排程導出", "數據隱私"],
      fullDescription: "靈活的數據導出工具。支援 Excel/CSV/JSON、自定義欄位、排程自動導出、數據加密。",
      keyBenefits: ["數據靈活性", "報告自動化", "安全合規"]
    }
  ];

  const [currentFilter, setCurrentFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedModule, setSelectedModule] = useState(null);

  const filteredModules = useMemo(() => {
    return modules.filter(module => {
      const matchesCategory = currentFilter === 'all' || module.category === currentFilter;
      const matchesSearch = searchTerm === '' || 
        module.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        module.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [currentFilter, searchTerm]);

  const getCategoryLabel = (category) => {
    const labels = {
      engagement: '互動行銷',
      automation: '自動化',
      analytics: '數據分析',
      integration: '整合工具'
    };
    return labels[category] || category;
  };

  return (
    <div className="oakmega-container">
      <div className="header">
        <h1>🎯 OakMega 模組中心</h1>
        <p>全面管理您的 LINE Social CRM 行銷模組 | 23+ 專業工具</p>
        <div className="stats">
          <div className="stat-card">
            <div className="stat-number">23+</div>
            <div className="stat-label">核心模組</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">300+</div>
            <div className="stat-label">企業客戶</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">99.9%</div>
            <div className="stat-label">可用性</div>
          </div>
        </div>
      </div>

      <div className="controls">
        <input 
          type="text" 
          className="search-box" 
          placeholder="搜尋模組名稱或功能..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button 
          className={`filter-btn ${currentFilter === 'all' ? 'active' : ''}`}
          onClick={() => setCurrentFilter('all')}
        >
          全部
        </button>
        <button 
          className={`filter-btn ${currentFilter === 'engagement' ? 'active' : ''}`}
          onClick={() => setCurrentFilter('engagement')}
        >
          互動行銷
        </button>
        <button 
          className={`filter-btn ${currentFilter === 'automation' ? 'active' : ''}`}
          onClick={() => setCurrentFilter('automation')}
        >
          自動化
        </button>
        <button 
          className={`filter-btn ${currentFilter === 'analytics' ? 'active' : ''}`}
          onClick={() => setCurrentFilter('analytics')}
        >
          數據分析
        </button>
        <button 
          className={`filter-btn ${currentFilter === 'integration' ? 'active' : ''}`}
          onClick={() => setCurrentFilter('integration')}
        >
          整合工具
        </button>
      </div>

      {filteredModules.length === 0 ? (
        <div className="empty-state">
          <h2>查無相關模組</h2>
          <p>調整搜尋條件或篩選器後重試</p>
        </div>
      ) : (
        <div className="modules-grid">
          {filteredModules.map(module => (
            <ModuleCard 
              key={module.id} 
              module={module} 
              onSelect={setSelectedModule}
            />
          ))}
        </div>
      )}

      {selectedModule && (
        <ModuleModal 
          module={selectedModule} 
          onClose={() => setSelectedModule(null)}
          getCategoryLabel={getCategoryLabel}
        />
      )}

      <div className="footer">
        <p>© 2025 OakMega Social CRM Platform | Taiwan #1 LINE Marketing Solution</p>
      </div>
    </div>
  );
};

const ModuleCard = ({ module, onSelect }) => {
  return (
    <div className="module-card" onClick={() => onSelect(module)}>
      <div className="module-header">
        <div className="module-icon">{module.icon}</div>
        <div className="module-title">{module.name}</div>
      </div>
      <div className="module-body">
        <p className="module-description">{module.description}</p>
        <div className="module-features">
          {module.features.slice(0, 2).map((f, i) => (
            <div key={i} className="feature-item">{f}</div>
          ))}
        </div>
        <div className="module-tags">
          <span className={`tag ${module.category}`}>
            {module.category === 'engagement' && '互動行銷'}
            {module.category === 'automation' && '自動化'}
            {module.category === 'analytics' && '數據分析'}
            {module.category === 'integration' && '整合工具'}
          </span>
        </div>
        <div className="module-footer">
          <div className="difficulty">
            {[1, 2, 3].map(i => (
              <span key={i} className={`difficulty-star ${i <= module.difficulty ? 'active' : ''}`}>
                ★
              </span>
            ))}
          </div>
          <button className="btn-activate" onClick={(e) => e.stopPropagation()}>
            啟用
          </button>
        </div>
      </div>
    </div>
  );
};

const ModuleModal = ({ module, onClose, getCategoryLabel }) => {
  return (
    <div className="modal active" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-header">
          <div className="modal-icon">{module.icon}</div>
          <div className="modal-title">{module.name}</div>
        </div>
        <div className="modal-body">
          <div className="modal-section">
            <h3>模組介紹</h3>
            <p>{module.fullDescription}</p>
          </div>
          <div className="modal-section">
            <h3>核心特點</h3>
            <ul className="feature-list">
              {module.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
          <div className="modal-section">
            <h3>主要優勢</h3>
            <ul className="feature-list">
              {module.keyBenefits.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
          <div className="modal-section">
            <h3>難度等級</h3>
            <p>{'★'.repeat(module.difficulty)}{'☆'.repeat(3 - module.difficulty)} 難度</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OakMegaModuleCenter;
