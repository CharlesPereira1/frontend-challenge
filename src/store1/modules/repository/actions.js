// faz requisição na API
export function repoRequestSearch(data) {
  return {
    type: '@repo/REPO_REQUEST_SEARCH',
    payload: { data },
  };
}

// Mostra em tela
export function repoSearchSuccess(data) {
  return {
    type: '@repo/REPO_SEARCH_SUCCESS',
    payload: { data },
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

export function repoNextPage(data) {
  return {
    type: '@repo/REPO_NEXT_PAGE',
    payload: { data },
  };
}
