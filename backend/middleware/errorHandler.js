/**
 * Global Error Handler Middleware
 * Demonstrates server-side error handling concept for Express applications.
 */
const errorHandler = (err, req, res, next) => {
    console.error("Server Error:", err.stack || err.message || err);

    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    
    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
        error: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
};

module.exports = errorHandler;
