import { combineReducers } from "redux";

import usersReducer from "./Reducers/reducer";
import productReducer from "./Reducers/productReducer";
import categoryReducer from "./Reducers/categoryReducer";
import allocationReducer from "./Reducers/allocationReducer";
import comboReducer from "./Reducers/comboReducer";
import departmentReducer from "./Reducers/departmentReducer";

const rootReducer = combineReducers({
    loginData: usersReducer,
    data: usersReducer,
    employeeDetails: usersReducer,
    changePass: usersReducer,
    product: productReducer,
    singleProduct: productReducer,
    category: categoryReducer,
    categoryDetails: categoryReducer,
    department: departmentReducer,
    departmentsDetails: departmentReducer,
    stock: categoryReducer,
    allocation: allocationReducer,
    combo: comboReducer,
    comboDetails: comboReducer,
})

export default rootReducer;