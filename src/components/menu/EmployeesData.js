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
import Barcode from 'react-barcode';
import QRCode from "react-qr-code";
import JSONFormatter from 'json-formatter-js'



const EmployeesData = () => {
    
    let employeeData = []
    const dispatch = useDispatch();
    const history = useHistory();
    const dt = useRef(null);
    const users = useSelector((state) => state?.data?.users?.rows);

    const [employee, setEmployee] = useState();
    const [deleteEmployeeDialog, setDeleteEmployeeDialog] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);

    useEffect(() => {
        dispatch(loadUsersStart());
    }, []);

    const gotoPrevious = () => {
        history.goBack();
    };

    const hideDeleteEmployeeDialog = () => {
        setDeleteEmployeeDialog(false);
    };

    const confirmDeleteEmployee = (employee) => {
        setEmployee(employee);
        setDeleteEmployeeDialog(true);
    };

    const deleteEmployee = async () => {
        setEmployee(employee);
        dispatch(deleteEmployeeStart(employee));
        setDeleteEmployeeDialog(false);
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

    const codeBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Id</span>
                {rowData.employeeUniqueId}
            </>
        );
    };

    const imageBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Item Barcode</span>
                <QRCode
                    size={256}
                    style={{ height: "auto", maxWidth: "50%", width: "50%" }}
                    value={JSON.stringify(rowData)}
                    viewBox={`0 0 256 256`}
                    />
                    
                {/* <Barcode value={rowData.barcode} displayValue={false} width={1} height={30} />     */}
            </>
        )
    }

    const fnameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">FirstName</span>
                {rowData.firstName}
            </>
        );
    };
    const lnameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">LastName</span>
                {rowData.lastName}
            </>
        );
    };

    const dobBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">DOB</span>
                {rowData?.departmentDetails?.name || "NULL"}
            </>
        );
    };

    const actionBodyTemplate = (rowData) => {      
        return (
            <div className="actions">
                 <Link to={`/new-assets-assign/${rowData.id}`}>
                    <Button label="Assignment" className="p-button-rounded p-button-primary mt-2 mr-2" />
                </Link> 
                <Link to={`/update-employee/${rowData.id}`}>
                    <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mt-2 mr-2" />
                </Link>
                <Link to={`/nksjhduihiofnrklcnmf/${rowData.uniqueId}`}>
                    <Button icon="pi pi-info-circle" className="p-button-rounded p-button-info mt-2 mr-2" />
                </Link>
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger mt-2 mr-2" onClick={() => confirmDeleteEmployee(rowData)} />
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

    const deleteEmployeeDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteEmployeeDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteEmployee} />
        </>
    );

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card" style={{ margin: "1%" }}>
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                    {users?.map((userList) => {
                        if (userList.isActive === true) {
                            employeeData.push(userList);
                        }
                    })}

                    <DataTable
                        ref={dt}
                        value={employeeData}
                        dataKey="id"
                        paginator
                        rows={5}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Employees"
                        globalFilter={globalFilter}
                        emptyMessage="No Employees found."
                        header={header}
                        responsiveLayout="scroll">
                        
                        <Column style={{ display: 'none'}} field="id" header="ID" sortable headerStyle={{ width: "14%", minWidth: "10rem" }}></Column>
                        <Column style={{ display: 'none'}} field="uniqueId" header="UNIQUEID" sortable headerStyle={{ width: "14%", minWidth: "10rem" }}></Column>
                        <Column field="employeeUniqueId" header="Employee ID" sortable body={codeBodyTemplate} headerStyle={{ width: "14%", minWidth: "10rem" }}></Column>
                        <Column  header="QR" body={imageBodyTemplate} headerStyle={{ minWidth: '10%'}}></Column>
                        <Column field="firstName" header="First Name" sortable body={fnameBodyTemplate} headerStyle={{ width: "14%", minWidth: "10rem" }}></Column>
                        <Column field="lastName" header="Last Name" sortable body={lnameBodyTemplate} headerStyle={{ width: "14%", minWidth: "10rem" }}></Column>
                        <Column field="description" header="Department" body={dobBodyTemplate} sortable headerStyle={{ width: "14%", minWidth: "10rem" }}></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>

                    <Dialog visible={deleteEmployeeDialog} style={{ width: "450px" }} header="Confirm" modal footer={deleteEmployeeDialogFooter} onHide={hideDeleteEmployeeDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: "2rem" }} />
                            {employee && (
                                <span>
                                    Are you sure you want to delete <b>{employee.firstName}</b>?
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
