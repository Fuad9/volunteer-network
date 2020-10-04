import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../App";

const UserTasks = () => {
  const [loggedInUser, setLoggedInUser] = useContext(AuthContext);
  const [userTasks, setUserTasks] = useState([]);

  // // to fetch user data
  // useEffect(() => {
  //   fetch("http://localhost:5000/showUserTasks")
  //     .then((res) => res.json())
  //     .then((data) => setUserTasks(data));
  // }, []);

  // to show user data by their email using JWT token
  useEffect(() => {
    fetch("http://localhost:5000/showUserTasks?email=" + loggedInUser.email, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUserTasks(data));
  }, [loggedInUser.email]);

  // to delete user data
  function cancelTask(id) {
    console.log(id);
    fetch(`http://localhost:5000/delete/${id}`, {
      method: "DELETE",
    }).then((res) => console.log(res));
  }

  return (
    <div className="row">
      {userTasks.map((userTask) => (
        <div className="col-sm-6 col-md-4 col-lg-3">
          <img style={{ height: "300px" }} src={userTask.img} alt="" />
          <h4>{userTask.checkIn}</h4>
          <h4>{userTask.taskName}</h4>
          <button
            className="btn btn-warning"
            onClick={() => cancelTask(`${userTask._id}`)}
          >
            Cancel
          </button>
        </div>
      ))}
    </div>
  );
};

export default UserTasks;
