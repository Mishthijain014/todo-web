import React from "react";
import { Loader2 } from "lucide-react";

/**
 * Loading & Error UI States Component
 * Concept: Loading UI state rendering
 */
const LoadingSpinner = ({ message = "Loading data..." }) => {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 20px",
      color: "var(--text-muted)",
      gap: "12px"
    }}>
      <Loader2 className="spin" size={36} color="var(--primary)" />
      <span style={{ fontSize: "0.95rem", fontWeight: 500 }}>{message}</span>
    </div>
  );
};

export default LoadingSpinner;
