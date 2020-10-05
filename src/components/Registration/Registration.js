import React, { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AuthContext, UserContext } from "../../App";
import "./Registration.css";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { Link, useHistory, useParams } from "react-router-dom";
import logo from "../../Images/logos/Group 1329.png";

const Registration = () => {
  const history = useHistory();
  const { taskName } = useParams();
  const [loggedInUser] = useContext(AuthContext);
  const [showTasks, setShowTasks] = useState({});

  const [tasks] = useContext(UserContext);

  const { register, handleSubmit, errors } = useForm();

  const [selectedDate, setSelectedDate] = useState({
    checkIn: new Date(),
  });

  const [description, setDescription] = useState({
    description: "",
  });

  useEffect(() => {
    const task = tasks.find((taskImage) => taskImage.name === taskName);
    setShowTasks(task);
  }, [taskName, tasks]);

  const showImg = showTasks.img;

  const handleCheckInDate = (date) => {
    const newDates = { ...selectedDate };
    newDates.checkIn = date;
    setSelectedDate(newDates);
  };

  const handleDescription = (e) => {
    const newDescription = { ...description };
    newDescription.description = e.target.value;
    setDescription(newDescription);
  };

  const handleRegister = () => {
    const newTask = {
      ...loggedInUser,
      ...selectedDate,
      ...description,
      taskName,
      showImg,
    };
    fetch("http://localhost:5000/addTask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result === true) {
          history.push("/userTasks");
        }
      });
  };

  return (
    <>
      <Link to="/home">
        <img style={{ width: "200px" }} src={logo} alt="" />
      </Link>
      <div className="container">
        <form onSubmit={handleSubmit(handleRegister)}>
          <div className="inputBox">
            <input
              type="text"
              name="name"
              defaultValue={loggedInUser.name}
              placeholder="Full Name"
            />
          </div>
          <div className="inputBox">
            <input
              ref={register({ required: true })}
              type="email"
              name="email"
              defaultValue={loggedInUser.email}
              placeholder="Username or Email"
            />
          </div>

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Check In Date"
                value={selectedDate.checkIn}
                onChange={handleCheckInDate}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>

          <div className="inputBox">
            <input
              ref={register({ required: true })}
              name="description"
              type="text"
              onChange={handleDescription}
              placeholder="Description"
            />
            {errors.name && (
              <span className="text-danger">Description is required</span>
            )}
          </div>
          <div className="inputBox">
            <input
              type="text"
              name="taskName"
              defaultValue={taskName}
              placeholder="Organize books at the library"
            />
          </div>
          <input type="submit" value="Register" />
        </form>
      </div>
    </>
  );
};

export default Registration;
