import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {  loadAllocationStart, newAllocationStart, updateAllocationStart, deleteAllocationStart } from '../../redux/Actions/allocationActions';
import { loadUsersStart } from '../../redux/Actions/actions';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { useHistory } from "react-router-dom";

const Allocation = () => {
    let newAllocationID = {
        employee_id: ''
    }
    const history = useHistory();
      
    const dt = useRef(null);
    const dispatch = useDispatch();
    const [globalFilter, setGlobalFilter] = useState(null);
    const [allocationData, setAllocationData] = useState(newAllocationID);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteAllocationDialog, setDeleteAllocationDialog] = useState(false);
    const [dialogBox, setDialogBox] = useState(false);
    
    useEffect(() => {
        dispatch(loadAllocationStart());
    }, []);

    useEffect(() => {
        dispatch(loadUsersStart());
    }, [])

    const allocationss = useSelector((state) => state.allocation.allocations.rows);
    const users = useSelector((state) => state.data.users.rows);

    const editAllocation = (allocationData) => {
        setAllocationData({ ...allocationData });
        setProductDialog(true);   
        setDialogBox(false);
    }
    
    const confirmDeleteProduct = (allocationData) => {
        setAllocationData(allocationData);
        setDeleteAllocationDialog(true);

    }

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2"  onClick={() => editAllocation(rowData)}/>  
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger mt-2" onClick={() => confirmDeleteProduct(rowData)} />
            </div>
        );
    }

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">List of Allocations</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const onInputChange = (e) => {
        const value = e.target.value;
        setAllocationData({
            ...allocationData,
            [e.target.name]: value,
        })
        
    }

    const createNewAllocation = async (e) => {
        dispatch(newAllocationStart(allocationData));
        setProductDialog(false);    
    }

    const updateAllocation = async (e) => { 
        setAllocationData(allocationData);
        dispatch(updateAllocationStart(allocationData));
        setProductDialog(false);  
    }

    const openNew = () => {
        setProductDialog(true);
        setDialogBox(true);
    }

    const gotoPrevious = () => {
        history.goBack();
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
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

    const hideDialog = () => {
        setProductDialog(false);    
    }

    const hideDeleteAllocationDialog = () => {
        setDeleteAllocationDialog(false);
    }

    const deleteAllocation = () => {
        setAllocationData(allocationData)
          
        dispatch(deleteAllocationStart(allocationData));
        setDeleteAllocationDialog(false);   
    }

    const deleteAllocationDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteAllocationDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text"  onClick={deleteAllocation}  />
        </>
    );

    const addAllocationFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Add" icon="pi pi-check" className="p-button-text" onClick={createNewAllocation} />
        </>
    ) 
    const updateAllocationFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Update" icon="pi pi-check" className="p-button-text" onClick={updateAllocation} />
        </>
    )

    const comboIdTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Combo ID</span>
                {rowData.combo_id}
            </>
        );
    }

    const employeeIdTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">E_ID</span>
                {rowData.employee_id}
            </>
        );
    }

    const eFirstNameTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">First Name</span>
                {rowData.UserDetail.first_name}
            </>
        );
    }

    const eLastNameTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Last Name</span>
                {rowData.UserDetail.last_name}
            </>
        );
    }

    const creationAtTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Created At</span>
                {rowData.created_at}
            </>
        );
    }

    const updatedAtTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Updated At</span>
                {rowData.updated_at}
            </>
        );
    }

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card" style={{ margin: '1%'}}>
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                    <DataTable ref={dt} 
                        dataKey="id" value={allocationss} paginator rows={5} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Allocations"
                        globalFilter={globalFilter} emptyMessage="No Allocations found." header={header} responsiveLayout="scroll">

                        <Column field="combo_id" header="Combo ID" body={comboIdTemplate} sortable  headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="employee_id" header="Employee Id" body={employeeIdTemplate} sortable  headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="first_name" header="First Name" body={eFirstNameTemplate} sortable  headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="last_name" header="Last Name" body={eLastNameTemplate} sortable  headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>  
                        <Column field="created_at" header="Created at" body={creationAtTemplate} sortable headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="updated_at" header="Updated at" body={updatedAtTemplate} sortable headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable> 

                    <Dialog visible={productDialog} style={{ width: '450px' }} header="Creating New Combo" modal className="p-fluid" footer={dialogBox ? addAllocationFooter : updateAllocationFooter} onHide={hideDialog}>
                        <div className="field">  
                            <label htmlFor="name">Select Employee First</label>
                            <select 
                                    name='employee_id'
                                    id='employee_id'  
                                    value={allocationData.employee_id}
                                    onChange={onInputChange}
                                    style={{ height:'100%', width:'100%', padding:'4%', margin:'1%', border:'1px solid #cccccc', borderRadius:'5px'}}>       
                            {
                                users ?
                                    users.map(allocate => (     
                                        <option     
                                            key={allocate.id}
                                            value={allocate.id}
                                            style ={{ color: 'gray', fontSize: '14px', padding:'5px', margin:'2px' }} >    
                                           {allocate.first_name}   
                                        </option>
                                    )) : null
                            }
                   </select>
                        </div>       
                    </Dialog>  


                    <Dialog visible={deleteAllocationDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteAllocationDialogFooter} onHide={hideDeleteAllocationDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {allocationData && <span>Are you sure you want to delete <b>{allocationData.combo_id}</b>?</span>}
                        </div>
                    </Dialog>
                   
                </div>
            </div>
        </div>
    );
}

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(Allocation, comparisonFn);
