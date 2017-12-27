const FILTER = 'FILTER';

const filter = dispatch => filterObj => {
  dispatch({
    type: FILTER,
    filterObj
  });
};

const initialState = {
  hasOpenIssues: false,
  hasTopics: false,
  starredGTXTimes: 0,
  updatedAfter: '2000-01-01',
  type: 'all',
  lang: 'Any'
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FILTER:
      return {
        ...state,
        ...action.filterObj
      };
    default:
      return { ...state };
  }
}

export { filter };
