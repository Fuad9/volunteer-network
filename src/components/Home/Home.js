import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import { UserContext } from "../../App";
import "./Home.css";

const Home = () => {
  const [tasks, setTasks] = useContext(UserContext);

  // to fetch all data
  useEffect(() => {
    fetch("https://sheltered-citadel-68723.herokuapp.com/showTasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, [setTasks]);

  return (
    <>
      <Header />
      <h2>I GROW BY HELPING PEOPLE IN NEED</h2>
      <div className="searchArea">
        <input
          type="search"
          className="form-control"
          name="search"
          placeholder="Search..."
        />
        <button className="btn btn primary">Search</button>
      </div>
      <div className="row mt-5">
        {tasks.map((task) => (
          <div className="col-sm-6 col-md-4 col-lg-3" key={Math.random()}>
            <Link
              to={`/register/${task.name}`}
              style={{ textDecoration: "none" }}
            >
              <img style={{ height: "300px" }} src={task.img} alt="" />
              <h4>{task.name}</h4>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
