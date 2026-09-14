import React, { useState, useEffect } from "react";
import { X, Database, Table, GitMerge, Loader2 } from "lucide-react";
import { todoAPI } from "../services/api";

/**
 * SQL Analytics & Relational Schema Modal
 * Concepts: SQL Relational Schema Design (PK/FK), SQL JOINs (INNER JOIN, LEFT JOIN)
 */
const SQLAnalyticsModal = ({ isOpen, onClose }) => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      fetchReport();
    }
  }, [isOpen]);

  const fetchReport = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await todoAPI.getSqlAnalytics();
      setReport(data.report);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(15, 23, 42, 0.85)",
      backdropFilter: "blur(12px)",
      zIndex: 1000,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px"
    }}>
      <div className="glass-card animate-fade" style={{
        maxWidth: "800px",
        width: "100%",
        maxHeight: "90vh",
        overflowY: "auto",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        border: "1px solid rgba(52, 211, 153, 0.4)"
      }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Database size={24} color="#34d399" />
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, fontFamily: "var(--font-heading)" }}>
              PostgreSQL Relational Schema & SQL JOINs Report
            </h3>
          </div>
          <button onClick={onClose} className="btn btn-secondary btn-sm">
            <X size={18} />
          </button>
        </div>

        {loading ? (
          <div style={{ padding: "40px", textAlign: "center" }}>
            <Loader2 className="spin" size={32} color="#34d399" />
            <p style={{ marginTop: "12px", color: "var(--text-muted)" }}>Generating SQL Relational Query Report...</p>
          </div>
        ) : error ? (
          <div style={{ color: "#fca5a5", padding: "16px", background: "rgba(239,68,68,0.1)", borderRadius: "var(--radius-md)" }}>
            Error: {error}
          </div>
        ) : report ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* Relational Schema PK/FK Box */}
            <div style={{ background: "rgba(15, 23, 42, 0.6)", padding: "16px", borderRadius: "var(--radius-md)", border: "1px solid var(--border)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#34d399", fontWeight: 600, marginBottom: "8px" }}>
                <Table size={18} />
                <span>1. Relational Schema Design (Primary Key / Foreign Key)</span>
              </div>
              <ul style={{ paddingLeft: "20px", fontSize: "0.85rem", color: "var(--text-muted)" }}>
                <li><strong>Users Table:</strong> <code>{report.relationalSchema?.usersTable}</code></li>
                <li><strong>Todos Table:</strong> <code>{report.relationalSchema?.todosTable}</code></li>
                <li><strong>Foreign Key Constraint:</strong> <code>{report.relationalSchema?.foreignKeyConstraint}</code></li>
              </ul>
            </div>

            {/* SQL INNER JOIN Box */}
            <div style={{ background: "rgba(15, 23, 42, 0.6)", padding: "16px", borderRadius: "var(--radius-md)", border: "1px solid var(--border)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#60a5fa", fontWeight: 600, marginBottom: "8px" }}>
                <GitMerge size={18} />
                <span>2. SQL INNER JOIN Query</span>
              </div>
              <pre style={{ background: "#020617", padding: "12px", borderRadius: "var(--radius-sm)", fontSize: "0.8rem", color: "#93c5fd", overflowX: "auto" }}>
                {report.sqlQueriesExecuted?.innerJoin}
              </pre>
            </div>

            {/* SQL LEFT JOIN Aggregation Box */}
            <div style={{ background: "rgba(15, 23, 42, 0.6)", padding: "16px", borderRadius: "var(--radius-md)", border: "1px solid var(--border)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#f472b6", fontWeight: 600, marginBottom: "8px" }}>
                <GitMerge size={18} />
                <span>3. SQL LEFT JOIN Aggregation Analytics</span>
              </div>
              <pre style={{ background: "#020617", padding: "12px", borderRadius: "var(--radius-sm)", fontSize: "0.8rem", color: "#fbcfe8", overflowX: "auto" }}>
                {report.sqlQueriesExecuted?.leftJoinAggregate}
              </pre>
              <div style={{ marginTop: "12px", fontSize: "0.85rem", color: "var(--text-main)", background: "rgba(255,255,255,0.05)", padding: "10px", borderRadius: "var(--radius-sm)" }}>
                <strong>User Analytics Result:</strong> Total Tasks: {report.leftJoinAnalyticsSample?.total_todos}, Completed: {report.leftJoinAnalyticsSample?.completed_todos}, Pending: {report.leftJoinAnalyticsSample?.pending_todos}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SQLAnalyticsModal;
