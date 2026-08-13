# ☕ Coffee Brew Log

A full-stack web application for recording, managing, and reviewing coffee brewing sessions.

The application allows users to create brew entries, view saved brews, filter them by brewing method, edit existing entries, and delete entries.

---

## 🚀 Live Demo

**Frontend:**  
https://coffee-brew-log-3.onrender.com

**Backend API:**  
https://coffee-brew-log-backend-ygmu.onrender.com

---

## ✨ Features

- ☕ Create a new coffee brew entry
- 🫘 Record coffee beans
- ☕ Select a brewing method
- ⚖️ Record coffee and water grams
- ⭐ Rate each brew from 1–5
- 📝 Add tasting notes
- 📋 View all saved brews
- 🔍 Filter brews by brewing method
- ✏️ Edit existing brew entries
- 🗑️ Delete brew entries
- 📱 Responsive user interface

---

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- JavaScript
- Bootstrap
- CSS

### Backend

- Django
- Django REST Framework

### Database

- SQLite

### Deployment

- Render
- GitHub

---

## 📸 Screenshots

### 🏠 Brew Log

![Coffee Brew Log](screenshots/home.png)

### ➕ Add Brew

![Add Brew](screenshots/add-brew.png)

### ✏️ Edit Brew

![Edit Brew](screenshots/edit-brew.png)

### 🔍 Filter Brews

![Filter Brews](screenshots/filter.png)

---

## 📂 Project Structure

```text
coffee-brew-log/
│
├── backend/
│   ├── manage.py
│   ├── requirements.txt
│   └── ...
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── BrewForm.jsx
│   │   │   ├── BrewList.jsx
│   │   │   └── BrewCard.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── screenshots/
│   ├── home.png
│   ├── add-brew.png
│   ├── edit-brew.png
│   └── filter.png
│
├── Documentation.md
└── README.md
