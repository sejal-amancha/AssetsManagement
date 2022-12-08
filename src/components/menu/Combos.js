import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { loadCategoriesStart, deleteCategoryStart } from "../../redux/Actions/categoryActions";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Link } from "react-router-dom";
import { loadComboStart } from "../../redux/Actions/comboActions";

const Combos = () => {
    let emptyCombo = {
        employeeId: "",
        comboId : "", 
    };
    
    const dispatch = useDispatch();
    const history = useHistory();
    const dt = useRef(null);

    const [combo, setCombos] = useState(emptyCombo);
    const [deleteComboDialog, setDeleteComboDialog] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const comboData = useSelector((state) => state?.combo?.combos)
  
    useEffect(() => {
        dispatch(loadComboStart());
    }, []);

       const gotoPrevious = () => {
        history.goBack();
    };

    const hideDeleteComboDialog = () => {
        setDeleteComboDialog(false);
    };

    const confirmDeleteCombo = (combo) => {
        setCombos(combo);
        setDeleteComboDialog(true);
    };

    const deleteCombo = () => {
        setCombos(combo);
        dispatch(deleteCategoryStart(combo));
        setDeleteComboDialog(false);
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Link to={`/addnew-combo`}>
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

    const employeBodyTemplate = (rowData) => {
        return (
            <>
            <span className="p-column-title">Employee ID</span>
            {rowData?.employeeDetail?.employeeUniqueId}
            </> 
        )
    }

     const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Link to={`/update-combo/${rowData.id}`}>
                    <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mt-2 mr-2" />
                </Link>
                <Link to={`/combo/${rowData.id}`}>
                    <Button icon="pi pi-info-circle" className="p-button-rounded p-button-info mt-2 mr-2" />
                </Link>
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger mt-2 mr-2" onClick={() => confirmDeleteCombo(rowData)} />
            </div>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">List Of Combos</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const deletecategoryDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteComboDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteCombo} />
        </>
    );


  return (
    <div className="grid crud-demo">
    <div className="col-12">
        <div className="card" style={{ margin: "1%" }}>
            <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

            {/* {categoriess?.map((categoryList) => {
                if (categoryList.isActive === true) {
                    userData.push(categoryList);
                }
            })} */}
            <DataTable
                ref={dt}
                value={comboData}
                dataKey="id"
                paginator
                rows={5}
                rowsPerPageOptions={[5, 10, 25]}
                className="datatable-responsive"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Combos"
                globalFilter={globalFilter}
                emptyMessage="No Combos found."
                header={header}
                responsiveLayout="scroll" >

                {/* <Column style={{ display: "none" }} field="id" header="ID" sortable body={cIdBodyTemplate} headerStyle={{ width: "10%", minWidth: "15rem" }}></Column> */}
                <Column style={{display: 'none'}} field="id" header="ID" sortable headerStyle={{ width: "5%", minWidth: "10rem" }}></Column>
                <Column field="employeeId" header="Employee ID" body={employeBodyTemplate} sortable headerStyle={{ width: "5%", minWidth: "10rem" }}></Column>
                <Column field="comboId" header="Combo ID" sortable  headerStyle={{ width: "5%", minWidth: "10rem" }}></Column>
                <Column body={actionBodyTemplate}></Column>
            </DataTable>

            <Dialog visible={deleteComboDialog} style={{ width: "450px" }} header="Confirm" modal footer={deletecategoryDialogFooter} onHide={hideDeleteComboDialog}>
                <div className="flex align-items-center justify-content-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: "2rem" }} />
                    {combo && (
                        <span>
                            Are you sure you want to delete <b>{combo?.comboId}</b>?
                        </span>
                    )}
                </div>
            </Dialog>
            </div>
        </div>
    </div>
  )
}

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(Combos, comparisonFn);
