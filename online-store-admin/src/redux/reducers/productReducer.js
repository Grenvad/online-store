const initialState = {
    items: [],
    isLoading: false
};

const products = (state = initialState, action) => {
    switch (action.type) {
        case "LOAD_PRODUCTS":
            return {
                ...state,
                items: action.payload
            }
        case "SET_LOADING":
            return {
                ...state,
                isLoading: action.payload
            }
        default:
            return state;
    }
}

export default products;