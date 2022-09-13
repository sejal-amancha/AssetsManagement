import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";

import { addnewProductStart } from "../../redux/Actions/productActions";
import { loadProductsStart, updateProductStart } from "../../redux/Actions/productActions";
import { loadCategoriesStart } from "../../redux/Actions/categoryActions";
import classNames from "classnames";

const emptyData = {
    product_name: "",
    product_description: "",
    category_id: "1",
    product_cost: "",
    purchase_date: "",
};

const AddEditProduct = () => {
    const [product, setProduct] = useState(emptyData);
    var { id, product_name, product_description, category_id, product_cost, purchase_date } = product;

    const dispatch = useDispatch();
    const history = useHistory();
    var { id } = useParams();

    const productss = useSelector((state) => state.product.productss.rows);
    const categoriess = useSelector((state) => state.category.categories.rows);

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
            dispatch(addnewProductStart(product));
        } else {
            dispatch(updateProductStart(product));
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
                    <div className="font-medium text-4xl text-900 mb-3"> {!editMode ? "Add New Product" : `Update Product/${product.product_name}`}</div>
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
                        <InputText id="product_name" value={product_name} onChange={(e) => onInputChange(e, "product_name")} className={classNames({ "p-invalid": submitted && !product.product_name })} required autoFocus />
                        {submitted && !product.product_name && <small className="p-invalid">Product Name is required.</small>}
                    </div>
                    <div className="field">
                        <label htmlFor="name">product Description</label>
                        <InputText id="product_description" value={product_description} onChange={(e) => onInputChange(e, "product_description")} className={classNames({ "p-invalid": submitted && !product.product_description })} required autoFocus />
                        {submitted && !product.product_description && <small className="p-invalid">Product Description is required.</small>}
                    </div>
                    <div className="field">
                        <label htmlFor="name">Category Belongs to</label>
                        <Dropdown className={classNames({ "p-invalid": submitted && !product.category_id })} id="category_id" value={category_id} onChange={(e) => onInputChange(e, "category_id")} required autoFocus>
                            {categoriess
                                ? categoriess.map((catItem) =>
                                      catItem.status == 1 ? (
                                          <options key={catItem.category_name} value={catItem.id} style={{ color: "gray", fontSize: "14px" }}>
                                              {catItem.category_name}
                                          </options>
                                      ) : null
                                  )
                                : null}
                        </Dropdown>
                        {submitted && !product.category_id && <small className="p-invalid">Select Category </small>}
                    </div>
                    <div className="formgrid grid">
                        <div className="field col">
                            <label htmlFor="name">Product Cost</label>
                            <InputText id="product_cost" value={product_cost} onChange={(e) => onInputChange(e, "product_cost")} className={classNames({ "p-invalid": submitted && !product.product_cost })} required autoFocus />
                            {submitted && !product.product_cost && <small className="p-invalid">Provide Cost of the Product </small>}
                        </div>
                        <div className="field col">
                            <label htmlFor="name">Product Purchase Date</label>
                            <Calendar showIcon showButtonBar value={new Date(purchase_date) || ""} onChange={(e) => onInputChange(e, "purchase_date")} className={classNames({ "p-invalid": submitted && !product.purchase_date })}></Calendar>
                            {submitted && !product.purchase_date && <small className="p-invalid">Purchase Date of Product id Required </small>}
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
