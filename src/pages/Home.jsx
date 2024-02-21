import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Tasks from "../components/Tasks";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { BASE_API_URL } from "../apiRoutes/routes";
import axios from "axios";

function Home() {

  const [tasks, setTasks] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${BASE_API_URL}/allTasks`);
        // console.log(data);

        if (data.status === 401) {
          console.log(data.errorMessage);
          navigate("/login");
        }
        // console.log(data);
        setTasks(data.tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <>
      <Navbar />
      <TasksContainer>
        {tasks.map((task) => {
          return (
            <Tasks
              key={task._id}
              id={task._id}
              title={task.title}
              description={task.description}
              isCompleted={task.isCompleted}
            />
          );
        })}
      </TasksContainer>
    </>
  );
}

const TasksContainer = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 2rem 4rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  row-gap: 20px;
  column-gap: 10px;
  background-color: #131324;
  overflow: auto;
`;

export default Home;
