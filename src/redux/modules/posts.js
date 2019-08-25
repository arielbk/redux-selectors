import { createSelector } from 'reselect';

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
const getPosts = state => state.posts.fetched;
const getQuery = state => state.posts.query;

export const selectFilteredPosts = createSelector(
  getPosts,
  getQuery,
  (posts, query) => posts.filter(post =>
    post.title.includes(query) || post.body.includes(query)
  ),
)
