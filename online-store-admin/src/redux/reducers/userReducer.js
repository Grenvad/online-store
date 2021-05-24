const initialState = {
    users: [],
    isLoading: false
};

const users = (state = initialState, action) => {
    switch (action.type) {
        case "SET_USERS":
            return {
                ...state,
                users: action.payload
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

export default users;