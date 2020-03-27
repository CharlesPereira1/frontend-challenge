import produce from 'immer';

const INITIAL_STATE = {
  repos: {
    filter: 'star',
    page: 1,
    perPage: 10,
    data: [],
  },
  // repository: {},
  loading: false,
};

export default function repo(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@repo/REPO_REQUEST_SEARCH': {
        // draft.params = action.repo.data;
        draft.loading = true;
        break;
      }

      // recupera dados do request (map)
      case '@repo/REPO_SEARCH_SUCCESS': {
        draft.repos = action.payload.data;
        draft.loading = false;
        break;
      }

      case '@repo/REPO_FAILURE': {
        draft.loading = false;
        break;
      }
      default:
        return state;
    }
  });
}
