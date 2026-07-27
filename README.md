# Dairy Farm - Modern Mobile-First Full-Stack Livestock & Financial Management App

A comprehensive full-stack web application designed for dairy farm owners and livestock managers. Built with a **Luminous Sky & Ice Blue design system**, ChatGPT/Gemini-style AI Assistant (Pashu Mitra AI), HttpOnly cookie security, dual Email/Phone authentication, instant auto-login, keyboard shortcuts, unified single navigation architecture, 13-disease clinical directory, local photo uploads, per-liter milk rate calculations, publisher marketplace controls, Kannada greeting popups, and district emergency veterinary directories.

---

## 🌟 Summary of Recent Enhancements & Features

### 1. 🎨 Luminous Sky & Ice Blue Aesthetic System
* **Premium Slate-Sky Theme**: Replaced dark midnight navy with a lighter slate-sky gradient (`#14243b`), high-translucency glass panels (`bg-slate-800/60`), and vibrant sky blue buttons/badges (`#38bdf8`).
* **Unified Single Navigation Architecture**: Removed duplicate horizontal tab bar clutter. Consolidated navigation into **ONE master desktop sidebar** and a smooth **slide-over mobile drawer**.

### 2. ⚡ Keyboard Auto-Login & Keyboard Shortcuts
* **Instant Auto-Login**: Automatically authenticates when valid email or 10-digit mobile number and password ($\ge 4$ characters) are entered.
* **`Enter` Key Auto-Submit**: Pressing `Enter` on physical or touch keyboards submits forms and clicks primary action buttons.
* **Modal Shortcuts**: `Enter` confirms modal dialogs (OK button) and `Escape` closes modals and popups.

### 3. 🩺 13-Disease Clinical Directory & In-Card Layout
* **Expanded Medical Library**: Includes Foot and Mouth Disease (FMD), Mastitis, Lumpy Skin Disease (LSD), Haemorrhagic Septicaemia (HS), Black Quarter (BQ), Milk Fever, Brucellosis, **Theileriosis (ಥೈಲೇರಿಯಾಸಿಸ್)**, **Protozoan Parasites (Babesiosis)**, **Roundworms**, **Hookworms**, **Tapeworms**, and **Fascioliasis / Liver Fluke (ಅಡಿಬಾವು)**.
* **Direct Component Layout**: Removed category filter restrictions to render full clinical sections (Symptoms, Internal Risks, Treatment/Prevention) directly inside each card component.
* **Interactive Visual Modals**: Tapping any card opens a high-res clinical image modal with integrated Emergency Vet Ambulance Speed-Dial (`1962 / 1964`).

### 4. 🤖 Pashu Mitra AI ChatBot (ChatGPT & Gemini Style Interface)
* **AI Advisor**: Smart AI Assistant trained on cattle health, Milk Fat & SNF enhancement, feed ratios, disease diagnosis, calf care, and farm profitability.
* **OpenRouter AI Integration**: Powered by OpenRouter AI backend endpoint (`POST /api/content/chat`) with automatic local fallback.
* **5 Daily Free Prompts Limit**: Tracks daily prompts per user account (stored in MongoDB User schema `dailyChatCount` & `lastChatDate`).
* **Voice Synthesis Toggle**: Text-to-speech option to listen to AI advice out loud.

### 5. 📱 Dual Email & Phone Number Authentication
* **Flexible Login**: Users can log in using either their **Email Address** OR **Mobile/Phone Number** (`POST /api/auth/login`).
* **Account Safeguard**: Checks for duplicate email or mobile number upon registration.

### 6. 🌸 Kannada Greeting Popups (Namaskara & Vandanegalu)
* **Login Welcome**: Prominent toast popup greeting farmers with **"ನಮಸ್ಕಾರ (Namaskara)! 🙏"** on logging in.
* **Logout Farewell**: Confirmation modal and toast popup displaying **"ವಂದನೆಗಳು (Vandanegalu)! 🙏"** when logging out.

### 7. 🔒 Enterprise-Grade Security & Production Hardening
* **HttpOnly Cookie Authentication**: JWT tokens are set as `HttpOnly` cookies (`Set-Cookie: token=xyz; HttpOnly; SameSite=Lax`), making session tokens 100% immune to XSS theft.
* **Helmet Security Headers**: Integrates `helmet` middleware to set protective HTTP headers against Clickjacking, MIME-sniffing, and XSS.
* **Rate Limiting Protection**: Configured `express-rate-limit` for login brute-force prevention (15 attempts/15 mins) and general API DDoS protection (300 requests/15 mins).
* **10MB Payload Limit**: Extended Express payload size limit (`express.json({ limit: "10mb" })`) to support local high-res animal photos.

