import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { BASE_API_URL } from "../apiRoutes/routes";

function Login() {
  const [values, setValue] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValue((preValues) => {
      return { ...preValues, [name]: value };
    });
  };

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleValidations = () => {
    const { username, password } = values;
    if (username.length === "" || password === "") {
      toast.error("All fields are required!", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidations()) {
      try {
        const { username, password } = values;
        const response = await axios.post(
          BASE_API_URL + "/user/auth/login",
          {
            username,
            password,
          },
          { withCredentials: true }
        );

        // console.log(response);
        if (response.data.status === false) {
          toast.error(response.data.errorMessage, toastOptions);
        } else {
          navigate("/");
        }
      } catch (error) {}
    }
  };

  return (
    <>
      <FormContainer className="formContainer">
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="header">
            <h2>Login</h2>
          </div>
          <input
            type="text"
            name="username"
            placeholder="Username"
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

          <button type="submit">Login</button>
          <span>
            Don't have an account? <Link to="/signup">Register</Link>
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

export default Login;
