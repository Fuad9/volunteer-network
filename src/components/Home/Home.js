import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import { UserContext } from "../../App";

const Home = () => {
  const [tasks, setTasks] = useContext(UserContext);

  // to fetch all data
  useEffect(() => {
    fetch("http://localhost:5000/showTasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, [setTasks]);

  return (
    <>
      <Header />
      <div className="row">
        {tasks.map((task) => (
          <div className="col-sm-6 col-md-4 col-lg-3" key="showTask._id">
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
