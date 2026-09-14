import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckSquare, LogIn, Lock, Mail, ArrowRight } from "lucide-react";
import { authAPI } from "../services/api";
import ErrorMessage from "../components/ErrorMessage";

/**
 * Login Page Component
 * Concepts: Controlled forms, useState state management, async API fetching, client-side routing
 */
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in both email and password.");
      return;
    }

    setLoading(true);

    try {
      const data = await authAPI.login(email, password);
      // Store JWT token and user info
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Navigate to Dashboard
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Failed to log in. Please check credentials.");
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
        maxWidth: "420px",
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
            Welcome Back
          </h2>
          <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", marginTop: "4px" }}>
            Log in to manage your tasks & AI organizer
          </p>
        </div>

        {/* Error Alert */}
        <ErrorMessage message={error} onClose={() => setError("")} />

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
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
                placeholder="••••••••"
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
            {loading ? "Authenticating..." : (
              <>
                <span>Sign In</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <p style={{ textAlign: "center", fontSize: "0.88rem", color: "var(--text-muted)", margin: 0 }}>
          Don't have an account?{" "}
          <Link to="/signup" style={{ color: "var(--primary)", fontWeight: 600, textDecoration: "none" }}>
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
