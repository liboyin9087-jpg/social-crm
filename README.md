# OakMega Social CRM

一個基於 Canopy (樹冠層) 設計系統的現代化社交 CRM 平台，整合 LINE 好友管理、用戶追蹤、行銷自動化和會員經營功能。

## 專案簡介

OakMega Social CRM 是專為社交平台打造的客戶關係管理系統，特別針對 LINE 官方帳號的經營需求，提供完整的會員管理、行為追蹤、互動遊戲和優惠券管理功能。

### 核心功能

- **📊 儀表板 (Dashboard)**: 即時查看關鍵指標、統計數據和最新動態
- **🎮 模組中心 (Module Hub)**: 管理和安裝各種功能模組
- **🔍 OMA 追蹤 (OakMega Analytics)**: 突破第三方 Cookie 限制的用戶行為追蹤系統
- **🎯 遊樂場 (Playground)**: 互動式遊戲模組（轉盤、刮刮樂、老虎機）
- **🎁 優惠券系統 (Rewards)**: 完整的優惠券管理和發放系統
- **🤝 服務中心 (Service Center)**: 客服票務和對話管理
- **🏷️ 標籤系統**: 基於時間和互動強度的智能標籤

## 技術棧

### 前端框架
- **React 18.3.1**: 現代化的 UI 框架
- **Vite 5.4.2**: 快速的開發構建工具
- **TypeScript 5.5.3**: 類型安全的 JavaScript 超集

