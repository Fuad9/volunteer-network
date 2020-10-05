import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import AdminEvent from "./components/AdminEvent/AdminEvent";
import AdminList from "./components/AdminList/AdminList";
import Login from "./components/Auth/Login";
import Home from "./components/Home/Home";
import NotFound from "./components/NotFound/NotFound";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Registration from "./components/Registration/Registration";
import UserTasks from "./components/UserTasks/UserTasks";

export const AuthContext = createContext();
export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState(false);
  const [tasks, setTasks] = useState([]);

  return (
    <AuthContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <UserContext.Provider value={[tasks, setTasks]}>
        <div className="App">
          <Router>
            <Switch>
              <Route path="/home">
                <Home />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <PrivateRoute path="/register/:taskName">
                <Registration />
              </PrivateRoute>
              <Route path="/userTasks">
                <UserTasks />
              </Route>
              <PrivateRoute path="/admin">
                <AdminList />
              </PrivateRoute>
              <Route path="/addEvent">
                <AdminEvent />
              </Route>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </Router>
        </div>
      </UserContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
