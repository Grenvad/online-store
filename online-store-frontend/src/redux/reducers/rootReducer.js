import { combineReducers } from "redux";

import filters from "./filterReducer";
import cart from "./cartReducer";
import products from "./productReducer";

const rootReducer = combineReducers({
  filters,
  cart,
  products
});

export default rootReducer;
