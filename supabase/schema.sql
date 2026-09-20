-- ====================================
-- Pause for Love - Database Schema
-- ====================================

-- 1. Bookings Table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  service_type TEXT NOT NULL, -- 'discovery', 'individual', 'couple'
  format TEXT NOT NULL, -- 'in-person', 'online'
  preferred_date DATE,
  preferred_time TIME,
  status TEXT DEFAULT 'pending', -- 'pending', 'confirmed', 'cancelled', 'completed'
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Contact Inquiries Table
CREATE TABLE IF NOT EXISTS contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread', -- 'unread', 'read', 'replied'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Quiz Results Table
CREATE TABLE IF NOT EXISTS quiz_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  answers JSONB NOT NULL,
  recommended_service TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Services/Plans Table
CREATE TABLE IF NOT EXISTS services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  price TEXT NOT NULL,
  price_note TEXT,
  features JSONB,
  is_popular BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Settings Table (for admin to manage content)
CREATE TABLE IF NOT EXISTS settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  setting_key TEXT UNIQUE NOT NULL,
  setting_value TEXT,
  category TEXT DEFAULT 'general',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name TEXT NOT NULL,
  content TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  is_visible BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ====================================
-- Row Level Security (RLS)
-- ====================================

-- Enable RLS on all tables
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Admin can do everything (using service role key)
-- Public can only read active services and testimonials
CREATE POLICY "Public can view active services" ON services
  FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Public can view visible testimonials" ON testimonials
  FOR SELECT USING (is_visible = TRUE);

-- Anyone can insert bookings and contacts
CREATE POLICY "Anyone can create bookings" ON bookings
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can create contacts" ON contacts
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can create quiz results" ON quiz_results
  FOR INSERT WITH CHECK (true);

-- Allow anon read/write for admin credentials in settings
CREATE POLICY "Allow admin credentials access" ON settings
  FOR ALL USING (category = 'admin' OR setting_key IN ('admin_username', 'admin_password'))
  WITH CHECK (true);

-- ====================================
-- Insert Default Settings
-- ====================================

INSERT INTO settings (setting_key, setting_value, category) VALUES
('clinic_address', 'F10/12B, Second Floor, Independent Floors, Golf Course Road, DLF Phase 1, Gurgaon, Haryana 122002', 'location'),
('clinic_hours', 'Mon - Fri: 9:00 AM - 5:00 PM', 'location'),
('emergency_telemanas', '14416', 'emergency'),
('emergency_vandrewala', '+91 9999 666 555', 'emergency'),
('whatsapp_number', '+91XXXXXXXXXX', 'contact'),
('admin_email', 'admin@pauseforlove.com', 'contact')
ON CONFLICT (setting_key) DO NOTHING;

-- ====================================
-- Insert Default Services
-- ====================================

INSERT INTO services (title, subtitle, price, price_note, features, is_popular, sort_order) VALUES
('Discovery Call', 'For first-time clients seeking to understand the fit', 'FREE', '15-minute phone / Zoom consultation',
 '["Discuss your primary concerns and goals", "Understand Neha''s therapeutic methodology", "Ensure comfort before committing to therapy", "No financial commitment required"]'::jsonb,
 false, 1),

('Individual Therapy', 'Deep 1-on-1 healing, abuse recovery, and CBT', '₹2,200', 'per 60-minute session (Online or Clinic)',
 '["Full 60 minutes dedicated therapeutic holding", "Choice of Gurgaon Clinic or Encrypted Zoom", "Tailored narcissistic recovery & somatic tools", "Post-session journaling prompts & check-ins"]'::jsonb,
 true, 2),

('Couple & Family', 'Communication mediation and systemic healing', '₹3,200', 'per 60-minute joint session',
 '["Joint space for partners or family members", "De-escalation & active communication frameworks", "Impartial, safe moderation of difficult dialogues", "Practical homework between sessions"]'::jsonb,
 false, 3);
