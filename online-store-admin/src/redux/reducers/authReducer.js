const initialState = {
    isAuthenticated: false,
    user: {},
    accessToken: "",
  };

  const auth = (state = initialState, action) => {
    switch (action.type) {
      case "SET_USER": {
        return {
          ...state,
          user: action.payload.user,
          accessToken: action.payload.accessToken,
          isAuthenticated: true,
        };
      }
      case "REFRESH_USERDATA": {
          return {
              ...state,
              user: action.payload,
              isAuthenticated: true
          };
      }
      case "REFRESH_TOKEN": {
          return {
              ...state,
              accessToken: action.payload,
              isAuthenticated: true
          };
      }
      default:
        return state;
    }
  };
  
  export default auth;