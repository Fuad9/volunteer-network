import React, { useContext } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../App";
import logo from "../../Images/logos/Group 1329.png";

const Header = () => {
    const [loggedInUser] = useContext(AuthContext);

    return (
        <>
            <Navbar expand="lg" className="mx-4">
                <Navbar.Brand href="/home">
                    <img src={logo} alt="" style={{ width: "120px" }} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <NavLink to="/home" className="mr-4 font-weight-bold">
                            Home
                        </NavLink>
                        <NavLink to="/userTasks" className="mr-4 font-weight-bold">
                            Events
                        </NavLink>
                        {!loggedInUser ? (
                            <NavLink className="text-decoration-none" to="/login">
                                <button class="btn btn-primary text-white mr-4">Login</button>
                            </NavLink>
                        ) : (
                            <p className="font-weight-bold mr-4">{loggedInUser.name}</p>
                        )}
                        <NavLink className="text-decoration-none" to="/admin">
                            <button class="btn btn-dark text-white">Admin</button>
                        </NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
};

export default Header;
