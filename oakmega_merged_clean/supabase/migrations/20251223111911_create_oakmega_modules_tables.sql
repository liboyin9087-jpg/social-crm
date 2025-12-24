/*
  # OakMega 模块中心数据库表

  1. 新表
    - `oakmega_modules`
      - `id` (bigint, primary key) - 模块ID
      - `name` (text) - 模块名称
      - `icon` (text) - 模块图标emoji
      - `category` (text) - 模块分类
      - `difficulty` (smallint) - 难度等级 1-3
      - `description` (text) - 简短描述
      - `features` (jsonb) - 功能特点数组
      - `full_description` (text) - 详细描述
      - `key_benefits` (jsonb) - 主要优势数组
      - `is_active` (boolean) - 是否激活
      - `created_at` (timestamptz) - 创建时间
      - `updated_at` (timestamptz) - 更新时间

    - `user_modules`
      - `id` (uuid, primary key) - 记录ID
      - `user_id` (uuid) - 用户ID（外键关联 users 表）
      - `module_id` (bigint) - 模块ID（外键关联 oakmega_modules 表）
      - `is_enabled` (boolean) - 用户是否启用该模块
      - `enabled_at` (timestamptz) - 启用时间
      - `created_at` (timestamptz) - 创建时间

  2. 安全性
    - 为所有表启用 RLS
    - 用户可以查看所有模块
    - 用户只能管理自己的模块启用状态
*/

-- 创建 oakmega_modules 表
CREATE TABLE IF NOT EXISTS oakmega_modules (
  id bigint PRIMARY KEY,
  name text NOT NULL,
  icon text NOT NULL DEFAULT '📦',
  category text NOT NULL CHECK (category IN ('engagement', 'automation', 'analytics', 'integration')),
  difficulty smallint NOT NULL DEFAULT 1 CHECK (difficulty BETWEEN 1 AND 3),
  description text NOT NULL,
  features jsonb NOT NULL DEFAULT '[]'::jsonb,
  full_description text NOT NULL,
  key_benefits jsonb NOT NULL DEFAULT '[]'::jsonb,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 创建 user_modules 表
CREATE TABLE IF NOT EXISTS user_modules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  module_id bigint NOT NULL REFERENCES oakmega_modules(id) ON DELETE CASCADE,
  is_enabled boolean NOT NULL DEFAULT false,
  enabled_at timestamptz,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, module_id)
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_oakmega_modules_category ON oakmega_modules(category);
CREATE INDEX IF NOT EXISTS idx_oakmega_modules_is_active ON oakmega_modules(is_active);
CREATE INDEX IF NOT EXISTS idx_user_modules_user_id ON user_modules(user_id);
CREATE INDEX IF NOT EXISTS idx_user_modules_module_id ON user_modules(module_id);

-- 启用 RLS
ALTER TABLE oakmega_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_modules ENABLE ROW LEVEL SECURITY;

-- RLS 策略：所有认证用户可以查看激活的模块
CREATE POLICY "Authenticated users can view active modules"
  ON oakmega_modules
  FOR SELECT
  TO authenticated
  USING (is_active = true);

