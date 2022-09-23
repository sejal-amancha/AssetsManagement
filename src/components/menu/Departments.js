import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { loadDepartmentStart,deleteDepartmentStart } from '../../redux/Actions/departmentActions';
import { DataTable } from 'primereact/datatable';
import { Toolbar } from 'primereact/toolbar';
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Link } from "react-router-dom";


const Departments = () => {
    let departmentData = []
    let emptyDepartment = {
        name: "",
        description: "",
    };

    const dispatch = useDispatch();
    const history = useHistory();
    const dt = useRef(null);
    const departmentsList = useSelector((state) => state?.department?.departments);

    const [department, setDepartment] = useState(emptyDepartment)
    const [globalFilter, setGlobalFilter] = useState(null);
    const [deleteDepartmentDialog, setDeleteDepartmentDialog] = useState(false);

    useEffect(() => {
        dispatch(loadDepartmentStart());
    }, []);

    const confirmDeleteProduct = (department) => {
        setDepartment(department);
        setDeleteDepartmentDialog(true);
    };

    const deleteDepartment = () => {
        setDepartment(department);
        dispatch(deleteDepartmentStart(department)); 
        setDeleteDepartmentDialog(false);
    };

    const gotoPrevious = () => {
        history.goBack();
    };

    const hideDeleteDepartmentDialog = () => {
        setDeleteDepartmentDialog(false);
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">List Of Departments</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const deleteDepartmentDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteDepartmentDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteDepartment} />
        </>
    );

    const dIDBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">DepartmentID</span>
                {rowData.id}
            </>
        )
    }

    const dUniqueIdBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Department Unique ID</span>
                {rowData.departmentUniqueId}
            </>
        )
    }

    const dNameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Department Name</span>
                {rowData.name}
            </>
        );
    };

    const dDescriptionBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Department Description</span>
                {rowData.description}
            </>
        )
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Link to={`/addnew-department/`}>
                        <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" />
                    </Link>
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
    
    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Link to={`/update-department/${rowData.id}`}>
                    <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mt-2 mr-2" />
                </Link>
                <Link to={`/department/${rowData.id}`}>
                    <Button icon="pi pi-info-circle" className="p-button-rounded p-button-info mt-2 mr-2" />
                </Link>
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger mt-2 mr-2" onClick={() => confirmDeleteProduct(rowData)} />
            </div>
        );
    };

  return (
    <div className="grid crud-demo">
        <div className="col-12">
            <div className="card" style={{ margin: "1%" }}>
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
                {departmentsList?.map((activeDepartmentList) => {
                        if (activeDepartmentList.isActive === true) {
                            departmentData.push(activeDepartmentList);
                        }
                    })}

                <DataTable
                    ref={dt}
                    value={departmentData}
                    dataKey="id"
                    paginator
                    rows={5}
                    rowsPerPageOptions={[5, 10, 25]}
                    className="datatable-responsive"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Departments"
                    globalFilter={globalFilter}
                    emptyMessage="No Categories found."
                    header={header}
                    responsiveLayout="scroll"
                >
                        <Column style={{ display:'none' }} field="id" header="Department ID" sortable body={dIDBodyTemplate}  headerStyle={{ width: "10%", minWidth: "15rem" }}></Column>
                        <Column field="departmentUniqueId" header="Department ID" body={dUniqueIdBodyTemplate} sortable headerStyle={{ width: "10%", minWidth: "15rem" }}></Column>
                        <Column field="name" header="Department Name" body={dNameBodyTemplate} sortable  headerStyle={{ width: "10%", minWidth: "15rem" }}></Column>
                        <Column field="description" header="Department Description" body={dDescriptionBodyTemplate} sortable headerStyle={{ width: "10%", minWidth: "20rem" }}></Column>
                      
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>

                    <Dialog visible={deleteDepartmentDialog} style={{ width: "450px" }} header="Confirm" modal footer={deleteDepartmentDialogFooter} onHide={hideDeleteDepartmentDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: "2rem" }} />
                            {department && (
                                <span>
                                    Are you sure you want to delete <b>{department.name}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>
            </div>
        </div>
    </div>
  )
}

export default Departments
