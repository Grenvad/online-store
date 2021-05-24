import axiosInstance from "../../api/axiosInstance";

export const fetchCategories = () => (dispatch) => {
    dispatch(setLoading(true));
    axiosInstance.get("categories").then(({data}) =>{
        if (data.length > 0) {
            dispatch(setCategories(data));
            dispatch(setLoading(false));
        }
    });
};

export const deleteCategory = (id) => (dispatch) => {
    axiosInstance.delete(`categories?id=${id}`).then(() =>{
        dispatch(fetchCategories());
    });
};

export const addCategory = (name) => (dispatch) => {
    axiosInstance.post(`categories`, name).then(() =>{
        dispatch(fetchCategories());
    });
};

export const setLoading = (status) => ({
    type: "SET_LOADING",
    payload: status
});

export const setCategories = (items) => ({
    type: "LOAD_CATEGORIES",
    payload: items
});

export const setActiveCategory = (id) => ({
    type: "SET_ACTIVE_CATEGORY",
    payload: id
});

export const resetCategories = () => ({
    type: "RESET",
});