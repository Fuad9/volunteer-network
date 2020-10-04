import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import tasks from "../fakedata/fakedata";
import background from "../../Images/images/extraVolunteer.png";

const Home = () => {
  const [showTasks, setShowTasks] = useState([]);

  // // to insert all data
  // const handleTasks = () => {
  //   fetch("http://localhost:5000/addTasks", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(tasks),
  //   });
  // };

  // to fetch all data
  useEffect(() => {
    fetch("http://localhost:5000/showTasks")
      .then((res) => res.json())
      .then((data) => setShowTasks(data));
  }, []);

  const styles = {
    backGroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${background})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "100% 100%",
  };

  return (
    <div className="row" style={styles}>
      {showTasks.map((showTask) => (
        <div className="col-sm-6 col-md-4 col-lg-3">
          <Link to={`/register/${showTask.name}`}>
            <img style={{ height: "300px" }} src={showTask.img} alt="" />
            <h4>{showTask.name}</h4>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Home;
