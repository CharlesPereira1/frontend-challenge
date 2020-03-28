import produce from 'immer';

const INITIAL_STATE = {
  nameSearch: '',
  filter: '',
  page: 1,
  perPage: 30,
  qtdResult: 0,
  plusPage: false,
  loading: false,
  repos: {
    data: [],
  },
  // repos: [{ repository: [] }],
};

export default function repo(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@repo/REPO_REQUEST_SEARCH': {
        // draft.params = action.repo.data;
        draft.loading = true;
        draft.nameSearch = draft.search;
        break;
      }

      // recupera dados do request (map)
      case '@repo/REPO_SEARCH_SUCCESS': {
        draft.repos = action.payload.data;
        draft.nameSearch = action.search;
        draft.loading = false;
        break;
      }

      case '@repo/REPO_FAILURE': {
        draft.loading = false;
        break;
      }

      case '@repo/REPO_NEXT_PAGE': {
        break;
      }

      default:
        return state;
    }
  });
}
