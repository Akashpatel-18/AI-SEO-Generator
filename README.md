# Shoutnhike - AI SEO Content Generator

Shoutnhike is a premium SaaS application designed to help SEO professionals and content creators generate optimized content briefs, meta titles, descriptions, and blog outlines in seconds. Powered by AI models (Gemini & Groq), it provides data-driven suggestions to improve search engine rankings.

## 🚀 Features

- **AI Content Generation**: Leverage Gemini 2.5 Flash Lite and Llama 3.3 (via Groq) for high-quality SEO structures.
- **Smart Metadata**: Automatically generate optimized Meta Titles and Descriptions.
- **Internal Link Suggestions**: Get real-world internal link recommendations.
- **Usage Tracking**: Built-in subscription and quota management.
- **History Management**: Keep track of all your previous generations.

## 🛠️ Tech Stack

**Frontend:**
- React (Vite)
- TypeScript
- Redux Toolkit (State Management)
- React Query (Data Fetching)
- Tailwind CSS & Shadcn UI (Styling)
- Sonner (Toast Notifications)

**Backend:**
- Node.js & Express
- TypeScript
- MongoDB & Mongoose
- JWT Authentication
- Google Generative AI & Groq SDK

---

## 💻 Local Setup

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)
- API Keys for Google Gemini and Groq

### 1. Clone the repository
```bash
git clone https://github.com/your-username/shoutnhike.git
cd shoutnhike
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` folder:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_google_gemini_api_key
GROQ_API_KEY=your_groq_api_key
FRONTEND_URL=http://localhost:5173
```
Run the backend:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
# From the root directory
cd frontend
npm install
```
Create a `.env` file in the `frontend` folder:
```env
VITE_SERVER_URL=http://localhost:5000
```
Run the frontend:
```bash
npm run dev
```
