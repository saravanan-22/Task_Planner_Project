import React, { useEffect, useState } from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfilePage = () => {
  const [state, setState] = useState({
    right: false,
  });
  const [userId, setUserId] = useState();
  const [editedImage, setEditedImage] = useState("");
  const [userData, setUsersData] = useState();
  const [foundUser, setFoundUser] = useState();
  const [editedUsername, setEditedUsername] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedPassword, setEditedPassword] = useState("");
  const [editedPhoneNumber, setEditedPhoneNumber] = useState("");
  const [update, setUpdate] = useState("");
  const [editing, setEditing] = useState(false);

  const navigate = useNavigate();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleClose = (event) => {
    if (
      event &&
      event.target &&
      event.target.tagName &&
      event.target.tagName.toLowerCase() === "svg"
    ) {
      toggleDrawer("right", false)(event);
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/users/all`)
      .then((res) => {
        const fetchedUsers = res.data.data;
        setUsersData(fetchedUsers);

        const userId = localStorage.getItem("uid");
        setUserId(userId);

        const user = fetchedUsers.find((user) => user._id === userId);

        if (user) {
          setFoundUser(user);
          setTimeout(() => {
            setEditedImage(user.profileImage || "Loading...");
            setEditedUsername(user.username || "Loading...");
            setEditedEmail(user.email || "Loading...");
            setEditedPassword(user.password || "Loading...");
            setEditedPhoneNumber(user.phoneNum || "Loading...");
          });
        } else {
          setFoundUser(null);
        }
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
        setFoundUser(null);
      });
  }, [userId]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(",")[1];
        setUpdate(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/v1/users/updateUser/${userId}`, {
        profileImage: update,
        username: editedUsername,
        email: editedEmail,
        password: editedPassword,
        phoneNum: editedPhoneNumber,
      })
      .then((res) => {
        toast.success("User details updated successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setTimeout(() => {
          window.location.reload()
        }, 4000);
      })
      .catch((err) => {
        console.error("Error updating user details:", err.response.data);
        toast.error("Error updating user details", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      });

    setEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      axios
        .delete(`http://localhost:5000/api/v1/users/deleteUser/${userId}`)
        .then((res) => {
          toast.success("Account deleted successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          setTimeout(() => {
            window.location.replace("/");
          }, 4000);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error deleting account", {
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
      <Button variant="primary" onClick={toggleDrawer("right", !state.right)}>
        Profile
      </Button>
      <SwipeableDrawer
        anchor="right"
        open={state.right}
        onClose={handleClose}
        onOpen={toggleDrawer("right", true)}
      >
        <Box sx={{ width: 400, padding: 2 }}>
          <IconButton
            style={{ position: "absolute", top: 0, right: 0, color: "red" }}
            onClick={toggleDrawer("right", false)}
          >
            <CloseIcon />
          </IconButton>
          <section className="mt-5">
            <form onSubmit={handleEditSubmit}>
              <img
                src={`data:image/jpeg;base64,${editedImage}`}
                alt="Profile"
                className="profile-image-preview"
                style={{
                  width: "150px",
                  height: "160px",
                  marginTop: "0.5em",
                  marginBottom: "1em",
                }}
              />
              <label htmlFor="profileImageInput" className="custom-file-upload">
                | Update Profile Picture |
              </label>
              <input
                type="file"
                accept="image/*"
                id="profileImageInput"
                onChange={handleImageUpload}
                className="hidden-file-input"
              />
              <div className="form-floating mb-3">
                <input
                  value={editedUsername}
                  className="form-control"
                  id="floatingUserName"
                  placeholder={editedUsername}
                  onChange={(e) => setEditedUsername(e.target.value)}
                />
                <label htmlFor="floatingUserName">UserName</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  value={editedEmail}
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  onChange={(e) => setEditedEmail(e.target.value)}
                />
                <label htmlFor="floatingInput">Email address</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  value={editedPassword}
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  onChange={(e) => setEditedPassword(e.target.value)}
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>
              <div className="form-floating">
                <input
                  value={editedPhoneNumber}
                  type="text"
                  className="form-control"
                  id="floatingPhoneNumber"
                  placeholder="phoneNumber"
                  onChange={(e) => setEditedPhoneNumber(e.target.value)}
                />
                <label htmlFor="floatingPhoneNumber">phoneNumber</label>
              </div>
              <Button type="submit" variant="success" className="my-2">
                Save Changes
              </Button>
              <Button variant="danger" className="ms-2" onClick={handleDelete}>
                Delete
              </Button>
            </form>
          </section>
        </Box>
      </SwipeableDrawer>
      <ToastContainer />
    </div>
  );
};

export default ProfilePage;
