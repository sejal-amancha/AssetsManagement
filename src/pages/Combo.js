import React, { useState, useEffect, useRef }  from 'react';
import { useDispatch, useSelector } from "react-redux";
import {  loadProductsStart } from '../redux/Actions/productActions';
import {  loadAllocationStart } from '../redux/Actions/allocationActions';
import { loadComboStart, createComboStart, updateComboStart, deleteComboStart, getcomboByIdStart } from '../redux/Actions/comboActions';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { FileUpload } from 'primereact/fileupload';
import { Column } from 'primereact/column';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';


const Combo = () => {

    let initialCombo = {
        allocation_id: '',
        product_id: '',
    }
    const dt = useRef(null);
    const toast = useRef(null);
    const dispatch = useDispatch();
    const [globalFilter, setGlobalFilter] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [dialogBox, setDialogBox] = useState(false);
    const [singleCombo, setSingleCombo] = useState(false);
    const [combo, setCombo] = useState(initialCombo);

    const productss = useSelector((state) => state.product.productss.rows);
    const allocationss = useSelector((state) => state.allocation.allocations.rows);
    const combos = useSelector((state) => state.combo.combos.rows);
    const getSinglecombodetails = useSelector((state) => state.comboDetails.comboDetails);

    useEffect(() => {
        dispatch(loadAllocationStart());
    }, []);

    useEffect(() => {
        dispatch(loadProductsStart());
    }, []);

    useEffect(() => {
        dispatch(loadComboStart());
    },[])

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">List of Combos</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="New" icon="pi pi-plus" className="p-button-success mr-2"  onClick={openNew}/>
                    <Button label="Delete" icon="pi pi-trash" className="p-button-danger"   />
                </div>
            </React.Fragment>
        )
    }

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="mr-2 inline-block" />
                <Button label="Export" icon="pi pi-upload" className="p-button-help"  />
            </React.Fragment>
        )
    }

    const openNew = () => {
        setProductDialog(true);
        setDialogBox(true);
    }

    const hideDialog = () => {
        setProductDialog(false);    
    }

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    }

    const hideSingleCombo = () => {
        setSingleCombo(false);
    }

    const deleteSelectedComboDialog = () => {
        setCombo(combo);
        dispatch(deleteComboStart(combo));
        setDeleteProductDialog(false);
    }

    const createCombo = () => {
        setCombo({...combo});
        dispatch(createComboStart(combo));
        setProductDialog(false);   
    }

    const updateCombo = async () => {
        setCombo({ ...combo }); 
        setDialogBox(false);        
        dispatch(updateComboStart(combo));
        setProductDialog(false);  
    }

    const editCombo = (combo) => {
        setCombo({ ...combo });
        setProductDialog(true);   
        setDialogBox(false);
    }

    const getSingleCombo = (combo) => {
        setCombo({...combo});
        dispatch(getcomboByIdStart(combo));
        setSingleCombo(true);
    }

    const deleteCombo = (combo) => {
        setCombo(combo);
        setDeleteProductDialog(true);  
    }

    const addComboFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Add" icon="pi pi-check" className="p-button-text" onClick={createCombo} />
        </>
    ) 
    const updateComboFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Update" icon="pi pi-check" className="p-button-text" onClick={updateCombo} />
        </>
    ) 

    const deleteComboDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedComboDialog}/>
        </>
    );

    const comboDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideSingleCombo} />
        </>
    )

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editCombo(rowData)}/>  
                <Button icon="pi pi-search" className="p-button-rounded p-button-info mr-2" onClick={() => getSingleCombo(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger mt-2" onClick={() => deleteCombo(rowData)} />
            </div>
        );
    }
    
    const comboIdTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">comboId</span>
                {rowData.id}
            </>
        )
    }

    const productIdTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">ProductId</span>
                {rowData.product_id}
            </>
        );
    };

    const allocationIdTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">AllocationId</span>
                {rowData.allocation_id}
            </>
        );
    };

    const onInputChange = (e, name) => {
        const value = (e.target && e.target.value) || '';
        let create_combo = { ...combo };
        create_combo[`${name}`] = value;
        setCombo(create_combo);
    }

    return (
        <div className="grid">
        <div className="col-12">
            <div className="card">
                 <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                 <DataTable ref={dt} 
                        dataKey="id" value={combos} paginator rows={5} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                        globalFilter={globalFilter} emptyMessage="No Combo Created found." header={header} responsiveLayout="scroll">

                        <Column selectionMode="multiple" headerStyle={{ width: '3rem'}}></Column>
                        <Column field="id" header="Combo ID" body={comboIdTemplate} sortable headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="product_id" header="product ID" body={productIdTemplate} sortable  headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="allocation_id" header="Allocation Id" body={allocationIdTemplate} sortable  headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable> 

                    <Dialog visible={productDialog} style={{ width: '450px' }} header="Create Combo" modal className="p-fluid" footer={dialogBox ? addComboFooter : updateComboFooter } onHide={hideDialog}>
                    <div className="formgrid grid" style={{ marginBottom: '5%' }}>
                        <div className="field col">  
                            <label htmlFor="name">Select Allocation</label>
                            <select 
                                    name='allocation_id'
                                    id='allocation_id'  
                                    onChange={(e) => onInputChange(e , 'allocation_id')} 
                                    style={{ height:'100%', width:'100%', padding:'4%', margin:'1%', border:'1px solid #cccccc', borderRadius:'5px'}}>       
                            {
                                allocationss ?
                                    allocationss.map(allocate => (     
                                        <option     
                                            key={allocate.id}
                                            value = {allocate.id}  
                                            style ={{ color: 'gray', fontSize: '14px', padding:'5px', margin:'2px' }} >    
                                           {allocate.combo_id} 
                                        </option>
                                    )) : null
                            }
                   </select>
                        </div> 

                        <div className="field col">  
                            <label htmlFor="name">Select Product</label>
                            <select 
                                    name='product_id'
                                    id='product_id'  
                                    onChange={(e) => onInputChange(e , 'product_id')} 
                                    style={{ height:'100%', width:'100%', padding:'4%', margin:'1%', border:'1px solid #cccccc', borderRadius:'5px'}}>       
                            {
                                productss ?
                                    productss.map(product => (     
                                        <option     
                                            key={product.id}
                                            value={product.id}
                                            style ={{ color: 'gray', fontSize: '14px', padding:'5px', margin:'2px' }} >    
                                           {product.product_name}   
                                        </option>
                                    )) : null
                            }
                   </select>
                    </div> 
                    </div>
                    </Dialog>  

                    <Dialog visible={singleCombo} style={{ width: "450px" }} header="User Details" modal className="p-fluid" footer={comboDialogFooter} onHide={hideSingleCombo} >
                        <table>
                            <tr>
                                <td> <div className="field">
                                        <label htmlFor="name" style={{ fontWeight: "bold" }}> Combo ID : </label>
                                    </div> </td>
                                <td> <div className="field">
                                        <label>{getSinglecombodetails.id}</label>
                                    </div> </td>
                            </tr>
                            <tr>
                                <td> <div className="field">
                                        <label htmlFor="name" style={{ fontWeight: "bold" }}> Allocation Id : </label>
                                    </div> </td>
                                <td> <div className="field">
                                        <label> {getSinglecombodetails.allocation_id}</label>
                                    </div> </td>
                            </tr>
                            <tr>
                                <td> <div className="field">
                                        <label htmlFor="name" style={{ fontWeight: "bold" }}> Product Id : </label>
                                    </div> </td>
                                <td> <div className="field">
                                        <label> {getSinglecombodetails.product_id}</label>
                                    </div> </td>
                            </tr>
                            <tr>
                                <td> <div className="field">
                                        <label htmlFor="name" style={{ fontWeight: "bold" }}> Created At : </label>
                                    </div> </td>
                                <td> <div className="field">
                                        <label> {getSinglecombodetails.created_at}</label>
                                    </div> </td>
                            </tr>
                            <tr>
                                <td> <div className="field">
                                        <label htmlFor="name" style={{ fontWeight: "bold" }}> Updated At : </label>
                                    </div> </td>
                                <td> <div className="field">
                                        <label> {getSinglecombodetails.updated_at}</label>
                                    </div> </td>
                            </tr>
                        </table>
                    </Dialog>


                    <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteComboDialogFooter} onHide={hideDeleteProductDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {combo && <span>Are you sure you want to delete this Combo?</span>}
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

export default React.memo(Combo, comparisonFn);
