const SORT = 'SORT';

const sort = dispatch => sortingObj => {
  dispatch({
    type: SORT,
    sortingObj
  });
};

export default function reducer(state, action) {
  switch (action.type) {
    case SORT:
      return {
        ...state,
        ...action.sortingObj
      };
    default:
      return { ...state };
  }
}

export { sort };
