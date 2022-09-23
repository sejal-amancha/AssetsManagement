import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from 'primereact/inputnumber'
import { Calendar } from "primereact/calendar";

import { addnewProductStart } from "../../redux/Actions/productActions";
import { loadProductsStart, updateProductStart } from "../../redux/Actions/productActions";
import { loadCategoriesStart } from "../../redux/Actions/categoryActions";
import classNames from "classnames";
import { InputTextarea } from "primereact/inputtextarea";

const emptyData = {
    itemName: "",
    description: "",
    categoryId: "",
    cost: "",
    datePurchased: "",
    qty: "1",
};

const AddEditProduct = () => {
    const [product, setProduct] = useState(emptyData);
    var { id, itemName, description, categoryId, qty, cost, datePurchased } = product;

    const dispatch = useDispatch();
    const history = useHistory();
    var { id } = useParams();

    const productss = useSelector((state) => state?.product?.productss?.rows);
    const categoriess = useSelector((state) => state?.category?.categories?.rows);
    // console.log("Categoriess data~~~~>>>>", categoriess)

    const [submitted, setSubmitted] = useState(false);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        dispatch(loadCategoriesStart());
    }, []);

    useEffect(() => {
        dispatch(loadProductsStart());
    }, []);

    useEffect(() => {
        if (id) {
            setEditMode(true);
            const singleProduct = productss ? productss.find((item) => item.id === Number(id)) : null;
            setProduct({ ...singleProduct });
        } else {
            setEditMode(false);
            setProduct({ ...product });
        }
    }, [id]);

    const addUpdateProduct = async (e) => {
        e.preventDefault();
        setSubmitted(true);
       
        if (!editMode) {
            setProduct(product);
            if(product.itemName && product.categoryId && product.description && product.cost) {
                dispatch(addnewProductStart(product));
                setTimeout(() => {
                    history.push('/admindashboard/assets')
                }, 2000)
            }
        } else {
            if(product.itemName && product.categoryId && product.description && product.cost) {
                dispatch(updateProductStart(product));
                setTimeout(() => {
                    history.push('/admindashboard/assets')
                }, 2000)
            }
        }
    };

    const gotoPrevious = () => {
        history.goBack();
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || "";
        setProduct({ ...product, [name]: val });
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <div className="font-medium text-4xl text-900 mb-3"> {!editMode ? "Add New Item" : `Update Item/${product.product_name}`}</div>
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

    return (
        <div className="surface-section card" style={{ margin: "1%", padding: "1%" }}>
            <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

            <div className="col-12 md:col-6">
                <div className="card p-fluid">
                    <div className="field">
                        <label htmlFor="name">Product Name</label>
                        <InputText id="product_name" value={itemName} onChange={(e) => onInputChange(e, "itemName")} className={classNames({ "p-invalid": submitted && !product.itemName })} required autoFocus />
                        {submitted && !product.itemName && <small className="p-error">Product Name is required.</small>}
                    </div>
                    <div className="field">
                        <label htmlFor="name">product Description</label>
                        <InputTextarea id="description" value={description} onChange={(e) => onInputChange(e, "description")} className={classNames({ "p-invalid": submitted && !product.description })} required autoFocus />
                        {submitted && !product.description && <small className="p-error">Product Description is required.</small>}
                    </div>
                    <div className="formgrid grid">
                        <div className="field col">
                            <label htmlFor="name">Category Belongs to</label>
                            <Dropdown className={classNames({ "p-invalid": submitted && !product.categoryId })} value={categoryId} id="categoryId"  onChange={(e) => onInputChange(e, "categoryId")} required autoFocus
                                options={categoriess}
                                optionValue="id"
                                placeholder="Choose a Category"
                                optionLabel="categoryName">
                                {/* {categoriess
                                    ? categoriess.map((catItem) =>
                                        catItem.isActive === true ? (
                                            options={catItem}
                                            optionValue=`${catItem.id}`
                                            placeholder="choose"
                                            optionLabel="catItem.categoryName"
                                           
                                        ) : null
                                    )
                                    : null} > */}
                            </Dropdown>
                            {submitted && !product.categoryId && <small className="p-error">Select Category </small>}
                        </div>
                        <div className="field col">
                            <label htmlFor="integeronly">Quantity</label>
                            <InputNumber inputId="integeronly" id="qty" value={qty} onChange={(e) => onInputChange(e, "qty")} className={classNames({ "p-invalid": submitted && !product.qty })} required autoFocus mode="decimal" useGrouping={false}  />
                            {submitted && !product.qty && <small className="p-error">Product Quantity is required.</small>}    
                        </div>
                    </div>
                    <div className="formgrid grid">
                        <div className="field col">
                            <label htmlFor="name">Product Cost</label>
                            <InputText id="cost" value={cost} onChange={(e) => onInputChange(e, "cost")} className={classNames({ "p-invalid": submitted && !product.cost })} required autoFocus  />
                            {submitted && !product.cost && <small className="p-error">Provide Cost of the Product </small>}
                        </div>
                        <div className="field col">
                            
                            <label htmlFor="name">Product Purchase Date</label>
                            <Calendar showIcon showButtonBar value={new Date(datePurchased) || ""} onChange={(e) => onInputChange(e, "datePurchased")} className={classNames({ "p-invalid": submitted && !product.datePurchased })}></Calendar>
                            {submitted && !product.datePurchased && <small className="p-error">Purchase Date of Product id Required </small>}
                        </div>
                    </div>
                    <div className="formgrid grid">
                        <div className="field col">
                            <Button label="Cancel" icon="pi pi-times" className="p-button-secondary mr-2 mb-2" onClick={gotoPrevious} />
                        </div>
                        <div className="field col">
                            <Button label={!editMode ? "Add" : "UPDATE"} icon="pi pi-check" className="p-button-warning mr-2 mb-2" onClick={addUpdateProduct} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddEditProduct;
