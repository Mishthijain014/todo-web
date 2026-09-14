import React from "react";
import { Sparkles, Brain, ArrowRight, CheckCircle2 } from "lucide-react";

/**
 * AI Task Organization Output Renderer Component
 * Concepts: AI LLM Integration, Prompt Engineering, Structured Outputs Rendering
 */
const AISuggestions = ({ suggestions, onApplySuggestions, loading }) => {
  if (!suggestions || !suggestions.suggestions || suggestions.suggestions.length === 0) {
    return null;
  }

  const items = suggestions.suggestions;

  const getPriorityBadgeClass = (priority) => {
    switch (priority) {
      case "High": return "badge-high";
      case "Medium": return "badge-medium";
      case "Low": return "badge-low";
      default: return "badge-medium";
    }
  };

  return (
    <div className="glass-card animate-fade" style={{
      padding: "20px",
      border: "1px solid rgba(236, 72, 153, 0.3)",
      background: "linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(88, 28, 135, 0.3) 100%)",
      marginTop: "24px"
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "16px",
        flexWrap: "wrap",
        gap: "10px"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            background: "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)",
            padding: "8px",
            borderRadius: "10px",
            display: "flex"
          }}>
            <Brain size={20} color="#ffffff" />
          </div>
          <div>
            <h4 style={{
              fontSize: "1.1rem",
              fontWeight: 700,
              color: "#ffffff",
              fontFamily: "var(--font-heading)"
            }}>
              AI Structured Task Analysis
            </h4>
            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: 0 }}>
              Generated via LLM API integration & prompt engineering
            </p>
          </div>
        </div>

        {onApplySuggestions && (
          <button
            onClick={onApplySuggestions}
            className="btn btn-ai btn-sm"
            disabled={loading}
          >
            <CheckCircle2 size={16} />
            <span>Apply AI Recommendations</span>
          </button>
        )}
      </div>

      {/* Structured Output Grid */}
      <div style={{ display: "grid", gap: "12px", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
        {items.map((item, idx) => (
          <div key={idx} style={{
            background: "rgba(15, 23, 42, 0.6)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "var(--radius-md)",
            padding: "14px",
            display: "flex",
            flexDirection: "column",
            gap: "8px"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontWeight: 600, fontSize: "0.95rem", color: "#f8fafc" }}>
                {item.task}
              </span>
              <div style={{ display: "flex", gap: "6px" }}>
                <span className={`badge ${getPriorityBadgeClass(item.priority)}`}>
                  {item.priority}
                </span>
                <span className="badge badge-category">
                  {item.category}
                </span>
              </div>
            </div>
            {item.reasoning && (
              <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontStyle: "italic", margin: 0 }}>
                "{item.reasoning}"
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AISuggestions;
