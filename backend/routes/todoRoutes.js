const express = require("express");

const {
    createTodo,
    getTodos,
    updateTodo,
    deleteTodo,
    aiOrganizeTodos,
    getSqlAnalytics,
} = require("../controllers/todoController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createTodo);

router.get("/", authMiddleware, getTodos);

router.put("/:id", authMiddleware, updateTodo);

router.delete("/:id", authMiddleware, deleteTodo);

// Mandatory Concept Routes
router.post("/ai-organize", authMiddleware, aiOrganizeTodos);

router.get("/sql-analytics", authMiddleware, getSqlAnalytics);

module.exports = router;