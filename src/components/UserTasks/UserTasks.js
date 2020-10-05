import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../App";
import Header from "../Header/Header";

const UserTasks = () => {
  const [loggedInUser] = useContext(AuthContext);
  const [userTasks, setUserTasks] = useState([]);

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
  const cancelTask = (id) => {
    fetch(`http://localhost:5000/delete/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        if (result) {
          const remainingTasks = userTasks.filter((elem) => elem._id !== id);
          setUserTasks(remainingTasks);
        }
      });
  };

  return (
    <>
      <Header />
      {!loggedInUser ? (
        <h2 className="text-danger">You have to login first</h2>
      ) : (
        <div className="row">
          {userTasks.map((userTask) => (
            <div className="col-sm-6 col-md-4 col-lg-3">
              <img style={{ height: "300px" }} src={userTask.showImg} alt="" />
              <h4>{new Date(userTask.checkIn).toDateString("dd/MM/yyyy")}</h4>
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
      )}
    </>
  );
};

export default UserTasks;
