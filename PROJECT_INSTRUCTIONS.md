# Dairy Farm Project Instructions

## Purpose
This document is the working instruction guide for any LLM, developer, or debugging agent that touches this project.

Use it to understand:
- what the app does
- which files are currently active
- which files are legacy or unused
- how frontend and backend data flow works
- what to check first when debugging

## Project Summary
This is a full-stack Dairy Farm and Livestock Management web application.

Core capabilities:
- Luminous Sky & Ice Blue theme with unified single desktop sidebar & mobile drawer navigation
- dual Email or Mobile Number authentication with automatic login on valid credentials
- keyboard shortcuts (`Enter` to submit/confirm, `Escape` to close popups)
- separate farm setup for cows and buffaloes
- dynamic livestock record entry based on entered herd count
- finance analytics with custom per-liter milk pricing
- authentic 30-district emergency veterinary helpline directory
- comprehensive 13-disease clinical directory (FMD, Mastitis, LSD, HS, BQ, Milk Fever, Brucellosis, Theileriosis, Protozoan blood parasites, Roundworms, Hookworms, Tapeworms, and Fascioliasis)
- public livestock marketplace with local photo uploads
- Pashu Mitra AI Assistant with 5 daily free prompts per user limit

## Tech Stack & Security
- Frontend: React 18 + Vite + Tailwind CSS (Luminous Sky & Ice Blue design system)
- Backend: Node.js + Express + Helmet + Express-Rate-Limit + Cookie-Parser
- Database: MongoDB with Mongoose ODM
- Auth & Security: JWT with `HttpOnly` Cookies & bcryptjs password hashing (10 rounds)
- AI Advisor: OpenRouter AI API (`POST /api/content/chat`) with 5 free daily chats/user limit

## Folder Structure

### Frontend
Path: `client/src`

Important live files:
- `App.jsx`
- `api.js`
- `components/AppShell.jsx`
- `components/LoginPage.jsx`
- `components/SetupPage.jsx`
- `components/CowsPage.jsx`
- `components/BuffaloPage.jsx`
- `components/FinanceWorkspace.jsx`
- `components/MarketplaceHub.jsx`
- `components/EmergencyPage.jsx`
- `components/DiseasesPage.jsx`
- `components/ChatBot.jsx`
- `components/AnimalRecordCard.jsx`
- `components/FormField.jsx`
- `components/PageIntro.jsx`
- `components/StatTile.jsx`
- `components/ConfirmationModal.jsx`
- `components/Toast.jsx`
- `data/mockData.js`

### Backend
Path: `server/src`

Important live files:
- `index.js` (Configures Helmet, Rate-Limiters, Cookie-Parser, 10MB payload limit)
- `config/db.js`
- `middleware/authMiddleware.js` (Extracts JWT from HttpOnly cookie or Bearer header)
- `controllers/authController.js` (Handles dual Email/Phone login & sets HttpOnly cookie)
- `controllers/farmController.js`
- `controllers/animalController.js`
- `controllers/financeController.js`
- `controllers/marketplaceController.js` (Handles photo listings & owner checks)
- `controllers/contentController.js` (Handles diseases, 30 district vet emergency contacts, and AI ChatBot)
- `routes/authRoutes.js`
- `routes/farmRoutes.js`
- `routes/animalRoutes.js`
- `routes/financeRoutes.js`
- `routes/marketplaceRoutes.js`
- `routes/contentRoutes.js`
- `models/User.js` (Stores dailyChatCount, lastChatDate, mobileNumber, email)
- `models/FarmProfile.js`
- `models/Cow.js`
- `models/Buffalo.js`
- `models/FinancialRecord.js`
- `models/MarketplaceListing.js`
- `models/Disease.js`
- `models/EmergencyContact.js`
- `utils/jwt.js`
- `utils/seedData.js` (Contains 30 authentic Karnataka district veterinary helpline numbers)

## Legacy Or Unused Files
These files may still exist, but they are not the main active UI flow anymore:
- `components/AuthSection.jsx`
- `components/FinancialCalculator.jsx`
- `components/FinancePage.jsx`
- `components/MarketplacePage.jsx`
- `components/MarketplaceForm.jsx`
- `components/LivestockInventory.jsx`
- `components/EmergencyDirectory.jsx`
- `components/DiseaseGuide.jsx`

Instruction:
- do not extend these legacy components unless the active components are intentionally being replaced
- prefer `FinanceWorkspace.jsx` over `FinancePage.jsx`
- prefer `MarketplaceHub.jsx` over `MarketplacePage.jsx`

## Frontend Architecture

### Entry Flow
The main app entry is `client/src/App.jsx`.

Flow:
1. User lands on login/register screen (Supports Email OR Mobile Number login).
2. After successful auth, server sets `HttpOnly` token cookie + returns token.
3. App displays Kannada greeting popup (**"ನಮಸ್ಕಾರ (Namaskara)! 🙏"**).
4. App bootstraps data from backend.
5. App shows routed dashboard pages using hash-based navigation (`#`, `/cows`, `/buffaloes`, `/finance`, `/marketplace`, `/emergency`, `/diseases`, `/chatbot`).

### Page Navigation
Navigation is handled in `App.jsx` using `window.location.hash`.

Current page keys:
- `setup`
- `cows`
- `buffaloes`
- `finance`
- `marketplace`
- `emergency`
- `diseases`
- `chatbot`

### State Ownership
`App.jsx` is the main state owner for:
- auth token
- logged-in user
- herd setup
- cow records
- buffalo records
- finance record
- marketplace listings
- emergency contacts
- disease data

Instruction:
- if a bug affects multiple pages, inspect `App.jsx` first
- avoid moving global data ownership into many child components unless clearly necessary

## Dynamic Herd Rule
The number of cow and buffalo detail cards must match the counts entered in setup.

