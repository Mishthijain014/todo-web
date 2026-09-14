# Mandatory JavaScript Core Concepts Documentation

This document explains where and how the 5 mandatory core JavaScript concepts are implemented across this application.

---

## 1. JavaScript — Event Loop
- **Explanation**: The Event Loop is Node.js and browser JavaScript's single-threaded concurrency mechanism. It processes synchronous code on the **Call Stack**, executes **Microtasks** (Promises, `queueMicrotask`), and handles **Macrotasks** (`setTimeout`, `setInterval`, I/O events).
- **Implementation in Code**:
  - `frontend/src/utils/jsConceptsDemo.js`: Demonstrates microtask vs macrotask execution order.
  - `backend/server.js` & `backend/controllers/todoController.js`: Non-blocking asynchronous I/O handling database queries and network calls via the event loop.

## 2. JavaScript — Promises vs Callbacks
- **Explanation**: Traditional callbacks pass functions as parameters to handle asynchronous completion (leading to "callback hell"). Promises encapsulate eventual values with standard `.then()`, `.catch()`, and `.finally()` handlers.
- **Implementation in Code**:
  - `frontend/src/services/api.js`: All API calls wrap standard browser HTTP requests in Promises.
  - `frontend/src/utils/jsConceptsDemo.js`: Explicit function `fetchTaskLegacyCallback` vs `fetchTaskPromise` demonstrating promisification.

## 3. JavaScript — Async / Await
- **Explanation**: `async/await` is syntactic sugar built on top of JavaScript Promises, allowing asynchronous code to be written sequentially with clean `try...catch` error handling.
- **Implementation in Code**:
  - `backend/controllers/authController.js` & `backend/controllers/todoController.js`: Every controller route uses `async (req, res, next) => { ... }` with `await` for Mongoose models, bcrypt, and fetch calls.
  - `frontend/src/services/api.js`: Async functions fetching backend data seamlessly.

## 4. JavaScript — Closures
- **Explanation**: A closure is the combination of a function bundled together with references to its surrounding lexical state. Closures give functions access to outer function scope variables even after the outer function has returned.
- **Implementation in Code**:
  - `backend/middleware/authMiddleware.js`: Higher-order middleware functions accessing request context.
  - `frontend/src/utils/jsConceptsDemo.js`: `createTodoCounter()` factory encapsulating private state via closures.
  - React components (`useState` setters inside event callbacks).

## 5. JavaScript — Hoisting
- **Explanation**: Hoisting is JavaScript's default behavior of moving function declarations and variable declarations to the top of their current scope during compilation. Function declarations are fully hoisted; `var` variables are hoisted with `undefined`; `let` and `const` remain in the Temporal Dead Zone (TDZ).
- **Implementation in Code**:
  - `frontend/src/utils/jsConceptsDemo.js`: `demonstrateHoisting()` showing function declaration invocation before line declaration vs TDZ behavior.
