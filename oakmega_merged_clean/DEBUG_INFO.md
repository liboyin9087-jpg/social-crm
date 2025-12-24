# 调试和连接问题排查指南

## 已完成的修复

### 1. RLS 策略修复
已添加完整的 Row Level Security 策略：
- `users` 表：添加 INSERT 策略，允许用户创建自己的 profile
- `coupons` 表：添加 INSERT 和"领取"策略
- `notifications` 表：添加 INSERT 策略
- `oma_events` 表：添加 INSERT 策略

### 2. 项目清理
已删除所有重复和无用的文件：
- 删除所有 `copy` 文件
- 删除旧版的 screen 文件
- 删除未使用的组件文件

### 3. 界面优化
- 重新设计主页，使用简洁的蓝色主题
- 优化导航栏，使用固定底部导航
- 整合所有功能页面到统一的导航系统

### 4. 导航系统修复（最新）
修复了导航不响应的问题：
- 统一使用 NavigationContext 的 `push` 方法
- 修复 `currentScreen` 对象和字符串的类型不匹配问题
- 所有页面按钮现在都使用统一的导航系统
- 底部导航栏正确显示激活状态

## 如何排查连接问题

### 步骤 1：检查浏览器控制台
1. 打开浏览器（Chrome/Firefox/Safari）
2. 按 F12 打开开发者工具
3. 切换到 Console 标签
4. 登录后尝试访问各个功能
5. 查看是否有红色错误信息

### 步骤 2：查看错误类型

#### 错误 A：`Missing Supabase environment variables`
**原因**：环境变量未正确加载
**解决方案**：
1. 确认 `.env` 文件存在且包含：
   - VITE_SUPABASE_URL
   - VITE_SUPABASE_ANON_KEY
2. 重启开发服务器：`npm run dev`

#### 错误 B：`row-level security policy` 或 `permission denied`
**原因**：RLS 策略限制访问
**解决方案**：
1. 数据库迁移已自动修复此问题
2. 如果仍有问题，检查用户是否已登录
3. 确认 Supabase 项目已应用最新的 migration

#### 错误 C：`Failed to fetch` 或网络错误
**原因**：网络连接或 Supabase 服务问题
**解决方案**：
1. 检查网络连接
2. 访问 Supabase Dashboard 确认项目状态
3. 检查 Supabase URL 是否正确

### 步骤 3：使用测试工具
应用内置了数据库连接测试工具：
1. 登录后如果出现错误页面
2. 点击"測試數據庫連接"按钮
3. 查看测试结果，识别具体问题

## 功能说明

### 主页功能
- 显示用户信息和统计数据
- 快速访问四个主要功能：
  - 模组中心：管理 OakMega 模块
  - 遊樂場：互动游戏功能
  - OMA 追蹤：用户行为追踪
  - 優惠券：优惠券管理

### 底部导航
- 首頁：返回主页
- 模組：访问模块中心
- OMA：访问 OMA 追踪
- 優惠：访问优惠券页面

## 已知限制

1. 用户必须登录后才能访问功能页面
2. RLS 策略要求所有操作都需要认证
3. 某些功能需要用户在数据库中有对应的记录

## 技术支持

如果问题仍然存在：
1. 检查浏览器控制台的完整错误信息
2. 检查 Supabase Dashboard 的日志
3. 确认所有 migrations 已成功应用
