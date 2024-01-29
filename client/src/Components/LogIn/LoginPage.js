import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  // State variables-----------------------------------------------------------
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  // Submit handler------------------------------------------------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get("http://localhost:5000/api/v1/users/all")
      .then((res) => {
        const fetchedUsers = res.data;
        const { data } = fetchedUsers;
        const user = data.find(
          (user) => user.email === email && user.password === password
        );

        if (user) {
          localStorage.setItem("uid", user._id);

          // Use toast to display a success message
          toast.success("Login completed successfully. Welcome!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          setTimeout(() => {
            navigate(`/AddTask/${user._id}`);
          }, 4000);
        } else {
          setLoginError("Email or password doesn't match");
        }
      })
      .catch((err) => {
        console.error(err);
        setLoginError("An error occurred during login");
      });
  };
  const setDefaultValues = (e) => {
    e.preventDefault();
    setEmail("saravanan@gmail.com");
    setPassword("1234567");
  };

  return (
    <>
      <section className="bg-dark text-light d-flex flex-column align-items-center justify-content-center vh-100">
        <Card className="p-3">
          <Card.Body>
            <Card.Title className="text-center">Log in</Card.Title>
          </Card.Body>
          <Form onSubmit={handleSubmit} className="d-grid">
            {/* Email Input-------------------------------------------------------------------------------------- */}
            <FloatingLabel
              controlId="floatingInput"
              label="Email address"
              className="mb-3"
            >
              <Form.Control
                type="email"
                placeholder="name@example.com"
                required
                style={{ textAlign: "start" }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FloatingLabel>

            {/* Password Input------------------------------------------------------------------------------------ */}
            <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control
                type="password"
                placeholder="Password"
                required
                style={{ textAlign: "start" }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FloatingLabel>

            {/* Display login error-------------------------------------------------------------------------------- */}
            <p className="text-danger">{loginError}</p>

            {/* Reset Password link-------------------------------------------------------------------------------- */}
            <Link to="/ResetPassword" className="text-end mb-3 d-block">
              Reset Password
            </Link>

            {/* Submit Button--------------------------------------------------------------------------------------- */}
            <Button type="submit" variant="primary" className="mb-3">
              Submit
            </Button>
          </Form>

          <Card.Body>
            {/* User credentials button------------------------------------------------------------------------------*/}
            <h6>
              Use test credentials!{" "}
              <Button
                variant="outline-dark"
                size="sm"
                style={{ textDecoration: "underline" }}
                onClick={setDefaultValues}
              >
                Login
              </Button>
            </h6>

            {/* Sign up link---------------------------------------------------------------------------------------- */}
            <h6>
              Don't have an account? <Link to="/SignUpPage">Sign up</Link>
            </h6>
          </Card.Body>
        </Card>
      </section>
      <ToastContainer />
    </>
  );
};

export default LoginPage;
