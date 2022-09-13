import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { loadUsersStart, deleteEmployeeStart } from "../../redux/Actions/actions";
import { Link } from "react-router-dom";


const EmployeesData = () => {
    let emptyData = {
        user_role_id: "",
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        dob: new Date(),
        password: "",
        confirm_password: "",
    };
    const dispatch = useDispatch();
    const history = useHistory();
    const users = useSelector((state) => state.data.users.rows);
  
    const [employee, setEmployee] = useState(emptyData);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [selectedEmployees, setSelectedEmployees] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const dt = useRef(null);

    useEffect(() => {
        dispatch(loadUsersStart());
    }, []);

    const gotoPrevious = () => {
        history.goBack();
    }

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };


    const confirmDeleteProduct = (employee) => {
        setEmployee(employee);
        setDeleteProductDialog(true);
    };
        
    const deleteProduct = async () => {
        setEmployee(employee);
        dispatch(deleteEmployeeStart(employee));
        setDeleteProductDialog(false);
    };


    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Link to={`/addnew-employee/`}>
                        <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" />
                    </Link>
                </div>
            </React.Fragment>
        );
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

    const codeBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Id</span>
                {rowData.id}
            </>
        );
    };

    const fnameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">FirstName</span>
                {rowData.first_name}
            </>
        );
    };
    const lnameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">LastName</span>
                {rowData.last_name}
            </>
        );
    };

    const emailAddressBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Email</span>
                {rowData.email}
            </>
        );
    };

    const phoneBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Phone</span>
                {rowData.phone}
            </>
        );
    };

    const dobBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">DOB</span>
                {rowData.dob}
            </>
        );
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Link to={`/update-employee/${rowData.id}`}>
                    <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" />
                </Link>
                <Link to={`/employee/${rowData.id}`}>
                    <Button icon="pi pi-info-circle" className="p-button-rounded p-button-info mr-2"  />
                </Link>
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger mt-2" onClick={() => confirmDeleteProduct(rowData)} />
            </div>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">List Of Employees</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const deleteProductDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteProduct} />
        </>
    );

    return (
       <div className="grid crud-demo">
            <div className="col-12">
                <div className="card" style={{ margin: '1%'}}>
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                                    <DataTable
                                        ref={dt}
                                        value={users}
                                        selection={selectedEmployees}
                                        onSelectionChange={(e) => setSelectedEmployees(e.value)}
                                        dataKey="id"
                                        paginator
                                        rows={5}
                                        rowsPerPageOptions={[5, 10, 25]}
                                        className="datatable-responsive"
                                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                                        globalFilter={globalFilter}
                                        emptyMessage="No Employees found."
                                        header={header}
                                        responsiveLayout="scroll" >
                            
                                        <Column field="id" header="ID" sortable body={codeBodyTemplate} headerStyle={{ width: "14%", minWidth: "10rem" }}></Column>
                                        <Column field="first_name" header="FirstName" sortable body={fnameBodyTemplate} headerStyle={{ width: "14%", minWidth: "10rem" }}></Column>
                                        <Column field="last_name" header="LastName" sortable body={lnameBodyTemplate} headerStyle={{ width: "14%", minWidth: "10rem" }}></Column>
                                        <Column field="email" header="EmailAddress" sortable body={emailAddressBodyTemplate} headerStyle={{ width: "14%", minWidth: "10rem" }}></Column>
                                        <Column field="phone" header="Phone" body={phoneBodyTemplate} sortable headerStyle={{ width: "14%", minWidth: "10rem" }}></Column>
                                        <Column field="dob" header="Dob" body={dobBodyTemplate} sortable headerStyle={{ width: "14%", minWidth: "10rem" }}></Column>
                                        <Column body={actionBodyTemplate}></Column>                          
                                 </DataTable>

                    <Dialog visible={deleteProductDialog} style={{ width: "450px" }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: "2rem" }} />
                            {employee && (
                                <span>
                                    Are you sure you want to delete <b>{employee.first_name}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(EmployeesData, comparisonFn);
