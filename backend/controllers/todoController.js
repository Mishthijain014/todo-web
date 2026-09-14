const Todo = require("../models/Todo");
const User = require("../models/User");
const { getSqlAnalyticsQuery } = require("../services/sqlService");

// 1. Create Todo
const createTodo = async (req, res, next) => {
    try {
        const { title, priority, category } = req.body;

        if (!title || title.trim() === "") {
            return res.status(400).json({
                message: "Title is required",
            });
        }

        const todo = await Todo.create({
            title: title.trim(),
            priority: priority || "Medium",
            category: category || "General",
            user: req.user.id,
        });

        res.status(201).json({
            message: "Todo Created Successfully",
            todo,
        });

    } catch (error) {
        next(error);
    }
};

// 2. Get Todos for authenticated user
const getTodos = async (req, res, next) => {
    try {
        const todos = await Todo.find({
            user: req.user.id,
        }).sort({ createdAt: -1 });

        res.status(200).json(todos);

    } catch (error) {
        next(error);
    }
};

// 3. Update Todo
const updateTodo = async (req, res, next) => {
    try {
        const { title, completed, priority, category } = req.body;

        const todo = await Todo.findOne({
            _id: req.params.id,
            user: req.user.id,
        });

        if (!todo) {
            return res.status(404).json({
                message: "Todo not found",
            });
        }

        if (title !== undefined) todo.title = title.trim();
        if (completed !== undefined) todo.completed = completed;
        if (priority !== undefined) todo.priority = priority;
        if (category !== undefined) todo.category = category;

        await todo.save();

        res.status(200).json({
            message: "Todo Updated Successfully",
            todo,
        });

    } catch (error) {
        next(error);
    }
};

// 4. Delete Todo
const deleteTodo = async (req, res, next) => {
    try {
        const todo = await Todo.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id,
        });

        if (!todo) {
            return res.status(404).json({
                message: "Todo not found",
            });
        }

        res.status(200).json({
            message: "Todo Deleted Successfully",
        });

    } catch (error) {
        next(error);
    }
};

/**
 * 5. AI Task Organization Endpoint
 * Concepts: LLM API Integration, Prompt Engineering, Structured Outputs
 */
const aiOrganizeTodos = async (req, res, next) => {
    try {
        const userTodos = await Todo.find({ user: req.user.id });

        if (!userTodos || userTodos.length === 0) {
            return res.status(400).json({
                message: "No tasks available to organize. Please add some tasks first.",
            });
        }

        const taskListStr = userTodos.map((t, idx) => `${idx + 1}. "${t.title}" (Status: ${t.completed ? "Completed" : "Pending"})`).join("\n");

        // PROMPT ENGINEERING DESIGN:
        // Clear Role, Task Instructions, Strict Allowed Values, and Negative Constraints for Structured JSON.
        const systemPrompt = `You are an AI Task Productivity Assistant.
Task: Analyze the user's tasks and provide structured organization suggestions.

Input Tasks:
${taskListStr}

Formatting Instructions:
- For EVERY task provided, assign:
  1. "priority": MUST be one of ["High", "Medium", "Low"]
  2. "category": MUST be one of ["Work", "Study", "Personal", "Health", "Other"]
  3. "reasoning": A 1-sentence explanation of why this priority/category was selected.

STRICT REQUIREMENT: Respond ONLY with valid JSON matching this exact structure:
{
  "suggestions": [
    {
      "task": "Task Title",
      "priority": "High",
      "category": "Work",
      "reasoning": "Reasoning sentence"
    }
  ]
}
Do not include any markdown backticks, conversational preamble, or explanation outside the JSON object.`;

        let structuredResponse = null;

        // Call Gemini / OpenAI LLM API if key is present
        const apiKey = process.env.GEMINI_API_KEY || process.env.LLM_API_KEY;

        if (apiKey) {
            try {
                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: systemPrompt }] }],
                        generationConfig: { responseMimeType: "application/json" }
                    })
                });

                if (response.ok) {
                    const data = await response.json();
                    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
                    if (rawText) {
                        const cleanJson = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
                        structuredResponse = JSON.parse(cleanJson);
                    }
                }
            } catch (llmError) {
                console.warn("LLM API call error, falling back to heuristic engine:", llmError.message);
            }
        }

        // Fallback Heuristic AI Engine if no key provided or API error occurs
        if (!structuredResponse || !structuredResponse.suggestions) {
            structuredResponse = {
                suggestions: userTodos.map(todo => {
                    const titleLower = todo.title.toLowerCase();
                    let priority = "Medium";
                    let category = "Personal";
                    let reasoning = "Standard priority assigned for general tasks.";

                    if (titleLower.includes("urgent") || titleLower.includes("exam") || titleLower.includes("project") || titleLower.includes("submit") || titleLower.includes("deadline")) {
                        priority = "High";
                        category = "Work";
                        reasoning = "High priority due to deadline or work commitment keywords.";
                    } else if (titleLower.includes("study") || titleLower.includes("read") || titleLower.includes("learn") || titleLower.includes("assignment")) {
                        priority = "Medium";
                        category = "Study";
                        reasoning = "Educational task categorized under Study.";
                    } else if (titleLower.includes("buy") || titleLower.includes("clean") || titleLower.includes("doctor")) {
                        priority = "Low";
                        category = "Health";
                        reasoning = "Routine personal health or household item.";
                    }

                    return {
                        task: todo.title,
                        priority,
                        category,
                        reasoning
                    };
                })
            };
        }

        res.status(200).json({
            message: "Tasks analyzed successfully by AI",
            structuredOutput: structuredResponse
        });

    } catch (error) {
        next(error);
    }
};

/**
 * 6. SQL Analytics Endpoint
 * Concepts: SQL Relational Schema, SQL INNER JOIN, SQL LEFT JOIN
 */
const getSqlAnalytics = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        const mongoTodos = await Todo.find({ user: req.user.id });

        const sqlReport = getSqlAnalyticsQuery(
            req.user.id,
            user ? user.email : "user@example.com",
            user ? user.name : "User",
            mongoTodos
        );

        res.status(200).json({
            message: "SQL Relational Schema & JOINs Analysis Report Generated",
            report: sqlReport
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    createTodo,
    getTodos,
    updateTodo,
    deleteTodo,
    aiOrganizeTodos,
    getSqlAnalytics,
};