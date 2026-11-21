# CivicPulse AI
## AI-Powered Civic Issue Reporting and Resolution Platform

**Tagline:** Report. Analyse. Prioritise. Resolve.

### 1. Project Objective

Develop a full-stack web application that enables citizens to report civic infrastructure problems, uses AI to analyse and prioritise complaints, recommends the appropriate government department, and provides a transparent public dashboard for tracking complaint resolution.

### 2. Problem Statement

Citizens face difficulties reporting and tracking civic problems such as damaged roads, water leakage, garbage accumulation, drainage overflow and pollution. Existing reporting processes often lack intelligent prioritisation, proper department routing and transparent status tracking.

CivicPulse AI provides a centralized platform that simplifies civic issue reporting and uses AI-assisted analysis to improve complaint classification, severity assessment and department recommendations.

### 3. User Roles

**Citizen**
- Submit civic complaints.
- Upload an optional issue photograph.
- View submitted complaints.
- Track complaint status.

**Administrator / Authority**
- View all complaints.
- Review AI-generated analysis.
- Update complaint status.
- Add resolution remarks.

### 4. Core Functional Requirements

#### A. Complaint Submission
- Form fields: title, description, location and optional image.
- Validate required fields.
- Store complaint details in the database.
- Automatically generate a unique complaint ID.
- Set initial status to Pending.

#### B. AI Complaint Analysis
Create an AI analysis service that receives the complaint title and description.

The AI should return:
- Complaint category: Roads, Water, Waste Management, Drainage or Pollution.
- Severity: Low, Medium or High.
- Recommended department.
- Short complaint summary.
- Suggested action.

Severity should be explainable and based on the submitted information. AI recommendations must be reviewable by an administrator.

Use Gemini API through a backend endpoint if an API key is configured. Never expose the key in frontend code.

If the API key is unavailable, provide a clearly labelled rule-based fallback so the application remains functional.

#### C. Public Dashboard
Display:
- Total complaints.
- Pending complaints.
- In-progress complaints.
- Resolved complaints.
- Category-wise complaint statistics.
- Recent complaint list.
- Severity indicators.

Dashboard statistics must come from the database, not hardcoded sample numbers.

#### D. Complaint Management
- Display all submitted complaints to the administrator.
- Filter complaints by category, severity and status.
- Allow administrators to change status to Pending, In Progress or Resolved.
- Allow administrators to add resolution remarks.
- Persist all changes in the database.

#### E. Complaint Tracking
- Citizens can search using their complaint ID.
- Display complaint information and current status.
- Show AI analysis and resolution remarks.

### 5. Database Design

Create a SQLite database with the following tables.

**complaints**
- id
- title
- description
- location
- image_path
- category
- severity
- department
- ai_summary
- suggested_action
- status
- resolution_remarks
- created_at
- updated_at

**complaint_history**
- id
- complaint_id
- previous_status
- new_status
- remarks
- created_at

Use appropriate primary keys, foreign keys and parameterized queries.

### 6. Backend API Requirements

Base URL: `/api`

**Complaints**
- POST `/complaints` — Create complaint.
- GET `/complaints` — Retrieve all complaints.
- GET `/complaints/:id` — Retrieve a complaint.
- PATCH `/complaints/:id/status` — Update complaint status.
- GET `/complaints/:id/history` — Retrieve status history.

**AI**
- POST `/ai/analyze` — Analyse complaint and return category, severity, department, summary and suggested action.

**Dashboard**
- GET `/dashboard/stats` — Retrieve database-backed statistics.
- GET `/dashboard/categories` — Retrieve category-wise statistics.

### 7. Frontend Pages

1. Home Page — Project introduction and navigation.
2. Report Issue Page — Complaint submission form.
3. Public Dashboard — Complaint statistics and recent reports.
4. Complaint Tracking Page — Search and view complaint status.
5. Admin Dashboard — Complaint management and status updates.

### 8. User Interface

Create a professional, modern civic-tech interface.

- Primary colours: Navy blue and teal.
- Severity colours: Green, amber and red.
- Responsive layout.
- Clear navigation.
- Dashboard cards and charts.
- Clean complaint cards and tables.
- Simple forms with validation.
- Consistent loading and error states.

### 9. Project Architecture

```text
civicpulse-ai/
├── client/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       ├── App.jsx
│       └── index.js
├── server/
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   ├── database/
│   ├── uploads/
│   └── server.js
├── .env.example
├── .gitignore
└── README.md
```

### 10. Security and Reliability

- Keep API keys in backend environment variables.
- Validate incoming form data.
- Restrict uploaded file types and sizes.
- Use parameterized database queries.
- Handle API and database errors.
- Do not expose sensitive server information.
- Label rule-based analysis as fallback analysis, not AI-generated output.

### 11. Implementation Priority

**Priority 1 — Essential**
- React frontend.
- Express backend.
- SQLite database.
- Complaint submission.
- Complaint retrieval.
- Public dashboard.
- Admin status updates.

**Priority 2 — AI**
- Gemini API integration.
- Complaint classification.
- Severity estimation.
- Department recommendation.
- Fallback analysis.

**Priority 3 — Polish**
- Image uploads.
- Complaint tracking.
- Dashboard charts.
- Responsive styling.
- README and setup instructions.

### 12. Acceptance Criteria

The application should demonstrate this complete workflow:

1. A citizen submits a road damage complaint.
2. The complaint is saved in SQLite.
3. AI analyses the complaint and recommends a category, severity and department.
4. The complaint appears on the public dashboard.
5. The administrator views the complaint.
6. The administrator changes its status to In Progress.
7. The administrator marks it Resolved and adds remarks.
8. The citizen can view the updated status using the complaint ID.

**Important:** This is an MVP prototype. Do not claim actual government integration, automatic dispatch to government departments, real-time sensor monitoring or verified physical repairs. The application demonstrates department recommendations and administrative complaint management.