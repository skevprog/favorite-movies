const CardsContainerreducer = (state, action) => {
  const moviesReducer = {
    SEARCH_MOVIES_REQUEST: {
      ...state,
      loading: true,
      errorMessage: null,
    },
    SEARCH_MOVIES_SUCCESS: {
      ...state,
      loading: false,
      moviesData: action.payload,
    },
    SEARCH_MOVIES_FAILURE: {
      ...state,
      loading: false,
      errorMessage: action.error,
    },
  };
  return moviesReducer[action.type] || state;
};

export default CardsContainerreducer;
