const router = require("express").Router();
const taskController = require("../controllers/task.controller");

router.post("/addTask", taskController.createTask);

router.get("/allTasks", taskController.getAllTasks);

router.patch("/completeTask/:taskId", taskController.completeTask);

router.delete("/deleteTask/:taskId", taskController.deleteTask);

module.exports = router;
