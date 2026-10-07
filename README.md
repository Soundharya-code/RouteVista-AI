# ROUTEVISTA AI
**"Predict. Protect. Deliver."**

ROUTEVISTA AI is an AI-powered logistics decision-support platform for disruption-prone regions. It helps authorities, field officers, drivers and logistics operators monitor road accessibility, identify disruption risks, report incidents, and simulate the impact of road or bridge closures.

## Features
- **Role-Based Command Center**: Login as Authority, Field Officer, Driver, or Logistics Operator.
- **Live GIS Mapping**: Visualize vehicles, routes, risk zones, and incidents on an interactive map.
- **What-If Simulator (Demo)**: Simulate disruptions like bridge closures and see network-wide impacts.
- **Field Incident Reporting**: Mobile-friendly reporting interface for ground officers.
- **Risk Engine (Prototype)**: Evaluates road risk based on incidents and weather.
- **Smart Route Recommendation**: Balances ETA and safety risk.

## Architecture
- **Frontend**: React 18, Vite, Tailwind CSS, Framer Motion, React-Leaflet.
- **Backend**: Python 3.10+, FastAPI (Demo endpoints for Risk Engine & Simulator).
- **Database (Planned)**: Supabase / PostgreSQL.

## Technology Stack
- **UI**: React + Tailwind + Lucide Icons
- **API**: FastAPI
- **Maps**: Leaflet + OpenStreetMap

## Setup Instructions

### Frontend (React/Vite)
1. Ensure Node.js is installed.
2. Navigate to the frontend directory: `cd frontend`
3. Install dependencies: `npm install`
4. Start the dev server: `npm run dev`
5. Open `http://localhost:5173` in your browser.

### Backend (FastAPI)
1. Ensure Python 3.9+ is installed.
2. Navigate to the backend directory: `cd backend`
3. Create a virtual environment: `python -m venv venv`
4. Activate the virtual environment (Windows): `venv\Scripts\activate`
5. Install dependencies: `pip install -r requirements.txt`
6. Run the server: `python main.py` or `uvicorn main:app --reload`
7. API Docs available at: `http://localhost:8000/docs`

## Demo Credentials
Since this is a demo MVP, the login page allows you to simply **select a role** and proceed without a password. This allows judges to quickly test all user views.

## Supabase Setup (Future Implementation)
To enable real database features:
1. Create a Supabase project.
2. Copy the URL and Anon Key into a `.env` file in the frontend.
3. Use the provided SQL schema (to be generated) in the Supabase SQL Editor.

## Known Limitations (MVP)
- **Routing Engine**: Currently uses a simulated logic model. Full integration with a local OSRM instance is pending.
- **Offline Reporting**: UI exists, but Dexie.js offline syncing is not fully integrated into the submit button yet.
- **AI/CV Models**: The risk engine uses a weighted demo algorithm. OpenCV image analysis is not fully integrated.

## Future Improvements
- Integrate actual trained Scikit-Learn models for predictive risk.
- Integrate Web Speech API for driver voice guidance.
- Complete PWA setup for full offline capability in the Field Officer view.
