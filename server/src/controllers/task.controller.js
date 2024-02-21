const Task = require("../models/taskSchema");

const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    const newTask = await Task.create({
      title,
      description,
      createdBy: req.user.id,
    });

    res.json({ status: 201, newTask });
  } catch (error) {
    res.json(error.message);
  }
};

const getAllTasks = async (req, res) => {
  try {
    // console.log(req.user, "user.....");
    const tasks = await Task.find({ createdBy: req.user.id });

    res.json({ status: 200, tasks });
  } catch (error) {
    res.json(error.message);
  }
};

const completeTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.taskId });

    if (!task) {
      return res.json({
        status: false,
        errorMessage: "Task not found!",
      });
    }

    await Task.updateOne(
      { _id: task._id },
      { $set: { isCompleted: !task.isCompleted } }
    );

    res.json({ status: 200, successMessage: "Deleted Successfully." });
  } catch (error) {
    res.json(error.message);
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.taskId });

    if (!task) {
      return res.json({
        status: false,
        errorMessage: "Task not found!",
      });
    }

    await Task.deleteOne({ _id: task._id });

    res.json({ status: 200, successMessage: "Deleted Successfully." });
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = { createTask, getAllTasks, completeTask, deleteTask };
