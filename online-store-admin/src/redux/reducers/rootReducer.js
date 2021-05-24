import { combineReducers } from "redux";
import categoryReducer from './categoryReducer';
import authReducer from './authReducer';
import userReducer from './userReducer';
import productReducer from './productReducer';
import orderReducer from './orderReducer';

const rootReducer = combineReducers({
    categories: categoryReducer,
    auth: authReducer,
    users: userReducer,
    products: productReducer,
    orders: orderReducer
});

export default rootReducer;