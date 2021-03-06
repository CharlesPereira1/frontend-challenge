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
        // draft.repos = [action.payload.data];

        // if (draft.page >= 1) {
        draft.plusPage = true;
        // }
        // draft.page = action.payload.page + 1;
        break;
      }

      case '@repo/REPO_NEXT_PAGE_SUCCESS': {
        // const { items } = action.payload.data;
        // draft.repos.items.push(items);
        // return
        // state.push({
        //   items: [action.payload.data.items],
        draft.plusPage = true;
        draft.Page = action.payload.data;
        //   plusPage: false,
        // });
        // draft[action.payload.data.items] = action.payload.data.items;
        // const { newRepos } = action.payload.data;
        draft.repos = [draft.repos, action.payload.data];
        // draft.repos = [...state, ...newRepos];

        // action.payload.data.forEach(data => {
        //   draft[data] = action.data.page;
        // });

        // action.payload.data.forEach(data => {
        //   draft.repos = { data };
        // });

        // draft.repos.push(action.payload.data);

        // draft.push(action.payload.data);
        // break;
      }

      // eslint-disable-next-line no-fallthrough
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
