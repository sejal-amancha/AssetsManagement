import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { loadCategoriesStart, addnewCategoryStart, updateCategoryStart } from '../../redux/Actions/categoryActions';
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { InputTextarea } from "primereact/inputtextarea";
import classNames from "classnames";

let emptyCategory = {
    categoryName: '',
}

const AddEditCategory = () => {
    const [category, setCategory] = useState(emptyCategory);
    var { id, categoryName }  = category;
    const dispatch = useDispatch();
    const history = useHistory();
    var { id } = useParams();

    const [submitted, setSubmitted] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const categoriess = useSelector((state) => state?.category?.categories?.rows);
    

    useEffect(() => {
        dispatch(loadCategoriesStart());
    }, []);

    useEffect(() => {
        if (id) {
            setEditMode(true);
            const singleCategory = categoriess ? categoriess.find((item) => item.id === Number(id)) : null;
            setCategory({...singleCategory});
        } else {
            setEditMode(false);
            setCategory({...category})
        }
    }, [id]);

    const gotoPrevious = () => {
        history.goBack();
    };

    const addUpdateCategory = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        if (!editMode) {
            setCategory(category)
            if (category.categoryName) {
                dispatch(addnewCategoryStart(category)); 
                setTimeout(() => {
                    history.push('/admindashboard/categories')
                }, 2000)
            }   
        } else {
            if (category.categoryName) {
                dispatch(updateCategoryStart(category));  
                setTimeout(() => {
                    history.push('/admindashboard/categories')
                }, 2000)
            }
        }
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || "";
        setCategory({ ...category, [name]: val });
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <div className="font-medium text-4xl text-900 mb-3"> {!editMode ? "Add New Category" : `Update Category`}</div>
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
                        <label htmlFor="name">Category Name</label>
                        <InputText id="categoryName" value={categoryName} onChange={(e) => onInputChange(e, "categoryName")} className={classNames({ "p-invalid": submitted && !category.categoryName })} required autoFocus />
                        {submitted && !category.categoryName && <small className="p-error">Category Name is required.</small>}
                </div>
                {/* <div className="field">
                        <label htmlFor="name">Category Discription</label>
                        <InputTextarea id="description" value={description} onChange={(e) => onInputChange(e, "description")} className={classNames({ "p-invalid": submitted && !category.description })} required autoResize rows="3" cols="30" />
                        {submitted && !category.description && <small className="p-error">Category Description is required.</small>}
                </div> */}
                <div className="formgrid grid">
                        <div className="field col">
                            <Button label="Cancel" icon="pi pi-times" className="p-button-secondary mr-2 mb-2" onClick={gotoPrevious} />
                        </div>
                        <div className="field col">
                            <Button label={!editMode ? "Add" : "UPDATE"} icon="pi pi-check" className="p-button-warning mr-2 mb-2" onClick={addUpdateCategory} />
                        </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default AddEditCategory;
