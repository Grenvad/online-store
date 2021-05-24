import axiosIntance from "../../api/axiosInstance";

export const login = (email, password) => (dispatch) => {
  axiosIntance.post(`User/gettoken`, { email, password }).then(({ data }) => {
    dispatch(setUser(data));
  });
};

export const refreshToken = () => (dispatch) => {
  return axiosIntance.post(`User/refreshtoken`).then(({ data }) => {
    dispatch(setToken(data));
    return data;
  });
};

export const loadUserdata = () => (dispatch) => {
  axiosIntance.get(`User/loaduserdata`).then(({ data }) => {
    dispatch(setUserData(data));
  });
};

export const setToken = (item) => ({
  type: "REFRESH_TOKEN",
  payload: item,
});

export const setUserData = (item) => ({
  type: "REFRESH_USERDATA",
  payload: item,
});

export const setUser = (item) => ({
  type: "SET_USER",
  payload: item,
});
