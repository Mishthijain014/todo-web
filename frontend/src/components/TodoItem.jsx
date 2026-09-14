import React, { useState } from "react";
import { Check, Edit2, Trash2, Save, X } from "lucide-react";

/**
 * TodoItem Component
 * Concepts: React component composition, useState state management, inline editing
 */
const TodoItem = ({ todo, onToggleComplete, onUpdateTodo, onDeleteTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editPriority, setEditPriority] = useState(todo.priority || "Medium");
  const [editCategory, setEditCategory] = useState(todo.category || "General");

  const handleSave = () => {
    if (!editTitle.trim()) return;
    onUpdateTodo(todo._id, {
      title: editTitle.trim(),
      priority: editPriority,
      category: editCategory
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditPriority(todo.priority || "Medium");
    setEditCategory(todo.category || "General");
    setIsEditing(false);
  };

  const getPriorityBadgeClass = (priority) => {
    switch (priority) {
      case "High": return "badge-high";
      case "Medium": return "badge-medium";
      case "Low": return "badge-low";
      default: return "badge-medium";
    }
  };

  return (
    <div style={{
      background: todo.completed ? "rgba(15, 23, 42, 0.4)" : "rgba(30, 41, 59, 0.5)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-md)",
      padding: "14px 18px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "14px",
      transition: "var(--transition)",
      opacity: todo.completed ? 0.75 : 1
    }}>
      {isEditing ? (
        /* Edit Mode */
        <div style={{ display: "flex", gap: "10px", width: "100%", alignItems: "center" }}>
          <input
            type="text"
            className="input-field"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            style={{ flex: 1 }}
            autoFocus
          />
          <select
            className="input-field"
            value={editPriority}
            onChange={(e) => setEditPriority(e.target.value)}
            style={{ width: "110px" }}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <button onClick={handleSave} className="btn btn-primary btn-sm">
            <Save size={16} />
          </button>
          <button onClick={handleCancel} className="btn btn-secondary btn-sm">
            <X size={16} />
          </button>
        </div>
      ) : (
        /* Normal View Mode */
        <>
          <div style={{ display: "flex", alignItems: "center", gap: "14px", flex: 1, minWidth: 0 }}>
            {/* Custom Checkbox Toggle */}
            <button
              onClick={() => onToggleComplete(todo._id, !todo.completed)}
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "6px",
                border: todo.completed ? "none" : "2px solid #64748b",
                background: todo.completed ? "var(--success)" : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "var(--transition)",
                flexShrink: 0
              }}
            >
              {todo.completed && <Check size={16} color="#ffffff" strokeWidth={3} />}
            </button>

            {/* Title & Badges */}
            <div style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: 0 }}>
              <span style={{
                fontSize: "1rem",
                fontWeight: 500,
                color: todo.completed ? "var(--text-dim)" : "var(--text-main)",
                textDecoration: todo.completed ? "line-through" : "none",
                wordBreak: "break-word"
              }}>
                {todo.title}
              </span>
              
              <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                <span className={`badge ${getPriorityBadgeClass(todo.priority)}`}>
                  {todo.priority || "Medium"}
                </span>
                <span className="badge badge-category">
                  {todo.category || "General"}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-secondary btn-sm"
              title="Edit Task"
            >
              <Edit2 size={15} color="#94a3b8" />
            </button>
            <button
              onClick={() => onDeleteTodo(todo._id)}
              className="btn btn-danger btn-sm"
              title="Delete Task"
            >
              <Trash2 size={15} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoItem;
