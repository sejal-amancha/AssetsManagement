import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { loadProductsStart, deleteProductStart } from "../../redux/Actions/productActions";
import { loadCategoriesStart } from "../../redux/Actions/categoryActions";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Link } from "react-router-dom";
import Image1 from '../../assets/Image/computer_pc_PNG7719.png'

const Products = () => {
    let itemData = []
    let emptyProduct = {
        category_id: "",
        product_name: "",
        purchase_date: new Date(),
        product_description: "",
        product_cost: "",
    };

    const dispatch = useDispatch();
    const history = useHistory();
    const dt = useRef(null);
    const productss = useSelector((state) => state.product.productss.rows);
    
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);
   
    useEffect(() => {
        dispatch(loadProductsStart());
    }, []);

    useEffect(() => {
        dispatch(loadCategoriesStart());
    }, []);

    const gotoPrevious = () => {
        history.goBack();
    };

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };

    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    };

    const deleteProduct = () => {
        setProduct(product);
        dispatch(deleteProductStart(product));
        setDeleteProductDialog(false);
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Link to={`/addnew-asset/`}>
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

    const pIdBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Id</span>
                {rowData.itemTag}
            </>
        );
    };

    const pnameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Product Name</span>
                {rowData.itemName}
            </>
        );
    };

    const imageBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Item Barcode</span>
                <img src={Image1} alt="Image" className="shadow-2" width="80" />
            </>
        )
    }

    const pDescBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Product Description</span>
                {rowData.description}
            </>
        );
    };

    const categoryIdBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Category ID</span>
                {rowData.category.categoryName}
            </>
        );
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Link to={`/update-asset/${rowData.id}`}>
                    <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" />
                </Link> 
                <Link to={`/asset/${rowData.id}`}>
                    <Button icon="pi pi-info-circle" className="p-button-rounded p-button-info mr-2" />
                </Link>
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger mt-2" onClick={() => confirmDeleteProduct(rowData)} />
            </div>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Assets Information</h5>
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
                <div className="card" style={{ margin: "1%" }}>
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                    {productss?.map((itemList) => {
                        if (itemList.isActive === true) {
                            itemData.push(itemList);
                        }
                    })}
                    <DataTable
                        ref={dt}
                        value={itemData}
                        selection={selectedProducts}
                        onSelectionChange={(e) => setSelectedProducts(e.value)}
                        dataKey="id"
                        paginator
                        rows={5}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} assets"
                        globalFilter={globalFilter}
                        emptyMessage="No Assets found."
                        header={header}
                        responsiveLayout="scroll"
                    >
                        <Column style={{ display: 'none' }} field="id" header="ID" sortable headerStyle={{ width: "14%", minWidth: "10rem" }}></Column>
                        <Column field="itemTag" header="Item ID" sortable body={pIdBodyTemplate} headerStyle={{ width: "14%", minWidth: "10rem" }}></Column>
                        <Column  header="Image" body={imageBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="itemName" header="Asset Name" sortable body={pnameBodyTemplate} headerStyle={{ width: "14%", minWidth: "12rem" }}></Column>
                        <Column field="description" header="Asset Description" sortable body={pDescBodyTemplate} headerStyle={{ width: "14%", minWidth: "12rem" }}></Column>
                        <Column field="category" header="Asset Category" body={categoryIdBodyTemplate} sortable headerStyle={{ width: "14%", minWidth: "12rem" }}></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>

                    <Dialog visible={deleteProductDialog} style={{ width: "450px" }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: "2rem" }} />
                            {product && (
                                <span>
                                    Are you sure you want to delete <b>{product.itemName}</b>?
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

export default React.memo(Products, comparisonFn);
