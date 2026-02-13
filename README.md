# Task Management Backend API

A role-based Task Management REST API built using Node.js, Express, and MongoDB.

---

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Bcrypt
- Dotenv

---

##  Installation

1. Clone the repository:
git clone <your-repo-url>
cd <project-folder>


2. Install dependencies:


3. Copy `.env.example` to `.env` and fill in your own values.

Example:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
BCRYPT_SALT_ROUNDS=10


---

## ▶️ Run The Project :

Start the server: npm start


Server will run on: http://localhost:5000 (eg)


---

## Authentication

- JWT-based authentication
- Include token in header:


---

## User APIs

| Method | Endpoint | Description |
|--------|----------|------------|
| POST | /user/register | Register user |
| POST | /user/login | Login user |

---

##  Task APIs

| Method | Endpoint | Access |
|--------|----------|--------|
| POST | /task/create | Admin only |
| GET | /task/getAllTask | Authenticated |
| GET | /task/:id | Authenticated |
| PUT | /task/:id | Admin only |
| PATCH | /task/:id | Admin only |
| PATCH | /task/:id/status | Admin only |
| PATCH | /task/:id/reassign | Admin only |
| PATCH | /task/:id/comment | Assigned user or Admin |
| DELETE | /task/:id/comment/:commentId | Admin only |
| PATCH | /task/bulk/overdue | Admin only |
| DELETE | /task/:id | Admin only (Soft delete) |

---

##  Features Implemented

- Role-based access control
- Task assignment
- Task filtering & pagination
- Status updates with validation
- Partial updates using MongoDB operators
- Comment system
- Bulk update
- Soft delete
- Update counter tracking
- Centralized error handling
- Request validation

---

##  Database Rules

- Soft delete implemented (`isDeleted` flag)
- Deleted tasks are excluded from normal queries
- MongoDB update operators used for all updates
- Update counter increments on each modification

---

## Testing

Use Postman or Thunder Client to test APIs.

Recommended test flow:

1. Register Admin
2. Register Normal User
3. Login (get token)
4. Create Task (Admin)
5. Fetch Tasks
6. Update Task
7. Add Comment
8. Soft Delete

---



