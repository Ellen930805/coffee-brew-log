# ☕ Coffee Brew Log

Coffee Brew Log is a full-stack web application that allows users to record, view, filter, edit, and delete coffee brewing sessions.

The application provides a simple and user-friendly interface for keeping track of coffee beans, brewing methods, coffee and water measurements, ratings, and tasting notes.

## 🌐 Live Application

**Live Website:**  
https://coffee-brew-log-frontend8.onrender.com/

**GitHub Repository:**  
https://github.com/Ellen930805/coffee-brew-log

---

## ✨ Features

- Add a new coffee brew
- View all saved coffee brews
- Display the total number of brews
- Filter brews by brewing method
- Edit an existing brew
- Delete an existing brew
- Validate required form fields
- Record coffee measurements in grams
- Record water measurements in grams
- Rate each brew from 1 to 5
- Add tasting notes
- Responsive user interface
- Full CRUD functionality

### Brew Information

Each brew contains:

- **Beans**
- **Brewing Method**
- **Coffee Grams**
- **Water Grams**
- **Rating**
- **Tasting Notes**

---

## 🛠️ Technologies Used

### Frontend

- React
- Vite
- JavaScript
- Bootstrap
- CSS

### Backend

- Node.js
- Express.js
- Sequelize
- SQLite

### Version Control

- Git
- GitHub

### Deployment

- Render

---

## 🏗️ Project Structure

```text
coffee-brew-log/
│
├── backend/
│   ├── src/
│   │   ├── models/
│   │   │   └── brew.js
│   │   ├── routes/
│   │   │   └── brews.js
│   │   └── sequelize.js
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── BrewForm.jsx
│   │   │   ├── BrewList.jsx
│   │   │   └── BrewCard.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── screenshots/
│
├── Documentation.md
├── README.md
└── .gitignore
🌍 Deployment

The application is deployed using Render.

Frontend

https://coffee-brew-log-frontend8.onrender.com/

Backend API

https://coffee-brew-log-backend-ygmu.onrender.com/
👩‍💻 Author

Ellen Sesoko

GitHub:

https://github.com/Ellen930805
