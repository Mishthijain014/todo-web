import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import AISuggestions from "../components/AISuggestions";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import JSConceptsModal from "../components/JSConceptsModal";
import SQLAnalyticsModal from "../components/SQLAnalyticsModal";
import { todoAPI } from "../services/api";
import { Sparkles, Brain, RefreshCw, BarChart2 } from "lucide-react";

/**
 * Main Task Dashboard Page
 * Mandatory Concepts Demonstrated:
 * 1. React Component Composition (Navbar, TodoForm, TodoList, AISuggestions, Modals)
 * 2. State management with useState (todos, loading, error, aiSuggestions, modals)
 * 3. Side effects with useEffect (fetch user todos on mount, token sync)
 * 4. Async data fetching from API (Promises + async/await)
 * 5. Loading & Error UI states
 * 6. AI Task Organization integration & structured output rendering
 */
const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  // AI & Modals state
  const [aiSuggestions, setAiSuggestions] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [isJSModalOpen, setIsJSModalOpen] = useState(false);
  const [isSQLModalOpen, setIsSQLModalOpen] = useState(false);

  const navigate = useNavigate();

  // SIDE EFFECT (useEffect): Load user profile & fetch tasks on mount
  useEffect(() => {
    const storedUserStr = localStorage.getItem("user");
    if (storedUserStr) {
      try {
        setUser(JSON.parse(storedUserStr));
      } catch (e) {
        // Ignore parse error
      }
    }

    fetchTodos();
  }, []);

  // ASYNC API FETCHING FUNCTION
  const fetchTodos = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await todoAPI.getTodos();
      setTodos(data);
    } catch (err) {
      setError(err.message || "Failed to load tasks from server.");
    } finally {
      setLoading(false);
    }
  };

  // Handler: Add New Todo
  const handleAddTodo = async (title, priority, category) => {
    try {
      const data = await todoAPI.createTodo(title, priority, category);
      // State update with new todo
      setTodos((prevTodos) => [data.todo, ...prevTodos]);
    } catch (err) {
      setError(err.message || "Failed to create task.");
    }
  };

  // Handler: Toggle Completion Status
  const handleToggleComplete = async (id, completed) => {
    try {
      // Optimistic state update
      setTodos((prev) =>
        prev.map((t) => (t._id === id ? { ...t, completed } : t))
      );
      await todoAPI.updateTodo(id, { completed });
    } catch (err) {
      setError(err.message || "Failed to update completion status.");
      fetchTodos(); // Revert on failure
    }
  };

  // Handler: Update Todo Title/Priority/Category
  const handleUpdateTodo = async (id, updates) => {
    try {
      const data = await todoAPI.updateTodo(id, updates);
      setTodos((prev) =>
        prev.map((t) => (t._id === id ? data.todo : t))
      );
    } catch (err) {
      setError(err.message || "Failed to update task.");
    }
  };

  // Handler: Delete Todo
  const handleDeleteTodo = async (id) => {
    try {
      setTodos((prev) => prev.filter((t) => t._id !== id));
      await todoAPI.deleteTodo(id);
    } catch (err) {
      setError(err.message || "Failed to delete task.");
      fetchTodos();
    }
  };

  // Handler: Trigger AI Task Organization (LLM API Integration)
  const handleAIOrganize = async () => {
    if (todos.length === 0) {
      setError("Please add some tasks before organizing with AI.");
      return;
    }

    setAiLoading(true);
    setError("");
    try {
      const data = await todoAPI.aiOrganize();
      setAiSuggestions(data.structuredOutput);
    } catch (err) {
      setError(err.message || "Failed to run AI Task Analysis.");
    } finally {
      setAiLoading(false);
    }
  };

  // Handler: Apply AI Suggestions to local tasks
  const handleApplyAISuggestions = () => {
    if (!aiSuggestions || !aiSuggestions.suggestions) return;

    const suggestionsMap = new Map();
    aiSuggestions.suggestions.forEach((item) => {
      suggestionsMap.set(item.task.toLowerCase(), item);
    });

    // Update matching tasks with AI priority and category
    todos.forEach((todo) => {
      const match = suggestionsMap.get(todo.title.toLowerCase());
      if (match) {
        handleUpdateTodo(todo._id, {
          priority: match.priority,
          category: match.category
        });
      }
    });

    setAiSuggestions(null);
  };

  // Handler: Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Stats calculation
  const totalTasks = todos.length;
  const completedTasks = todos.filter((t) => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const completionPercentage = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Navbar Header */}
      <Navbar
        user={user}
        onLogout={handleLogout}
        onOpenJSModal={() => setIsJSModalOpen(true)}
        onOpenSQLModal={() => setIsSQLModalOpen(true)}
      />

      {/* Main Container */}
      <main style={{
        flex: 1,
        maxWidth: "1100px",
        width: "100%",
        margin: "0 auto",
        padding: "24px 20px"
      }}>
        {/* Banner Card */}
        <div className="glass-card animate-fade" style={{
          padding: "24px",
          marginBottom: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "16px"
        }}>
          <div>
            <h2 style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              fontFamily: "var(--font-heading)",
              color: "#ffffff",
              marginBottom: "4px"
            }}>
              Task Management Dashboard
            </h2>
            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", margin: 0 }}>
              Organize daily goals, track progress, and trigger AI structured priorities.
            </p>
          </div>

          {/* AI Trigger Button */}
          <button
            onClick={handleAIOrganize}
            className="btn btn-ai"
            disabled={aiLoading || todos.length === 0}
          >
            {aiLoading ? (
              <RefreshCw className="spin" size={18} />
            ) : (
              <Sparkles size={18} />
            )}
            <span>{aiLoading ? "Analyzing Tasks..." : "Organize with AI"}</span>
          </button>
        </div>

        {/* Stats Overview */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "14px",
          marginBottom: "24px"
        }}>
          <div className="glass-card" style={{ padding: "16px" }}>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600 }}>TOTAL TASKS</span>
            <h3 style={{ fontSize: "1.6rem", fontWeight: 700, color: "#ffffff", marginTop: "4px" }}>{totalTasks}</h3>
          </div>
          <div className="glass-card" style={{ padding: "16px" }}>
            <span style={{ fontSize: "0.8rem", color: "#34d399", fontWeight: 600 }}>COMPLETED</span>
            <h3 style={{ fontSize: "1.6rem", fontWeight: 700, color: "#34d399", marginTop: "4px" }}>{completedTasks}</h3>
          </div>
          <div className="glass-card" style={{ padding: "16px" }}>
            <span style={{ fontSize: "0.8rem", color: "#fbbf24", fontWeight: 600 }}>PENDING</span>
            <h3 style={{ fontSize: "1.6rem", fontWeight: 700, color: "#fbbf24", marginTop: "4px" }}>{pendingTasks}</h3>
          </div>
          <div className="glass-card" style={{ padding: "16px" }}>
            <span style={{ fontSize: "0.8rem", color: "#a5b4fc", fontWeight: 600 }}>PROGRESS</span>
            <h3 style={{ fontSize: "1.6rem", fontWeight: 700, color: "#a5b4fc", marginTop: "4px" }}>{completionPercentage}%</h3>
          </div>
        </div>

        {/* Error Alert Display */}
        <ErrorMessage message={error} onClose={() => setError("")} />

        {/* Add Task Form Card */}
        <div className="glass-card" style={{ padding: "20px", marginBottom: "24px" }}>
          <TodoForm onAddTodo={handleAddTodo} disabled={loading} />
        </div>

        {/* AI Suggestions Display Component */}
        <AISuggestions
          suggestions={aiSuggestions}
          onApplySuggestions={handleApplyAISuggestions}
          loading={loading}
        />

        {/* Task List Component with Loading State */}
        <div className="glass-card" style={{ padding: "20px" }}>
          {loading ? (
            <LoadingSpinner message="Fetching your tasks from database..." />
          ) : (
            <TodoList
              todos={todos}
              onToggleComplete={handleToggleComplete}
              onUpdateTodo={handleUpdateTodo}
              onDeleteTodo={handleDeleteTodo}
            />
          )}
        </div>
      </main>

      {/* Modals for Concept Inspection */}
      <JSConceptsModal
        isOpen={isJSModalOpen}
        onClose={() => setIsJSModalOpen(false)}
      />

      <SQLAnalyticsModal
        isOpen={isSQLModalOpen}
        onClose={() => setIsSQLModalOpen(false)}
      />
    </div>
  );
};

export default Dashboard;
