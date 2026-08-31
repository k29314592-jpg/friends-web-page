# 👑 FRIENDS FURNITURE — Luxury Smart Furniture Platform (100% Free-Tier Stack)

> *“Where Luxury Meets Comfort. Furniture For Friends. Comfort For Life.”*

A multi-role luxury furniture e-commerce, digital twin telemetry, supply chain provenance, and spatial interior design platform engineered to run at **₹0 monthly infrastructure cost** using generous student/demo free tiers.

---

## 🏛️ 1. Architecture Overview (₹0 / Month Free-Tier Stack)

This project runs 100% free with zero paid API subscriptions:

| Service / Layer | Technology | Free-Tier Plan Limits | Cost / Month |
| :--- | :--- | :--- | :--- |
| **Frontend Hosting** | **Vercel Hobby** or **Cloudflare Pages** | 100 GB Bandwidth, Global Edge CDN, Free SSL, Unlimited Previews | **₹0** |
| **Backend & Database** | **Supabase Free Tier** | 500 MB PostgreSQL, Instant REST & Realtime APIs, 500k Edge Invocations | **₹0** |
| **Authentication** | **Supabase Auth (RBAC)** | Up to 50,000 Monthly Active Users (MAU), Social & Email Logins | **₹0** |
| **Asset Storage** | **Supabase Storage** | 1 GB File/Image Storage, 2 GB Download Bandwidth | **₹0** |
| **Interactive Maps** | **OpenStreetMap + Leaflet.js** | 100% Free Open-Source Tiles, Zero API Keys, Unlimited Free Map Loads | **₹0** |
| **Icon Library** | **Lucide Icons** | Free Open-Source SVG Icons, Zero Subscription | **₹0** |
| **Traffic Analytics** | **Google Analytics 4 (gtag.js)** | Free Tier (Up to 10M events/month), Zero Cost | **₹0** |
| **AI Recommendations & ETA** | **Modular Rule-Based AI Engine** | Zero API calls; in-browser deterministic spatial & logistics intelligence | **₹0** |
| **Image Compression** | **HTML5 Canvas Compressor** | In-browser WebP/JPEG optimizer before upload, saving up to 85% bandwidth | **₹0** |

---

## 🚀 2. How to Run Locally

You can launch and test the entire Friends Furniture platform locally in seconds using any of these zero-install methods:

