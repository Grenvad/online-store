import axios from "axios";

export const fetchCategories = () => (dispatch) => {
  axios.get("https://localhost:44364/api/Categories").then(({ data }) => {
    dispatch(setCategories(data));
  });
};

export const setCategories = (items) => ({
  type: "LOAD_CATEGORIES",
  payload: items,
});

export const setActiveCategory = (id) => ({
  type: "SET_ACTIVE_CATEGORY",
  payload: id,
});
