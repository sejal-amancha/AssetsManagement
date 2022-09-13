import React,{ useState } from 'react'
import Box from "@mui/material/Box";
import { InputText } from 'primereact/inputtext';
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import classNames from 'classnames';
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { adminChangePasswordStart } from '../redux/Actions/actions';

const ChangePassword = () => {

    const [submitted, setSubmitted] = useState(false)
    const dispatch = useDispatch();

    const [data, setData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const history = useHistory();
    const handleChange = (e) => {
        const value = e.target.value;
        setData({
            ...data,
            [e.target.name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        const adminChangePass = {
            currentPassword: data.currentPassword,
            newPassword: data.newPassword,
            confirmPassword: data.confirmPassword
        };
        dispatch(adminChangePasswordStart(adminChangePass));
    }


  return (
    <div style={divStyle}>
    <Box
        sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
                m: 1,
                width: 600,
                height: 600,
            },
        }}>

        <Paper elevation={5}> 
            <img src='assets/layout/images/logo-dark.svg'  alt="logo" style={{ marginLeft:'245px', marginTop: '20px'}}/>

            <form onSubmit={handleSubmit} style={container}>
                        <div>
                        <label htmlFor="name">Enter Current Password</label>
                            <InputText
                                style={textInputs}
                                className={classNames({ 'p-invalid': submitted && !data.currentPassword})}
                                id="currentPassword"
                                name="currentPassword"
                                label="current Password"
                                placeholder="currentPassword"
                                value={data.currentPassword}
                                onChange={handleChange}
                            />
                            {submitted && !data.currentPassword && <small className="p-invalid">Current Password is required.</small>}
                        </div>
                        <br/>
                        <div>
                            <label htmlFor="name">New Password</label>
                            <InputText
                                className={classNames({ 'p-invalid': submitted && !data.newPassword})}
                                style={textInputs}
                                id="newPassword"
                                name="newPassword"
                                label="new Password"
                                type="password"
                                value={data.newPassword}
                                onChange={handleChange}
                            />
                        </div>
                        {submitted && !data.newPassword && <small className="p-invalid">New Password Please!.</small>}
                        <br/>
                        <div>
                            <label htmlFor="name">Re-enter Password</label>
                            <InputText
                                className={classNames({ 'p-invalid': submitted && !data.confirmPassword})}
                                style={textInputs}
                                id="confirmPassword"
                                name="confirmPassword" 
                                label="confirmPassword"
                                type="password"
                                value={data.confirmPassword}
                                onChange={handleChange}
                            />
                            {submitted && !data.confirmPassword && <small className="p-invalid">Confirm Password is required.</small>}
                        </div>
                        <br/>
                        <div>
                            <Button variant="contained" size="large" style={textInputs} type="submit" >
                                Login with New Password
                            </Button>
                            <Button  size="large" style={textInputs} onClick={() => history.push("/adminDashboard") }>
                                Cancel
                            </Button>
                        </div>
                    </form>
        </Paper>
    </Box>
    </div>
  )
}

export default ChangePassword;

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
    height:'100%',
    margin: "8px",
};

const container = {
    justifyContent: "center",
    alignItems: "center",
    padding: '8px',
    margin: '8px'
};