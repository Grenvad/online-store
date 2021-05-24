const initialState = {
    activeCategory: "",
    categories: [],
    isLoading: false
};

const categories = (state = initialState, action) => {
    switch (action.type) {
        case "SET_ACTIVE_CATEGORY":
            return {
                ...state,
                activeCategory: action.payload
            }

        case "LOAD_CATEGORIES":
            return {
                ...state,
                activeCategory: action.payload[0].id,
                categories: action.payload
            }
        case "SET_LOADING":
            return {
                ...state,
                isLoading: action.payload
            }
        case "RESET":
            return initialState;

        default:
            return state;
    }
}

export default categories;