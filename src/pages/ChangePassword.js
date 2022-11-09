import React,{ useState } from 'react'
import { Password } from 'primereact/password';
import classNames from 'classnames';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminChangePasswordStart } from '../redux/Actions/actions';
import { Button } from 'primereact/button';

const ChangePassword = () => {

    const users = useSelector((state) => state?.data?.changePass);
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

    if (users.length > 0) {
        console.log("first~~~~~~~~~", users)
    }

    if (users.success === true) {
        history.push('/admindashboard');
    }


  return (
   
        <div className="flex justify-content-center border-round mt-8">
                <div className="card w-30rem ">
                
                <div className="flex justify-content-center">
                    <img src='assets/layout/images/koli-logo.png' alt="logo"  style={{ width:'50%'}}/>
                </div>
                    <h3 className="text-center mb-8">Change Password</h3>
                    <form onSubmit={handleSubmit} className="p-fluid">
                        <div className="formgrid grid">
                            <div className="field col">
                                <label>Enter Current Password</label>
                            </div>

                            <div className="field col">
                                <Password
                                    className={classNames({ 'p-invalid': submitted && !data.currentPassword})}
                                    id="currentPassword"
                                    name="currentPassword"
                                    label="current Password"
                                    value={data.currentPassword}
                                    onChange={handleChange}
                                    toggleMask
                                    feedback={false} 
                                    autoFocus />
                                {submitted && !data.currentPassword && <small className="p-error">Current Password is required.</small>}
                            </div>
                            <div>

                            </div>
                        </div>
                        

                        <div className="formgrid grid">
                            <div className="field col">
                                <label>Enter New Password</label>
                            </div>

                            <div className="field col">
                                <Password
                                    className={classNames({ 'p-invalid': submitted && !data.newPassword})}     
                                    id="newPassword"
                                    name="newPassword"
                                    label="new Password"
                                    type="password"
                                    value={data.newPassword}
                                    onChange={handleChange}
                                    toggleMask
                                    feedback={false} />   
                                {submitted && !data.newPassword && <small className="p-error">New Password Please!.</small>} 
                            </div>
                        </div>

                        <div className="formgrid grid">
                            <div className="field col">
                                <label>Enter New Password</label>
                            </div>

                            <div className="field col">
                                <Password
                                    className={classNames({ 'p-invalid': submitted && !data.confirmPassword})}
                                    id="confirmPassword"
                                    name="confirmPassword" 
                                    label="confirmPassword"
                                    type="password"
                                    value={data.confirmPassword}
                                    onChange={handleChange} 
                                    toggleMask
                                    feedback={false} />  
                                {submitted && !data.confirmPassword && <small className="p-error">Confirm Password is required.</small> || submitted && data.newPassword !== data.confirmPassword && <small className="p-error">Password and Confirm Password Does not match!</small>} 
                            </div>
                        </div>

                        <div className="formgrid grid">
                            <div className="field col">
                                <Button label="Cancel" onClick={() => history.push("/adminDashboard") } icon="pi pi-times" className="p-button-danger mr-2 mb-2" />
                            </div>
                            <div className="field col">
                                <Button label="Apply" icon="pi pi-check" className="p-button-success mr-2 mb-2"/>
                            </div>
                        </div>
                    </form>
                </div>
        </div>
  )
}

export default ChangePassword;

