import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckSquare, User, Mail, Lock, ArrowRight } from "lucide-react";
import { authAPI } from "../services/api";
import ErrorMessage from "../components/ErrorMessage";

/**
 * Signup Page Component
 * Concepts: Controlled forms, useState state management, async API registration, client-side routing
 */
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    try {
      await authAPI.signup(name, email, password);
      setSuccessMsg("Account created successfully! Redirecting to login...");
      
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(err.message || "Failed to create account. Email may already be registered.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px"
    }}>
      <div className="glass-card animate-fade" style={{
        maxWidth: "440px",
        width: "100%",
        padding: "36px 30px",
        display: "flex",
        flexDirection: "column",
        gap: "24px"
      }}>
        {/* Header */}
        <div style={{ textAlign: "center" }}>
          <div style={{
            background: "var(--primary-gradient)",
            width: "48px",
            height: "48px",
            borderRadius: "14px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "12px",
            boxShadow: "var(--shadow-glow)"
          }}>
            <CheckSquare size={28} color="#ffffff" />
          </div>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 700, fontFamily: "var(--font-heading)" }}>
            Create Account
          </h2>
          <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", marginTop: "4px" }}>
            Join TaskMaster Pro to experience full-stack & AI task management
          </p>
        </div>

        {/* Error / Success Alerts */}
        <ErrorMessage message={error} onClose={() => setError("")} />
        {successMsg && (
          <div style={{
            background: "rgba(16, 185, 129, 0.15)",
            border: "1px solid rgba(16, 185, 129, 0.3)",
            color: "#34d399",
            padding: "12px 16px",
            borderRadius: "var(--radius-md)",
            fontSize: "0.88rem",
            fontWeight: 500
          }}>
            {successMsg}
          </div>
        )}

        {/* Signup Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: "6px", display: "block" }}>
              Full Name
            </label>
            <div style={{ position: "relative" }}>
              <User size={18} color="var(--text-dim)" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} />
              <input
                type="text"
                className="input-field"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ paddingLeft: "42px" }}
                disabled={loading}
                required
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: "6px", display: "block" }}>
              Email Address
            </label>
            <div style={{ position: "relative" }}>
              <Mail size={18} color="var(--text-dim)" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} />
              <input
                type="email"
                className="input-field"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ paddingLeft: "42px" }}
                disabled={loading}
                required
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: "6px", display: "block" }}>
              Password
            </label>
            <div style={{ position: "relative" }}>
              <Lock size={18} color="var(--text-dim)" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} />
              <input
                type="password"
                className="input-field"
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingLeft: "42px" }}
                disabled={loading}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{ width: "100%", padding: "12px", marginTop: "8px" }}
          >
            {loading ? "Registering..." : (
              <>
                <span>Create Account</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <p style={{ textAlign: "center", fontSize: "0.88rem", color: "var(--text-muted)", margin: 0 }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "var(--primary)", fontWeight: 600, textDecoration: "none" }}>
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
