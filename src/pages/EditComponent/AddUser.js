import React,{ useState  } from 'react';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addNewEmployeeStart } from "../../redux/Actions/actions";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Toolbar } from "primereact/toolbar";
import classNames from "classnames";

const AddUser = () => {
    let emptyData = {
        user_role_id: "3",
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        dob: "",
        password: "",
        confirm_password: "",
    };

    const dispatch = useDispatch();
    const history = useHistory();
    const [employee, setEmployee] = useState(emptyData);
    const [submitted, setSubmitted] = useState(false);

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <div className="font-medium text-4xl text-900 mb-3">Add New Employee</div>
                </div>
            </React.Fragment>
        )
    }

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Back" icon="pi pi-angle-left" className="p-button-secondary mr-2" onClick={gotoPrevious} />
                </div>
            </React.Fragment>
        )
    }

    const addNewUser = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        setEmployee(employee);  
        dispatch(addNewEmployeeStart(employee));
    };

    const gotoPrevious = () => {
        history.goBack();
    }

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || "";
        setEmployee({ ...employee, [name]: val });
    };

  return (
    <div className="surface-section card" style={{ margin:'1%', padding:'1%' }}>
         <Toolbar className="mb-4" left={leftToolbarTemplate}  right={rightToolbarTemplate}></Toolbar>
         <div className="col-12 md:col-6">
            <div className="card p-fluid">
                    <div className="field">
                            <label htmlFor="name">First Name</label>
                            <InputText id="first_name" value={employee.first_name} onChange={(e) => onInputChange(e, "first_name")} className={classNames({ "p-invalid": submitted && !employee.first_name })} required autoFocus />
                            {submitted && !employee.first_name && <small className="p-invalid">First Name is required.</small>}
                    </div>
                    <div className="field">
                            <label htmlFor="name">Last Name</label>
                            <InputText id="last_name" value={employee.last_name} onChange={(e) => onInputChange(e, "last_name")} className={classNames({ "p-invalid": submitted && !employee.last_name })} required autoFocus />
                            {submitted && !employee.last_name && <small className="p-invalid">Last Name is required.</small>}
                    </div>
                    <div className="field">
                            <label htmlFor="name">Email Address</label>
                            <InputText id="email" value={employee.email} onChange={(e) => onInputChange(e, "email")} className={classNames({ "p-invalid": submitted && !employee.email })} required autoFocus />
                            {submitted && !employee.email && <small className="p-invalid">Please! provide Email-address</small>}
                    </div>
                    <div className="formgrid grid">
                        <div className="field col">
                                <label htmlFor="name">Phone Number</label>
                                <InputText id="phone" value={employee.phone} onChange={(e) => onInputChange(e, "phone")} className={classNames({ "p-invalid": submitted && !employee.phone })} required autoFocus />
                                {submitted && !employee.phone && employee.phone.length <= 9 && <small className="p-invalid">Enter Valid Contact Number</small>}
                        </div>
                        <div className="field col">
                            <label htmlFor="dob">Date of Birth</label>
                            <Calendar 
                                showIcon 
                                showButtonBar 
                                value={new Date(employee.dob) || ""} 
                                onChange={(e) => onInputChange(e, "dob")} 
                                className={classNames({ "p-invalid": submitted && !employee.dob })}>
                            </Calendar>
                            {submitted && !employee.dob && <small className="p-invalid">Enter Birth Date</small>}
                        </div>
                    </div>
                    <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="name">Password</label>
                                <InputText id="password" value={employee.password} onChange={(e) => onInputChange(e, "password")} className={classNames({ "p-invalid": submitted && !employee.password })} type="password" required autoFocus />
                                {submitted && !employee.password && <small className="p-invalid">Password is Required!</small>}
                            </div>
                            <div className="field col">
                                <label htmlFor="name">Confirm Password</label>
                                <InputText id="confirm_password" value={employee.confirm_password} onChange={(e) => onInputChange(e, "confirm_password")} className={classNames({ "p-invalid": submitted && !employee.confirm_password })} type="password" required autoFocus />
                                {submitted && !employee.confirm_password && <small className="p-invalid">Re-enter Password!</small>}
                            </div>
                    </div>
                    <div className="formgrid grid">
                        <div className="field col">
                            <Button label="Cancel" icon="pi pi-times"  className="p-button-secondary mr-2 mb-2" onClick={gotoPrevious}/>
                        </div>
                        <div className="field col">
                            <Button label="Add" icon="pi pi-check"  className="p-button-warning mr-2 mb-2" onClick={addNewUser} />
                        </div>
                    </div>
            </div>
        </div>
    </div>
  )
}

export default AddUser;
