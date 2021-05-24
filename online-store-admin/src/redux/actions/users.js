import axiosInstance from "../../api/axiosInstance";

export const fetchUsers = () => (dispatch) => {
    axiosInstance.get(`User`).then(({ data }) => {
        dispatch(setUsers(data));
    });
};

export const registerUser = (username, email, password) => (dispatch) => {
    axiosInstance.post(`User/register`, {username, email, password}).then(({ data }) => {
        dispatch(fetchUsers(data));
    });
};

export const deleteUser = (id) => (dispatch) => {
    axiosInstance.delete(`User/${id}`).then(() => {
        dispatch(fetchUsers());
    });
};

export const setUsers = (items) => ({
    type: "SET_USERS",
    payload: items
});

export const setLoading = (status) => ({
    type: "SET_LOADING",
    payload: status
});
