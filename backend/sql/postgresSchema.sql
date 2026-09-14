-- PostgreSQL Relational Schema Design with PK/FK and SQL JOINs
-- Concept Checklist: Relational Schema Design (PK/FK), SQL JOINs

-- 1. Create Users Table with Primary Key
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Create Todos Table with Foreign Key referencing Users Table (PK/FK Relation)
CREATE TABLE IF NOT EXISTS todos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    priority VARCHAR(20) DEFAULT 'Medium' CHECK (priority IN ('Low', 'Medium', 'High')),
    category VARCHAR(50) DEFAULT 'General',
    user_id INT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 3. Create Index on Foreign Key column for query performance
CREATE INDEX IF NOT EXISTS idx_todos_user_id ON todos(user_id);

-- ----------------------------------------------------
-- Mandatory SQL Queries Demonstrations
-- ----------------------------------------------------

-- SQL INNER JOIN: Fetch active todos along with user profile information
SELECT 
    t.id AS todo_id,
    t.title,
    t.completed,
    t.priority,
    t.category,
    u.id AS user_id,
    u.name AS user_name,
    u.email AS user_email
FROM todos t
INNER JOIN users u ON t.user_id = u.id
WHERE u.id = $1
ORDER BY t.created_at DESC;

-- SQL LEFT JOIN (Aggregation & Analytics): Count total and completed todos per user
SELECT 
    u.id AS user_id,
    u.name AS user_name,
    u.email,
    COUNT(t.id) AS total_todos,
    COUNT(CASE WHEN t.completed = true THEN 1 END) AS completed_todos,
    COUNT(CASE WHEN t.completed = false THEN 1 END) AS pending_todos
FROM users u
LEFT JOIN todos t ON u.id = t.user_id
GROUP BY u.id, u.name, u.email;
