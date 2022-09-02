import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {  loadProductsStart, addnewProductStart, updateProductStart, deleteProductStart, getSingleProductStart } from '../redux/Actions/productActions';
import {  loadCategoriesStart } from '../redux/Actions/categoryActions';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import classNames from 'classnames';
import TextField from '@material-ui/core/TextField';


const Products = () => {
    let emptyProduct = {
        category_id: '',
        product_name: '',
        purchase_date: new Date(),
        product_description: '',
        product_cost: '',
    };
    
    const dispatch = useDispatch();
    const productss = useSelector((state) => state.product.productss.rows);
    const categoriess = useSelector((state) => state.category.categories);
    const getsingleProduct = useSelector((state) => state.singleProduct.singleProduct)

    const [products, setProducts] = useState(null);
    const [singleUser, setSingleUser] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const dt = useRef(null);

    const [dialogBox, setDialogBox] = useState(false);

    useEffect(() => {
        dispatch(loadProductsStart());
    }, []);

    useEffect(() => {
        dispatch(loadCategoriesStart())
    }, [])


    const openNew = () => {
        setSubmitted(false);
        setProductDialog(true);
        setDialogBox(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
        setSingleUser(false)
    }

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    }

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    }

    const addNewProduct = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        setProduct(product);
        submitted ? setProductDialog(false) : setProductDialog(true)
        dispatch(addnewProductStart(product)); 
    }

    const updateProduct = async () => {
        setSubmitted(true);
        setProduct({ ...product }); 
        setDialogBox(false);       
        submitted ? setProductDialog(false) : setProductDialog(true)
        dispatch(updateProductStart(product)); 
    }

    const editProduct = (product) => {
        setProduct({ ...product });
        setProductDialog(true);   
        setDialogBox(false);
    }

    const getSingleProduct = async (product) => {    
     
        setProduct(product) 
        dispatch(getSingleProductStart(product));
        setSingleUser(true);  
    }

    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    }

    const deleteProduct = () => {
        setProduct(product);
        dispatch(deleteProductStart(product));
        setDeleteProductDialog(false);
    }

    const exportCSV = () => {
        dt.current.exportCSV();
    }

    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    }

    const deleteSelectedProducts = () => {
        let _products = products.filter(val => !selectedProducts.includes(val));
        setProducts(_products);
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
    }

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };
        _product[`${name}`] = val;
        setProduct(_product);
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
                    <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} />
                </div>
            </React.Fragment>
        )
    }

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="mr-2 inline-block" />
                <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
            </React.Fragment>
        )
    }

    const pIdBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Id</span>
                {rowData.id}
            </>
        );
    }
  
    const pnameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Product Name</span>
                {rowData.product_name}
            </>
        );
    }
    const pDescBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Product Description</span>
                {rowData.product_description}
            </>
        );
    }

    const pCostBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Product Cost</span>
                {rowData.product_cost}
            </>
        );
    }

    const pPurchaseDateBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Purchase Date</span>
                {rowData.purchase_date}
            </>
        );
    }

    const categoryIdBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Category ID</span>
                {rowData.category_id}
            </>
        );
    }


    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-search" className="p-button-rounded p-button-info mr-2" onClick={() => getSingleProduct(rowData)} />   
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger mt-2" onClick={() => confirmDeleteProduct(rowData)} />
            </div>
        );
    }

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">List of Products</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const createNewEmployeeFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Add" icon="pi pi-check" className="p-button-text" onClick={addNewProduct} />
        </>
    )

    const updateEmployeeFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Update" icon="pi pi-check" className="p-button-text" onClick={updateProduct} />
        </>
    )

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

                    <DataTable ref={dt} value={productss} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                        dataKey="id" paginator rows={5} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                        globalFilter={globalFilter} emptyMessage="No products found." header={header} responsiveLayout="scroll">
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem'}}></Column>
                        <Column field="id" header="ID" sortable body={pIdBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="product_name" header="ProductName" sortable body={pnameBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="product_description" header="ProductDescription" sortable body={pDescBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="product_cost" header="ProductCost" sortable body={pCostBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>  
                        <Column field="purchase_date" header="PurchaseDate" body={pPurchaseDateBodyTemplate} sortable headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="category_id" header="CategoryId" body={categoryIdBodyTemplate} sortable headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>

                        <Column body={actionBodyTemplate}></Column>
                    </DataTable> 

                    <Dialog visible={singleUser}  style={{ width: '450px' }} header="Product Details" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                        <table>
                            <tr>
                                <td> <div className="field"><label htmlFor="name" style={{ fontWeight: 'bold' }}>Product ID : </label></div></td>
                                <td> <div className="field"><label>{getsingleProduct.id}</label></div> </td>
                            </tr>
                            <tr>
                                <td> <div className="field"> <label htmlFor="name" style={{ fontWeight: 'bold' }}>Product Name : </label></div> </td>
                                <td> <div className="field"><label> {getsingleProduct.product_name}</label> </div></td>
                            </tr>
                            <tr>
                                <td> <div className="field"> <label htmlFor="name" style={{ fontWeight: 'bold' }}>Product Description : </label> </div></td>
                                <td> <div className="field"> <label> {getsingleProduct.product_description}</label></div> </td>
                            </tr>
                            <tr>
                                <td> <div className="field"> <label htmlFor="name" style={{ fontWeight: 'bold' }}>Product Cost : </label></div> </td>
                                <td> <div className="field"><label> {getsingleProduct.product_cost}</label> </div> </td>
                            </tr>
                            <tr>
                                <td> <div className="field"><label htmlFor="name" style={{ fontWeight: 'bold' }}>Purchase Date : </label></div> </td>
                                <td> <div className="field"><label> {getsingleProduct.purchase_date}</label></div> </td>
                            </tr>
                            <tr>
                                <td> <div className="field"><label htmlFor="name" style={{ fontWeight: 'bold' }}>Category ID : </label></div> </td>
                                <td> <div className="field"><label> {getsingleProduct.category_id}</label></div> </td>
                            </tr>
                            <tr>
                                <td> <div className="field"><label htmlFor="name" style={{ fontWeight: 'bold' }}>Created Date : </label></div> </td>
                                <td> <div className="field"><label> {getsingleProduct.created_at} </label></div> </td>
                            </tr>
                            <tr>
                                <td> <div className="field"><label htmlFor="name" style={{ fontWeight: 'bold' }}>Updated Date : </label></div> </td>
                                <td> <div className="field"><label> {getsingleProduct.updated_at} </label></div> </td>
                            </tr>
                        </table>       
                    </Dialog>

                    <Dialog visible={productDialog} style={{ width: '450px' }} header='Product Details' modal className="p-fluid" footer={ dialogBox ? createNewEmployeeFooter : updateEmployeeFooter} onHide={hideDialog}>
                        <div className="field">  
                            <label htmlFor="name">Product Name</label>
                            <InputText id="first_product_name" value={product.product_name} onChange={(e) => onInputChange(e, 'product_name')} className={classNames({ 'p-invalid': submitted && !product.product_name })} required autoFocus  />
                            {submitted && !product.product_name && <small className="p-invalid">Product Name is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="name">Product Description</label>
                            <InputText id="product_description" value={product.product_description} onChange={(e) => onInputChange(e, 'product_description')} className={classNames({ 'p-invalid': submitted && !product.product_description })}   required autoFocus  />
                            {submitted && !product.product_description && <small className="p-invalid">Product Description is required.</small>}
                        </div>

                        <div className="formgrid grid" style={{ marginBottom: '5%' }}>
                            <div className="field col">
                                <label htmlFor="name">Category ID</label>
                                
                                <select style={{ width: '100%', height: '90%' , border: '1px solid #cccccc', borderRadius:'5px', paddingLeft:'5px', color: 'gray', fontSize: '14px'}} 
                                    className={classNames({ 'p-invalid': submitted && !product.category_id })}
                                    id='category_id' 
                                    onChange={(e) => onInputChange(e , 'category_id')} 
                                    required autoFocus >
                                    {
                                        categoriess ?  categoriess.map(catItem => (
                                        <option key={catItem.category_name} 
                                            value={catItem.id}
                                            style ={{ color: 'gray', fontSize: '14px' }}   >
                                            {catItem.category_name}         
                                        </option>
                                    ) )  : null
                                    }      
                                </select>
                                {submitted && !product.category_id && <small className="p-invalid">You have to Choose the Category!</small>}
                              
                            </div>
                        </div>

                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="name">product Cost</label>
                                <InputText id="product_cost" value={product.product_cost} onChange={(e) => onInputChange(e, 'product_cost')} className={classNames({ 'p-invalid': submitted && !product.product_cost })}  required autoFocus  />
                                {submitted && !product.product_cost && <small className="p-invalid">Provide Cost of the Product </small>}
                            </div>
                            <div className="field col">
                                <label htmlFor="name">Purchase Date</label>
                                <TextField 
                                    id="purchase_date"
                                    type="date"
                                    value={product.purchase_date} 
                                    onChange={(e) => onInputChange(e, 'purchase_date')}
                                    InputProps={{ disableUnderline: true }}
                                    style={{ width: '100%', height: '65%', border: '1px solid #cccccc', borderRadius:'5px', paddingLeft:'5px', padding: '2px'}}
                                    required autoFocus 
                                />
                            </div>
                        </div>
                    </Dialog>  

  
                    <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {product && <span>Are you sure you want to delete <b>{product.product_name}</b>?</span>}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteProductsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {product && <span>Are you sure you want to delete the selected products?</span>}
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

export default React.memo(Products, comparisonFn);
