## Backend

The backend of the Smart Diet Planner is built using FastAPI and serves as the API layer for the application. It handles requests from the frontend, communicates with the AI model served by Gemini.

---

### Setup Instructions

Open a terminal and follow these steps to set up the backend:

```bash
cd backend
source venv/bin/activate
pip install -r requirements.txt
# add environment variables in .env file
uvicorn main:app --reload
```

---

### Environment Variables

Create a `.env` file in the `backend` directory and add the following variables:

```
GOOGLE_API_KEY="<your_google_api_key>"
```

---
