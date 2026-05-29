# FixCampus

A React + Vite campus issue tracking web application. This repository includes login/register UI, an interactive dashboard for reporting campus maintenance issues, and a Node.js backend server.

## Project Structure

- `src/` - React frontend application components and pages
- `server/` - Node.js backend server
- `package.json` - Frontend dependencies
- `vite.config.js` - Vite configuration

## Installation & Setup

### Frontend
```bash
npm install
```

### Backend
```bash
cd server
npm install
cd ..
```

## Running the Project

### Start Development Server (Frontend)
```bash
npm run dev
```
The frontend will be available at the URL shown in the terminal (usually `http://localhost:5173`)

### Start Backend Server
```bash
cd server
npm start
cd ..
```
The backend runs on port 3000 (or as configured in `server/index.js`)

## Demo Accounts

- **Student:** student@campus.ac.uk / student123
- **Staff:** staff@campus.ac.uk / staff123
- **Admin:** admin@campus.ac.uk / admin123

## Features

- User authentication (login/register)
- Campus issue tracking dashboard
- Report maintenance issues
- Interactive charts with ECharts
- Local storage for demo authentication

## Notes

- `node_modules/` and `.vite/` directories are ignored
- The app uses ECharts for visualizations
- Demo data is stored in localStorage\n
