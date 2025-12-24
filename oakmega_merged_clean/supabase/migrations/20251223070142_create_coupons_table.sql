/*
  # Create coupons table

  1. New Tables
    - `coupons`
      - `id` (uuid, primary key)
      - `code` (text, unique)
      - `title` (text)
      - `description` (text)
      - `type` (text: percentage, fixed, freebie, shipping)
      - `value` (numeric)
      - `min_purchase` (numeric)
      - `color_scheme` (text)
      - `status` (text: active, used, expired)
      - `user_id` (uuid, foreign key)
      - `expires_at` (timestamp)
      - `used_at` (timestamp, nullable)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `coupons` table
    - Add policy for users to view their own coupons
    - Add policy for users to claim coupons
*/

CREATE TABLE IF NOT EXISTS coupons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  type text NOT NULL,
  value numeric NOT NULL,
  min_purchase numeric DEFAULT 0,
  color_scheme text DEFAULT 'purple',
  status text DEFAULT 'active',
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  expires_at timestamptz NOT NULL,
  used_at timestamptz,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their coupons"
  ON coupons FOR SELECT
  TO authenticated
  USING (user_id = auth.uid() OR user_id IS NULL);

CREATE POLICY "Users can update their coupons"
  ON coupons FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());