### 8. 📸 Local Image Upload for Marketplace (Mobile & PC Storage)
* **Device Storage Upload**: Upload cow and buffalo photos directly from PC file explorer or mobile phone camera/gallery (`FileReader` Base64 Data URL).
* **Live Preview**: Instant thumbnail image preview with a remove option before publishing.

### 9. 🚑 Authentic District Emergency Helplines (30 Karnataka Districts)
* **Unique District Numbers**: STD-coded Veterinary Hospital Polyclinics and Animal Husbandry helplines across all 30 Karnataka districts (Shivamogga, Mysuru, Belagavi, Mangaluru, Davanagere, Udupi, etc.).

### 10. 💰 User-Editable Per-Liter Milk Rates in Finance Workspace
* **Custom Rates**: Editable Dairy Rate (₹/L) and Household Rate (₹/L) fields automatically compute monthly gross income, sold vs unsold milk breakdown, feed/vet expenses, and net profit.

---

## 🛠️ Technology Stack

* **Frontend**: React 18, Vite, Tailwind CSS, Lucide React Icons
* **Backend**: Node.js, Express.js, Helmet, Express-Rate-Limit, Cookie-Parser, OpenRouter AI API
* **Database**: MongoDB with Mongoose ODM
* **Auth & Security**: JWT with `HttpOnly` Cookies & bcryptjs password hashing (10 rounds)

---

## 📁 Repository Structure

```text
Dairyfarm/
├── README.md                  # Project overview & change log
├── PROJECT_INSTRUCTIONS.md    # Developer & LLM architecture guide
├── client/                    # Vite React Frontend
│   ├── public/
│   │   └── images/diseases/   # Medical diagnostic disease illustrations
│   └── src/
│       ├── components/        # UI components (AppShell, Toast, ConfirmationModal, etc.)
│       ├── data/              # Mock data and initial seeds
│       ├── api.js             # API request wrappers
│       ├── App.jsx            # Master state container & hash router
│       └── index.css          # Mobile design system & utility classes
└── server/                    # Node.js Express Backend
    └── src/
        ├── config/            # MongoDB connection
        ├── controllers/       # Auth, Farm, Animal, Finance, Marketplace, Content controllers
        ├── middleware/        # JWT requireAuth middleware
        ├── models/            # Mongoose schemas (User, FarmProfile, Cow, Buffalo, Finance, Marketplace, Disease, EmergencyContact)
        ├── routes/            # Express REST routes
        └── utils/             # JWT helper & seed data
```

---

## 🔌 API Endpoints Map

### Authentication
* `POST /api/auth/register` - Create new user account
* `POST /api/auth/login` - Authenticate user & receive JWT token
* `GET /api/auth/me` - Get current user profile (Protected)

### Farm Setup & Livestock Records
* `GET /api/farm` - Fetch herd setup counts (Protected)
* `PUT /api/farm` - Save cows and buffaloes planned counts (Protected)
* `GET /api/cows` & `PUT /api/cows/bulk` - Manage cow records (Protected)
* `GET /api/buffaloes` & `PUT /api/buffaloes/bulk` - Manage buffalo records (Protected)

### Financial Analytics
* `GET /api/finance` - Fetch monthly finance data (Protected)
* `PUT /api/finance` - Save milk sales, rates (₹/L), and expenses (Protected)

### Livestock Marketplace
* `GET /api/marketplace` - List public marketplace posts
* `POST /api/marketplace` - Publish new livestock listing (Protected)
* `PUT /api/marketplace/:id` - Edit listing (Owner only, Protected)
* `DELETE /api/marketplace/:id` - Delete listing (Owner only, Protected)

### Educational & Emergency Content
* `GET /api/content/diseases` - Disease guide entries
* `GET /api/content/emergency-contacts` - District veterinary helpline directory

---

## 🚀 How to Run Locally

### Prerequisites
* Node.js (v18 or higher)
* MongoDB (running locally or MongoDB Atlas connection URI)

### 1. Backend Setup
```bash
cd server
npm install
# Create .env file with MONGO_URI, PORT=8080, JWT_SECRET
npm run dev
```

### 2. Frontend Setup
```bash
cd client
npm install
npm run dev
```
Open **`http://localhost:5173/`** in your mobile browser or desktop browser to view the application!

---

## 🧪 Verification & Build Status
* **Client Build**: `npm run build` verified cleanly (0 errors).
* **API Server**: Running on `http://localhost:8080/`.
