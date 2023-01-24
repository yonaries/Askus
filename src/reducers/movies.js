const initState = {
  popularMovies: {
    nextPage: 1,
    list: [],
  },
  searchResult: {
    nextPage: 1,
    list: [],
  },
  latestMovies: {},
  nowPlayingMovies: {
    nextPage: 1,
    list: [],
  },
  topRatedMovies: {
    nextPage: 1,
    list: [],
  },
  upcomingMovies: {
    nextPage: 1,
    list: [],
  },
  filteredMovies: {
    nextPage: 1,
    list: [],
  },
};

const movies = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_POPULAR":
      return {
        ...state,
        popularMovies: {
          nextPage: state.popularMovies.nextPage + 1,
          list: [...state.popularMovies.list, ...action.payload],
        },
      };
    case "FETCH_LATEST":
      return { ...state, latestMovies: action.payload };
    case "FETCH_NOW_PLAYING":
      return {
        ...state,
        nowPlayingMovies: {
          nextPage: state.nowPlayingMovies.nextPage + 1,
          list: [...state.nowPlayingMovies.list, ...action.payload],
        },
      };
    case "FETCH_TOP_RATED":
      return {
        ...state,
        topRatedMovies: {
          nextPage: state.topRatedMovies.nextPage + 1 + 1,
          list: [...state.topRatedMovies.list, ...action.payload],
        },
      };
    case "FETCH_UPCOMING":
      return {
        ...state,
        upcomingMovies: {
          nextPage: state.upcomingMovies.nextPage + 1,
          list: [...state.upcomingMovies.list, ...action.payload],
        },
      };
    case "FETCH_SEARCH":
      return {
        ...state,
        searchResult: {
          nextPage: state.searchResult.nextPage + 1,
          list: [...state.searchResult.list, ...action.payload],
        },
      };
    case "FETCH_FILTER":
      return {
        ...state,
        filteredMovies: {
          nextPage: state.filteredMovies.nextPage + 1,
          list: [...state.filteredMovies.list, ...action.payload],
        },
      };
    default:
      return state;
  }
};

export default movies;
