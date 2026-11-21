# CivicPulse AI

CivicPulse is a civic issue reporting MVP. Citizens submit reports, view community activity and track progress by reference number. An administrator can review analysis recommendations and persist status updates with remarks. This is a prototype: it does not connect to government systems or verify physical repairs.

## Requirements

- Node.js 22.5 or newer and npm (the server uses Node's built-in SQLite module).
- Optional Gemini API key. Without one, the app uses clearly labelled rule-based analysis.

## Run locally

1. Copy `.env.example` to `server/.env` (or the project root). Set `GEMINI_API_KEY` only if you want Gemini analysis; the server-local file takes priority and the key stays on the server.
2. Install dependencies: `npm install`, `npm install --prefix server`, `npm install --prefix client`.
3. Start both applications: `npm run dev`.
4. Open `http://localhost:5173`. The API runs at `http://localhost:4000/api`.

The SQLite database is created at `server/data/civicpulse.sqlite`; optional image uploads are stored in `server/uploads` (JPEG, PNG or WebP, maximum 5 MB). The app starts empty and dashboard counts are queried from SQLite.

## Main workflow

1. Submit a report with a title, description and location (photo optional).
2. Save the generated `CP-YYYY-XXXXXXXX` reference ID.
3. Open Admin to review the proposed category, severity, department and action; update the status and add remarks.
4. Enter the reference ID in Track a report to inspect current status and history.

## API

- `POST /api/complaints` — create a complaint (`multipart/form-data`, optional `image`).
- `GET /api/complaints?category=&severity=&status=` — list/filter reports.
- `GET /api/complaints/:id` and `GET /api/complaints/:id/history` — tracking.
- `PATCH /api/complaints/:id/status` — `{ "status": "In Progress", "remarks": "..." }`.
- `POST /api/ai/analyze` — analyze title and description.
- `GET /api/dashboard/stats` and `/api/dashboard/categories` — database-backed counts.
- `GET /api/health` — health check.

The admin interface is intentionally a prototype and has no authentication. Do not expose it as a production authority system without adding access control.
