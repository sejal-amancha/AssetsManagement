import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { MultiSelect } from 'primereact/multiselect';

import { Toolbar } from "primereact/toolbar";
import { getSingleEmployeeAssignemntStart, loadUsersStart } from "../../redux/Actions/actions";
import classNames from "classnames";

import { loadComboStart } from "../../redux/Actions/comboActions";
import { InputText } from "primereact/inputtext";
import { newAssignStart } from "../../redux/Actions/assignItemActions";

const AddUpdateAssignment = () => {
    var { id } = useParams();
    let keyChange = []
    let assetList = []
    let emptyAssign = {
        employeeId: JSON.parse(id),
        itemIds: [],
        remarks: "",
    }
    const [assign, setAssign] = useState(emptyAssign);
    const [submitted, setSubmitted] = useState(false);
    var { employeeId, itemIds, remarks } = assign;
    
    const dispatch = useDispatch();
    const history = useHistory();

    const combos = useSelector((state) => state?.combo?.combos);
    const users = useSelector((state) => state?.data?.users?.rows);
    const combossss = combos?.map((item) => {                
            item['itemName'] = item['categoryName']
            keyChange.push(item);      
    });

    // const valuess = keyChange?.map((items) => {
    //     items.employeeItems?.map((data) => {
    //         if (data.isAssigned == 0) {
    //         assetList.push(data);
    //      } 
    //     })
    //  })
     
    
    useEffect(() => {
        dispatch(loadUsersStart());
    }, []); 

    useEffect(() => {
        dispatch(loadComboStart());
    },[])

    useEffect(() => {
        dispatch(getSingleEmployeeAssignemntStart(id));
    },[]);

    useEffect(() => {
        if (id) {
            setAssign({ ...assign });
        }
    }, [id]);

    const addUpdateAssignment = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        setAssign({...assign});
            if(assign.employeeId && assign.itemIds && assign.remarks ) {
                dispatch(newAssignStart(assign))
                setTimeout(() => {
                    history.push('/admindashboard/employees')
            }, 2000)
        }
    };

    const gotoPrevious = () => {
        history.goBack();
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || "";
        setAssign({ ...assign, [name]: val });
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <div className="font-medium text-4xl text-900 mb-3"> {"Assign New Assets"}</div>
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
                                value={employeeId} 
                                id="employeeID"  
                                onChange={(e) => onInputChange(e, "employeeId")} 
                                required autoFocus
                                options={users}
                                optionValue="id"
                                placeholder="Choose a Employee"
                                disabled={true}
                                optionLabel="firstName" >
                    </Dropdown>
            </div>

            <div className="field">
            <label htmlFor="name">Select Assets</label>

            
                    <MultiSelect 
                        className={classNames({ "p-invalid": submitted && !assign.itemIds })} 
                                value={itemIds} 
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
                    {submitted && !assign.itemIds && <small className="p-error">Select Assets.</small>}
            </div>
            <div className="field">
                        <label htmlFor="name">Remarks</label>
                        <InputText id="remarks" value={remarks} onChange={(e) => onInputChange(e, "remarks")} className={classNames({ "p-invalid": submitted && !assign.remarks })} required />
                        {submitted && !assign.remarks && <small className="p-error">Condition is required.</small>}
                    </div>

            <div className="formgrid grid">
                    <div className="field col">
                        <Button label="Cancel" icon="pi pi-times" className="p-button-secondary mr-2 mb-2" onClick={gotoPrevious} />
                    </div>
                    <div className="field col">
                        <Button label= "Add"  icon="pi pi-check" className="p-button-warning mr-2 mb-2" onClick={addUpdateAssignment} />
                    </div>
                </div>
        </div>
    </div>
    </div>
  )
}

export default AddUpdateAssignment;
