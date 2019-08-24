// REDUCER
export default (
  state = {
    fetched: null,
    query: '',
  },
  action
) => {
  switch (action.type) {
    case 'SET_POSTS':
      return {
        ...state,
        fetched: action.payload,
      };
    default:
      return state;
  }
};

// SELECTORS
// const filterPosts = query => {

// }