import express from "express";
import {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
} from "../controllers/UserController.js";
import {
  createTask,
  getTask,
  updateTask,
  deleteTask,
  createCompletedTask,
  deleteCompletedTask,
} from "../controllers/TaskController.js";
const router = express.Router();

//Create Users / POST => http://localhost:5000/api/v1/users/create
router.post("/create", createUser);

//getAll User / GET => http://localhost:5000/api/v1/users/all
router.get("/all", getAllUsers);

//Update User / PUT => http://localhost:5000/api/v1/users/updateUser/:id
router.put("/updateUser/:id", updateUser);

//delete User / DELETE => http://localhost:5000/api/v1/users/deleteUser/:id
router.delete("/deleteUser/:id", deleteUser);

// Task
//Create Task / POST => http://localhost:5000/api/v1/users/:id/tasks
router.post("/tasks/:id", createTask);
router.get("/getTask/:id", getTask);
router.put("/updateTask/:userId/:taskId", updateTask);
router.delete("/tasks/:taskId", deleteTask);
//Completed Task
router.post("/task/completed/:id", createCompletedTask);
router.delete("/task/delete/:taskId", deleteCompletedTask);

export default router;
