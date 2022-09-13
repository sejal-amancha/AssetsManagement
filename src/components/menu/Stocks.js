import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputText } from 'primereact/inputtext';
import { loadStocksStart } from "../../redux/Actions/categoryActions";
import classNames from 'classnames';

const Stocks = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const [globalFilter, setGlobalFilter] = useState(null);
    const dt = useRef(null);
    const stock = useSelector((state) => state);
    console.log("STOCKS~~~~~~>>>>>>>>", stock);

    useEffect(() => {
        dispatch(loadStocksStart());
    }, []);

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Back" icon="pi pi-angle-left" className="p-button-secondary mr-2" onClick={gotoPrevious} />
                </div>
            </React.Fragment>
        )
    }

    const gotoPrevious = () => {
        history.goBack();
    }

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">List of All Stocks</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const codeBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Id</span>
                {rowData.id}
            </>
        );
    };

    const cIdBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">FirstName</span>
                {rowData.first_name}
            </>
        );
    };
    const cnameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">LastName</span>
                {rowData.last_name}
            </>
        );
    };

    const assignStockBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Email</span>
                {rowData.email}
            </>
        );
    };

    const stockBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Phone</span>
                {rowData.phone}
            </>
        );
    };

  return (
    <div className="grid crud-demo">
    <div className="col-12">
        <div className="card" style={{ margin: '1%'}}>

            <Toolbar className="mb-4" right={rightToolbarTemplate}></Toolbar>
            <DataTable ref={dt}
                dataKey="id" paginator rows={5} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                globalFilter={globalFilter} emptyMessage="No Stocks found." header={header} responsiveLayout="scroll">
        
                <Column field="id" header="ID" sortable body={cIdBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                <Column field="CategoryName" header="Category Name" sortable body={cnameBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                <Column field="AssingStock" header="Assingn Stocks" sortable body={assignStockBodyTemplate}  headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                <Column field="Stock" header="Available in Stocks" sortable body={stockBodyTemplate}  headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
    
            </DataTable>   
        </div>
        </div>
    </div>
  )
}

export default Stocks
