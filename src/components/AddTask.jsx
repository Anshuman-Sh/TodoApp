import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_API_URL } from "../apiRoutes/routes";

function AddTask() {
  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTask((preTask) => {
      return { ...preTask, [name]: value };
    });
  };

  const addTask = async () => {
    try {
      const { data } = await axios.post(BASE_API_URL + "/addTask", task);
      // console.log(data);

      if (data.status === 401) {
        navigate("/login");
      } else {
        navigate("/");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <AddTaskComponent>
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={(event) => handleChange(event)}
          required
        />
        <textarea
          type="text"
          name="description"
          placeholder="Description"
          rows={10}
          onChange={(event) => handleChange(event)}
          required
        ></textarea>
        <button type="button" onClick={addTask}>
          Add
        </button>
      </AddTaskComponent>
    </>
  );
}

const AddTaskComponent = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 50px;
  background-color: #131324;
  input,
  textarea {
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
    padding: 10px 20px;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 10px;
    font-size: 18px;
    width: 100%;
    text-transform: uppercase;
    transition: 0.5s ease-in-out;
    &:hover {
      background-color: #4e0eff;
    }
  }
`;

export default AddTask;
