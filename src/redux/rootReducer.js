import { combineReducers } from "redux";


import usersReducer from "./Reducers/reducer";
import productReducer from "./Reducers/productReducer";
import categoryReducer from "./Reducers/categoryReducer";
import allocationReducer from "./Reducers/allocationReducer";
import comboReducer from "./Reducers/comboReducer";


const rootReducer = combineReducers({
    data: usersReducer,
    product: productReducer,
    singleProduct: productReducer,
    category: categoryReducer,
    allocation: allocationReducer,
    combo: comboReducer,
    comboDetails: comboReducer,
})

export default rootReducer;