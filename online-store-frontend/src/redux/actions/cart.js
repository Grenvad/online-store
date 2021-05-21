import axios from "axios";

export const addItemToCart = (item) => ({
  type: "ADD_ITEM_TO_CART",
  payload: item,
});

export const clearCart = () => ({
  type: "CLEAR_CART",
});

export const removeCartItem = (id) => ({
  type: "REMOVE_CART_ITEM",
  payload: id,
});

export const plusCartItem = (id) => ({
  type: "PLUS_CART_ITEM",
  payload: id,
});

export const minusCartItem = (id) => ({
  type: "MINUS_CART_ITEM",
  payload: id,
});

export const makeOrder = (data) =>
  axios
    .post("https://localhost:44364/api/Orders", data)
    .then((response) => console.log(response));
