import { combineReducers } from "redux";

import categories from "./categoryReducer";
import cart from "./cartReducer";
import products from "./productReducer";

const rootReducer = combineReducers({
  categories,
  cart,
  products
});

export default rootReducer;
