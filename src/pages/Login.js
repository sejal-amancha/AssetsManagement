
import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { InputText } from 'primereact/inputtext';
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import classNames from 'classnames';
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { adminLoginStart } from '../redux/Actions/actions';

const Login = () => {
    
    const [submitted, setSubmitted] = useState(false)
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const history = useHistory();
    const dispatch = useDispatch();

       const validateEmail = (email) => {
        const re =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      };

    const handleChange = (e) => {
        const value = e.target.value;
        setData({
            ...data,
            [e.target.name]: value,
        });
    };
    
   
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true)
     
        const userData = {
            email: data.email,
            password: data.password,
        };

        if (submitted) {
            dispatch(adminLoginStart(userData))  
            history.push('/admindashboard');
        }   
    };

    return (
        <div style={divStyle}>
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap", "& > :not(style)": {
                        m: 1,
                        width: 550,
                        height: 500,
                    },
                }}>
            
                <Paper elevation={5}> 
                <img src='assets/layout/images/logo-dark.svg'  alt="logo" style={{ marginLeft:'220px', marginTop: '20px' }}/>
                    <form onSubmit={handleSubmit} style={container}>
                        <div>
                        <label htmlFor="name">Email Address</label>
                            <InputText
                                style={textInputs}
                                className={classNames({ 'p-invalid': submitted && !data.email && !validateEmail(data.email)})}
                                id="email"
                                name="email"
                                label="Email Address"
                                placeholder="test@test.com"
                                value={data.email}
                                onChange={handleChange}
                            />
                            {submitted && !data.email && <small className="p-invalid">Email is required.</small> || submitted && !validateEmail(data.email) && <small className="p-invalid">Please Enter Valid Email!</small>} 
                        </div>
                        <br/><br/>
                        <div>
                        <label htmlFor="name">Password</label>
                            <InputText
                                style={textInputs}
                                className={classNames({ 'p-invalid': submitted && !data.password})}
                                id="password"
                                name="password"
                                label="password"
                                type="password"
                                value={data.password}
                                onChange={handleChange}
                            />
                            {submitted && !data.password && <small className="p-invalid">Password is required.</small>}
                        </div>
                        <div>
                            <Button variant="contained" size="large" style={textInputs} type="submit">
                                LogIn
                            </Button>
                        </div>
                    </form>
                </Paper> 
            </Box>
        </div>
    );
};

export default Login;

const divStyle = {
    display: "flex",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
};

const textInputs = {
    width: "97%",
    margin: "8px",
    height:'100%'
};

const container = {
    justifyContent: "center",
    alignItems: "center",
    padding: '8px',
    margin: '8px'
};

const labelshow = {
    color: "red", 
    marginLeft:'3%', 
    display:'flex', 
    fontWeight:'bold'
}






