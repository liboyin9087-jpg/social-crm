/*
  # Tag system and service center tables

  1. New Tables
    - `line_users` base table for LINE identities
    - `admin_users` lightweight agent directory
    - `tags` taxonomy definitions with optional TTL
    - `user_tags` many-to-many relations with intensity tracking
    - `support_tickets` customer service tickets with status/priority
    - `chat_messages` conversation records, including whispers
*/

-- Base LINE user table to satisfy foreign keys for service/tag features
CREATE TABLE IF NOT EXISTS line_users (
  id serial PRIMARY KEY,
  line_user_uid text NOT NULL UNIQUE,
  display_name text,
  created_at timestamptz DEFAULT now()
);

-- Optional admin directory to support agent assignment
CREATE TABLE IF NOT EXISTS admin_users (
  id serial PRIMARY KEY,
  email text UNIQUE,
  display_name text,
  created_at timestamptz DEFAULT now()
);

-- 1. Tag definitions
CREATE TABLE IF NOT EXISTS tags (
  id serial PRIMARY KEY,
  name varchar(50) NOT NULL,
  category varchar(50),
  ttl_days int DEFAULT NULL,
  created_at timestamptz DEFAULT now()
);

-- 2. User-tag relations with intensity tracking
CREATE TABLE IF NOT EXISTS user_tags (
  id bigserial PRIMARY KEY,
  line_user_id int NOT NULL REFERENCES line_users(id) ON DELETE CASCADE,
  tag_id int NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  intensity_count int DEFAULT 1,
  expires_at timestamptz,
  last_tagged_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_user_tags_line_user ON user_tags(line_user_id);
CREATE INDEX IF NOT EXISTS idx_user_tags_tag ON user_tags(tag_id);

-- 3. Support ticket table
CREATE TABLE IF NOT EXISTS support_tickets (
  id serial PRIMARY KEY,
  ticket_number varchar(20) NOT NULL UNIQUE,
  line_user_id int NOT NULL REFERENCES line_users(id) ON DELETE CASCADE,
  assigned_agent_id int REFERENCES admin_users(id),
  status text DEFAULT 'open' CHECK (status IN ('open', 'pending', 'resolved', 'closed')),
  priority text DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  internal_note text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Maintain updated_at to mirror MySQL ON UPDATE behavior
CREATE OR REPLACE FUNCTION set_support_tickets_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'trg_support_tickets_updated_at'
  ) THEN
    CREATE TRIGGER trg_support_tickets_updated_at
    BEFORE UPDATE ON support_tickets
    FOR EACH ROW EXECUTE FUNCTION set_support_tickets_updated_at();
  END IF;
END;
$$;

-- 4. Conversation records
CREATE TABLE IF NOT EXISTS chat_messages (
  id bigserial PRIMARY KEY,
  ticket_id int REFERENCES support_tickets(id) ON DELETE SET NULL,
  sender_type text NOT NULL CHECK (sender_type IN ('user', 'agent', 'bot')),
  message_type text NOT NULL CHECK (message_type IN ('text', 'image', 'sticker', 'template')),
  content text,
  is_whisper boolean DEFAULT FALSE,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_chat_messages_ticket ON chat_messages(ticket_id);
