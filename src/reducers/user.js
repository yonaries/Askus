const initState = {
  user: {
    uid: "",
    displayName: "",
  },
};

export const userAction = (state = initState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: {
          uid: action.payload.uid,
          displayName: action.payload.displayName,
        },
      };
    case "REMOVE_USER":
      return {
        ...state,
        user: {
          uid: "",
          displayName: "",
        },
      };
    default:
      return state;
  }
};
