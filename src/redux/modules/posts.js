// REDUCER
export default (
  state = {
    posts: null,
  },
  action
) => {
  switch (action.type) {
    case 'SET_POSTS':
      return {
        actual: action.payload,
        filtered: action.payload,
      };
    default:
      return state;
  }
};
