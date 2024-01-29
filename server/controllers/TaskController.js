import User from "../models/UserModels.js";

//Post Request
export const createTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { taskName, taskDescription, taskGroup, taskImage } = req.body;
    let existingUser = await User.findById(id);

    //Checking the id already exists
    //   if (!existingUser) {
    //     existingUser = await User.create({ id, tasks: [] });
    //   }

    //Adding tasks
    existingUser.tasks.push({
      taskName,
      taskDescription,
      taskGroup,
      taskImage,
    });
    await existingUser.save();

    res.status(201).json({ success: true, message: "Task added successfully" });
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

//Get Request
// export const getTask =  async (req, res) => {
//     try {
//       const {id} = req.body;

//       // Finding the user by their user value
//       const existingUser = await User.findOne(id);

//       // if (!existingUser) {
//       //   return res.status(404).json({ success: false, error: "User not found" });
//       // }

//       res.status(200).json({ success: true, tasks: existingUser.tasks });
//     } catch (error) {
//       console.error("Error fetching tasks:", error);
//       res.status(500).json({ success: false, error: "Internal Server Error" });
//     }
//   };

export const getTask = (req, res) => {
  const { id } = req.params;

  User.findById(id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          success: false,
          message: `User with the id ${id} not found.`,
        });
      }

      // If the user is found, send their tasks
      res.status(200).json({ success: true, data: user });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "Internal server error while fetching user tasks.",
      });
    });
};

//Patch Request
export const updateTask = async (req, res) => {
  try {
    const userId = req.params.userId;
    const taskId = req.params.taskId;
    const { taskName, taskDescription, taskGroup, taskImage } = req.body;

    // Validate required fields
    if (!taskName || !taskDescription || !taskGroup) {
      return res.status(400).json({
        success: false,
        error: "taskName, taskDescription, and taskGroup are required fields",
      });
    }

    // Find the user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Find the task within the user's tasks array
    const taskToUpdateIndex = user.tasks.findIndex(
      (task) => task._id.toString() === taskId
    );

    if (taskToUpdateIndex === -1) {
      return res.status(404).json({ success: false, error: "Task not found" });
    }

    // Update task properties
    user.tasks[taskToUpdateIndex].taskName = taskName;
    user.tasks[taskToUpdateIndex].taskDescription = taskDescription;
    user.tasks[taskToUpdateIndex].taskGroup = taskGroup;
    user.tasks[taskToUpdateIndex].taskImage = taskImage;

    // Save the updated user
    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      updatedUser,
    });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

//Delete Request
// export const deleteTask = async (req, res) => {
//   const userId = req.body.user;
//   const taskId = req.params;

//   try {
//     const user = await User.findOne({ user: userId });

//     if (!user) {
//       return res.status(404).json({ success: false, error: "User not found" });
//     }

//     // Finding the Task's index
//     const taskIndex = user.tasks.findIndex(
//       (task) => task._id.toString() === taskId
//     );

//     if (taskIndex === -1) {
//       return res.status(404).json({ success: false, error: "Task not found" });
//     }

//     // Removing the task from array
//     user.tasks.splice(taskIndex, 1);

//     await user.save();

//     res.json({ success: true, message: "Task deleted successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, error: "Internal Server Error" });
//   }
// };

export const deleteTask = async (req, res) => {
  const userId = req.body.userId;
  const taskId = req.params.taskId;

  try {
    console.log("Trying to delete task...");
    const user = await User.findOne({ _id: userId });

    if (!user) {
      console.log("User not found");
      return res.status(404).json({ success: false, error: "User not found" });
    }

    const taskIndex = user.tasks.findIndex(
      (task) => task._id.toString() === taskId.toString()
    );

    if (taskIndex === -1) {
      console.log("Task not found");
      return res.status(404).json({ success: false, error: "Task not found" });
    }

    // Removing the task from array
    user.tasks.splice(taskIndex, 1);

    // Save changes to the database
    await user.save();

    console.log("Task deleted successfully");
    res.json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error during task deletion:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Completed_Task
export const createCompletedTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { taskName, taskDescription, taskGroup, taskImage } = req.body;
    let existingUser = await User.findById(id);
    //Adding tasks
    existingUser.completedTasks.push({
      taskName,
      taskDescription,
      taskGroup,
      taskImage,
    });
    await existingUser.save();

    res.status(201).json({
      success: true,
      message: "Task moved to completed array successfully",
    });
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Completed_Task Delete Req
export const deleteCompletedTask = async (req, res) => {
  const userId = req.body.userId;
  const taskId = req.params.taskId;

  try {
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    const taskIndex = user.completedTasks.findIndex(
      (task) => task._id.toString() === taskId.toString()
    );

    if (taskIndex === -1) {
      return res.status(404).json({ success: false, error: "Task not found" });
    }

    // Removing the task from array
    user.completedTasks.splice(taskIndex, 1);

    // Save changes to the database
    await user.save();

    res.json({ success: true, message: "Completed_Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