### 樣式設計
- **Tailwind CSS 3.4.1**: 實用優先的 CSS 框架
- **Canopy Design System**: OakMega 自有設計系統
  - 色彩: \`oak.forest\`, \`oak.moss\`, \`oak.gold\`, \`oak.paper\`, \`oak.bark\`
  - 字體: Noto Sans CJK TC, Inter, Playfair Display
  - 圓角: \`rounded-soft\` (12px)
  - 陰影: \`shadow-glass\` 玻璃擬態效果

### 後端服務
- **Supabase 2.57.4**: 開源的 Firebase 替代方案
  - 身份驗證 (Authentication)
  - PostgreSQL 資料庫
  - 即時訂閱 (Realtime)
  - Row Level Security (RLS)

### UI 組件
- **Lucide React 0.344.0**: 美觀的開源圖標庫

### 開發工具
- **ESLint**: 代碼質量檢查
- **PostCSS**: CSS 處理工具
- **Autoprefixer**: 自動添加 CSS 前綴

## 專案結構

\`\`\`
social-crm/
├── src/
│   ├── components/           # React 組件
│   │   ├── common/          # 通用組件（EmptyState, Skeleton）
│   │   ├── games/           # 遊戲組件（轉盤、刮刮樂、老虎機）
│   │   ├── icons/           # 圖標組件
│   │   ├── layout/          # 布局組件（Navigation, Sidebar）
│   │   ├── oma/             # OMA 相關組件
│   │   ├── ui/              # UI 基礎組件
│   │   └── visualization/   # 數據可視化組件
│   ├── contexts/            # React Context（Auth, Navigation）
│   ├── hooks/               # 自定義 Hooks
│   ├── screens/             # 頁面組件
│   │   ├── ScreenDashboard.jsx
│   │   ├── ScreenLogin.jsx
│   │   ├── ScreenModuleHub.jsx
│   │   ├── ScreenModules.jsx
│   │   ├── ScreenOMA.jsx
│   │   ├── ScreenPlayground.jsx
│   │   └── ScreenRewards.jsx
│   ├── services/            # API 服務層
│   │   ├── authService.js
│   │   ├── couponService.js
│   │   ├── moduleService.js
│   │   ├── notificationService.js
│   │   ├── omaService.js
│   │   ├── supabaseClient.js
│   │   └── userService.js
│   ├── styles/              # 樣式文件
│   ├── utils/               # 工具函數
│   ├── App.jsx              # 主應用組件
│   ├── main.jsx             # 應用入口
│   └── index.css            # 全局樣式
├── supabase/
│   └── migrations/          # 資料庫遷移文件
├── index.html               # HTML 入口文件
├── package.json             # NPM 依賴配置
├── vite.config.ts           # Vite 配置
├── tailwind.config.js       # Tailwind 配置
├── tsconfig.json            # TypeScript 配置
└── README.md                # 專案說明文件
\`\`\`

## 環境需求

- Node.js 16.x 或更高版本
- npm 或 yarn 包管理器
- Supabase 帳號（用於後端服務）

## 安裝指南

### 1. 克隆專案

\`\`\`bash
git clone https://github.com/liboyin9087-jpg/social-crm.git
cd social-crm
\`\`\`

### 2. 安裝依賴

\`\`\`bash
npm install
\`\`\`

### 3. 環境配置

在專案根目錄創建 \`.env\` 文件：

\`\`\`env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
\`\`\`

**獲取 Supabase 憑證：**
1. 前往 [Supabase Dashboard](https://app.supabase.com/)
2. 選擇或創建專案
3. 進入 Settings > API
4. 複製 Project URL 和 anon/public key

### 4. 資料庫設置

執行 Supabase 遷移文件以創建必要的表和策略。可使用 Supabase CLI 或手動在 Dashboard 的 SQL Editor 中執行 \`supabase/migrations/\` 目錄下的 SQL 文件。

**資料庫架構包含：**
- \`users\`: 用戶基本資料
- \`coupons\`: 優惠券管理
- \`oma_events\`: OMA 追蹤事件
- \`notifications\`: 通知系統
- \`oakmega_modules\`: 模組管理
- \`user_modules\`: 用戶已安裝模組
- \`line_users\`: LINE 用戶資料
- \`admin_users\`: 管理員資料
- \`tags\` & \`user_tags\`: 標籤系統
- \`support_tickets\`: 客服票務
- \`chat_messages\`: 對話記錄

### 5. 啟動開發服務器

\`\`\`bash
npm run dev
\`\`\`

應用將在 \`http://localhost:5173\` 啟動

## 開發指南

### 可用指令

\`\`\`bash
# 開發模式（熱重載）
npm run dev

# 構建生產版本
npm run build

# 代碼檢查
npm run lint

# 類型檢查
npm run typecheck

# 預覽生產構建
npm run preview
\`\`\`

### 認證流程

系統使用 Supabase Auth 進行身份驗證：

\`\`\`javascript
import { useAuth } from './contexts/AuthContext';

function YourComponent() {
  const { user, signIn, signUp, signOut } = useAuth();
  
  // 使用認證功能
  await signIn(email, password);
  await signUp(email, password, displayName);
  await signOut();
}
\`\`\`

### 導航系統

使用 NavigationContext 進行頁面導航：

\`\`\`javascript
import { useNavigation } from './hooks/useNavigation';

function YourComponent() {
  const { push } = useNavigation();
  
  // 導航到其他頁面
  push('dashboard');  // 儀表板
  push('modules');    // 模組頁面
  push('oma');        // OMA 追蹤
  push('playground'); // 遊樂場
  push('rewards');    // 優惠券
}
\`\`\`

## 功能說明

### 1. 儀表板 (Dashboard)
- 即時統計數據展示
- 快速訪問各功能模組
- 近期活動和通知列表

### 2. 模組中心 (Module Hub & Modules)
- 瀏覽和安裝可用模組
- 管理已安裝模組
- 模組配置和設置

### 3. OMA 追蹤 (OakMega Analytics)
- 第三方 Cookie 替代方案
- 用戶行為軌跡追蹤
- 事件類型包含：QR 掃描、優惠券兌換、註冊、購買等
- 地理位置視覺化
- Root System Graph 樹狀結構視圖

### 4. 遊樂場 (Playground)
- **轉盤遊戲**: 可自定義獎品和機率
- **刮刮樂**: 即時互動刮獎體驗
- **老虎機**: 經典老虎機遊戲機制

### 5. 優惠券系統 (Rewards)
- 優惠券創建和管理
- 支持多種優惠類型（折扣、滿減、免運、贈品）
- 優惠券分發和追蹤
- 使用歷史記錄

## 故障排除

### 常見問題

**1. 環境變量未加載**
\`\`\`
錯誤: Missing Supabase environment variables
解決: 確認 .env 文件存在且包含正確的 VITE_SUPABASE_URL 和 VITE_SUPABASE_ANON_KEY
\`\`\`

**2. RLS 策略權限錯誤**
\`\`\`
錯誤: row-level security policy
解決: 確認已執行所有資料庫遷移文件，特別是 fix_rls_policies.sql
\`\`\`

**3. 登入失敗**
\`\`\`
錯誤: Invalid login credentials
解決: 系統會自動創建測試帳號，請稍後重試
\`\`\`

## 部署

### Vercel 部署（推薦）

1. 將專案推送到 GitHub
2. 在 [Vercel](https://vercel.com) 導入專案
3. 配置環境變量：
   - \`VITE_SUPABASE_URL\`
   - \`VITE_SUPABASE_ANON_KEY\`
4. 點擊部署

### 手動部署

\`\`\`bash
# 構建生產版本
npm run build

# dist 目錄包含靜態文件，可部署到任何靜態主機
\`\`\`

## 貢獻指南

歡迎貢獻！請遵循以下步驟：

1. Fork 本專案
2. 創建功能分支 (\`git checkout -b feature/AmazingFeature\`)
3. 提交更改 (\`git commit -m 'Add some AmazingFeature'\`)
4. 推送到分支 (\`git push origin feature/AmazingFeature\`)
5. 開啟 Pull Request

### 代碼規範

- 使用 ESLint 檢查代碼質量
- 遵循 React Hooks 最佳實踐
- 保持組件小而專注
- 添加必要的註釋和文檔

## 授權

本專案為私有專案，版權所有。

## 致謝

- [Supabase](https://supabase.com/) - 強大的後端服務
- [Vite](https://vitejs.dev/) - 極速的構建工具
- [Tailwind CSS](https://tailwindcss.com/) - 實用的 CSS 框架
- [Lucide Icons](https://lucide.dev/) - 美觀的圖標庫
- [React](https://react.dev/) - 優秀的 UI 框架

---

**Built with ❤️ by OakMega Team**
