const initState = {};
const movieDetail = (state = initState, action) => {
  switch (action.type) {
    case "GET_DETAIL":
      return action.payload;
    default:
      return state;
  }
};

export default movieDetail;
