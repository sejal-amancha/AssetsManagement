import React,{ useState, useEffect } from 'react';
import { useDispatch , useSelector} from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { addNewEmployeeStart, updateEmployeeStart, loadUsersStart } from "../../redux/Actions/actions";
import { loadDepartmentStart } from '../../redux/Actions/departmentActions';
import { InputText } from "primereact/inputtext";
import { InputNumber } from 'primereact/inputnumber';
import { Button } from "primereact/button";
// import { Calendar } from "primereact/calendar";
import { Toolbar } from "primereact/toolbar";
import classNames from "classnames";
import { Dropdown } from 'primereact/dropdown';
import { Password } from 'primereact/password';

let emptyData = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    departmentId: '',
    password: '',
    confirmPassword: '',
};

const AddUser = () => {
    const [employee, setEmployee] = useState(emptyData);
    var {id, firstName, lastName, email, phone, departmentId } = employee;
    
    const dispatch = useDispatch();
    const history = useHistory();
    var { id } = useParams();

    const users = useSelector((state) => state?.data?.users?.rows);
    const departmentsList = useSelector((state) => state?.department?.departments?.rows);
    
    const [submitted, setSubmitted] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const validateName = (firstName,lastName) => {
        const reg = /^(([a-zA-Z]{1,50}))$/;
        return reg.test(String(firstName, lastName));
    }

    const validatePhone = (phone) => {
        const phoneRe = /^(([0-9]{10}))$/;
        return phoneRe.test(String(phone));
    }

    const validatePassword = (password , confirmPassword) => {
        const stengthreg = /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{4,16}$/;
        return stengthreg.test(String(password, confirmPassword));
    }

    useEffect(() => {
        dispatch(loadUsersStart());
    }, []); 
   
    useEffect(() => {
        dispatch(loadDepartmentStart());
    }, []);

    useEffect(() => {
        if (id) {
            setEditMode(true);
            const singleEmployee = users ? users.find((item) => item.id === Number(id)) : null;
            setEmployee({...singleEmployee});
        } else {
            setEditMode(false);
            setEmployee({...employee});
        }
    }, [id]);

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                <div className="font-medium text-4xl text-900 mb-3"> {!editMode ? "Add New Employee" : `Update Employee`}</div>
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

    const addNewEmployee = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        if (!editMode) {
            setEmployee(employee);
            if (validateName(employee.firstName) && validateName(employee.lastName) && validateEmail(employee.email) && validatePhone(employee.phone) && employee.departmentId && validatePassword(employee.password) && validatePassword(employee.confirmPassword) ) {
                dispatch(addNewEmployeeStart(employee));
                setTimeout(() => {
                    history.push('/admindashboard/employees')
                }, 2000)
            }   
        } else {
            if (validateName(employee.firstName) && validateName(employee.lastName) && validateEmail(employee.email) && validatePhone(employee.phone) && employee.departmentId) {
                dispatch(updateEmployeeStart(employee));  
                setTimeout(() => {
                    history.push('/admindashboard/employees')
                }, 2000)
            }
        }
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
                            <InputText id="firstName" value={employee.firstName} onChange={(e) => onInputChange(e, "firstName")} className={classNames({ "p-invalid": submitted && !employee.firstName && !validateName(employee.firstName) })} required autoFocus />
                            {submitted && !employee.firstName && <small className="p-error">First Name is required.</small> || submitted && !validateName(employee.firstName) && <small className="p-error">Please Enter Valid Name!</small>}
                    </div>
                    <div className="field">
                            <label htmlFor="name">Last Name</label>
                            <InputText id="lastName" value={employee.lastName} onChange={(e) => onInputChange(e, "lastName")} className={classNames({ "p-invalid": submitted && !employee.lastName && !validateName(employee.lastName) })} required />
                            {submitted && !employee.lastName && <small className="p-error">Last Name is required.</small> || submitted && !validateName(employee.lastName) && <small className="p-error">Please Enter Valid Name!</small> }
                    </div>    
                    <div className="field">
                            <label htmlFor="name">Email Address</label>
                            <InputText id="email" value={employee.email} onChange={(e) => onInputChange(e, "email")} className={classNames({ "p-invalid": submitted && !employee.email && !validateEmail(employee.email)})} required  />
                            {submitted && !employee.email && <small className="p-error">Please! provide Email-address</small> || submitted && !validateEmail(employee.email) && <small className="p-error">Please Enter Valid Email!</small>}
                    </div>
                    <div className="formgrid grid">
                        <div className="field col">
                            <label htmlFor="name">Phone Number</label>
                            <InputText id="phone" value={employee.phone} onChange={(e) => onInputChange(e, "phone")} className={classNames({ "p-invalid": submitted && !employee.phone && !validatePhone(employee.phone) })} required  />
                            {submitted && !employee.phone && <small className="p-error">Required Contact Number</small> || submitted && !validatePhone(employee.phone) && <small className="p-error">Enter Valid Contact Number</small>}
                        </div>
                        <div className="field col">
                            <label htmlFor="name">Select Department</label>
                            <Dropdown id="description" value={employee.departmentId} onChange={(e) => onInputChange(e, "departmentId" )} className={classNames({ "p-invalid": submitted && !employee.departmentId })} required 
                                options={departmentsList}
                                optionValue="id"
                                placeholder="Choose a Department"
                                optionLabel="name"> </Dropdown>
                            {submitted && !employee.departmentId && <small className="p-error">You have to select Department name</small>}
                        </div>
                    </div>
                    <div style={editMode ? {display : "none"} : null} className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="name">Password</label>
                                <Password  id="password" value={employee.password} onChange={(e) => onInputChange(e, "password")} className={classNames({ "p-invalid": submitted && !employee.password && !validatePassword(employee.password) })} toggleMask 
                                feedback={false} required />
                                {submitted && !employee.password && <small className="p-error">Password is Required!</small> || submitted && !validatePassword(employee.password) && <small className="p-error">Must contains upper case, lower case, digit, special character</small> }
                            </div>
                            <div className="field col">
                                <label htmlFor="name">Confirm Password</label>
                                <Password id="confirmPassword" value={employee.confirmPassword} onChange={(e) => onInputChange(e, "confirmPassword")} className={classNames({ "p-invalid": submitted && !employee.confirmPassword})}  toggleMask 
                                feedback={false} required  />
                                {submitted && !employee.confirmPassword && <small className="p-error">Re-enter Password!</small> || submitted && employee.password !== employee.confirmPassword && <small className="p-error">password and Confirm Password not matched!</small>}
                            </div>
                    </div>
                    <div className="formgrid grid">
                        <div className="field col">
                            <Button label="Cancel" icon="pi pi-times"  className="p-button-secondary mr-2 mb-2" onClick={gotoPrevious}/>
                        </div>
                        <div className="field col">
                            <Button label={!editMode ? "Add" : "UPDATE"} icon="pi pi-check"  className="p-button-warning mr-2 mb-2" onClick={addNewEmployee} />
                        </div>
                    </div>
            </div>
        </div>
    </div>
  )
}

export default AddUser;
