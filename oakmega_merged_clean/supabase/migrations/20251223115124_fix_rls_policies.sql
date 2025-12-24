/*
  # 修复 RLS 策略完整性

  1. 修复内容
    - 为 users 表添加 INSERT 策略，允许用户创建自己的 profile
    - 为 coupons 表添加 INSERT 策略，允许用户创建优惠券
    - 为 coupons 表添加"领取"策略，允许用户领取未被领取的优惠券
    - 为所有表添加必要的访问策略

  2. 安全性
    - 确保用户只能创建和管理自己的数据
    - 允许用户领取公开的优惠券（user_id 为 NULL 的券）
    - 保持严格的行级安全控制
*/

-- users 表：允许认证用户创建自己的 profile
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'users' 
    AND policyname = 'Users can insert own profile'
  ) THEN
    CREATE POLICY "Users can insert own profile"
    ON users
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = id);
  END IF;
END $$;

-- coupons 表：允许认证用户创建自己的优惠券
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'coupons' 
    AND policyname = 'Users can insert own coupons'
  ) THEN
    CREATE POLICY "Users can insert own coupons"
    ON coupons
    FOR INSERT
    TO authenticated
    WITH CHECK (user_id = auth.uid());
  END IF;
END $$;

-- coupons 表：允许认证用户领取未被领取的优惠券
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'coupons' 
    AND policyname = 'Users can claim unclaimed coupons'
  ) THEN
    CREATE POLICY "Users can claim unclaimed coupons"
    ON coupons
    FOR UPDATE
    TO authenticated
    USING (user_id IS NULL)
    WITH CHECK (user_id = auth.uid());
  END IF;
END $$;

-- notifications 表：允许认证用户创建自己的通知
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'notifications' 
    AND policyname = 'Users can insert own notifications'
  ) THEN
    CREATE POLICY "Users can insert own notifications"
    ON notifications
    FOR INSERT
    TO authenticated
    WITH CHECK (user_id = auth.uid());
  END IF;
END $$;

-- oma_events 表：允许认证用户创建自己的追踪事件
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'oma_events' 
    AND policyname = 'Users can insert own events'
  ) THEN
    CREATE POLICY "Users can insert own events"
    ON oma_events
    FOR INSERT
    TO authenticated
    WITH CHECK (user_id = auth.uid());
  END IF;
END $$;
