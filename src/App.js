import React from 'react';
import AdminDashboard from './AdminDashboard';
import Login from './pages/Login';
import EmployeesData from './pages/EmployeesData';
import Category from './pages/Category';
import Products from './pages/Products';
import Combo from './pages/Combo';
import ChangePassword from './pages/ChangePassword';
import Allocation from './pages/Allocation';
import {  BrowserRouter as Router, Route } from 'react-router-dom'


const App = () => {
    return(
        <div>
            <Router> 
                    <Route path="/" exact component={Login} />
                    <Route path="/changePass" component={ChangePassword} />
                    <Route path="/admindashboard" component={AdminDashboard} />  
                    <Route path ="/EmployeesData" component={EmployeesData} />
                    <Route path="/category" component={Category} />
                    <Route path="/products" component={Products} />
                    <Route path="/allocation" component={Allocation} />
                    <Route path="/combo" component={Combo} />   
            </Router>
        </div>
    )
}

export default App;






