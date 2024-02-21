import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BASE_API_URL } from "../apiRoutes/routes";

function Navbar() {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const { data } = await axios.post(BASE_API_URL + "/user/auth/logout");
      console.log(data);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <NavbarComponent>
      <li>
        <Link className="active" to="/">
          Home
        </Link>
      </li>
      <li>
        <Link to="/addTask">Add Task</Link>
      </li>
      <li>
        <Link onClick={logout}>Logout</Link>
      </li>
    </NavbarComponent>
  );
}

const NavbarComponent = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;

  li {
    float: left;
  }

  li a {
    display: block;
    color: white;
    text-align: center;
    padding: 25px 30px;
    text-decoration: none;
    font-size: 16px;
  }

  li a:hover {
    background-color: #111;
  }
`;

export default Navbar;
