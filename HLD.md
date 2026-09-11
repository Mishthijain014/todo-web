1. System Overview

The Todo Web App follows a simple three-layer architecture:

React Frontend
      |
      | HTTP / JSON
      v
Node.js + Express Backend
      |
      +-----------> MongoDB
      |
      +-----------> LLM API

The frontend is responsible for the user interface and client-side
state.

The backend is responsible for authentication, business logic,
validation, CRUD APIs, and communication with MongoDB and the LLM API.

MongoDB stores users and todos.

The LLM API is used only for the AI task-organization feature.

2. Architecture Components

2.1 React Frontend

Responsibilities:

Render reusable components

Manage UI state

Handle forms

Make asynchronous API calls

Handle loading/error states

Manage client-side routes

Store/use JWT for authenticated requests

Display AI structured results

Important React concepts:

Component composition

useState

useEffect

Async/await

Client-side routing

2.2 Express Backend

Responsibilities:

Receive HTTP requests

Validate request data

Authenticate users

Execute business logic

Perform MongoDB operations

Call the LLM API

Return JSON responses

Return correct HTTP status codes

Handle server-side errors

2.3 MongoDB

Two main collections are planned:

users

todos

Relationship:

User 1 -------- * Todos

A todo stores the user's MongoDB ObjectId as its owner reference.

2.4 LLM API

The backend communicates with an LLM provider.

The frontend does not directly expose the LLM API key.

Flow:

React
  |
  | POST /api/todos/ai-organize
  v
Express Backend
  |
  | Prompt + task data
  v
LLM API
  |
  | Structured JSON
  v
Express Backend
  |
  v
React

3. Request Flow

Login Flow

User
 |
 v
React Login Form
 |
 | POST /api/auth/login
 v
Express Route
 |
 v
Auth Controller
 |
 +--> MongoDB: find user
 |
 +--> bcrypt: compare password
 |
 +--> JWT: create token
 |
 v
JSON response
 |
 v
React stores token
 |
 v
Dashboard

Todo Fetch Flow

Dashboard
 |
 | GET /api/todos
 | Authorization: Bearer <JWT>
 v
Auth Middleware
 |
 | verify JWT
 v
Todo Controller
 |
 v
MongoDB
 |
 v
Todo JSON
 |
 v
React state
 |
 v
Todo list UI

AI Flow

Dashboard
 |
 | Send current todos
 v
Backend
 |
 | Build controlled prompt
 v
LLM API
 |
 | Structured JSON
 v
Backend validates response
 |
 v
Frontend displays suggestions

4. High-Level Folder Structure

TODO-web/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── todoController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Todo.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── todoRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend-react/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── ...
│
├── PRD.md
├── HLD.md
├── LLD.md
└── .gitignore

5. API Layer

Authentication APIs

POST /api/auth/signup
POST /api/auth/login

Todo APIs

GET    /api/todos
POST   /api/todos
PUT    /api/todos/:id
DELETE /api/todos/:id

AI API

POST /api/todos/ai-organize

The AI endpoint should be protected because it operates on the user's
tasks.

6. Security Architecture

Client
  |
  | JWT
  v
Auth Middleware
  |
  | verified userId
  v
Controller
  |
  | query using userId
  v
MongoDB

Security rules:

Hash passwords using bcrypt.

Sign JWTs using a secret stored in .env.

Never expose the JWT secret to the frontend.

Never expose the LLM API key to the frontend.

Keep MongoDB credentials in environment variables.

Add .env to .gitignore.

Verify todo ownership before update/delete operations.

7. HTTP Status Code Strategy

Situation                                                   Status

Successful GET/PUT                                             200
Successful POST                                                201
Successful DELETE                                       200 or 204
Invalid input                                                  400
Missing/invalid authentication                                 401
Resource belongs to another user / forbidden action            403
User/todo not found                                            404
Duplicate email                                                409
Unexpected server error                                        500

8. Error Handling

The backend should return consistent JSON errors:

{
  "message": "Todo not found"
}

The frontend should display useful messages instead of silently failing.

The backend should use try/catch around asynchronous controller
operations.

9. JavaScript Runtime Concepts

The project will demonstrate:

Event Loop

Node.js processes asynchronous operations without blocking the main
execution flow.

Promises

Database and API operations return promises.

async/await

Controllers will use:

const todos = await Todo.find({ user: req.user.id });

Closures

Functions such as middleware and event handlers demonstrate access to
variables from their surrounding scope.

Hoisting

The project provides opportunities to understand how JavaScript handles
declarations before execution.

10. Scalability Considerations

The first version is intentionally simple.

Possible future improvements:

Pagination

Database indexes

Rate limiting

Redis caching

WebSockets

Docker

Automated testing

Advanced authorization

These are not required for the first version.