import React from "react";
import { AlertCircle, X } from "lucide-react";

/**
 * Loading & Error UI States Component
 * Concept: Error UI state rendering
 */
const ErrorMessage = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div style={{
      background: "rgba(239, 68, 68, 0.12)",
      border: "1px solid rgba(239, 68, 68, 0.3)",
      color: "#fca5a5",
      padding: "12px 16px",
      borderRadius: "var(--radius-md)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "20px",
      animation: "fadeIn 0.3s ease"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <AlertCircle size={20} color="#ef4444" />
        <span style={{ fontSize: "0.9rem", fontWeight: 500 }}>{message}</span>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            color: "#fca5a5",
            cursor: "pointer",
            display: "flex",
            alignItems: "center"
          }}
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
