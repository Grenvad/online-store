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

        default:
            return state;
    }
}

export default categories;