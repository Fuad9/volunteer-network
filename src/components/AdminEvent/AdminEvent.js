import React, { useState } from "react";
import logo from "../../Images/logos/Group 1329.png";
import people from "../../Images/logos/users-alt 1.png";
import addEvents from "../../Images/logos/plus 1.png";
import { Link, useHistory } from "react-router-dom";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { Grid } from "@material-ui/core";

const AdminEvent = () => {
    const history = useHistory();

    const [name, setName] = useState({
        name: "",
    });

    const [selectedDate, setSelectedDate] = useState({
        checkIn: new Date(),
    });

    const [description, setDescription] = useState({
        description: "",
    });

    const handleName = (e) => {
        const newName = { ...name };
        newName.name = e.target.value;
        setName(newName);
    };

    const handleDescription = (e) => {
        const newDescription = { ...description };
        newDescription.description = e.target.value;
        setDescription(newDescription);
    };

    const handleCheckInDate = (date) => {
        const newDates = { ...selectedDate };
        newDates.checkIn = date;
        setSelectedDate(newDates);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newEvent = {
            ...name,
            ...description,
            ...selectedDate,
        };
        fetch("https://sheltered-citadel-68723.herokuapp.com/addEvent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newEvent),
        })
            .then((res) => res.json())
            .then((result) => {
                if (result === true) {
                    history.push("/home");
                }
            });
    };

    return (
        <div className="row">
            <div className="col-sm-3 col-md-3 col-lg-4 mt-2">
                <div className="d-flex flex-column">
                    <Link to="/home">
                        <img className="img-fluid" style={{ width: "200px" }} src={logo} alt="" />
                    </Link>
                    <Link to="/admin">
                        <img src={people} alt="" />
                        Volunteer register list
                    </Link>
                    <p>
                        <img src={addEvents} alt="" />
                        Add Event
                    </p>
                </div>
            </div>
            <div className="col-sm-8 col-md-8 col-lg-7 mt-5" style={{ border: "5px solid gray", borderRadius: "5px" }}>
                <form action="" onSubmit={handleSubmit}>
                    <label htmlFor="input">Event Title</label>
                    <input className="form-control" type="text" onChange={handleName} placeholder="Enter Title" />

                    <label htmlFor="input">Description</label>
                    <input className="form-control" type="text" onChange={handleDescription} placeholder="Enter Description" />

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

                    <button className="btn btn-success">Submit</button>
                </form>
                <form action="https://sheltered-citadel-68723.herokuapp.com/uploadImage" method="POST" className="mt-5">
                    <label htmlFor="input">Banner</label>
                    <input type="file" encType="multipart/form-data" name="myImage" />
                    <input type="submit" value="upload Image" />
                </form>
            </div>
        </div>
    );
};

export default AdminEvent;
