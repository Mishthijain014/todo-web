/**
 * Async API Service Layer
 * Concepts: Async data fetching from API, Promises vs Callbacks, async/await, RESTful integration
 */

const API_BASE_URL = "http://localhost:5001/api";

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {})
    };
};

const handleResponse = async (response) => {
    const contentType = response.headers.get("content-type");
    
    if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Backend server is not reachable on http://localhost:5001. Please restart backend using 'npm run dev' inside backend folder.");
    }

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "An error occurred with the request");
    }
    return data;
};

// 1. Authentication API Services
export const authAPI = {
    signup: async (name, email, password) => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password })
            });
            return await handleResponse(response);
        } catch (error) {
            if (error.name === "TypeError" && error.message.includes("fetch")) {
                throw new Error("Cannot connect to Backend server at http://localhost:5001. Please restart the backend server.");
            }
            throw error;
        }
    },

    login: async (email, password) => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });
            return await handleResponse(response);
        } catch (error) {
            if (error.name === "TypeError" && error.message.includes("fetch")) {
                throw new Error("Cannot connect to Backend server at http://localhost:5001. Please restart the backend server.");
            }
            throw error;
        }
    }
};

// 2. Todo API Services (Protected RESTful Endpoints)
export const todoAPI = {
    getTodos: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/todos`, {
                method: "GET",
                headers: getAuthHeaders()
            });
            return await handleResponse(response);
        } catch (error) {
            if (error.name === "TypeError" && error.message.includes("fetch")) {
                throw new Error("Cannot connect to Backend server at http://localhost:5001.");
            }
            throw error;
        }
    },

    createTodo: async (title, priority = "Medium", category = "General") => {
        const response = await fetch(`${API_BASE_URL}/todos`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify({ title, priority, category })
        });
        return await handleResponse(response);
    },

    updateTodo: async (id, updates) => {
        const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify(updates)
        });
        return await handleResponse(response);
    },

    deleteTodo: async (id) => {
        const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
            method: "DELETE",
            headers: getAuthHeaders()
        });
        return await handleResponse(response);
    },

    // AI Task Organization Endpoint Integration
    aiOrganize: async () => {
        const response = await fetch(`${API_BASE_URL}/todos/ai-organize`, {
            method: "POST",
            headers: getAuthHeaders()
        });
        return await handleResponse(response);
    },

    // SQL Analytics & Relational Schema Endpoint Integration
    getSqlAnalytics: async () => {
        const response = await fetch(`${API_BASE_URL}/todos/sql-analytics`, {
            method: "GET",
            headers: getAuthHeaders()
        });
        return await handleResponse(response);
    }
};
