/*
  # Create OMA events table

  1. New Tables
    - `oma_events`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `action_type` (text: qr_scan, coupon_redeem, signup, purchase, checkin)
      - `location_name` (text)
      - `location_id` (text, nullable)
      - `coordinates` (json: {lat, lng})
      - `metadata` (json, nullable)
      - `timestamp` (timestamp)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `oma_events` table
    - Add policy for admins to read all events
    - Add policy for users to read their own events
*/

CREATE TABLE IF NOT EXISTS oma_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  action_type text NOT NULL,
  location_name text NOT NULL,
  location_id text,
  coordinates jsonb DEFAULT '{"lat": 0, "lng": 0}'::jsonb,
  metadata jsonb,
  timestamp timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_oma_events_user_id ON oma_events(user_id);
CREATE INDEX idx_oma_events_timestamp ON oma_events(timestamp DESC);

ALTER TABLE oma_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own events"
  ON oma_events FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());
