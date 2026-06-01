# Fitness Challenge Tracker API

Simple Node.js + Express REST API using MongoDB (Mongoose).

Setup

1. Copy `.env.example` to `.env` and fill values.
2. Install deps:

```bash
npm install
```

3. Run in dev:

```bash
npm run dev
```

Routes

- `POST /api/auth/register` — register new user
- `POST /api/auth/login` — login (returns JWT)
- `GET /api/challenges` — list (filter/sort supported)
- `GET /api/challenges/:id` — get single
- `POST /api/challenges` — create (protected)
- `PUT /api/challenges/:id` — update (protected, owner)
- `DELETE /api/challenges/:id` — delete (protected, owner)

Testing

Use Postman or curl. Include `Authorization: Bearer <token>` for protected routes.

Example cURL (register):

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@example.com","password":"secret123"}'
```
