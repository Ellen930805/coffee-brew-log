# Coffee Brew Log

Coffee Brew Log is a full-stack app for recording and reviewing coffee brewing sessions.

## Features
- Create a brew entry with coffee, roast, method, ratio, notes, and date
- List brews in a responsive card view
- Filter the list by brew method
- Edit and update an existing entry
- Delete a brew entry

## Tech stack
- Frontend: React + Vite + Bootstrap
- Backend: Express.js
- Database: SQLite via Sequelize

## Setup
1. Install backend dependencies:
   - cd backend
   - npm install
2. Install frontend dependencies:
   - cd frontend
   - npm install
3. Start the backend:
   - cd backend
   - npm start
4. Start the frontend:
   - cd frontend
   - npm start
5. Open http://localhost:5173

## Environment
- Copy backend/.env.example to backend/.env if you need to override the default port.

## Tests
- Backend tests:
  - cd backend
  - npm test
