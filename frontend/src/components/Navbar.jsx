import React from "react";
import { CheckSquare, LogOut, Code2, Database, Sparkles } from "lucide-react";

/**
 * React Component Composition: Navbar Header
 */
const Navbar = ({ user, onLogout, onOpenJSModal, onOpenSQLModal }) => {
  return (
    <header className="glass-header">
      <div style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "14px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            background: "var(--primary-gradient)",
            width: "38px",
            height: "38px",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 12px rgba(99, 102, 241, 0.4)"
          }}>
            <CheckSquare size={22} color="#ffffff" />
          </div>
          <div>
            <h1 style={{
              fontFamily: "var(--font-heading)",
              fontSize: "1.25rem",
              fontWeight: 700,
              color: "white",
              letterSpacing: "-0.5px",
              lineHeight: 1.2
            }}>
              TaskMaster <span style={{ color: "#a5b4fc" }}>Pro</span>
            </h1>
            <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", margin: 0 }}>
              Full-Stack & AI Organiser
            </p>
          </div>
        </div>

        {/* Actions & User Info */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* JS Concepts Button */}
          <button 
            onClick={onOpenJSModal}
            className="btn btn-secondary btn-sm"
            title="Inspect JavaScript Core Concepts"
          >
            <Code2 size={16} color="#818cf8" />
            <span className="hide-mobile">JS Concepts</span>
          </button>

          {/* SQL Relational Schema Button */}
          <button 
            onClick={onOpenSQLModal}
            className="btn btn-secondary btn-sm"
            title="Inspect PostgreSQL Relational Schema & JOINs"
          >
            <Database size={16} color="#34d399" />
            <span className="hide-mobile">SQL Schema & JOINs</span>
          </button>

          {/* User Badge */}
          {user && (
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(255, 255, 255, 0.06)",
              padding: "6px 12px",
              borderRadius: "var(--radius-full)",
              border: "1px solid var(--border)",
              fontSize: "0.85rem",
              fontWeight: 500
            }}>
              <div style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#10b981"
              }} />
              <span>{user.name || user.email}</span>
            </div>
          )}

          {/* Logout Button */}
          <button
            onClick={onLogout}
            className="btn btn-danger btn-sm"
            title="Log out of application"
          >
            <LogOut size={16} />
            <span className="hide-mobile">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
