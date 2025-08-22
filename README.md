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

cp .env.example .env  # fill in your credentials

npm install

npm run dev               # uses nodemon


 2️⃣ Frontend
 
cd frontend

npm install

npm run dev

---

🌐 Routes

🔐 Auth
| Method | Endpoint             | Description   |
| ------ | -------------------- | ------------- |
| POST   | `/api/auth/register` | Create user   |
| POST   | `/api/auth/login`    | Get JWT token |


📘 Sessions
| Method | Endpoint                      | Description       |
| ------ | ----------------------------- | ----------------- |
| GET    | `/api/sessions`               | Public sessions   |
| GET    | `/api/my-sessions`            | All my sessions   |
| GET    | `/api/my-sessions/:id`        | Single session    |
| POST   | `/api/my-sessions/save-draft` | Save/update draft |
| POST   | `/api/my-sessions/publish`    | Publish session   |


---
🧠 Session Schema
| Field           | Type      | Description                 |
| --------------- | --------- | --------------------------- |
| `_id`           | ObjectId  | Unique session ID           |
| `user_id`       | ObjectId  | Reference to user           |
| `title`         | String    | Session title               |
| `tags`          | \[String] | List of tags                |
| `json_file_url` | String    | URL of uploaded JSON file   |
| `status`        | String    | "draft" \| "published"      |
| `created_at`    | Date      | Timestamp when created      |
| `updated_at`    | Date      | Timestamp when last updated |


---

📦 Folder Structure
<details> <summary><code>Arvyax/
├── backend/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── server.js
├── frontend/
│   ├── src/components/
│   ├── src/pages/
│   ├── src/utils/axiosConfig.js
│   └── App.jsx</code></summary>

---
## 👨‍💻 Author
- [Ayush Pandey](https://github.com/Ayushpandey2026)

## 📬 Contact

For any questions or suggestions, feel free to reach out:  
📧 ayushpandey02003@gmail.com 

