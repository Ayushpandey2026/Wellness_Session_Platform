# 🧘 Arvyax Full Stack Assignment – Wellness Session Platform

## 📌 Overview
A secure wellness platform where users can:
- Register/login (JWT)
- View published sessions
- Create & auto-save drafts
- Publish sessions

---

## 🛠 Tech Stack
| Layer | Technology |
|-------|------------|
| Frontend | React + Chakra UI |
| Backend  | Node.js + Express |
| DB       | MongoDB (Atlas) |
| Auth     | JWT + bcrypt |
| Deploy   | Vercel + Render  |

---

## ⚙️ Installation & Setup

### 1️⃣ Backend

cd backend
cp .env.example .env      # fill in your credentials
npm install
npm run dev               # uses nodemon


 2️⃣ Frontend
cd frontend
npm install
npm run dev

🌐 Routes

🔐 Auth
Method	 Endpoint	         Description
POST	/api/auth/register	 Create user
POST	/api/auth/login	     Get JWT

📘 Sessions
Method	Endpoint	              Description
GET	  /api/sessions	               Public sessions
GET	  /api/my-sessions	           All my sessions
GET	  /api/my-sessions/:id	       Single session
POST  /api/my-sessions/save-draft  Save/update draft
POST  /api/my-sessions/publish	   Publish session


🧠 Session Schema
{
  _id,
  user_id,
  title,
  tags: [String],
  json_file_url: String,
  status: "draft" | "published",
  created_at,
  updated_at
}


📦 Folder Structure
Automation_Demo/
├── backend/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── server.js
├── frontend/
│   ├── src/components/
│   ├── src/pages/
│   ├── src/utils/axiosConfig.js
│   └── App.jsx

