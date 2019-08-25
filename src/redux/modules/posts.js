// REDUCER
export default (
  state = {
    fetched: [],
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
    case 'SET_QUERY':
      return {
        ...state,
        query: action.payload,
      }
    default:
      return state;
  }
};

// SELECTORS
export const selectFilteredPosts = state =>
  state.posts.fetched.filter(post =>
    post.title.includes(state.posts.query) ||
    post.body.includes(state.posts.query)
  );
