import axiosInstance from "../../api/axiosInstance";

async function postImage(file) {
    var formData = new FormData();
    formData.append('files', file);
    return await axiosInstance.post(`Files/UploadImages`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then((res) => res.data[0]);
}

export const fetchProducts = (id) => (dispatch) => {
    axiosInstance.get(`Products?categoryId=${id}`).then(({ data }) => {
        dispatch(setProducts(data));
    });
};

export const deleteProduct = (id) => (dispatch) => {
    axiosInstance.delete(`Products?id=${id}`).then(() => {
        dispatch(setProducts());
    });
};

export const setProducts = (items) => ({
    type: "LOAD_PRODUCTS",
    payload: items
});

export const setLoading = (status) => ({
    type: "SET_LOADING",
    payload: status
});



export const postProduct = (category, title, description, image, price) => async (dispatch) => {
    var data = {
        name: title,
        description: description,
        image: await postImage(image),
        categoryId: category,
        price: price,
    }
    console.log(data);
    axiosInstance.post(`Products`, data).then((response) => console.log(response));
};

export const putProduct = (category, title, description, image, price) => async (dispatch) => {
    var data = {
        name: title,
        description: description,
        image: await postImage(image),
        categoryId: category,
        price: price,
    }

    axiosInstance.put(`Products`, data).then((response) => console.log(response));
};
