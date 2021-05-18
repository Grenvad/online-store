import axios from 'axios';

export const setLoaded = (payload) => ({
  type: 'SET_PRODUCTS',
  payload,
});

export const fetchProducts = (sortBy, category) => (dispatch) => {
  dispatch({
    type: 'SET_LOADED',
    payload: false,
  });

  axios
    .get(`https://fakestoreapi.com/products/category/${category}`)
    .then(({ data }) => {
      dispatch(setProducts(data));
    });
};

export const setProducts = (items) => ({
  type: 'SET_PRODUCTS',
  payload: items,
});