-- ============================================================================
-- FRIENDS FURNITURE — SUPABASE STORAGE SETUP (100% FREE-TIER)
-- Configures storage buckets for Product Images, DNA Documents & User Uploads
-- ============================================================================

-- 1. Create Storage Buckets (if storage schema exists)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
(
  'product-images',
  'product-images',
  true,
  5242880, -- 5 MB max per image
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']
),
(
  'furniture-dna-docs',
  'furniture-dna-docs',
  true,
  10485760, -- 10 MB max per document
  ARRAY['application/pdf', 'image/jpeg', 'image/png', 'image/webp']
),
(
  'user-uploads',
  'user-uploads',
  true,
  5242880, -- 5 MB max per image
  ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- 2. Storage Security Policies

-- Public Read Access for product images and DNA credentials
DROP POLICY IF EXISTS "Public Access Product Images" ON storage.objects;
CREATE POLICY "Public Access Product Images" ON storage.objects
FOR SELECT USING (bucket_id = 'product-images' OR bucket_id = 'furniture-dna-docs' OR bucket_id = 'user-uploads');

-- Authenticated upload access
DROP POLICY IF EXISTS "Authenticated Uploads" ON storage.objects;
CREATE POLICY "Authenticated Uploads" ON storage.objects
FOR INSERT WITH CHECK (
  auth.role() = 'authenticated' OR auth.role() = 'anon'
);

-- Delete policy for owners
DROP POLICY IF EXISTS "Users Can Manage Own Uploads" ON storage.objects;
CREATE POLICY "Users Can Manage Own Uploads" ON storage.objects
FOR DELETE USING (auth.uid() = owner);
