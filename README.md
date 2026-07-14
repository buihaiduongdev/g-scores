# G-Scores

A full-stack web application to look up and visualize 2024 National High School Examination (THPT) scores in Vietnam.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS v4 |
| Backend | Node.js, Express, TypeScript |
| Database | MongoDB, Mongoose |
| Validation | Zod |

## Project Structure

```
g-scores/
├── backend/   # Express + TypeScript API
└── frontend/  # React + Vite application
```

## Getting Started

### Backend

```bash
cd backend
npm install
npm run seed              # Import CSV data into MongoDB (run once)
npm run generate-reports  # Pre-compute and cache report data (run once after seed)
npm run dev               # Start development server on port 3001
```

### Frontend

```bash
cd frontend
npm install
npm run dev               # Start development server on port 5173
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/scores/:sbd` | Look up score by 8-digit registration number |
| GET | `/api/reports/score-distribution` | Get score distribution for all 9 subjects |
| GET | `/api/reports/top-group-a` | Get Top 10 highest scorers in Group A (Math + Physics + Chemistry) |
