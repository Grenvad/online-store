const initialState = {
    items: [],
    isLoading: false
};

const orders = (state = initialState, action) => {
    switch (action.type) {
        case "LOAD_ORDERS":
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

export default orders;