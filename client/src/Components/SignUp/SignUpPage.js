import React, { useState } from "react";
import { Card, FloatingLabel, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUpPage = () => {
  // State variables --------------------------------------------------------
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [imageData, setImageData] = useState("");

  // React Router's navigation hook ----------------------------------------
  const navigate = useNavigate();

  // Event handler for form submission -------------------------------------
  const handleCreate = (e) => {
    e.preventDefault();

    // Convert age and phoneNumber to strings
    const ageAsString = age.toString();
    const phoneNumberAsString = phoneNumber.toString();

    // Validate username and password
    if (userName.length < 4) {
      setUserNameError("Username should be at least 4 characters.");
      return;
    } else {
      setUserNameError("");
    }

    if (password.length <= 6) {
      setPasswordError("Password should be at least 6 characters.");
      return;
    } else {
      setPasswordError("");
    }

    // Make a POST request using Axios
    axios
      .post("http://localhost:5000/api/v1/users/create", {
        profileImage: imageData,
        username: userName,
        email: email,
        password: password.toString(),
        phoneNum: phoneNumberAsString,
        age: ageAsString,
      })
      .then(() => {
        toast.success("User created successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setTimeout(() => {
          navigate("/");
        }, 4000);
      })
      .catch((err) => {
        console.log(err);
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

  // Event handler for image upload ----------------------------------------
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Convert the image data to Base64 encoding
        const base64String = reader.result.split(",")[1];
        setImageData(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <section className="bg-dark text-light d-flex flex-column align-items-center justify-content-center vh-100">
        <Card className="p-2">
          <Card.Body>
            <Card.Title className="text-center">Create Your Account</Card.Title>
            <hr />

            <Form onSubmit={handleCreate}>
              {/* Profile Picture Input--------------------------------------------------------------------------- */}
              <FloatingLabel label="Add Profile Picture" className="mb-3">
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </FloatingLabel>

              {/* Username Input---------------------------------------------------------------------------------- */}
              <FloatingLabel label="Username" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Username"
                  value={userName}
                  required
                  onChange={(e) => setUserName(e.target.value)}
                />
                <Form.Text className="text-danger">{userNameError}</Form.Text>
              </FloatingLabel>

              {/* Email Input--------------------------------------------------------------------------------------- */}
              <FloatingLabel label="Email address" className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FloatingLabel>

              {/* Password Input----------------------------------------------------------------------------------- */}
              <FloatingLabel label="Password" className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Form.Text className="text-danger">{passwordError}</Form.Text>
              </FloatingLabel>

              {/* Age Input--------------------------------------------------------------------------------------- */}
              <FloatingLabel label="Age" className="mb-3">
                <Form.Control
                  type="number"
                  placeholder="Age"
                  required
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </FloatingLabel>

              {/* Phone Number Input------------------------------------------------------------------------------ */}
              <FloatingLabel label="Mobile Number" className="mb-3">
                <Form.Control
                  type="tel"
                  placeholder="Phone Number"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </FloatingLabel>

              {/* Submit Button------------------------------------------------------------------------------------ */}
              <Button type="submit" variant="primary" className="w-100 mt-3">
                Submit
              </Button>
            </Form>
          </Card.Body>

          <Card.Body className="text-center">
            <h6>
              Have an account? <Link to="/">Login</Link>
            </h6>
          </Card.Body>
        </Card>
      </section>
      <ToastContainer />
    </>
  );
};

export default SignUpPage;