-- RLS 策略：用户可以查看自己的模块启用状态
CREATE POLICY "Users can view own module settings"
  ON user_modules
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS 策略：用户可以插入自己的模块启用记录
CREATE POLICY "Users can insert own module settings"
  ON user_modules
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- RLS 策略：用户可以更新自己的模块启用状态
CREATE POLICY "Users can update own module settings"
  ON user_modules
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 插入 23 个 OakMega 模块数据
INSERT INTO oakmega_modules (id, name, icon, category, difficulty, description, features, full_description, key_benefits) VALUES
(1, '好友清單管理', '👥', 'engagement', 1, '實時管理所有 LINE 好友，支援標籤分類、分層管理', '["即時同步", "標籤分類", "批量操作", "成員詳情"]'::jsonb, '強大的好友管理系統，提供完整的成員資料庫、實時狀態同步、智能標籤分類和分層管理功能。支援批量匯入匯出、成員去重、自動分層。', '["提升管理效率", "降低人工操作", "數據統一性"]'::jsonb),
(2, 'OMA 用戶追蹤', '📊', 'analytics', 3, '通過 LINE OAuth 追蹤實名用戶行為，突破第三方 Cookie 限制', '["實名追蹤", "行為分析", "完整記錄", "隱私合規"]'::jsonb, 'OakMega 獨家的 OMA (OakMega Member Analytics) 追蹤系統，突破第三方 Cookie 限制，實現真實用戶追蹤。支援點擊、轉換、購買等全路徑追蹤。', '["第三方 Cookie 替代方案", "完整用戶旅程", "數據驅動決策"]'::jsonb),
(3, '時間/強度標籤系統', '⏱️', 'automation', 2, '根據時間和互動頻率自動為成員打標籤，支援個性化推薦', '["自動標籤", "時間分層", "強度分析", "實時更新"]'::jsonb, '智能標籤系統自動根據用戶互動時間和頻率進行分類。支援自定義標籤規則、標籤優先級設置、批量標籤操作。', '["自動化標籤", "精準分層", "個性化推薦"]'::jsonb),
(4, '無代碼行銷自動化', '🔄', 'automation', 2, '拖拉式流程建構器，設計複雜的行銷旅程無需代碼', '["流程建構", "條件觸發", "延時設置", "效果追蹤"]'::jsonb, '強大的視覺化行銷自動化引擎。支援複雜的多分支流程、條件判斷、延時控制、事件觸發。內置 50+ 行銷場景模板。', '["無需開發技能", "快速部署", "持續優化"]'::jsonb),
(5, '訊息模板庫', '📝', 'engagement', 1, '內置 1000+ 行業訊息模板，支援個性化變數', '["模板庫", "個性化變數", "A/B 測試", "版本控制"]'::jsonb, '海量訊息模板庫涵蓋各行業最佳實踐。支援動態變數、圖片/影片插入、按鈕互動元素、詳細分析統計。', '["節省創意時間", "提高轉化率", "最佳實踐參考"]'::jsonb),
(6, 'Rich Menu 設計器', '🎨', 'engagement', 2, 'WYSIWYG 編輯器設計 LINE Rich Menu，支援圖片上傳', '["視覺編輯", "即時預覽", "圖片上傳", "多版本管理"]'::jsonb, '直觀的 Rich Menu 設計工具。支援自定義背景、區域分割、按鈕設置、圖片最佳化。可同時管理多個版本。', '["快速設計", "無需設計師", "高轉化界面"]'::jsonb),
(7, '廣播訊息發送', '📢', 'engagement', 1, '一對多廣播訊息推送，支援分眾定向投放', '["廣播發送", "分眾定向", "排程發送", "發送統計"]'::jsonb, '高效的訊息廣播系統。支援按標籤/分層分眾投放、定時排程、重試機制、詳細發送報告。', '["精準投放", "提升到達率", "降低打擾"]'::jsonb),
(8, '互動式投票調查', '🗳️', 'engagement', 2, '在 LINE 內創建投票和調查，實時收集用戶反饋', '["投票建構", "選項管理", "即時分析", "數據導出"]'::jsonb, '交互式投票和調查工具。支援多選/單選、圖片投票、加權計分、詳細的實時分析儀表板。', '["實時反饋", "用戶洞察", "決策支持"]'::jsonb),
(9, '優惠券/禮品卡系統', '🎁', 'engagement', 2, '生成、發放和追蹤優惠券，支援限制條件設置', '["生成發放", "使用限制", "有效期管理", "兌換追蹤"]'::jsonb, '完整的優惠券管理系統。支援唯一碼生成、批量發放、使用限制、自動失效、詳細兌換報告。', '["增加轉化", "提升回訪", "精準促銷"]'::jsonb),
(10, '會員等級系統', '⭐', 'analytics', 2, '創建分層會員制，自動升降級和權益管理', '["等級設置", "自動升級", "權益配置", "進度追蹤"]'::jsonb, '靈活的會員等級管理系統。支援自定義等級、升級規則、等級特權、進度可視化、精準激勵。', '["提升黏著度", "增加消費", "用戶分層"]'::jsonb),
(11, '積分/回饋系統', '💰', 'integration', 2, '設計積分規則，支援積分兌換和自動發放', '["積分規則", "兌換設置", "自動發放", "過期管理"]'::jsonb, '完整的積分系統。支援多種積分獲取方式、靈活兌換規則、自動有效期管理、詳細積分報告。', '["增加重複購買", "提升用戶價值", "數據驅動"]'::jsonb),
(12, '內容分發管理', '📄', 'engagement', 1, '管理和分發文章、影片、產品資訊等多媒體內容', '["內容發布", "多媒體支持", "排程發布", "效能追蹤"]'::jsonb, '靈活的內容管理系統。支援文章/影片/圖片、標籤分類、排程發布、內容分析、評論互動。', '["提升閱讀", "培育粉絲", "內容復用"]'::jsonb),
(13, '客服聊天機器人', '🤖', 'automation', 3, 'AI 驅動的聊天機器人，支援自然語言和關鍵詞匹配', '["自然語言", "關鍵詞匹配", "轉人工", "學習優化"]'::jsonb, '智能聊天機器人。支援 AI 對話、規則匹配、人工轉接、對話紀錄、性能優化。', '["降低客服成本", "24/7 響應", "提升滿意度"]'::jsonb),
(14, '預約/訂位系統', '📅', 'engagement', 2, '在 LINE 內完成預約、訂位、掛號等服務', '["日期選擇", "時間段管理", "自動確認", "提醒通知"]'::jsonb, '完整的預約系統。支援時間段設置、自動確認郵件、提前通知、取消管理、預約統計。', '["降低爽約率", "自動化流程", "改善體驗"]'::jsonb),
(15, '產品/服務目錄', '🛍️', 'engagement', 1, '展示產品和服務，支援搜尋、篩選和詳情查看', '["商品展示", "搜尋篩選", "詳情頁面", "價格管理"]'::jsonb, '靈活的產品目錄系統。支援分類管理、高清圖片、詳細描述、實時庫存、評價展示。', '["提升產品曝光", "便利瀏覽", "增加轉化"]'::jsonb),
(16, '訂單管理系統', '📦', 'automation', 2, '管理訂單的完整生命週期，從下單到配送', '["訂單追蹤", "狀態更新", "物流整合", "簽核流程"]'::jsonb, '完整的訂單管理平台。支援訂單確認、支付管理、物流追蹤、發票生成、售後管理。', '["提升操作效率", "改善客戶體驗", "降低錯誤"]'::jsonb),
(17, '支付整合', '💳', 'integration', 3, '支援多種支付方式：信用卡、電子錢包、銀行轉帳', '["多支付方式", "安全加密", "發票開立", "對帳管理"]'::jsonb, '安全的支付整合系統。支援 LINE Pay、街口支付、信用卡、銀行轉帳、自動對帳。', '["降低結帳流失", "支持多管道", "資金安全"]'::jsonb),
(18, '銷售分析儀表板', '📈', 'analytics', 2, '實時銷售數據、客單價、轉化率等核心指標', '["實時數據", "自定義圖表", "對比分析", "報告導出"]'::jsonb, '強大的分析工具。支援 30+ 指標、自定義儀表板、日/週/月/年分析、自動報告。', '["數據驅動", "快速決策", "性能優化"]'::jsonb),
(19, '客戶行為分析', '🔍', 'analytics', 2, '追蹤用戶互動、購買行為、留存率等深層數據', '["行為追蹤", "路徑分析", "留存分析", "群體分析"]'::jsonb, '深度行為分析系統。支援用戶旅程、轉化漏斗、留存曲線、RFM 分析、群體標籤。', '["深度洞察", "優化策略", "個性化推薦"]'::jsonb),
(20, 'A/B 測試平台', '🧪', 'analytics', 2, '設計 A/B 測試，對比訊息、時間、內容效果', '["實驗設置", "統計分析", "結果對比", "自動化推薦"]'::jsonb, '科學的 A/B 測試平台。支援訊息/時間/創意測試、統計顯著性檢驗、結果可視化、最佳方案推薦。', '["科學決策", "降低風險", "持續優化"]'::jsonb),
(21, '客服報表中心', '📊', 'analytics', 1, '統計客服回應時間、滿意度、問題分類等指標', '["回應統計", "滿意度評分", "問題分類", "績效排名"]'::jsonb, '完整的客服分析系統。支援回應時間、首次解決率、客戶滿意度、按客服排名、趨勢分析。', '["提升服務品質", "績效管理", "持續改進"]'::jsonb),
(22, 'CRM 整合與同步', '🔗', 'integration', 3, '與 Salesforce、HubSpot 等 CRM 系統實時同步數據', '["實時同步", "數據映射", "錯誤日誌", "API 支持"]'::jsonb, '企業級 CRM 整合系統。支援 Salesforce、HubSpot、NetSuite、自定義 API、webhook。', '["統一數據", "工作流自動化", "提升效率"]'::jsonb),
(23, '進階數據導出', '💾', 'integration', 1, '導出各類數據至 Excel、CSV，支援自定義欄位', '["多格式導出", "自定義欄位", "排程導出", "數據隱私"]'::jsonb, '靈活的數據導出工具。支援 Excel/CSV/JSON、自定義欄位、排程自動導出、數據加密。', '["數據靈活性", "報告自動化", "安全合規"]'::jsonb)
ON CONFLICT (id) DO NOTHING;
