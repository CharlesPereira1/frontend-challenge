import produce from 'immer';

const INITIAL_STATE = {
  search: '',
  filter: '',
  page: 0,
  perPage: '',
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
        draft.loading = true;
        draft.page = 0;
        break;
      }

      // recupera dados do request (map)
      case '@repo/REPO_SEARCH_SUCCESS': {
        draft.repos = action.payload.data;
        draft.search = action.payload.search;
        draft.filter = action.payload.filter;
        draft.page = action.payload.page;
        draft.perPage = action.payload.perPage;
        draft.loading = false;
        break;
      }

      case '@repo/REPO_REQUEST_NEXT_PAGE': {
        draft.repos = [action.payload.data];
        draft.plusPage = true;
        break;
      }

      case '@repo/REPO_NEXT_PAGE': {
        const totalPage =
          action.payload.data.total_count / action.payload.perPage;
        draft.repos = [action.payload.data];
        draft.plusPage = false;
        if (totalPage <= draft.page) {
          // [...state, action.payload.page],
        }
        // draft.push({ ...action.payload.data.items });
        break;
      }

      case '@repo/REPO_FAILURE': {
        draft.loading = false;
        break;
      }

      // [...state, action.payload.data] //pega os dados e adiciona mais

      default:
        return state;
    }
  });
}
