import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../App";
import "./Registration.css";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { Link, useParams } from "react-router-dom";

const Registration = () => {
  const { taskName } = useParams();
  const { register, handleSubmit, errors } = useForm();
  const [loggedInUser, setLoggedInUser] = useContext(AuthContext);

  const [selectedDate, setSelectedDate] = useState({
    checkIn: new Date(),
  });

  const [description, setDescription] = useState({
    description: "",
  });

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
    };
    fetch("http://localhost:5000/addTask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <>
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

// <Link to="/userTasks">
//             <input type="submit" value="Register" />
//           </Link>
