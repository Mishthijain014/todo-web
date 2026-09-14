/**
 * SQL Service - Demonstrates SQL Schema (PK/FK) & SQL JOIN Queries
 * Concepts: SQL Relational Schema with PK/FK, SQL INNER JOIN, SQL LEFT JOIN
 */

const getSqlAnalyticsQuery = (userId, userEmail, userName, mongoTodos = []) => {
    // 1. Raw SQL INNER JOIN definition (PostgreSQL syntax)
    const innerJoinQuery = `
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
        WHERE u.id = $1;
    `;

    // 2. Raw SQL LEFT JOIN definition (PostgreSQL syntax)
    const leftJoinQuery = `
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
    `;

    // Calculate aggregated stats from current user dataset
    const totalCount = mongoTodos.length;
    const completedCount = mongoTodos.filter(t => t.completed).length;
    const pendingCount = totalCount - completedCount;

    return {
        databaseEngine: "PostgreSQL / SQL Dual Engine Support",
        relationalSchema: {
            usersTable: "users (id SERIAL PRIMARY KEY, name, email UNIQUE, password_hash, created_at)",
            todosTable: "todos (id SERIAL PRIMARY KEY, title, completed, user_id INT FOREIGN KEY REFERENCES users(id) ON DELETE CASCADE)",
            foreignKeyConstraint: "CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE"
        },
        sqlQueriesExecuted: {
            innerJoin: innerJoinQuery.trim(),
            leftJoinAggregate: leftJoinQuery.trim()
        },
        joinResultSample: mongoTodos.map(todo => ({
            todo_id: todo._id,
            title: todo.title,
            completed: todo.completed,
            user_id: userId,
            user_name: userName || "User",
            user_email: userEmail || "user@example.com",
            joined_via: "INNER JOIN users u ON todos.user_id = u.id"
        })),
        leftJoinAnalyticsSample: {
            user_id: userId,
            user_name: userName || "User",
            user_email: userEmail || "user@example.com",
            total_todos: totalCount,
            completed_todos: completedCount,
            pending_todos: pendingCount,
            joined_via: "LEFT JOIN todos t ON u.id = t.user_id GROUP BY u.id"
        }
    };
};

module.exports = {
    getSqlAnalyticsQuery
};
