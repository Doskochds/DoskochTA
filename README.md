# Quiz Builder (Test Task)

A full-stack application for creating and managing quizzes.

## Tech Stack
- **Backend:** NestJS, Prisma, SQLite
- **Frontend:** Next.js (App Router), React, Tailwind CSS

## Getting Started

### 1. Setup & Run Backend

Navigate to the backend folder and install dependencies:

```bash
cd backend
npm install
```

### Initialize the SQLite database:

```bash
npx prisma migrate dev --name init
```

### Start the server:

```bash
npm run start:dev
```
The backend runs on: http://localhost:3000

### 2. Setup & Run Frontend

Open a new terminal tab:

```bash
cd frontend
npm install
npm run dev
```
The frontend runs on: http://localhost:3001

### Configuration & Usage

Environment Variables
Backend: Uses SQLite by default (DATABASE_URL="file:./dev.db").

Frontend: Connects to http://localhost:3000 by default.

Usage Guide
Create: Go to the frontend URL and click Create New.

Save: Add questions (Input, True/False, Checkbox types) and save the quiz.

View: Click on any quiz card on the dashboard to view details in Read-only mode.

API Endpoints
POST /quizzes — Create a new quiz

GET /quizzes — Get list of quizzes

GET /quizzes/:id — Get quiz details

Author: Dmytro Doskoch





