import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BASE_API_URL } from "../apiRoutes/routes";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const [info, setInfo] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setInfo((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  };

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = info;
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      toast.error("All fields are required!", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error("Password should be of length greater than 8", toastOptions);
      return false;
    } else if (password !== confirmPassword) {
      toast.error(
        "Password and Confirm Password does not match!",
        toastOptions
      );
      return false;
    } else if (username.length < 5) {
      toast.error("Username should be of length five", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      try {
        const { data } = await axios.post(BASE_API_URL + "/user/auth/signup", {
          username: info.username,
          email: info.email,
          password: info.password,
        });
        // console.log(data);
        if (data.status === false) {
          toast.error(data.errorMessage, toastOptions);
        } else {
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <FormContainer className="formContainer">
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="header">
            <h2>Register</h2>
          </div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={(event) => handleChange(event)}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={(event) => handleChange(event)}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(event) => handleChange(event)}
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={(event) => handleChange(event)}
            required
          />

          <button type="submit">Create Account</button>
          <span>
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: #131324;
  .header {
    color: white;
    text-transform: uppercase;
    text-align: center;
  }
  form {
    background-color: #00000076;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    border-radius: 2rem;
    padding: 2rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    font-size: 1rem;
    width: 100%;
    &:focus {
      border: 0.1rem solid #997af0;
      ouline: none;
    }
  }
  button {
    background-color: #997af0;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.2rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: 0.5s ease-in-out;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-tranform: uppercase;
    a {
      color: #4e0eff;
    }
  }
`;

export default Signup;
