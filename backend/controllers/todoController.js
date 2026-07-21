const Todo = require("../models/Todo");

const createTodo = async (req, res) => {
    try {
        const { title } = req.body;

        if (!title) {
            return res.status(400).json({
                message: "Title is required",
            });
        }

        const todo = await Todo.create({
            title,
            user: req.user.id,
        });

        res.status(201).json({
            message: "Todo Created Successfully",
            todo,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({
            user: req.user.id,
        }).sort({ createdAt: -1 });

        res.status(200).json(todos);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const updateTodo = async (req, res) => {
    try {
        const { title, completed } = req.body;

        const todo = await Todo.findOne({
            _id: req.params.id,
            user: req.user.id,
        });

        if (!todo) {
            return res.status(404).json({
                message: "Todo not found",
            });
        }

        todo.title = title ?? todo.title;
        todo.completed = completed ?? todo.completed;

        await todo.save();

        res.status(200).json({
            message: "Todo Updated Successfully",
            todo,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const deleteTodo = async (req, res) => {
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
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    createTodo,
    getTodos,
    updateTodo,
    deleteTodo,
};