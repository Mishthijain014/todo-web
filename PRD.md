1. Product Overview

Product Name: Todo Web App

Todo Web App is a full-stack task management application that allows
users to create an account, log in securely, manage personal tasks, and
use a simple AI feature to organize or prioritize tasks.

The application is designed as a learning-oriented full-stack project
and intentionally keeps the feature set small while demonstrating
important frontend, backend, database, authentication, API, AI, and
engineering concepts.

2. Problem Statement

Users often need a simple way to manage daily tasks. A basic todo
application can solve this problem while also providing a practical
environment for learning:

React component-based frontend development

State management with useState

Side effects and API loading with useEffect

Client-side routing

REST APIs

MongoDB CRUD operations

JWT authentication

Password hashing

LLM API integration

Prompt engineering

Structured AI outputs

Git workflow and environment variable management

3. Goals

Primary Goals

Allow users to register and log in.

Keep user passwords securely hashed.

Authenticate protected API requests using JWT.

Allow each user to create, read, update, and delete their own tasks.

Provide a React-based dashboard.

Fetch todo data asynchronously from the backend.

Provide a small AI feature that returns structured task suggestions.

Maintain a clean and understandable project structure.

Non-Goals

The first version will not include:

Social login

Payments

Real-time collaboration

File uploads

Redis caching

WebSockets

Complex role-based authorization

Advanced analytics

Multi-agent AI workflows

4. Target Users

Students learning full-stack development

Individual users managing personal tasks

Developers demonstrating MERN/full-stack concepts

5. Core Features

5.1 User Registration

Users can register with:

Name

Email

Password

The backend validates the input, checks whether the email already
exists, hashes the password using bcrypt, and stores the user in
MongoDB.

5.2 User Login

Users can log in using email and password.

On successful login:

Credentials are verified.

A JWT is generated.

The frontend stores the authentication token.

The user is redirected to the dashboard.

5.3 Authentication

Protected todo endpoints require a valid JWT.

Authentication middleware will:

Read the token from the request.

Verify the token.

Identify the user.

Attach the user information to the request.

Continue to the controller.

5.4 Todo CRUD

Users can:

Create a task

View their tasks

Update a task

Mark a task as completed

Delete a task

Each todo belongs to one user.

5.5 Dashboard

The dashboard will be implemented in React.

It will contain:

Navigation/header

Add-task form

Todo list

Task completion control

Edit/delete actions

Loading state

Error state

AI organization action

5.6 Client-Side Routing

React Router will provide routes such as:

/login

/signup

/dashboard

Unauthenticated users should not access the dashboard.

5.7 AI Task Organization

The application will include one simple LLM-powered feature.

Example:

"Analyze my current tasks and suggest a priority and category for each
task."

The AI request will use a carefully designed prompt and require a
structured JSON response.

Example structured response:

{
  "suggestions": [
    {
      "task": "Complete project documentation",
      "priority": "High",
      "category": "Study"
    }
  ]
}

The frontend will display the result in a simple UI.

6. Functional Requirements

ID      Requirement

FR-01   User can create an account.
FR-02   User can log in.
FR-03   Passwords are hashed before storage.
FR-04   Login returns a JWT.
FR-05   Protected routes require JWT authentication.
FR-06   User can create todos.
FR-07   User can view only their own todos.
FR-08   User can update todos.
FR-09   User can delete todos.
FR-10   React frontend fetches data asynchronously.
FR-11   React manages UI state using useState.
FR-12   React handles API side effects using useEffect.
FR-13   React Router handles client-side navigation.
FR-14   Backend exposes RESTful endpoints.
FR-15   Backend returns appropriate HTTP status codes.
FR-16   Backend handles errors consistently.
FR-17   AI feature uses an LLM API.
FR-18   AI feature uses prompt engineering.
FR-19   AI feature returns structured output.

7. Non-Functional Requirements

Security

Passwords must never be stored as plain text.

JWT secret must be stored in environment variables.

MongoDB connection strings must be stored in environment variables.

.env must not be committed to Git.

Users must only access their own todos.

Performance

API requests should be asynchronous.

Todo queries should be simple and efficient.

The application should avoid unnecessary API calls.

Usability

UI should be responsive.

Forms should provide clear feedback.

Loading and error states should be visible.

Maintainability

Frontend and backend should be separated.

Controllers, routes, models, and middleware should have clear
responsibilities.

Code should use meaningful names.

8. Technology Stack

Frontend

React

JavaScript

Bootstrap

React Router

Fetch API

Backend

Node.js

Express.js

JWT

bcrypt

dotenv

CORS

Database

MongoDB

Mongoose

AI

LLM API

Structured JSON output

Engineering

Git

GitHub

Environment variables

9. Success Criteria

The project is successful when:

A new user can register.

An existing user can log in.

A valid JWT protects todo APIs.

A logged-in user can perform complete todo CRUD.

The React dashboard displays backend data.

React demonstrates components, useState, useEffect, async API
calls, and routing.

MongoDB stores users and todos correctly.

The AI feature produces structured task suggestions.

Secrets are excluded from Git.

The project can be run locally using documented commands.

10. Project Score Coverage

The project intentionally covers the following mandatory concepts from
the provided project-score requirements:

React component composition

useState

useEffect

Async API fetching

Client-side routing

Problem modeling

Frontend/backend/database system design

RESTful endpoint design

Correct HTTP status codes

Server-side error handling

Middleware

MongoDB schema modeling

MongoDB CRUD

LLM API integration

Prompt engineering

Structured outputs

Git workflow

Environment variables and secrets management

JavaScript event loop

Promises vs callbacks

async/await

Closures

Hoisting

Optional concepts such as Docker, Redis, WebSockets, SQL/Postgres, RAG,
and multi-step agents are outside the first version.