1. Backend Modules

1.1 server.js

Responsibilities:

Load environment variables

Create Express application

Connect MongoDB

Enable JSON parsing

Register routes

Start the server

Example flow:

require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

2. Database Models

2.1 User Schema

User
├── name: String
├── email: String
├── password: String
└── timestamps

Rules:

name is required.

email is required.

Email should be unique.

password stores a bcrypt hash, not the original password.

2.2 Todo Schema

Todo
├── title: String
├── completed: Boolean
├── user: ObjectId -> User
└── timestamps

Rules:

title is required.

completed defaults to false.

user is required.

A todo belongs to exactly one user.

3. Authentication Module

Signup

Request
  |
  v
Validate input
  |
  v
Check existing email
  |
  v
Hash password with bcrypt
  |
  v
Create User
  |
  v
Return safe user data

Response:

{
  "message": "Signup successful",
  "user": {
    "id": "...",
    "name": "...",
    "email": "..."
  }
}

The password must not be returned.

Login

Request
  |
  v
Validate input
  |
  v
Find user by email
  |
  v
bcrypt.compare()
  |
  v
jwt.sign()
  |
  v
Return token

Example response:

{
  "message": "Login successful",
  "token": "<JWT>",
  "user": {
    "id": "...",
    "name": "...",
    "email": "..."
  }
}

4. JWT Middleware

File:

backend/middleware/authMiddleware.js

Algorithm:

Read Authorization header
        |
        v
Check "Bearer <token>"
        |
        v
Verify JWT
        |
        v
Extract user ID
        |
        v
Set req.user
        |
        v
next()

If the token is missing or invalid:

401 Unauthorized

5. Todo Controller

Create Todo

Input:

{
  "title": "Complete project"
}

Logic:

Read title.

Validate title.

Get authenticated user from req.user.

Create todo with the user's ID.

Return the created todo.

Status:

201 Created

Get Todos

Logic:

Todo.find({ user: req.user.id })

This ensures users receive only their own tasks.

Status:

200 OK

Update Todo

Endpoint:

PUT /api/todos/:id

Logic:

Find todo by ID.

Confirm it belongs to the authenticated user.

Update allowed fields.

Return updated todo.

Possible errors:

Invalid ID → 400

Todo not found → 404

Todo belongs to another user → 403

Delete Todo

Endpoint:

DELETE /api/todos/:id

Logic:

Find todo.

Check ownership.

Delete it.

Return success.

6. Route Design

Auth Routes

POST /api/auth/signup
POST /api/auth/login

Todo Routes

GET    /api/todos
POST   /api/todos
PUT    /api/todos/:id
DELETE /api/todos/:id
POST   /api/todos/ai-organize

Todo routes use authentication middleware.

Example:

router.get("/", authMiddleware, getTodos);

7. React Component Design

Suggested structure:

src/
├── components/
│   ├── Navbar.jsx
│   ├── TodoForm.jsx
│   ├── TodoItem.jsx
│   ├── TodoList.jsx
│   └── Loading.jsx
│
├── pages/
│   ├── Login.jsx
│   ├── Signup.jsx
│   └── Dashboard.jsx
│
├── services/
│   └── api.js
│
├── App.jsx
└── main.jsx

8. React State Design

Dashboard State

const [todos, setTodos] = useState([]);
const [title, setTitle] = useState("");
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

Purpose:

todos → current task list

title → controlled form input

loading → API loading state

error → error message

This demonstrates React state management using useState.

9. useEffect Usage

The dashboard should fetch todos when it loads.

Conceptual example:

useEffect(() => {
    fetchTodos();
}, []);

The empty dependency array means the effect runs when the component
mounts.

This demonstrates:

Side effects

Async API fetching

React lifecycle behavior

10. Async API Layer

A central API service can handle requests.

Example:

async function getTodos(token) {
    const response = await fetch(
        "http://localhost:5000/api/todos",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch todos");
    }

    return response.json();
}

