// faz requisição na API
export function repoRequestSearch(data, nameSearch, filter) {
  return {
    type: '@repo/REPO_REQUEST_SEARCH',
    payload: { data, nameSearch, filter },
  };
}

// Mostra em tela
export function repoSearchSuccess(data, nameSearch, filter) {
  return {
    type: '@repo/REPO_SEARCH_SUCCESS',
    payload: { data, nameSearch, filter },
  };
}

export function repoLoading(data) {
  return {
    type: '@repo/REPO_LOADING',
    payload: { data },
  };
}

export function repoFaiure() {
  return {
    type: '@repo/REPO_FAILURE',
  };
}

export function repoNextPage(data, page) {
  return {
    type: '@repo/REPO_NEXT_PAGE',
    payload: { data },
  };
}
