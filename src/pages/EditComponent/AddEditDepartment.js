import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {  loadDepartmentStart, addnewDepartmentStart, updateDepartmentStart } from '../../redux/Actions/departmentActions';
import { useHistory, useParams } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import classNames from "classnames";
import { InputTextarea } from 'primereact/inputtextarea';

const emptyData = {
    name : "",
    description: "",
};

const AddEditDepartment = () => {
    const [department, setDepartment] = useState(emptyData);
    var { id, departmentUniqueId, name, description } = department;
    const dispatch = useDispatch();
    const history = useHistory();
    var { id } = useParams();

    const [submitted, setSubmitted] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const departmentsList = useSelector((state) => state?.department?.departments);

    useEffect(() => {
        dispatch(loadDepartmentStart());
    }, []);

    useEffect(() => {
        if (id) {
            setEditMode(true);
            const singleDepartment = departmentsList ? departmentsList.find((item) => item.id === Number(id)) : null;
            setDepartment({...singleDepartment});
        } else {
            setEditMode(false);
            setDepartment({...department});
        }
    }, [id]);

    const gotoPrevious = () => {
        history.goBack();
    };

    const addUpdateDepartment = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        if (!editMode) {
            setDepartment(department);
            if (department.name && department.description) {
                dispatch(addnewDepartmentStart(department));
                setTimeout(() => {
                    history.push('/admindashboard/departments')
                }, 2000)
            }   
        } else {
            if (department.name && department.description) {
                dispatch(updateDepartmentStart(department));  
                setTimeout(() => {
                    history.push('/admindashboard/departments')
                }, 2000)
            }
        }
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || "";
        setDepartment({ ...department, [name]: val });
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <div className="font-medium text-4xl text-900 mb-3"> {!editMode ? "Add New Department" : `Update Department`}</div>
                </div>
            </React.Fragment>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Back" icon="pi pi-angle-left" className="p-button-secondary mr-2" onClick={gotoPrevious} />
                </div>
            </React.Fragment>
        );
    };

  return (
    <div className="surface-section card" style={{ margin: "1%", padding: "1%" }}>
        <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate} ></Toolbar>
        <div className="col-12 md:col-6">
            <div className="card p-fluid">
                <div className="field">
                    <label htmlFor="name">Department Name</label>
                    <InputText id="department_name" value={name} onChange={(e) => onInputChange(e, "name")} className={classNames({ "p-invalid": submitted && !department.name })} required autoFocus />
                    {submitted && !department.name && <small className="p-error">Department Name is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="name">Department Description</label>
                    <InputTextarea id="department_description" value={description} onChange={(e) => onInputChange(e, "description")} className={classNames({ "p-invalid": submitted && !department.description })} required  />
                    {submitted && !department.description && <small className="p-error">Description is required</small>}
                </div>

                <div className="formgrid grid">
                        <div className="field col">
                            <Button label="Cancel" icon="pi pi-times" className="p-button-secondary mr-2 mb-2" onClick={gotoPrevious} />
                        </div>
                        <div className="field col">
                            <Button label={!editMode ? "Add" : "UPDATE"} icon="pi pi-check" className="p-button-warning mr-2 mb-2" onClick={addUpdateDepartment} />
                        </div>
                    </div>
            </div>
        </div>
    </div>
  )
}

export default AddEditDepartment;
