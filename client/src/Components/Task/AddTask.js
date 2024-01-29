import axios from "axios";
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddTask = () => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskGroup, setTaskGroup] = useState("");
  const [taskImage, setTaskImage] = useState("");
  const [userId, setUserId] = useState();
  const [rerender, setRerender] = useState(false);

  const navigate = useNavigate();

  const handleCreate = (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("uid");
    setUserId(userId);
    axios
      .post(`http://localhost:5000/api/v1/users/tasks/${userId}`, {
        taskName: taskName,
        taskDescription: taskDescription,
        taskGroup: taskGroup,
        taskImage: taskImage,
      })
      .then(() => {
        toast.success("Task created successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setRerender(!rerender);
        setTimeout(() => {
          window.location.reload();
        }, 4000);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error creating task", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
  };

  // To upload image ---------------------------------
  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(",")[1];
        setTaskImage(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Create Task
      </button>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Add Task
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <section className="col-md">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingTaskName"
                    placeholder="TaskName"
                    onChange={(e) => setTaskName(e.target.value)}
                  />
                  <label for="floatingTaskName">Task Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="TaskDescription"
                    placeholder="name@example.com"
                    onChange={(e) => setTaskDescription(e.target.value)}
                  />
                  <label for="TaskDescription">Task Description</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="TaskGroup"
                    placeholder="name@example.com"
                    onChange={(e) => setTaskGroup(e.target.value.toUpperCase())}
                  />
                  <label for="TaskGroup">Task Group</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    className="form-control"
                    id="TaskImage"
                    placeholder="name@example.com"
                    onChange={handleImageUpload}
                  />
                  <label for="TaskImage">Task Image</label>
                </div>
              </section>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleCreate}
                data-bs-dismiss="modal"
              >
                Add task
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddTask;
