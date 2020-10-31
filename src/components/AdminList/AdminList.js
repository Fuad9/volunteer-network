import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../Images/logos/Group 1329.png";
import people from "../../Images/logos/users-alt 1.png";
import addEvents from "../../Images/logos/plus 1.png";
import trash from "../../Images/logos//trash-2 9.png";

const AdminList = () => {
    const [userInfos, setUserInfos] = useState([]);

    // to fetch registered volunteers emails
    useEffect(() => {
        fetch("https://sheltered-citadel-68723.herokuapp.com/showUser")
            .then((res) => res.json())
            .then((data) => setUserInfos(data));
    }, []);

    // to delete user data
    const deleteTask = (id) => {
        fetch(`https://sheltered-citadel-68723.herokuapp.com/deleteTask/${id}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((result) => {
                if (result) {
                    const remainingTasks = userInfos.filter((elem) => elem._id !== id);
                    setUserInfos(remainingTasks);
                }
            });
    };

    return (
        <>
            <div className="row m-3">
                <div className="col-sm-2 col-md-2 col-lg-2">
                    <Link to="/home">
                        <img style={{ width: "150px" }} src={logo} alt="" />
                    </Link>
                    <p>
                        <img src={people} alt="" />
                        Volunteer register list
                    </p>
                    <Link to="/addEvent">
                        <img src={addEvents} alt="" />
                        Add Event
                    </Link>
                </div>
                <div className="col-sm-10 col-md-10 col-lg-10">
                    <h4>Volunteer Register List</h4>
                    <div className="mt-4" style={{ border: "5px solid gray", borderRadius: "5px" }}>
                        <div className="col bg-secondary text-white">
                            <div className="row-md-3 d-flex justify-content-between">
                                <p>Name</p>
                                <p>Email</p>
                                <p>Date</p>
                                <p>Event</p>
                                <p>Action</p>
                            </div>
                        </div>
                        <div className="col">
                            {userInfos.map((userInfo) => (
                                <div className="row-md-3 d-flex justify-content-between my-3" key={Math.random()}>
                                    <p>{userInfo.name}</p>
                                    <p>{userInfo.email}</p>
                                    <p>{new Date(userInfo.checkIn).toDateString("dd/MM/yyyy")}</p>
                                    <p>{userInfo.taskName}</p>
                                    <img
                                        src={trash}
                                        alt=""
                                        onClick={() => deleteTask(`${userInfo._id}`)}
                                        style={{
                                            width: "40px",
                                            height: "40px",
                                            backgroundColor: "red",
                                            cursor: "pointer",
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminList;
