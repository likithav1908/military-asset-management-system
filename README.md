# 🪖 Military Asset Management System

A full-stack web application designed to help military departments efficiently manage and track assets — including purchases, transfers, assignments, and expenditures. It features role-based access, secure REST APIs, and real-time dashboards for total asset control.

---

## ✨ Features

- 🔐 **Role-based access control** (simulate User/Admin)
- 📦 **Asset tracking**: Purchase, Transfer, Assignment, and Expenditure modules
- 📊 **Dashboard**: Opening/closing balances, movement tracking, filters
- 📂 **Secure REST APIs** with backend logging
- ✅ PostgreSQL integration for persistent asset data
- ⚙️ Fully functional UI built with React + Tailwind CSS

---

## 🧰 Tech Stack

| Layer         | Tools/Technologies                    |
|---------------|----------------------------------------|
| Frontend      | React.js, Tailwind CSS, React Router   |
| Backend       | Node.js, Express.js                    |
| Database      | PostgreSQL                             |
| API Client    | Axios                                  |
| Dev Tools     | VS Code, Git, Netlify/Vercel, Render   |

---

## 📁 Project Structure

Military-Asset-Management-System/
├── client/ # React Frontend
│ ├── public/
│ └── src/
│ ├── components/ # Forms, Navbar, Cards
│ ├── pages/ # Dashboard, Purchase, Transfer, etc.
│ ├── App.js # Main routing
│ └── index.js
├── server/ # Express Backend
│ ├── controllers/ # Business logic for each route
│ ├── routes/ # API endpoints
│ ├── db.js # PostgreSQL connection
│ └── server.js # Entry point
├── .env # Environment variables
├── README.md


---

## 🚀 How to Run the Project

### 1️⃣ Backend Setup (Express + PostgreSQL)

cd server
npm install
🔧 Configure .env with your DB URL:

ini

DATABASE_URL=your_postgres_connection_string
Then run:

node server.js
2️⃣ Frontend Setup (React)

cd client
npm install
npm start
Visit: http://localhost:3000

🧑‍💼 Roles
Admin
Add/view assets

Approve transfers/assignments

Monitor expenditure and movement

User (Simulated)
Submit purchase/transfer/assignment/expenditure forms

View asset movement

🧪 Database Tables Used
assets

purchases

transfers

assignments

expenditures

Refer to server/db.js and migration SQL files if available.

📸 Screenshots (Optional)
You can add UI screenshots or DB diagrams here

📈 Future Enhancements
🔐 Add login/signup and authentication

📥 Export data to Excel/PDF

📧 Email alerts for asset movements

📦 Inventory-level threshold alerts

📱 Make UI mobile-responsive

🙋‍♀️ Author
Likitha V
GitHub: @likithav1908

📜 License
This project is licensed under the MIT License — free to use for academic or non-commercial purposes.

⭐️ Support
If this project helped you or inspired you, please ⭐️ the repo on GitHub!
