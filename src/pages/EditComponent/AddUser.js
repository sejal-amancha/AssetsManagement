import React,{ useState, useEffect } from 'react';
import { useDispatch , useSelector} from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { addNewEmployeeStart, updateEmployeeStart, loadUsersStart } from "../../redux/Actions/actions";
import { loadDepartmentStart } from '../../redux/Actions/departmentActions';
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
// import { Calendar } from "primereact/calendar";
import { Toolbar } from "primereact/toolbar";
import classNames from "classnames";
import { Dropdown } from 'primereact/dropdown';

let emptyData = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    departmentId: '',
};

const AddUser = () => {
    const [employee, setEmployee] = useState(emptyData);
    var {id, firstName, lastName, email, phone, departmentId } = employee;
    
    const dispatch = useDispatch();
    const history = useHistory();
    var { id } = useParams();

    const users = useSelector((state) => state?.data?.users?.rows);
    const departmentsList = useSelector((state) => state?.department?.departments);
    
    const [submitted, setSubmitted] = useState(false);
    const [editMode, setEditMode] = useState(false);

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
            if (employee.firstName && employee.lastName && employee.email && employee.phone && employee.departmentId) {
                dispatch(addNewEmployeeStart(employee));
                setTimeout(() => {
                    history.push('/admindashboard/employees')
                }, 2000)
            }   
        } else {
            if (employee.firstName && employee.lastName && employee.email && employee.phone && employee.departmentId) {
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
                            <InputText id="firstName" value={employee.firstName} onChange={(e) => onInputChange(e, "firstName")} className={classNames({ "p-invalid": submitted && !employee.firstName })} required autoFocus />
                            {submitted && !employee.firstName && <small className="p-error">First Name is required.</small>}
                    </div>
                    <div className="field">
                            <label htmlFor="name">Last Name</label>
                            <InputText id="lastName" value={employee.lastName} onChange={(e) => onInputChange(e, "lastName")} className={classNames({ "p-invalid": submitted && !employee.lastName })} required autoFocus />
                            {submitted && !employee.lastName && <small className="p-error">Last Name is required.</small>}
                    </div>
                    
                    <div className="field">
                            <label htmlFor="name">Email Address</label>
                            <InputText id="email" value={employee.email} onChange={(e) => onInputChange(e, "email")} className={classNames({ "p-invalid": submitted && !employee.email })} required autoFocus />
                            {submitted && !employee.email && <small className="p-error">Please! provide Email-address</small>}
                    </div>
                    <div className="formgrid grid">
                        <div className="field col">
                                <label htmlFor="name">Phone Number</label>
                                <InputText id="phone" value={employee.phone} onChange={(e) => onInputChange(e, "phone")} className={classNames({ "p-invalid": submitted && !employee.phone })} required autoFocus />
                                {submitted && !employee.phone && employee.phone.length <= 9 && <small className="p-error">Enter Valid Contact Number</small>}
                        </div>
                        <div className="field col">
                            <label htmlFor="name">Select Department</label>
                            <Dropdown id="description" value={employee.departmentId} onChange={(e) => onInputChange(e, "departmentId" )} className={classNames({ "p-invalid": submitted && !employee.departmentId })} required autoFocus
                                options={departmentsList}
                                optionValue="id"
                                placeholder="Choose a Department"
                                optionLabel="name"> </Dropdown>
                            {submitted && !employee.departmentId && <small className="p-error">You have to select Department name</small>}
                        </div>
                    </div>
                    {/* <div className="formgrid grid">
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
                    </div> */}
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
