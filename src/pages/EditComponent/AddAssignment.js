import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { MultiSelect } from 'primereact/multiselect';

import { Toolbar } from "primereact/toolbar";
import { getSingleEmployeeAssignemntStart, loadUsersStart } from "../../redux/Actions/actions";
import classNames from "classnames";

import { getcomboByIdStart, getItemsByCategoryStart, loadComboStart } from "../../redux/Actions/comboActions";
import { InputText } from "primereact/inputtext";
import { newAssignStart, updateAssignStart } from "../../redux/Actions/assignItemActions";


const AddAssignment = () => {

    var { id } = useParams();
    let data1 = new Array();
    let keyChange = []

    let emptyAssign = {
        id : id,
        employeeId: "",
        itemIds: !id ? [] : data1,
        remarks: "",
    }

    const [assign, setAssign] = useState(emptyAssign);
    const [submitted, setSubmitted] = useState(false);
    const [editMode, setEditMode] = useState(false);
    // var { employeeId, itemIds, remarks } = assign;

    const getUserId = useSelector((state) => state?.combo?.combos);   //single combo data
    const users = useSelector((state) => state?.data?.users?.rows);   // user list
    const itemsDataa = useSelector((state) => state?.items?.items)   // item list
    itemsDataa?.map((item) => {
        item['itemName'] = item['categoryName']
        keyChange.push(item);
    });
    
    const dispatch = useDispatch();
    const history = useHistory();
  
    useEffect(() => {
        if (id) {
            setEditMode(true);
            var singleData = getUserId ? getUserId.find((item) => item.id === Number(id)) : null;
            assign.employeeId = singleData?.employeeId;
            singleData?.employeeDetail?.employeeAssigments?.map((data) => {
                assign.itemIds.push(data?.itemId)
            })
            singleData?.employeeDetail?.employeeAssigments?.map((data) => {
                assign.remarks = data?.remarks
            })           
        } else {
            setEditMode(false);
            setAssign({ ...assign })
        }
    }, [id]);

    useEffect(() => {
        dispatch(getItemsByCategoryStart())
    }, [])

    useEffect(() => {
        dispatch(loadUsersStart());
    }, [])

    useEffect(() => {
        dispatch(loadComboStart());
    }, []);

 
    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || "";
        setAssign({ ...assign, [name]: val });
    };

    const addUpdateAssignment = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        if (!editMode) {
            setAssign({ ...assign });
            if (assign.employeeId && assign.itemIds.length > 0 && assign.remarks) {
                dispatch(newAssignStart(assign))
                setTimeout(() => {
                    history.push('/admindashboard/combos')
                },2000)
            }
        } else {
            if (assign.employeeId && assign.itemIds.length > 0 && assign.remarks) {
                setAssign({ ...assign });
                dispatch(updateAssignStart(assign))
                setTimeout(() => {
                    history.push('/admindashboard/combos')
                },2000)
            }
        }
    }

    const gotoPrevious = () => {
        history.goBack();
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <div className="font-medium text-4xl text-900 mb-3"> {!editMode ? "Assign New Assets" : "Assign More Assets"}</div>
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
            <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

            <div className="col-12 md:col-6">
                <div className="card p-fluid">
                    <div className="field">
                        <label htmlFor="name">Select Emloyee First</label>
                        <Dropdown
                            className={classNames({ "p-invalid": submitted && !assign.employeeId })}
                            value={assign.employeeId}
                            id="employeeID"
                            onChange={(e) => onInputChange(e, "employeeId")}
                            required autoFocus
                            options={users}
                            optionValue="id"
                            placeholder="Choose an Employee"
                            disabled={!editMode ? false : true}
                            optionLabel="firstName" >
                        </Dropdown>
                        {submitted && !assign.employeeId && <small className="p-error">Select Employee.</small>}
                    </div>
                    <div className="field">
                        <label htmlFor="name">Select Assets</label>
                        <MultiSelect
                            className={classNames({ "p-invalid": submitted && assign.itemIds.length === 0 })}
                            value={assign.itemIds}
                            id="itemIds"
                            onChange={(e) => onInputChange(e, "itemIds")}
                            required autoFocus
                            options={keyChange}
                            placeholder="Choose an Assets"
                            optionLabel="itemName"
                            optionGroupLabel="itemName"
                            optionGroupChildren="employeeItems"
                            optionValue="id"
                            display="chip" >
                        </MultiSelect>
                        {submitted && assign.itemIds.length === 0 && <small className="p-error">Select Assets.</small>}
                    </div>
                    <div className="field">
                        <label htmlFor="name">Remarks</label>
                        <InputText id="remarks" value={assign.remarks} onChange={(e) => onInputChange(e, "remarks")} className={classNames({ "p-invalid": submitted && !assign.remarks })} required/>
                        {submitted && !assign.remarks && <small className="p-error">Remarks is required.</small>}
                    </div>
                    <div className="formgrid grid">
                        <div className="field col">
                            <Button label="Cancel" icon="pi pi-times" className="p-button-secondary mr-2 mb-2" onClick={gotoPrevious} />
                        </div>
                        <div className="field col">
                            <Button label={!editMode ? "Add" : "Update"} icon="pi pi-check" className="p-button-warning mr-2 mb-2" onClick={addUpdateAssignment} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddAssignment;
