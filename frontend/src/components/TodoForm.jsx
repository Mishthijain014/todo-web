import React, { useState } from "react";
import { Plus, Tag, Flag } from "lucide-react";

/**
 * Controlled Form Component
 * Concepts: Controlled inputs, state management with useState, form handling
 */
const TodoForm = ({ onAddTodo, disabled }) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [category, setCategory] = useState("Work");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTodo(title.trim(), priority, category);
    setTitle(""); // Reset controlled input
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <input
          type="text"
          className="input-field"
          placeholder="What needs to be done today?..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={disabled}
          style={{ flex: "1 1 300px" }}
        />
        
        <div style={{ display: "flex", gap: "10px", flex: "0 0 auto" }}>
          {/* Priority Select */}
          <select
            className="input-field"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            disabled={disabled}
            style={{ width: "120px" }}
          >
            <option value="High">🔴 High</option>
            <option value="Medium">🟡 Medium</option>
            <option value="Low">🟢 Low</option>
          </select>

          {/* Category Select */}
          <select
            className="input-field"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={disabled}
            style={{ width: "130px" }}
          >
            <option value="Work">💼 Work</option>
            <option value="Study">📚 Study</option>
            <option value="Personal">👤 Personal</option>
            <option value="Health">🏥 Health</option>
            <option value="Other">📌 Other</option>
          </select>

          {/* Add Button */}
          <button
            type="submit"
            className="btn btn-primary"
            disabled={disabled || !title.trim()}
          >
            <Plus size={18} />
            <span>Add Task</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default TodoForm;