Current behavior:
- herd counts are entered in `SetupPage.jsx`
- `App.jsx` syncs animal draft arrays based on those counts
- animal forms are rendered dynamically in `CowsPage.jsx` and `BuffaloPage.jsx`

Important rule:
- if user enters `8` cows, UI should show `8` cow detail cards
- if user enters `10` buffaloes, UI should show `10` buffalo detail cards
- reducing the count should reduce visible cards to the new count

If debugging this:
- inspect `syncAnimalDrafts()` in `App.jsx`
- inspect `herdSetup.cowsCount`
- inspect `herdSetup.buffaloesCount`

## AI Assistant (Pashu Mitra AI & 5-Chat Daily Limit)
- Located at `components/ChatBot.jsx`.
- Endpoint: `POST /api/content/chat` (Protected by JWT).
- OpenRouter API integration in `contentController.js`.
- Enforces max **5 free chats per day per account** tracked via `User.dailyChatCount` and `User.lastChatDate`.
- Local fallback knowledge engine available if OpenRouter key is omitted or network drops.

## Marketplace Logic
Marketplace is public-facing inside the app.

Requirements:
- seller can post cow or buffalo
- listing includes local device photo upload (`FileReader` Data URL) or image URL
- buyer can view image, price, age, teeth count, mobile, seller name, description

Current frontend file:
- `components/MarketplaceHub.jsx`

Current backend file:
- `models/MarketplaceListing.js`

## Backend API Map

### Auth
- `POST /api/auth/register` (Email or Mobile registration)
- `POST /api/auth/login` (Email or Mobile login, sets HttpOnly cookie)
- `POST /api/auth/logout` (Clears HttpOnly cookie)
- `GET /api/auth/me` (Protected)

### Farm
- `GET /api/farm`
- `PUT /api/farm`

### Cows
- `GET /api/cows`
- `POST /api/cows`
- `PUT /api/cows/bulk`
- `PUT /api/cows/:id`
- `DELETE /api/cows/:id`

### Buffaloes
- `GET /api/buffaloes`
- `POST /api/buffaloes`
- `PUT /api/buffaloes/bulk`
- `PUT /api/buffaloes/:id`
- `DELETE /api/buffaloes/:id`

### Finance
- `GET /api/finance`
- `PUT /api/finance`

### Marketplace
- `GET /api/marketplace`
- `POST /api/marketplace` (Supports up to 10MB payload for photo uploads)
- `PUT /api/marketplace/:id`
- `DELETE /api/marketplace/:id`

### Content & AI
- `GET /api/content/diseases`
- `GET /api/content/emergency-contacts` (30 Karnataka district veterinary helplines)
- `POST /api/content/chat` (AI ChatBot endpoint with 5 daily limit per account)

## Environment Requirements
Use `server/.env`.

Required variables:
- `MONGO_URI`
- `PORT`
- `CLIENT_URL`
- `JWT_SECRET`
- `OPENROUTER_API_KEY`

Template file:
- `server/.env.example`

## Common Debugging Checklist

### If login fails
Check:
- `server/.env`
- JWT secret exists
- MongoDB is connected
- `POST /api/auth/login` response
- browser localStorage for stored token

### If protected pages are blank
Check:
- token exists in localStorage
- `api.js` is sending `Authorization: Bearer <token>`
- `/api/auth/me` works
- app bootstrap in `App.jsx`

### If cows or buffaloes are not saving
Check:
- frontend payload from `handleSaveAnimals()` in `App.jsx`
- backend route `PUT /api/cows/bulk` or `PUT /api/buffaloes/bulk`
- `animalController.js`
- model schema owner field

### If herd count and cards do not match
Check:
- setup values saved in `/api/farm`
- `syncAnimalDrafts()` in `App.jsx`
- `CowsPage.jsx` and `BuffaloPage.jsx` rendering arrays correctly

### If finance totals look wrong
Check:
- milk yield values in cow and buffalo records
- finance form values
- analytics calculation in `FinanceWorkspace.jsx`
- backend `FinancialRecord` schema if storage changed

### If marketplace cards do not show image
Check:
- `imageUrl` exists in listing payload
- `imageUrl` exists in MongoDB document
- fallback image logic in `MarketplaceHub.jsx`

## Change Safety Rules For Any LLM
- Do not rewrite the whole app when fixing one page.
- Prefer updating active files only.
- Keep `App.jsx` as the global orchestration layer unless there is a strong architectural reason to refactor.
- Keep cows and buffaloes separate in both UI and backend.
- Keep emergency and disease content readable even if backend seed logic changes.
- When changing data shape, update:
  - frontend form state
  - frontend API request
  - backend model
  - backend controller
  - any bootstrap mapping in `App.jsx`

## Recommended Workflow For Another LLM
1. Read this file first.
2. Identify whether the issue is frontend, backend, data-model, or environment.
3. Inspect only the active files related to that feature.
4. Avoid changing legacy components unless they are explicitly reintroduced.
5. After changes, verify:
   - frontend build
   - server startup
   - affected API route
   - affected UI flow

## Suggested Prompt For Another LLM
Use this prompt:

```text
Read PROJECT_INSTRUCTIONS.md first.
This is a Dairy Farm full-stack app with React frontend and Express/Mongo backend.
Do not start by rewriting the app.
First identify whether the issue belongs to auth, herd setup, cows, buffaloes, finance, marketplace, emergency content, or disease content.
Use active files only unless explicitly told otherwise.
If data shape changes are needed, update both frontend and backend consistently.
After fixing, verify the related UI flow and build/run status.
```

## Final Note
If future work adds daily milk entry history, period filters, or separate cow/buffalo milk pricing, this document should be updated immediately so later LLMs do not debug against outdated assumptions.
