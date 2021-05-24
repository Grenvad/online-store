import axiosInstance from "../../api/axiosInstance";

export const fetchOrders = () => (dispatch) => {
  axiosInstance.get(`Orders`).then(({ data }) => {
    dispatch(setOrders(data));
  });
};

export const setOrders = (items) => ({
    type: "LOAD_ORDERS",
    payload: items
});
