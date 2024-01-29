import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, Col, Row } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllTasks = () => {
  const [taskDetails, setTaskDetails] = useState([]);
  const [userId, setUserId] = useState();
  const [editedTaskName, setEditedTaskName] = useState();
  const [editedTaskDescription, setEditedTaskDescription] = useState();
  const [editedTaskGroup, setEditedTaskGroup] = useState();
  const [editedTaskImage, setEditedTaskImage] = useState();
  const [completedTask, setCompletedTask] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("uid");
    setUserId(userId);
    axios
      .get(`http://localhost:5000/api/v1/users/getTask/${userId}`)
      .then((res) => {
        const fetchedUsers = res.data;
        setTaskDetails(fetchedUsers.data.tasks);
        setCompletedTask(fetchedUsers.data.completedTasks);
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
      });
  }, [userId]);

  const groupTasksByTaskGroup = (tasks) => {
    return tasks?.reduce((groupedTasks, task) => {
      const existingGroup = groupedTasks.find(
        (group) => group.taskGroup === task.taskGroup
      );

      if (existingGroup) {
        existingGroup.tasks.push(task);
      } else {
        groupedTasks.push({
          taskGroup: task.taskGroup,
          tasks: [task],
        });
      }

      return groupedTasks;
    }, []);
  };

  const handleEditSubmit = (e, taskId) => {
    e.preventDefault();
    axios
      .put(
        `http://localhost:5000/api/v1/users/updateTask/${userId}/${taskId}`,
        {
          taskName: editedTaskName,
          taskDescription: editedTaskDescription,
          taskGroup: editedTaskGroup,
          taskImage: editedTaskImage,
        }
      )
      .then((res) => {
        toast.success("Task details updated successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      })
      .catch((err) => {
        console.error("Error updating task details:", err.response.data);

        toast.error("Error updating task details", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
  };

  const handleImageUpload = (event) => {
    // Check if event and event.target exist before accessing properties
    if (event && event.target && event.target.files) {
      const file = event.target.files[0];

      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          // Convert the image data to Base64 encoding
          const base64String = reader.result.split(",")[1];
          setEditedTaskImage(base64String);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  // Post request to create completed tasks
  const handleMove = (
    e,
    taskId,
    taskName,
    taskDescription,
    taskGroup,
    taskImage
  ) => {
    setLoading(true);

    axios
      .post(`http://localhost:5000/api/v1/users/task/completed/${userId}`, {
        taskName: taskName,
        taskDescription: taskDescription,
        taskGroup: taskGroup,
        taskImage: taskImage,
      })
      .then(() => {
        axios
          .delete(`http://localhost:5000/api/v1/users/tasks/${taskId}`, {
            data: { userId: userId },
          })
          .then(() => {
            setLoading(false);

            toast.success("Congratulations! You completed the task..", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            setTimeout(() => {
              window.location.reload();
            }, 4000);
          })
          .catch((deleteErr) => {
            setLoading(false);
            console.log(deleteErr.response);

            toast.error("User created successfully, but task update failed", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          });
      })
      .catch((postErr) => {
        setLoading(false);
        console.log(postErr);

        toast.error("Error creating user", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
  };

  //Delete req to delete completed tasks
  const handleDelete = (e, taskId) => {
    if (
      window.confirm("Are you sure, you want to delete your Completed task?")
    ) {
      axios
        .delete(`http://localhost:5000/api/v1/users/task/delete/${taskId}`, {
          data: { userId: userId },
        })
        .then((res) => {
          toast.success("Task deleted successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          setTimeout(() => {
            window.location.reload();
          }, 4000);
        })
        .catch((err) => {
          console.log(err);

          toast.error("Error deleting task", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        });
    } else {
      toast.info("Operation canceled", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div>
      <Card className="mt-3 bg-dark">
        <CardBody>
          <Row>
            <Col></Col>
            <Col md={5}>
              <h4 className="text-white text-center">Active Tasks</h4>
              <hr />
              {groupTasksByTaskGroup(taskDetails)?.map((group, groupIndex) => (
                <div key={groupIndex} className="mb-4">
                  <h6 className="bg-black text-white p-2 rounded-2 w-25 text-center">
                    {group.taskGroup}
                  </h6>
                  {group.tasks?.map((data, index) => (
                    <div
                      className="bg-secondary p-3 rounded-2 mb-3"
                      key={index}
                    >
                      <div className="mb-3">
                        <input
                          defaultValue={data.taskName || editedTaskName}
                          type="text"
                          onChange={(e) =>
                            setEditedTaskName(e.target.value) || data.taskName
                          }
                          className="form-control"
                          placeholder="Task Name"
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          defaultValue={
                            data.taskDescription || editedTaskDescription
                          }
                          onChange={(e) =>
                            setEditedTaskDescription(e.target.value) ||
                            data.taskDescription
                          }
                          type="text"
                          className="form-control"
                          placeholder="Task Description"
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          defaultValue={data.taskGroup || editedTaskGroup}
                          onChange={(e) =>
                            setEditedTaskGroup(e.target.value) || data.taskGroup
                          }
                          type="text"
                          className="form-control"
                          placeholder="Task Group"
                        />
                      </div>
                      <div className="mb-3">
                        <img
                          width={"150"}
                          src={`data:image/jpeg;base64,${
                            data.taskImage || editedTaskImage
                          }`}
                          alt="Task"
                          className="profile-image-preview"
                          onClick={() => handleImageUpload(data.taskImage)}
                        />
                        <label
                          htmlFor="profileImageInput"
                          className="custom-file-upload"
                        >
                          | Update Profile Picture |
                        </label>
                      </div>
                      <div className="d-flex justify-content-between">
                        <Button
                          variant="success"
                          type="submit"
                          onClick={(e) => handleEditSubmit(e, data._id)}
                        >
                          Save Changes
                        </Button>
                        <Button
                          onClick={(e) =>
                            handleMove(
                              e,
                              data._id,
                              data.taskName,
                              data.taskDescription,
                              data.taskGroup,
                              data.taskImage
                            )
                          }
                        >
                          {loading ? "Completing..." : "Completed"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </Col>
            <Col></Col>
            <Col md={6}>
              <h4 className="text-white text-center">Completed Tasks</h4>
              <hr />
              {groupTasksByTaskGroup(completedTask)?.map(
                (group, groupIndex) => (
                  <div key={groupIndex} className="mb-4">
                    <h6 className="bg-black text-white p-2 rounded-2 w-25 text-center">
                      {group.taskGroup}
                    </h6>
                    {group.tasks?.map((data, index) => (
                      <div
                        className="bg-success p-3 rounded-2 mb-3"
                        key={index}
                      >
                        <div className="mb-3">
                          <input
                            value={data.taskName}
                            type="text"
                            className="form-control"
                            placeholder="Task Name"
                          />
                        </div>
                        <div className="mb-3">
                          <input
                            value={data.taskDescription}
                            type="text"
                            className="form-control"
                            placeholder="Task Description"
                          />
                        </div>
                        <div className="mb-3">
                          <input
                            value={data.taskGroup}
                            type="text"
                            className="form-control"
                            placeholder="Task Group"
                          />
                        </div>
                        <div className="mb-3">
                          <img
                            width={150}
                            src={`data:image/jpeg;base64,${data.taskImage}`}
                            alt="Task"
                            className="profile-image-preview"
                          />
                        </div>
                        <div className="d-flex justify-content-between">
                          <Button
                            variant="danger"
                            onClick={(e) => handleDelete(e, data._id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )}
            </Col>
            <Col></Col>
          </Row>
        </CardBody>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default AllTasks;
