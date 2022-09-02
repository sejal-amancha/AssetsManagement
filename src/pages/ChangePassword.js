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

    const [currentPassError, setCurrentPassError] = useState(null);
    const [newPassError, setnewPassError] = useState(null);
    const [confirmPassError, setConfirmPassError] = useState(null);
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

        // if(data.currentPassword === '') {
        //     setCurrentPassError('You have to Provide Current Password!')
        // } else {
        //     setCurrentPassError('')
        // }

        // if(data.newPassword === '') {
        //     setnewPassError('Enter Your New Password...')
        // } else {
        //     setnewPassError('')
        // }

        // if(data.confirmPassword === '') {
        //     setConfirmPassError('Confirm Password can not be empty!')
        // } else if(data.newPassword !== data.confirmPassword) {
        //     setConfirmPassError('New Password and Confirm Password must be match!')
        // } else {
        //     setConfirmPassError('')
        // }

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
            <img src='assets/layout/images/logo-dark.svg'  alt="logo" style={{ marginLeft:'245px', marginTop: '20px' }}/>

            <form onSubmit={handleSubmit} style={container}>
                        <div>
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

                        <div>
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

                        <div>
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
    margin: "8px",
    marginTop: '30px'
};

const container = {
    justifyContent: "center",
    alignItems: "center",
};