import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useDispatch, useSelector } from "react-redux";
import { loadUsersStart, addNewEmployeeStart, updateEmployeeStart, deleteEmployeeStart } from "../redux/Actions/actions";
import TextField from "@material-ui/core/TextField";
import classNames from "classnames";


const EmployeesData = () => {
    let emptyData = {
        user_role_id: "3",
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        dob: new Date(),
        password: "",
        confirm_password: "",
    };
    const dispatch = useDispatch();
    const users = useSelector((state) => state.data.users.rows);
    
    const [employees, setEmployees] = useState(null);
    const [singleUser, setSingleUser] = useState(null);
    const [employee, setEmployee] = useState(emptyData);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [dialogBox, setDialogBox] = useState(false);

    const [selectedEmployees, setSelectedEmployees] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const dt = useRef(null);

    const [errMsg, setErrMsg] = useState("");

    useEffect(() => {
        dispatch(loadUsersStart());
    }, []);

    const openNew = () => {
        setSubmitted(false);
        setProductDialog(true);
        setDialogBox(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
        setSingleUser(false);
    };

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    };

    const addNewUser = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        setEmployee(employee);  
        submitted ? setProductDialog(false) : setProductDialog(true)
        dispatch(addNewEmployeeStart(employee));
    };

    const updateUser = async () => {
        setSubmitted(true);
        setEmployee({ ...employee });
        setDialogBox(false);
        submitted ? setProductDialog(false) : setProductDialog(true)
        dispatch(updateEmployeeStart(employee));
    };

    const editEmployee = (employee) => {
        setEmployee({ ...employee });
        setProductDialog(true);
        setDialogBox(false);
    };

    const getSingleEmployee = async (employee) => {
        setEmployee({ ...employee });
        setSingleUser(true);
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

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    };

    const deleteSelectedProducts = () => {
        let _employees = employees.filter((val) => !selectedEmployees.includes(val));
        setEmployees(_employees);
        setDeleteProductsDialog(false);
        setSelectedEmployees(null);
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || "";
        let _employee = { ...employee };
        _employee[`${name}`] = val;
        setEmployee(_employee);
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
                    <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedEmployees || !selectedEmployees.length} />
                </div>
            </React.Fragment>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="mr-2 inline-block" />
                <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
            </React.Fragment>
        );
    };

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
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editEmployee(rowData)} />
                <Button icon="pi pi-search" className="p-button-rounded p-button-info mr-2" onClick={() => getSingleEmployee(rowData)} />
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

    const createNewEmployeeFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Add" icon="pi pi-check" className="p-button-text" onClick={addNewUser} />
        </>
    );

    const updateEmployeeFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Update" icon="pi pi-check" className="p-button-text" onClick={updateUser} />
        </>
    );

    const productDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
        </>
    );
    const deleteProductDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteProduct} />
        </>
    );
    const deleteProductsDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductsDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedProducts} />
        </>
    );

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
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
                            
                                        <Column selectionMode="multiple" headerStyle={{ width: "3rem" }}></Column>
                                        <Column field="id" header="ID" sortable body={codeBodyTemplate} headerStyle={{ width: "14%", minWidth: "10rem" }}></Column>
                                        <Column field="first_name" header="FirstName" sortable body={fnameBodyTemplate} headerStyle={{ width: "14%", minWidth: "10rem" }}></Column>
                                        <Column field="last_name" header="LastName" sortable body={lnameBodyTemplate} headerStyle={{ width: "14%", minWidth: "10rem" }}></Column>
                                        <Column field="email" header="EmailAddress" sortable body={emailAddressBodyTemplate} headerStyle={{ width: "14%", minWidth: "10rem" }}></Column>
                                        <Column field="phone" header="Phone" body={phoneBodyTemplate} sortable headerStyle={{ width: "14%", minWidth: "10rem" }}></Column>
                                        <Column field="dob" header="Dob" body={dobBodyTemplate} sortable headerStyle={{ width: "14%", minWidth: "10rem" }}></Column>
                                        <Column body={actionBodyTemplate}></Column>                          
                                 </DataTable>

                    <Dialog visible={singleUser} style={{ width: "450px" }} header="User Details" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                        <table>
                            <tr>
                                <td> <div className="field">
                                        <label htmlFor="name" style={{ fontWeight: "bold" }}> Employee ID :</label>
                                    </div> </td>
                                <td> <div className="field">
                                        <label>{employee.id}</label>
                                    </div> </td>
                            </tr>
                            <tr>
                                <td> <div className="field">
                                        <label htmlFor="name" style={{ fontWeight: "bold" }}> First Name : </label>
                                    </div> </td>
                                <td> <div className="field">
                                        <label> {employee.first_name}</label>
                                    </div> </td>
                            </tr>
                            <tr>
                                <td> <div className="field">
                                        <label htmlFor="name" style={{ fontWeight: "bold" }}> Last Name :  </label>
                                    </div> </td>
                                <td> <div className="field">
                                        <label> {employee.last_name}</label>
                                    </div> </td>
                            </tr>
                            <tr>
                                <td> <div className="field">
                                        <label htmlFor="name" style={{ fontWeight: "bold" }}> Email ID :  </label>
                                    </div> </td>
                                <td> <div className="field">
                                        <label> {employee.email}</label>
                                    </div> </td>
                            </tr>
                            <tr>
                                <td> <div className="field">
                                        <label htmlFor="name" style={{ fontWeight: "bold" }}> Date of Birth : </label>
                                    </div> </td>
                                <td> <div className="field">
                                        <label> {employee.dob}</label>
                                    </div> </td>
                            </tr>
                        </table>
                    </Dialog>

                    <Dialog visible={productDialog} style={{ width: "450px" }} header="Enter Employee Details" modal className="p-fluid" footer={dialogBox ? createNewEmployeeFooter : updateEmployeeFooter} onHide={hideDialog}>
                        <div className="field">
                            <label htmlFor="name">Role ID</label>
                            <InputText id="user_role_id" value={employee.user_role_id} onChange={(e) => onInputChange(e, "user_role_id")} readOnly={true} className={classNames({ "p-invalid": submitted && !employee.user_role_id })} required autoFocus />
                            {submitted && !employee.user_role_id && <small className="p-invalid">Role id is required.</small>}
                        </div>
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
                                <label htmlFor="name">Date of Birth</label>

                                <TextField
                                    id="dob"
                                    type="date"
                                    value={employee.dob}
                                    onChange={(e) => onInputChange(e, "dob")}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    InputProps={{ disableUnderline: true }}
                                    style={{ width: "100%", height: "65%", border: "1px solid #cccccc", borderRadius: "5px", paddingLeft: "5px" }}
                                />
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
                    </Dialog>

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

                    <Dialog visible={deleteProductsDialog} style={{ width: "450px" }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: "2rem" }} />
                            {employee && <span>Are you sure you want to delete the selected Employee?</span>}
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