This demonstrates:

Promises

async/await

HTTP requests

Error handling

11. Client-Side Routing

React Router routes:

/login
/signup
/dashboard

Expected behavior:

Login
  |
  | successful
  v
Dashboard

Signup
  |
  v
Login

Dashboard
  |
  | logout
  v
Login

Protected dashboard behavior:

No token -> redirect to /login
Token exists -> allow /dashboard

12. AI Feature --- Detailed Design

Endpoint

POST /api/todos/ai-organize

Request

{
  "todos": [
    {
      "title": "Submit assignment"
    },
    {
      "title": "Buy groceries"
    }
  ]
}

Prompt Strategy

The prompt should clearly define:

Role

Task

Input

Allowed values

Required output format

Rules against extra text

Example conceptual prompt:

You are a task organization assistant.

Analyze the provided tasks.

For every task:
- assign a priority: Low, Medium, or High
- assign a category: Study, Work, Personal, or Other
- keep the original task text

Return only valid JSON matching the requested schema.
Do not add explanations outside the JSON.

This demonstrates prompt engineering.

Structured Output

Expected shape:

{
  "suggestions": [
    {
      "task": "Submit assignment",
      "priority": "High",
      "category": "Study"
    }
  ]
}

The backend should validate the returned structure before sending it to
the frontend.

13. Frontend AI Flow

User clicks "AI Organize"
        |
        v
React sends current todos
        |
        v
POST /api/todos/ai-organize
        |
        v
Backend calls LLM
        |
        v
Structured JSON response
        |
        v
React stores AI result
        |
        v
Display suggestions

14. Git and Secrets

.gitignore

The repository must contain:

node_modules/
.env
.DS_Store

.env must never be pushed to GitHub.

Example environment variables:

PORT=5000
MONGO_URI=...
JWT_SECRET=...
LLM_API_KEY=...

The actual values must remain local or be stored securely in the
deployment platform.

15. Error Handling Matrix

Layer      Error               Action

React      Network error       Show user-friendly message
React      API returns error   Display API message
Auth API   Missing fields      400
Auth API   Wrong credentials   401
Todo API   Missing JWT         401
Todo API   Invalid todo ID     400
Todo API   Todo not found      404
Todo API   Wrong owner         403
Server     Unexpected error    500
AI API     Provider failure    500 with safe message
AI API     Invalid AI output   Reject/handle safely

16. Mandatory Concept Mapping

Mandatory Concept             Where It Appears

React component composition   components/, pages/, App.jsx
useState                    Dashboard and forms
useEffect                   Fetch todos on page load
Async API fetching            API service + controllers
Client-side routing           React Router
Problem modeling              User + Todo domain model
System design                 React → Express → MongoDB/LLM
RESTful endpoints             /api/auth/*, /api/todos/*
HTTP status codes             Controller responses
Server-side error handling    try/catch and error middleware
Middleware                    JWT authentication
MongoDB schema modeling       User/Todo Mongoose schemas
MongoDB CRUD                  Todo controller
LLM API integration           AI organize endpoint
Prompt engineering            AI prompt
Structured outputs            AI JSON schema
Git workflow                  Git/GitHub commits
Environment variables         .env
Event loop                    Node.js async operations
Promises vs callbacks         Fetch/Mongoose examples
async/await                 API/controller code
Closures                      Middleware/event callbacks
Hoisting                      JavaScript implementation/examples

17. Definition of Done

The implementation is considered complete when:

React frontend runs successfully.

Signup works.

Login works.

JWT authentication works.

Todo CRUD works.

Users see only their own todos.

Dashboard uses React components.

useState is used.

useEffect is used.

React Router is used.

API calls are asynchronous.

Loading and error states are handled.

MongoDB stores data correctly.

AI endpoint works.

AI returns structured output.

.env is excluded from Git.

Documentation is updated.