### Option A: Built-in PowerShell Server (Windows)
Double-click `server.ps1` or run:
```powershell
powershell -ExecutionPolicy Bypass -File .\server.ps1
```
Open [http://localhost:8080](http://localhost:8080) in your browser.

### Option B: Node / NPX Serve
```bash
npx serve . -p 8080
```

### Option C: Python Simple HTTP Server
```bash
python -m http.server 8080
```

### Option D: VS Code Live Server
Right-click `index.html` in VS Code and select **"Open with Live Server"**.

> **Note:** The website has built-in **Dual-Mode Capability**:
> 1. **Connected Supabase Mode**: Automatically queries your live PostgreSQL database and auth when configured.
> 2. **Standalone Demo Mode**: If no Supabase credentials are configured, the site runs using the built-in rich mock datasets and LocalStorage.

---

## 🗄️ 3. How to Set Up the Supabase Project (Step-by-Step)

Follow these steps to create your free Supabase backend:

### Step 1: Create a Free Supabase Account
1. Go to [https://supabase.com](https://supabase.com) and click **"Start your project"** (Free Tier).
2. Click **"New Project"**.
3. Choose a name (e.g. `friends-furniture-db`), create a secure database password, and choose your nearest region (e.g., `South Asia (Mumbai)`).

### Step 2: Run Database Schema SQL
1. In your Supabase Dashboard, open the **SQL Editor** from the left sidebar.
2. Open [`supabase/schema.sql`](supabase/schema.sql) in this repository, copy its contents, paste into the Supabase SQL editor, and click **"Run"**.
3. This creates all 16 required tables:
   - `profiles` / `users` (with Customer, Admin, Supplier, Showroom, Butler roles)
   - `categories`
   - `suppliers`
   - `products`
   - `inventory`
   - `orders`
   - `order_items`
   - `payments`
   - `coupons`
   - `rewards`
   - `reviews`
   - `delivery_tracking`
   - `notifications`
   - `furniture_dna` (Digital Life Passports)
   - `furniture_twins` (Digital Twins)
   - `supplier_trust_scores`
   - Plus automated triggers, indexes, and Row Level Security (RLS) policies.

### Step 3: Run Database Seed SQL
1. In the Supabase SQL Editor, open [`supabase/seed.sql`](supabase/seed.sql), paste the content, and click **"Run"**.
2. This populates sample luxury products, Nilambur teak suppliers, digital twins, orders, coupons, and delivery routes.

### Step 4: Run Storage Setup SQL
1. In the Supabase SQL Editor, open [`supabase/storage_setup.sql`](supabase/storage_setup.sql), paste the content, and click **"Run"**.
2. This creates 3 public storage buckets:
   - `product-images`
   - `furniture-dna-docs`
   - `user-uploads`

---

## 🔐 4. Required Environment Variables

### Frontend Configuration (`config.js`)
Copy your public credentials from **Supabase Dashboard $\to$ Project Settings $\to$ API** and update [`config.js`](config.js):

```javascript
window.FF_CONFIG = {
  supabase: {
    url: "https://YOUR_PROJECT_ID.supabase.co",
    anonKey: "YOUR_SUPABASE_ANON_PUBLIC_KEY"
  },
  googleAnalytics: {
    measurementId: "G-XXXXXXXXXX" // Optional
  }
};
```

> ⚠️ **SECURITY CRITICAL**:
> - Only put the **`anon` (public)** key in `config.js`.
> - **NEVER** expose the `service_role` secret key in frontend code or Git!
> - Supabase Row Level Security (RLS) policies automatically protect user data.

---

## ☁️ 5. How to Deploy to Vercel (Free in 2 Minutes)

### Method A: Deploy via GitHub (Recommended)
1. Push this repository to GitHub.
2. Go to [https://vercel.com](https://vercel.com) and log in with GitHub.
3. Click **"Add New" $\to$ "Project"** and import your `friends-furniture` repo.
4. Framework Preset: Choose **"Other"** (Plain Static HTML/JS).
5. Click **"Deploy"**.
6. Your luxury website is live worldwide with global CDN, free automatic HTTPS/SSL, and caching headers from `vercel.json`!

### Method B: Deploy via Vercel CLI
```bash
npm install -g vercel
vercel
```

---

## 🛡️ 6. Free-Tier vs. Scale Breakdown

### What is 100% Free Forever ($0 / month)
For students, demo showcases, portfolios, and small-to-medium traffic:
- **Hosting**: 100 GB/month bandwidth on Vercel is sufficient for ~50,000+ monthly visits.
- **Database**: 500 MB on Supabase accommodates ~100,000+ furniture records and order transactions.
- **Authentication**: 50,000 monthly active users on Supabase Auth.
- **Storage**: 1 GB free file storage with client-side WebP compression holds ~6,000+ high-definition product images.
- **Maps**: OpenStreetMap + Leaflet has unlimited free map visualization.
- **AI**: Built-in deterministic rule-based AI uses zero paid API tokens.

### What Features May Require Payment When Usage Grows
If the platform scales to a massive commercial enterprise with millions of users:

| Resource / Feature | Free Limit | When Paid Plan Needed | How to Stay Free |
| :--- | :--- | :--- | :--- |
| **Supabase Database Size** | 500 MB | $> 100,000$ active orders | Archive old completed order logs to cold JSON storage |
| **Supabase Storage** | 1 GB | $> 8,000$ user-uploaded images | Client-side compression automatically reduces photos from 5MB to ~150KB |
| **Vercel Bandwidth** | 100 GB / month | $> 100,000$ monthly visitors | Enable Cloudflare free CDN proxy in front of Vercel |
| **LLM Cloud AI** | $0 (Rule-Based) | Transitioning to live GPT-4 / Claude API | Use Google Gemini 1.5 Flash Free Tier (15 RPM free) |

---

## 👑 7. Multi-Role Demo Credentials

| Role | Email | Password | Dedicated Portal |
| :--- | :--- | :--- | :--- |
| **VIP Customer** | `hari.maharaja@friendsfurniture.com` | `demo123` | [`customer-dashboard.html`](customer-dashboard.html) |
| **Master Admin** | `master.artisan@friendsfurniture.com` | `guildMaster2026` | [`admin-passport.html`](admin-passport.html) |
| **Teak Supplier** | `nilambur.teakguild@friendsfurniture.com` | `guildSecret123` | [`supplier-login.html`](supplier-login.html) |
| **Showroom Owner** | `hyderabad.showroom@friendsfurniture.com` | `showroomSecret2026` | [`smart-studio.html`](smart-studio.html) |
| **White-Glove Butler** | `dispatch.butler@friendsfurniture.com` | `butlerSecret123` | [`butler-login.html`](butler-login.html) |

---

## 📄 License & Heritage
© 2026 Friends Furniture Royal Atelier. Built with precision for sustainable luxury and cryptographic digital twins.
