# Customer Dashboard (Full-Stack)

This project is a minimal full-stack app to add, view, and delete customers.

Backend: `backend` (Node + Express)
Frontend: `frontend` (React + Vite)

Run locally:

- Install backend deps and start server:

```bash
cd backend
npm install
npm start
```

- Install frontend deps and start dev server:

```bash
cd frontend
npm install
npm run dev
```

Backend runs on port `5000`. Frontend runs on `http://localhost:5173` by default (Vite).

## Run as one Docker image (frontend + backend)

The repository now includes a root `Dockerfile` that:

- Builds the React frontend (`frontend/dist`)
- Copies the built frontend into the backend image
- Serves API + UI from one Node/Express container on port `5000`

Build image:

```bash
docker build -t <dockerhub-username>/customer-dashboard:latest .
```

Run container:

```bash
docker run -p 5000:5000 <dockerhub-username>/customer-dashboard:latest
```

Push image to Docker Hub:

```bash
docker login
docker push <dockerhub-username>/customer-dashboard:latest
```
