import React from "react";
import AdminDashboard from './components/AdminDashboard';
import Login from "./pages/Login";
import ChangePassword from "./pages/ChangePassword";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom"
import Employee from "./pages/SingleViews/Employee";

const App = () => {
    return (
        <div>
            {sessionStorage.getItem("ADMIN") ? (
                    <Redirect to="/admindashboard" />
                ) : (
                    <Redirect to="/login" />
                )}
            <Switch>
                {/* <Route path="/nksjhduihiofnrklcnmf/:uniqueId">
                    <Employee />
                </Route> */}
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


