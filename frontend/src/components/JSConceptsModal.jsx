import React, { useState } from "react";
import { X, Play, Code2, Terminal, CheckCircle2 } from "lucide-react";
import {
  demonstrateHoisting,
  demonstrateClosure,
  demonstratePromisesVsCallbacks,
  demonstrateAsyncAwait,
  demonstrateEventLoop
} from "../utils/jsConceptsDemo";

/**
 * JS Concepts Inspector Modal
 * Concepts: JavaScript Core Concepts Inspector (Event Loop, Promises vs Callbacks, Async/Await, Closures, Hoisting)
 */
const JSConceptsModal = ({ isOpen, onClose }) => {
  const [logs, setLogs] = useState([]);
  const [activeConcept, setActiveConcept] = useState("");

  if (!isOpen) return null;

  const runConcept = async (name, fn) => {
    setActiveConcept(name);
    setLogs(["Running concept demonstration..."]);
    try {
      const result = await fn();
      setLogs(result);
    } catch (err) {
      setLogs([`Error executing ${name}:`, err.message]);
    }
  };

  const concepts = [
    { name: "Event Loop", desc: "Microtasks vs Macrotasks execution queue", fn: demonstrateEventLoop },
    { name: "Promises vs Callbacks", desc: "Callback promisification & flat chains", fn: demonstratePromisesVsCallbacks },
    { name: "Async / Await", desc: "Sequential async syntax built on Promises", fn: demonstrateAsyncAwait },
    { name: "Closures", desc: "Lexical scope environment & private state", fn: demonstrateClosure },
    { name: "Hoisting", desc: "Function declaration hoisting vs TDZ", fn: demonstrateHoisting },
  ];

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
        maxWidth: "750px",
        width: "100%",
        maxHeight: "90vh",
        overflowY: "auto",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        border: "1px solid rgba(99, 102, 241, 0.4)"
      }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Code2 size={24} color="var(--primary)" />
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, fontFamily: "var(--font-heading)" }}>
              Mandatory JS Core Concepts Inspector
            </h3>
          </div>
          <button onClick={onClose} className="btn btn-secondary btn-sm">
            <X size={18} />
          </button>
        </div>

        <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", margin: 0 }}>
          Click any concept below to execute its live implementation and view runtime logs:
        </p>

        {/* Concept Buttons Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "10px" }}>
          {concepts.map((c) => (
            <button
              key={c.name}
              onClick={() => runConcept(c.name, c.fn)}
              className="btn btn-secondary"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: "12px",
                textAlign: "left",
                borderColor: activeConcept === c.name ? "var(--primary)" : "var(--border)",
                background: activeConcept === c.name ? "rgba(99, 102, 241, 0.2)" : "rgba(30, 41, 59, 0.6)"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "6px", width: "100%", justifyContent: "space-between" }}>
                <span style={{ fontWeight: 700, fontSize: "0.9rem", color: "#f8fafc" }}>{c.name}</span>
                <Play size={14} color="var(--primary)" />
              </div>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "4px" }}>{c.desc}</span>
            </button>
          ))}
        </div>

        {/* Console Log Terminal Output */}
        <div style={{
          background: "#020617",
          borderRadius: "var(--radius-md)",
          padding: "16px",
          border: "1px solid #1e293b",
          fontFamily: "monospace",
          fontSize: "0.85rem",
          minHeight: "180px",
          color: "#38bdf8"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", borderBottom: "1px solid #1e293b", paddingBottom: "8px", marginBottom: "12px", color: "#64748b" }}>
            <Terminal size={16} />
            <span>Interactive Runtime Terminal</span>
          </div>

          {logs.length === 0 ? (
            <span style={{ color: "#64748b" }}>Select a JavaScript concept above to view execution logs...</span>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {logs.map((log, index) => (
                <div key={index} style={{ color: log.startsWith("===") ? "#f43f5e" : "#38bdf8" }}>
                  {log}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JSConceptsModal;
