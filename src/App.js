import React from "react";
import AdminDashboard from "./AdminDashboard";
import Login from "./pages/Login";
import ChangePassword from "./pages/ChangePassword";

import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";

const App = () => {
    return (
        <div>
            {localStorage.getItem("ADMIN") ? (
                    <Redirect to="/admindashboard" />
                ) : (
                    <Redirect to="/login" />
                )}
            <Switch>
                <Route path="/changePass">
                    <ChangePassword />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/">
                    <AdminDashboard />
                </Route>
            </Switch>
        </div>
    );
};

export default App;
