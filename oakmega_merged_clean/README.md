# OakMega Social CRM – Canopy Design System & Data Schema

This project aligns OakMega’s Social CRM experience with the **Canopy (樹冠層)** design system and supporting Supabase schema for tagging and service workflows.

## Design System Highlights
- **Colors**: `oak.forest` (#2F3A25), `oak.moss` (#6A6C51), `oak.gold` (#D8B589), `oak.paper` (#F9F9F7), `oak.bark` (#4A4A4A).
- **Typography**: `"Noto Sans CJK TC"` for CJK content with `Inter`/`system-ui` fallbacks; `Playfair Display` for display headlines.
- **Components**: `rounded-soft` (12px) radii, `shadow-glass` for glassmorphism, and `animate-grow` micro-interaction.
- **Usage**: Example button — `<button class="bg-oak-forest text-oak-gold rounded-soft hover:-translate-y-0.5 transition-transform">CTA</button>`.

## Product Experience Focus
### 2.1 Member Journey (Node-based editor)
- Infinite canvas with drag-and-drop triggers/actions, multi-branch condition shunting, delays/scheduling, and inline A/B test metrics on each node.

### 2.2 Service Center (Ticketing)
- Three-column layout: filtered conversation list, chat with whisper (internal notes), and right-rail customer profile with OMA traces, purchases, and tags.
- RBAC ready: agents see assigned tickets; supervisors see global dashboards and can reassign.

### 2.3 Module Marketplace
- App-store-like catalog for installing gamification (slots/roulette/scratchers with brand assets), MGM growth modules, and probability/inventory controls.

### 2.4 Broadcast & Tags
- Time-based tags with TTL and intensity tags (counts) for precision segmentation (e.g., clicks > 3).

### OMA (OakMega Analytics)
- Link wrapping + identity fingerprinting to bind LINE UID with first-party data. Mandates using wrapped links/QRs, taxonomy strategy (interest/intent/lifecycle), and activation plays (cart recovery, retargeting, LTV insights).

## Supabase Schema Additions
Located in `supabase/migrations/20251224072850_create_tag_and_support_tables.sql`:
- `line_users`: LINE identities.
- `admin_users`: agents (for assignment).
- `tags`, `user_tags`: taxonomy with intensity, expiry support.
- `support_tickets`: ticket lifecycle with status/priority and updated_at trigger.
- `chat_messages`: conversations (user/agent/bot, whisper flag) cascading with tickets.

## Development
```bash
npm install
npm run build
```

Tailwind tokens are defined in `tailwind.config.js`; migrations reside under `supabase/migrations/`.
