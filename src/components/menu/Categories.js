import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { loadCategoriesStart, addnewCategoryStart, updateCategoryStart, deleteCategoryStart, categoryStatusChangeStart } from '../../redux/Actions/categoryActions';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Link } from "react-router-dom";
import classNames from 'classnames';


const Categories = () => {
    let emptyCategory = {
        category_name: '',
        status: '',
    }
    const dispatch = useDispatch();
    const history = useHistory();
    const categoriess = useSelector((state) => state.category.categories.rows);
    
    const [productDialog, setProductDialog] = useState(false);
    const [satusDialog, setSatusDialog] = useState(false);
    const [dialogBox, setDialogBox] = useState(false);
    const [deleteCategoryDialog, setDeleteCategoryDialog] = useState(false);
    const [deleteCategoriesDialog, setDeleteCategoriesDialog] = useState(false);
    const [category, setCategory] = useState(emptyCategory);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const dt = useRef(null);
    const [globalFilter, setGlobalFilter] = useState(null);

    useEffect(() => {
        dispatch(loadCategoriesStart());
    }, []);
    
    const openNew = () => {
        setSubmitted(false);
        setProductDialog(true);
        setDialogBox(true);
    }
    const gotoPrevious = () => {
        history.goBack();
    }

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
        setSatusDialog(false);
        setCategory("")
    }

    const hideDeleteProductDialog = () => {
        setDeleteCategoryDialog(false);
    }

    const changeCategoryStatus = async() => {
        setCategory(category);
        dispatch(categoryStatusChangeStart(category));
        setSatusDialog(false);
    }

    const addNewCategory = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        setCategory(category);
        category.category_name !== '' ? setProductDialog(false) : setProductDialog(true)
        dispatch(addnewCategoryStart(category));   
    }

    const updateCategory = async () => {
        setSubmitted(true);
        setCategory({ ...category }); 
        setDialogBox(false);
        submitted ? setProductDialog(false) : setProductDialog(true)  
        category.category_name !== '' ? setProductDialog(false) : setProductDialog(true)
        dispatch(updateCategoryStart(category));      
    }

    const statusChanging = (category) => {
        setCategory({...category});
        setSatusDialog(true);
        setDialogBox(false);
    }

    const editProduct = (category) => {
        setCategory({ ...category });
        setProductDialog(true);   
        setDialogBox(false);
    }

    const confirmDeleteProduct = (category) => {
        setCategory(category);
        setDeleteCategoryDialog(true);
    }

    const deleteCategory = () => {
        setCategory(category) 
        dispatch(deleteCategoryStart(category));
        setDeleteCategoryDialog(false);
    }

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _category = { ...category };
        _category[`${name}`] = val;
        setCategory(_category);
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
    
    const cIdBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Category Id</span>
                {rowData.id}
            </>
        );
    }
  
    const cnameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Category Name</span>
                {rowData.category_name}
            </>
        );
    }

    const cStatusBodyTemplate = (rowData) => {
        let status = rowData.status == 1 ? "active" : "Inactive"; 
        return (
            <>
                <span className="p-column-title">Category Status</span>
                <span className={`product-badge status-${rowData.status}`} onClick={() => statusChanging(rowData)} >{status}</span>
            </>
        )
    }
     
    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editProduct(rowData)} />
                <Link to={`/category/${rowData.id}`}>
                    <Button icon="pi pi-info-circle" className="p-button-rounded p-button-info mr-2" />
                </Link>
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger mt-2" onClick={() => confirmDeleteProduct(rowData)} />
            </div>
        );
    }

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">List Of Categories</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const CategoryStatusFooter = (
        <>
             <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
             <Button label="Change Status" icon="pi pi-check" className="p-button-text" onClick={changeCategoryStatus} />
        </> 
    )

    const createNewCategoryFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Add" icon="pi pi-check" className="p-button-text" onClick={addNewCategory} />
        </>
    )

    const updateCategoryFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Update" icon="pi pi-check" className="p-button-text" onClick={updateCategory} />
        </>
    );

    const deletecategoryDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteCategory} />
        </>
    );
    
    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card" style={{ margin: '1%'}}>

                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate} ></Toolbar>

                    <DataTable ref={dt} value={categoriess} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                        dataKey="id" paginator rows={5} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                        globalFilter={globalFilter} emptyMessage="No Categories found." header={header} responsiveLayout="scroll">
                
                        <Column field="id" header="ID" sortable body={cIdBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="category_name" header="category_name" sortable body={cnameBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="status" header="status" sortable body={cStatusBodyTemplate}  headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
             
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>

                
                    <Dialog visible={productDialog} style={{ width: '450px' }} header="Enter Category Details" modal className="p-fluid" footer={ dialogBox ? createNewCategoryFooter : updateCategoryFooter} onHide={hideDialog}>
                    <div className="field">  
                            <label htmlFor="name">Category Name</label>
                            <InputText id="category_name" value={category.category_name} onChange={(e) => onInputChange(e, 'category_name')}  className={classNames({ 'p-invalid': submitted && !category.category_name })}  required autoFocus  />
                            {submitted && !category.category_name && <small className="p-invalid">Category Name is required.</small>}
                        </div>       
                    </Dialog>  

                    <Dialog visible={satusDialog} style={{ width: '450px' }} header="Change Category Status" modal className="p-fluid" footer={CategoryStatusFooter} onHide={hideDialog}>
                     <div className="field">
                        <label htmlFor="name">Category Status</label>
                        <select style={{ width: '100%', height: '100%' , border: '1px solid #cccccc', borderRadius:'5px', paddingLeft:'5px', color: 'gray', fontSize: '14px'}} 
                                    id='category_id' 
                                    onChange={(e) => onInputChange(e , 'status')} 
                                    required autoFocus > 
                                    <option>Active</option>
                                    <option>Inactive</option>
                        </select>

                    </div>   
                    </Dialog>

                    <Dialog visible={deleteCategoryDialog} style={{ width: '450px' }} header="Confirm" modal footer={deletecategoryDialogFooter} onHide={hideDeleteProductDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {category && <span>Are you sure you want to delete <b>{category.category_name}</b>?</span>}
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

export default React.memo(Categories, comparisonFn);
