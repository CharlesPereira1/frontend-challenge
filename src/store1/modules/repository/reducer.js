import produce from 'immer';

const INITIAL_STATE = {
  nameSearch: '',
  filter: '',
  page: 1,
  perPage: 10,
  qtdResult: 0,
  plusPage: false,
  loading: false,
  repos: [],
  // repos: [{ repository: [] }],
};

export default function repo(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@repo/REPO_REQUEST_SEARCH': {
        // draft.params = action.repo.data;
        draft.loading = true;
        // draft.nameSearch = draft.search;
        draft.filter = action.payload.filter;
        break;
      }

      // recupera dados do request (map)
      case '@repo/REPO_SEARCH_SUCCESS': {
        draft.repos = action.payload.data;
        draft.nameSearch = action.payload.nameSearch;
        draft.filter = action.payload.filter;
        draft.loading = false;
        break;
      }

      case '@repo/REPO_FAILURE': {
        draft.loading = false;
        break;
      }

      case '@repo/REPO_REQUEST_NEXT_PAGE': {
        draft.repos = [...state, action.payload.data];
        draft.plusPage = true;
        break;
      }

      case '@repo/REPO_NEXT_PAGE': {
        draft.repos = [...state, action.payload.data];
        draft.plusPage = false;
        draft.page = action.payload.page + 1;
        break;
      }

      // [...state, action.payload.data] //pega os dados e adiciona mais

      default:
        return state;
    }
  });
}
