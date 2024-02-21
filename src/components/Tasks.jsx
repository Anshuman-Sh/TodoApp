import React from "react";
import styled from "styled-components";
import axios from "axios";
import { BASE_API_URL } from "../apiRoutes/routes";

function Tasks(props) {
  const deleteTask = async (id) => {
    try {
      const { data } = await axios.delete(BASE_API_URL + `/deleteTask/${id}`);
      console.log(data);

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const completeTask = async (id) => {
    try {
      const { data } = await axios.patch(BASE_API_URL + `/completeTask/${id}`);
      console.log(data);

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TasksContainer>
      <h2 className="title">{props.title}</h2>
      <p className="description">{props.description}</p>
      <button id="delete-button" onClick={() => deleteTask(props.id)}>
        Delete
      </button>
      <button
        id="isCompleted-button"
        onClick={() => completeTask(props.id)}
        style={{
          backgroundColor: props.isCompleted === true ? "lightblue" : "none",
        }}
      >
        Completed
      </button>
    </TasksContainer>
  );
}

const TasksContainer = styled.div`
  position: relative;
  width: 350px;
  height: 350px;
  padding: 25px 20px;
  border: 1px solid black;
  overflow: auto;
  background-color: #fffdd0;
  .title {
    line-height: 30px;
    margin-bottom: 18px;
    width: 70%;
  }
  .description {
    line-height: 20px;
  }
  #delete-button {
    position: absolute;
    top: 10px;
    right: 5px;
    background-color: red;
    color: white;
    border: none;
    padding: 4px 8px;
    border-radius: 10px;
    font-size: 12px;
    cursor: pointer;
    font-weight: bold;
    transition: 0.3s ease-in-out;
    &:hover {
      background-color: tomato;
    }
  }
  #isCompleted-button {
    position: absolute;
    top: 40px;
    right: 5px;
    background-color: transparent;
    padding: 5px 10px;
    border-radius: 10px;
    border: 0.5px solid black;
    font-size: 12px;
    cursor: pointer;
    font-weight: bold;
    transition: 0.3s ease-in-out;
    &:hover {
      background-color: lightblue;
    }
  }
`;

export default Tasks;
