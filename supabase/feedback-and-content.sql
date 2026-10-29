-- ====================================
-- Run this once in Supabase → SQL Editor
-- Adds: editable website content + client feedback
-- ====================================

-- Website content (one JSON row in `settings`, key = 'site_content')
DROP POLICY IF EXISTS "Public can read site content" ON settings;
CREATE POLICY "Public can read site content" ON settings
  FOR SELECT USING (category = 'content');

DROP POLICY IF EXISTS "Admin can write site content" ON settings;
CREATE POLICY "Admin can write site content" ON settings
  FOR ALL USING (category = 'content') WITH CHECK (category = 'content');

-- Client feedback (uses the existing `testimonials` table)
-- Visitors can submit feedback, but it stays hidden until approved.
DROP POLICY IF EXISTS "Anyone can submit feedback" ON testimonials;
CREATE POLICY "Anyone can submit feedback" ON testimonials
  FOR INSERT WITH CHECK (is_visible = FALSE);

-- Admin panel needs to see, approve, edit and delete all feedback.
-- (Matches how the rest of this admin panel talks to Supabase.)
DROP POLICY IF EXISTS "Admin can manage feedback" ON testimonials;
CREATE POLICY "Admin can manage feedback" ON testimonials
  FOR ALL USING (true) WITH CHECK (true);

-- Services: let the public site read active plans (already exists in schema.sql)
-- and let the admin panel edit them.
DROP POLICY IF EXISTS "Admin can manage services" ON services;
CREATE POLICY "Admin can manage services" ON services
  FOR ALL USING (true) WITH CHECK (true);
