import React, { useState } from "react";
import TodoItem from "./TodoItem";
import { CheckCircle2, Filter } from "lucide-react";

/**
 * TodoList Component
 * Concepts: React component composition, state management with useState for filtering
 */
const TodoList = ({ todos, onToggleComplete, onUpdateTodo, onDeleteTodo }) => {
  const [filter, setFilter] = useState("all");

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {/* Header & Filter Controls */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "10px"
      }}>
        <h3 style={{
          fontSize: "1.1rem",
          fontWeight: 600,
          color: "var(--text-main)",
          fontFamily: "var(--font-heading)"
        }}>
          Your Tasks ({todos.length})
        </h3>

        {/* Filter Tabs */}
        <div style={{
          display: "flex",
          background: "rgba(15, 23, 42, 0.6)",
          padding: "4px",
          borderRadius: "var(--radius-md)",
          border: "1px solid var(--border)",
          gap: "4px"
        }}>
          {["all", "active", "completed"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              style={{
                background: filter === type ? "var(--primary)" : "transparent",
                color: filter === type ? "#ffffff" : "var(--text-muted)",
                border: "none",
                padding: "4px 12px",
                borderRadius: "var(--radius-sm)",
                fontSize: "0.8rem",
                fontWeight: 600,
                cursor: "pointer",
                textTransform: "capitalize",
                transition: "var(--transition)"
              }}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Task List Items */}
      {filteredTodos.length === 0 ? (
        <div style={{
          textAlign: "center",
          padding: "40px 20px",
          background: "rgba(15, 23, 42, 0.3)",
          borderRadius: "var(--radius-md)",
          border: "1px dashed var(--border)",
          color: "var(--text-dim)"
        }}>
          <CheckCircle2 size={40} color="var(--primary)" style={{ opacity: 0.5, marginBottom: "10px" }} />
          <p style={{ fontSize: "0.95rem", fontWeight: 500 }}>
            {filter === "all" ? "No tasks added yet. Add a new task above!" : `No ${filter} tasks found.`}
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onToggleComplete={onToggleComplete}
              onUpdateTodo={onUpdateTodo}
              onDeleteTodo={onDeleteTodo}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoList;
