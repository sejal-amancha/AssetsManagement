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

const Categories = () => {
    let emptyCategory = {
        categoryName: "",
        description: "",
    };
    let userData = [];

    const dispatch = useDispatch();
    const history = useHistory();
    const dt = useRef(null);
    const categoriess = useSelector((state) => state?.category?.categories?.rows);

    const [category, setCategory] = useState(emptyCategory);
    const [deleteCategoryDialog, setDeleteCategoryDialog] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);

    useEffect(() => {
        dispatch(loadCategoriesStart());
    }, []);

    const gotoPrevious = () => {
        history.goBack();
    };

    const hideDeleteCategoryDialog = () => {
        setDeleteCategoryDialog(false);
    };

    const confirmDeleteCategory = (category) => {
        setCategory(category);
        setDeleteCategoryDialog(true);
    };

    const deleteCategory = () => {
        setCategory(category);
        dispatch(deleteCategoryStart(category));
        setDeleteCategoryDialog(false);
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Link to={`/addnew-category/`}>
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

    const cIdBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Category Id</span>
                {rowData.id}
            </>
        );
    };

    const cnameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Category Name</span>
                {rowData.categoryName}
            </>
        );
    };

    const cdescriptionBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Category Description</span>
                {rowData.description}
            </>
        );
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Link to={`/update-category/${rowData.id}`}>
                    <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mt-2 mr-2" />
                </Link>
                <Link to={`/category/${rowData.id}`}>
                    <Button icon="pi pi-info-circle" className="p-button-rounded p-button-info mt-2 mr-2" />
                </Link>
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger mt-2 mr-2" onClick={() => confirmDeleteCategory(rowData)} />
            </div>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">List Of Categories</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const deletecategoryDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteCategoryDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteCategory} />
        </>
    );

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card" style={{ margin: "1%" }}>
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                    {categoriess?.map((categoryList) => {
                        if (categoryList.isActive === true) {
                            userData.push(categoryList);
                        }
                    })}
                    <DataTable
                        ref={dt}
                        value={userData}
                        dataKey="id"
                        paginator
                        rows={5}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Categoriees"
                        globalFilter={globalFilter}
                        emptyMessage="No Categories found."
                        header={header}
                        responsiveLayout="scroll" >

                        <Column style={{ display: "none" }} field="id" header="ID" sortable body={cIdBodyTemplate} headerStyle={{ width: "10%", minWidth: "15rem" }}></Column>
                        <Column field="categoryName" header="Category Name" sortable body={cnameBodyTemplate} headerStyle={{ width: "10%", minWidth: "20rem" }}></Column>
                        <Column field="description" header="Description" sortable body={cdescriptionBodyTemplate} headerStyle={{ width: "10%", minWidth: "20rem" }}></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>

                    <Dialog visible={deleteCategoryDialog} style={{ width: "450px" }} header="Confirm" modal footer={deletecategoryDialogFooter} onHide={hideDeleteCategoryDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: "2rem" }} />
                            {category && (
                                <span>
                                    Are you sure you want to delete <b>{category.categoryName}</b>?
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

export default React.memo(Categories, comparisonFn);
